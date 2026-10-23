import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, ShieldCheck, Cpu, Globe2, Terminal } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-black dark:text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
          aria-label={t.close}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 border-b border-neutral-200 pb-5 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-2 text-neutral-500 text-xs font-mono">
            <Cpu className="h-4 w-4" />
            <span>ASKDESK // SYSTEM ARCHITECTURE & VERIFICATION GUIDE</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t.docsTitle}
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Comprehensive manual on grounded intelligence, multi-language processing, automated testing, and cloud deployment.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
          {/* Section 1: Factual Grounding Principles */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
              <ShieldCheck className="h-4 w-4" />
              <h3>1. Strict Factual Grounding & Zero-Hallucination Policy</h3>
            </div>
            <p>
              AskDesk uses Google's latest Gemini model (<code>gemini-3.8-flash</code>) configured with low temperature (0.15) to guarantee strictly deterministic responses. The model receives a dynamically assembled context containing:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li><strong>Company Profile:</strong> Official name, verified working hours, phone number, address, and website.</li>
              <li><strong>Structured FAQ Pairs:</strong> High-priority canonical answers for common inquiries.</li>
              <li><strong>Free-Form Knowledge Sections:</strong> Markdown documents covering pricing, menus, delivery matrices, allergen guidelines, and return policies.</li>
              <li><strong>Mandatory Fallback Rule:</strong> If an inquiry asks for facts not explicitly present in the loaded context, the bot is instructed to politely refuse to invent details and output the fallback contact instruction.</li>
            </ul>
          </div>

          {/* Section 2: Four Language & Script Architecture */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
              <Globe2 className="h-4 w-4" />
              <h3>2. Multilingual & Script Fidelity System</h3>
            </div>
            <p>
              AskDesk fully supports 4 operational languages and scripts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="rounded-2xl border border-neutral-200 p-3.5 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="font-bold text-black dark:text-white mb-1">1. English (Latin)</div>
                <div className="text-neutral-500 text-[11px]">Primary international communication standard.</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-3.5 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="font-bold text-black dark:text-white mb-1">2. Русский (Cyrillic)</div>
                <div className="text-neutral-500 text-[11px]">Comprehensive Cyrillic UI and semantic comprehension.</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-3.5 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="font-bold text-black dark:text-white mb-1">3. O'zbekcha (Lotin)</div>
                <div className="text-neutral-500 text-[11px]">Standard Uzbek Latin alphabet with apostrophes and accents.</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-3.5 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="font-bold text-black dark:text-white mb-1">4. Ўзбекча (Кирилл)</div>
                <div className="text-neutral-500 text-[11px]">Cyrillic script for Uzbek language with specific characters (ў, қ, ғ, ҳ).</div>
              </div>
            </div>
            <p className="mt-2 text-neutral-500">
              The AI automatically mirrors the language and script in which the customer communicates, ensuring authentic customer support across regional demographics.
            </p>
          </div>

          {/* Section 3: Testing Protocols */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
              <CheckCircle className="h-4 w-4" />
              <h3>3. End-to-End Verification & Testing Protocols</h3>
            </div>
            <p>
              To verify full system integrity before production rollout, run the following test suite:
            </p>
            <div className="space-y-2 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 font-mono text-[11px]">
              <div><strong>Test Case 1 (Fact Retrieval):</strong> Ask "What are the hours on Sunday?" → Verify answer states 09:00 - 23:00.</div>
              <div><strong>Test Case 2 (Strict Grounding):</strong> Ask "Do you sell sushi?" → Verify bot states it does not have this info and provides company phone.</div>
              <div><strong>Test Case 3 (Multilingual Uzbek):</strong> Ask "Yetkazib berish narxi qancha?" → Verify bot responds in Uzbek Latin with 18,000 UZS / free over 120,000 UZS.</div>
              <div><strong>Test Case 4 (Voice Recognition):</strong> Click microphone button, speak query, verify live waveform animates and text inserts.</div>
              <div><strong>Test Case 5 (Image Upload):</strong> Attach a photo of a receipt or item and ask "Can I refund this?", verify multimodal response.</div>
              <div><strong>Test Case 6 (Lead Conversion):</strong> Click "Talk to a human", submit callback request, verify entry appears in Admin &gt; Analytics.</div>
            </div>
          </div>

          {/* Section 4: Production Deployment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
              <Terminal className="h-4 w-4" />
              <h3>4. Deployment & Build Procedures</h3>
            </div>
            <p>
              AskDesk is architected as a full-stack Node.js Express + React SPA application. Build and deployment commands:
            </p>
            <pre className="rounded-2xl border border-neutral-200 bg-neutral-100 p-4 font-mono text-[11px] text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 overflow-x-auto">
{`# 1. Install dependencies
npm install

# 2. Compile frontend assets
npm run build

# 3. Start production server (runs on PORT 3000)
npm start

# Environment Variables:
GEMINI_API_KEY="AIzaSy..."   # Server-side Gemini API key
PORT="3000"                  # Web server port
NODE_ENV="production"        # Production optimizations`}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 flex justify-end border-t border-neutral-200 pt-5 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="rounded-2xl bg-black px-6 py-2.5 text-xs font-medium text-white hover:opacity-90 dark:bg-white dark:text-black shadow-md transition-opacity"
          >
            {t.docsClose}
          </button>
        </div>
      </div>
    </div>
  );
};
