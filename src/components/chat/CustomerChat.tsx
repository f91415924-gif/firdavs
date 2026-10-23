import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage, MessageImage } from '../../types';
import { ChatMessageItem } from './ChatMessageItem';
import { VoiceWaveform } from './VoiceWaveform';
import { LeadModal } from './LeadModal';
import { sendChatMessageStream } from '../../services/geminiService';
import { VoiceRecognitionService, isSpeechRecognitionSupported } from '../../utils/speech';
import {
  Send,
  Mic,
  Image as ImageIcon,
  Trash2,
  Headphones,
  X,
  Sparkles,
} from 'lucide-react';

interface CustomerChatProps {
  isEmbeddedPreview?: boolean;
}

const STORAGE_SESSION_KEY = 'askdesk_chat_history_v1';

export const CustomerChat: React.FC<CustomerChatProps> = ({ isEmbeddedPreview = false }) => {
  const {
    state,
    t,
    language,
    incrementChatCount,
    incrementMessageCount,
    recordUnansweredQuestion,
  } = useApp();

  const { companyProfile, knowledgeBase, botSettings } = state;

  // Initialize messages from session storage or initial greeting
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read session messages', e);
    }
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content:
          botSettings.greetingMessage ||
          `Welcome to ${companyProfile.name || 'our company'}! How may I assist you today?`,
        timestamp: Date.now(),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MessageImage | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const voiceServiceRef = useRef<VoiceRecognitionService | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Persist messages in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not write session messages', e);
    }
  }, [messages]);

  // Setup Web Speech recognition
  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      voiceServiceRef.current = new VoiceRecognitionService(
        (text, isFinal) => {
          setInput((prev) => (isFinal ? prev + (prev ? ' ' : '') + text : text));
          if (isFinal) {
            setIsListening(false);
          }
        },
        (error) => {
          setSpeechStatus(`Voice error: ${error}`);
          setTimeout(() => setIsListening(false), 2000);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  }, []);

  const handleToggleVoice = () => {
    if (!isSpeechRecognitionSupported()) {
      alert(t.speechNotSupported);
      return;
    }

    if (isListening) {
      voiceServiceRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      setSpeechStatus(t.listening);
      voiceServiceRef.current?.start(language);
    }
  };

  // Image Upload handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const base64Data = dataUrl.split(',')[1];
        setSelectedImage({
          data: base64Data,
          mimeType: file.type,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Send message
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : input).trim();
    if ((!query && !selectedImage) || isStreaming) return;

    // Check if new chat session started
    if (messages.length <= 1) {
      incrementChatCount();
    }
    incrementMessageCount();

    const userMessage: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: Date.now(),
      image: selectedImage || undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);

    // Prepare assistant message placeholder
    const assistantMessageId = 'msg-a-' + Date.now();
    const assistantPlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    setMessages([...newMessages, assistantPlaceholder]);
    setIsStreaming(true);

    let accumulatedAnswer = '';

    try {
      await sendChatMessageStream({
        messages: newMessages,
        companyProfile,
        knowledgeBase,
        botSettings,
        image: currentImage || undefined,
        language,
        onChunk: (chunk) => {
          accumulatedAnswer += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulatedAnswer, isStreaming: true }
                : msg
            )
          );
        },
      });

      // Finish streaming
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: accumulatedAnswer, isStreaming: false }
            : msg
        )
      );

      // Check if this was an unanswered query
      const lowerAnswer = accumulatedAnswer.toLowerCase();
      const lowerFallback = (botSettings.fallbackMessage || '').toLowerCase();
      if (
        lowerAnswer.includes(lowerFallback.slice(0, 30)) ||
        lowerAnswer.includes('do not have') ||
        lowerAnswer.includes('не владею') ||
        lowerAnswer.includes('topilmadi') ||
        lowerAnswer.includes('маълумот йўқ') ||
        lowerAnswer.includes('talk to a human') ||
        lowerAnswer.includes('связаться с оператором')
      ) {
        recordUnansweredQuestion(query);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  botSettings.fallbackMessage ||
                  `I apologize, but I could not find information regarding this in our database. Please reach out to ${companyProfile.phone || 'our team'} directly.`,
                isStreaming: false,
              }
            : msg
        )
      );
      recordUnansweredQuestion(query);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    if (confirm(t.clearChat + '?')) {
      const resetMessages: ChatMessage[] = [
        {
          id: 'msg-welcome',
          role: 'assistant',
          content:
            botSettings.greetingMessage ||
            `Welcome to ${companyProfile.name || 'our company'}! How may I assist you today?`,
          timestamp: Date.now(),
        },
      ];
      setMessages(resetMessages);
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    }
  };

  // Suggestion chips derived from FAQs
  const suggestionChips = (knowledgeBase.faqs || [])
    .slice(0, 4)
    .map((faq) => {
      // Extract first question part before '/'
      const cleanQ = faq.question.split('/')[0].trim();
      return cleanQ;
    });

  return (
    <div className={`flex flex-col ${isEmbeddedPreview ? 'h-[620px]' : 'h-[calc(100vh-4rem)]'} w-full max-w-5xl mx-auto bg-white dark:bg-black text-black dark:text-white transition-colors`}>
      {/* Top Company Info Bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 sm:px-6 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Company Logo or Initials */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden shadow-sm">
            {companyProfile.logo ? (
              <img
                src={companyProfile.logo}
                alt={companyProfile.name}
                className="h-full w-full object-cover filter grayscale contrast-125"
              />
            ) : (
              <Sparkles className="h-5 w-5 text-black dark:text-white" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-black dark:text-white">
                {companyProfile.name || 'AskDesk'}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                {t.online}
              </span>
            </div>
            <p className="line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400">
              {botSettings.botName} · {companyProfile.workingHours}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Talk to human lead button */}
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="flex items-center gap-1.5 rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            title={t.talkToHuman}
          >
            <Headphones className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.talkToHuman}</span>
          </button>

          {/* Clear chat button */}
          <button
            type="button"
            onClick={handleClearChat}
            className="rounded-2xl border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
            title={t.clearChat}
            aria-label="Clear chat"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 space-y-2">
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            botAvatar={companyProfile.logo}
            botName={botSettings.botName}
          />
        ))}

        {isStreaming && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-11 pt-1">
            <span className="inline-block h-2 w-2 rounded-full bg-neutral-400 animate-ping" />
            <span>{t.typing}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length <= 2 && suggestionChips.length > 0 && (
        <div className="px-4 py-2 sm:px-6">
          <div className="mb-2 text-[11px] font-medium text-neutral-400">
            {t.quickQuestions}:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs text-neutral-700 transition-colors hover:border-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-neutral-800 text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-neutral-200 p-3 sm:p-4 dark:border-neutral-800 bg-white dark:bg-black">
        {/* Voice recognition waveform indicator */}
        <VoiceWaveform
          isListening={isListening}
          onStop={() => {
            voiceServiceRef.current?.stop();
            setIsListening(false);
          }}
          statusText={speechStatus || t.listening}
        />

        {/* Selected Image Thumbnail Preview */}
        {selectedImage && (
          <div className="mb-2 flex items-center gap-2">
            <div className="relative inline-block overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700">
              <img
                src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`}
                alt="Upload preview"
                className="h-14 w-14 object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-1 top-1 rounded-full bg-black/75 p-0.5 text-white hover:bg-black"
                title={t.removeImage}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <span className="text-xs text-neutral-400">
              Photo attached. Ask questions about this item.
            </span>
          </div>
        )}

        <div className="relative flex items-end gap-2 rounded-3xl border border-neutral-300 bg-neutral-50 p-2 shadow-inner focus-within:border-black dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:border-white transition-colors">
          {/* Photo upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-neutral-500 hover:bg-neutral-200 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors"
            title={t.uploadImage}
            aria-label="Upload photo"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition-colors ${
              isListening
                ? 'bg-black text-white dark:bg-white dark:text-black animate-pulse'
                : 'text-neutral-500 hover:bg-neutral-200 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
            }`}
            title={t.voiceInput}
            aria-label="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>

          {/* Text input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.chatPlaceholder}
            rows={1}
            className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-black placeholder:text-neutral-400 focus:outline-none dark:text-white"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={(!input.trim() && !selectedImage) || isStreaming}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition-all shadow-sm ${
              (!input.trim() && !selectedImage) || isStreaming
                ? 'bg-neutral-300 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-black text-white hover:opacity-90 dark:bg-white dark:text-black'
            }`}
            title={t.send}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Human Callback Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        prefillMessage={input}
      />
    </div>
  );
};
