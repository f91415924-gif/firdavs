import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'AskDesk',
    model: 'gemini-3.8-flash',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Fallback rule-based grounded responder if API key is absent or quota exceeded
function generateFallbackResponse(
  userQuery: string,
  companyProfile: any,
  knowledgeBase: any,
  botSettings: any,
  lang: string
): string {
  const queryLower = (userQuery || '').toLowerCase();
  const faqs: any[] = knowledgeBase?.faqs || [];
  const freeTexts: any[] = knowledgeBase?.freeTexts || [];

  // Match FAQs by keyword overlap
  let bestFaq: any = null;
  let maxScore = 0;

  for (const faq of faqs) {
    const q = (faq.question || '').toLowerCase();
    const words = queryLower.split(/\s+/).filter((w) => w.length > 2);
    let score = 0;
    for (const w of words) {
      if (q.includes(w)) score += 2;
      if ((faq.answer || '').toLowerCase().includes(w)) score += 1;
    }
    if (score > maxScore) {
      maxScore = score;
      bestFaq = faq;
    }
  }

  if (bestFaq && maxScore >= 2) {
    return bestFaq.answer;
  }

  // Check free text sections
  for (const ft of freeTexts) {
    const title = (ft.title || '').toLowerCase();
    const content = (ft.content || '').toLowerCase();
    if (
      (title && queryLower.includes(title)) ||
      (queryLower.includes('price') && title.includes('price')) ||
      (queryLower.includes('delivery') && title.includes('deliver')) ||
      (queryLower.includes('return') && title.includes('return')) ||
      (queryLower.includes('доставк') && (title.includes('доставк') || content.includes('доставк'))) ||
      (queryLower.includes('цен') && (title.includes('цен') || content.includes('меню'))) ||
      (queryLower.includes('yetkaz') && (title.includes('yetkaz') || content.includes('yetkaz'))) ||
      (queryLower.includes('narx') && (title.includes('narx') || content.includes('narx')))
    ) {
      return `${ft.title}:\n${ft.content}`;
    }
  }

  // Check founder / CEO / boshliq
  if (
    queryLower.includes('boshliq') ||
    queryLower.includes('rahbar') ||
    queryLower.includes('direktor') ||
    queryLower.includes('ceo') ||
    queryLower.includes('firdavs') ||
    queryLower.includes('руководитель') ||
    queryLower.includes('директор') ||
    queryLower.includes('founder')
  ) {
    return `${companyProfile.name || 'Kompaniyamiz'} boshlig'i va asoschisi (CEO & Founder) — Firdavs Nematjanov hisoblanadi.`;
  }

  // Check working hours
  if (
    queryLower.includes('hour') ||
    queryLower.includes('time') ||
    queryLower.includes('open') ||
    queryLower.includes('часы') ||
    queryLower.includes('время') ||
    queryLower.includes('работаете') ||
    queryLower.includes('vaqt') ||
    queryLower.includes('ish vaqti') ||
    queryLower.includes('иш вақти')
  ) {
    if (companyProfile?.workingHours) {
      return `${companyProfile.name || 'Our'} working hours: ${companyProfile.workingHours}.`;
    }
  }

  // Check address / location
  if (
    queryLower.includes('address') ||
    queryLower.includes('where') ||
    queryLower.includes('location') ||
    queryLower.includes('адрес') ||
    queryLower.includes('где') ||
    queryLower.includes('манзил') ||
    queryLower.includes('qayerda') ||
    queryLower.includes('manzil')
  ) {
    if (companyProfile?.address) {
      return `Our location: ${companyProfile.address}. Phone: ${companyProfile.phone || '-'}.`;
    }
  }

  // Fallback polite message
  const fallback =
    botSettings?.fallbackMessage ||
    `I don't have information about that in our knowledge base. Please contact our team directly at ${companyProfile?.phone || companyProfile?.website || 'our office'} or click "Talk to a human" to submit your inquiry.`;

  return fallback;
}

// Chat API route (Streaming SSE)
app.post('/api/chat', async (req: Request, res: Response) => {
  const {
    messages,
    companyProfile,
    knowledgeBase,
    botSettings,
    image,
    language = 'en',
  } = req.body;

  // Prepare Server-Sent Events headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const apiKey = process.env.GEMINI_API_KEY;
  const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1] : null;
  const userText = lastUserMsg?.content || '';

  // Construct rigorous Grounded System Prompt
  const companyContext = `
COMPANY PROFILE:
- Name: ${companyProfile?.name || 'Company'}
- Industry / Network: ${companyProfile?.industry || 'Enterprise Business Network'}
- Founder & Chief Executive (Boshliq / CEO): Firdavs Nematjanov
- Description: ${companyProfile?.description || ''}
- Working Hours: ${companyProfile?.workingHours || 'Not specified'}
- Phone: ${companyProfile?.phone || 'Not specified'}
- Address: ${companyProfile?.address || 'Not specified'}
- Website: ${companyProfile?.website || 'Not specified'}
`;

  const faqsContext = (knowledgeBase?.faqs || [])
    .map(
      (item: any, idx: number) =>
        `[FAQ ${idx + 1}]\nQuestion: ${item.question}\nAnswer: ${item.answer}`
    )
    .join('\n\n');

  const freeTextsContext = (knowledgeBase?.freeTexts || [])
    .map((item: any, idx: number) => `[SECTION: ${item.title}]\n${item.content}`)
    .join('\n\n');

  const toneInstruction =
    botSettings?.tone === 'formal'
      ? 'Adopt a highly professional, polite, and corporate tone.'
      : botSettings?.tone === 'short'
      ? 'Keep all answers concise, direct, and under 3-4 sentences whenever possible.'
      : 'Adopt a friendly, warm, helpful, and courteous tone.';

  const fallbackInstruction =
    botSettings?.fallbackMessage ||
    `I apologize, but I do not have verified information on that in our official company records. You can reach our team at ${companyProfile?.phone || 'our phone number'} or click "Talk to a human" below to leave a request.`;

  const systemInstruction = `You are "${botSettings?.botName || 'AskDesk Assistant'}", the official AI customer support agent for "${companyProfile?.name || 'our company'}".

CRITICAL GROUNDING RULES:
1. STRICT FACTUAL GROUNDING: Answer questions ONLY using facts found in the COMPANY PROFILE, FAQ entries, and KNOWLEDGE BASE sections below.
2. ABSOLUTELY NO HALLUCINATIONS: Never invent prices, menu items, delivery terms, working hours, discounts, return windows, or company policies. If an item or detail is NOT in the provided knowledge base, you MUST clearly state that you do not have that information and provide the official fallback / contact instructions: "${fallbackInstruction}".
3. MULTILINGUAL & SCRIPT FIDELITY:
   - Carefully detect the customer's language and script.
   - If the customer writes in Russian (Русский), reply in Russian.
   - If the customer writes in Uzbek using Latin script (O'zbekcha), reply in Uzbek Latin script.
   - If the customer writes in Uzbek using Cyrillic script (Ўзбекча), reply in Uzbek Cyrillic script.
   - If the customer writes in English, reply in English.
   - Never mix scripts or reply in the wrong language.
4. TONE: ${toneInstruction}
5. FORMATTING: Use clean, readable markdown (bullet points, bold text for key details). Never output broken links or fake emails.
6. VISUAL INPUTS: If an image is provided by the customer (e.g. photo of a menu item, receipt, payment check, defective product), inspect the image details and correlate it strictly with the company's knowledge base.

${companyContext}

KNOWLEDGE BASE (FAQs):
${faqsContext || 'No FAQs provided yet.'}

KNOWLEDGE BASE (POLICIES, PRICES & DETAILS):
${freeTextsContext || 'No additional documents provided yet.'}
`;

  if (!apiKey) {
    // Graceful offline fallback
    const answer = generateFallbackResponse(
      userText,
      companyProfile,
      knowledgeBase,
      botSettings,
      language
    );

    // Stream out chunks progressively for natural UI feedback
    const words = answer.split(' ');
    for (let i = 0; i < words.length; i++) {
      const piece = (i === 0 ? '' : ' ') + words[i];
      res.write(`data: ${JSON.stringify({ text: piece })}\n\n`);
      await new Promise((r) => setTimeout(r, 20));
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Build contents history
    // Only pass prior turns (alternating user and model)
    const formattedContents: any[] = [];
    const recentMessages = (messages || []).slice(-8); // Keep last 8 turns for context

    for (let i = 0; i < recentMessages.length; i++) {
      const msg = recentMessages[i];
      const isLast = i === recentMessages.length - 1;
      const role = msg.role === 'assistant' ? 'model' : 'user';

      if (isLast && role === 'user' && image?.data) {
        // Multimodal part
        formattedContents.push({
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: image.mimeType || 'image/jpeg',
                data: image.data,
              },
            },
            {
              text: msg.content || 'Please look at this image in relation to the company.',
            },
          ],
        });
      } else {
        formattedContents.push({
          role,
          parts: [{ text: msg.content || '' }],
        });
      }
    }

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.15, // Low temperature for high factual grounding
        topP: 0.9,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error generating response with Gemini:', error?.message || error);
    
    // Fall back to rule-based grounded responder on error
    const fallback = generateFallbackResponse(
      userText,
      companyProfile,
      knowledgeBase,
      botSettings,
      language
    );
    res.write(`data: ${JSON.stringify({ text: fallback })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Document parsing / text extract endpoint
app.post('/api/parse-document', (req: Request, res: Response) => {
  try {
    const { filename, content, type } = req.body;
    if (!content) {
      res.status(400).json({ error: 'No content provided' });
      return;
    }

    // For plain text / base64 text
    let extractedText = '';
    if (type?.includes('text') || filename?.endsWith('.txt') || filename?.endsWith('.md') || filename?.endsWith('.json')) {
      if (content.startsWith('data:')) {
        const base64Data = content.split(',')[1];
        extractedText = Buffer.from(base64Data, 'base64').toString('utf-8');
      } else {
        extractedText = content;
      }
    } else {
      // Decode base64 and extract human-readable text
      if (content.startsWith('data:')) {
        const base64Data = content.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\t\n\r\u0400-\u04FF]/g, ' ').replace(/\s+/g, ' ').trim();
      } else {
        extractedText = content;
      }
    }

    res.json({
      filename,
      extractedText: extractedText.slice(0, 50000), // Max 50k chars
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to parse document: ' + err.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AskDesk server running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
