import React, { useState } from 'react';
import { ChatMessage } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Copy,
  Check,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '../../utils/speech';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectFeedback?: (feedback: 'like' | 'dislike') => void;
  botAvatar?: string;
  botName?: string;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectFeedback,
  botAvatar,
  botName = 'AskDesk',
}) => {
  const { t, language, recordMessageFeedback } = useApp();
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<'like' | 'dislike' | undefined>(
    message.feedback
  );

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(
        message.content,
        language,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    setLocalFeedback(type);
    recordMessageFeedback(message.id, type);
    onSelectFeedback?.(type);
  };

  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group flex w-full gap-3.5 my-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-neutral-300 bg-black text-white dark:border-neutral-700 dark:bg-white dark:text-black shadow-sm mt-1">
          {botAvatar ? (
            <img
              src={botAvatar}
              alt={botName}
              className="h-full w-full rounded-2xl object-cover filter grayscale"
            />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`flex max-w-[85%] sm:max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Role Name */}
        <div className="mb-1 flex items-center gap-2 text-[11px] text-neutral-400">
          <span className="font-medium text-neutral-600 dark:text-neutral-300">
            {isUser ? 'You' : botName}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{timeString}</span>
        </div>

        {/* Message Bubble */}
        <div
          className={`relative rounded-3xl p-4 sm:p-5 shadow-sm text-sm leading-relaxed transition-colors ${
            isUser
              ? 'rounded-tr-sm bg-black text-white dark:bg-white dark:text-black'
              : 'rounded-tl-sm border border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100'
          }`}
        >
          {/* Attached Image if user sent photo */}
          {message.image?.data && (
            <div className="mb-3 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-700">
              <img
                src={`data:${message.image.mimeType};base64,${message.image.data}`}
                alt="Uploaded attachment"
                className="max-h-64 w-auto rounded-2xl object-cover"
              />
            </div>
          )}

          {/* Formatted Content */}
          <div className="whitespace-pre-wrap break-words">
            {message.content}
            {message.isStreaming && (
              <span className="inline-block h-3.5 w-1.5 ml-1 animate-pulse bg-current" />
            )}
          </div>
        </div>

        {/* Action Toolbar for Bot Messages */}
        {!isUser && !message.isStreaming && (
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
            {/* Read Aloud Button */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:text-black dark:hover:text-white ${
                isPlayingAudio ? 'bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white font-medium' : ''
              }`}
              title={isPlayingAudio ? 'Stop reading' : t.readAloud}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span className="text-[11px]">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span className="text-[11px]">{t.readAloud}</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:text-black dark:hover:text-white"
              title={copied ? t.copied : t.copyText}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-black dark:text-white" />
                  <span className="text-[11px] text-black dark:text-white">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-[11px]">{t.copyText}</span>
                </>
              )}
            </button>

            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>

            {/* Thumbs Up / Down */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleFeedback('like')}
                className={`rounded-lg p-1 transition-colors ${
                  localFeedback === 'like'
                    ? 'text-black dark:text-white bg-neutral-200 dark:bg-neutral-800'
                    : 'hover:text-black dark:hover:text-white'
                }`}
                title={t.like}
                aria-label="Thumbs up"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleFeedback('dislike')}
                className={`rounded-lg p-1 transition-colors ${
                  localFeedback === 'dislike'
                    ? 'text-black dark:text-white bg-neutral-200 dark:bg-neutral-800'
                    : 'hover:text-black dark:hover:text-white'
                }`}
                title={t.dislike}
                aria-label="Thumbs down"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-neutral-300 bg-neutral-200 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white shadow-sm mt-1">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
};
