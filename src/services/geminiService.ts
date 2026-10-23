import {
  ChatMessage,
  CompanyProfile,
  KnowledgeBase,
  BotSettings,
  Language,
  MessageImage,
} from '../types';

export interface SendMessageOptions {
  messages: ChatMessage[];
  companyProfile: CompanyProfile;
  knowledgeBase: KnowledgeBase;
  botSettings: BotSettings;
  image?: MessageImage;
  language: Language;
  onChunk: (chunk: string) => void;
  signal?: AbortSignal;
}

export async function sendChatMessageStream({
  messages,
  companyProfile,
  knowledgeBase,
  botSettings,
  image,
  language,
  onChunk,
  signal,
}: SendMessageOptions): Promise<string> {
  const payload = {
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    companyProfile,
    knowledgeBase,
    botSettings,
    image,
    language,
  };

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server returned ${response.status}: ${errorText}`);
  }

  if (!response.body) {
    throw new Error('ReadableStream not supported by response');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data:')) continue;

      const dataStr = trimmed.slice(5).trim();
      if (dataStr === '[DONE]') {
        return fullText;
      }

      try {
        const parsed = JSON.parse(dataStr);
        if (parsed.text) {
          fullText += parsed.text;
          onChunk(parsed.text);
        }
      } catch (err) {
        console.warn('Could not parse SSE JSON line:', dataStr);
      }
    }
  }

  return fullText;
}
