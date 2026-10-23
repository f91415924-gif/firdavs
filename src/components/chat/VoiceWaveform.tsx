import React from 'react';
import { motion } from 'motion/react';

interface VoiceWaveformProps {
  isListening: boolean;
  onStop: () => void;
  statusText: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isListening,
  onStop,
  statusText,
}) => {
  if (!isListening) return null;

  const bars = [16, 28, 44, 24, 38, 52, 32, 48, 20, 36, 42, 22];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="mb-3 flex items-center justify-between rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-3">
        {/* Animated Sound Wave Bars */}
        <div className="flex h-8 items-center gap-1">
          {bars.map((height, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-black dark:bg-white"
              animate={{
                height: [height * 0.4, height, height * 0.4],
              }}
              transition={{
                duration: 0.6 + (i % 3) * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
          {statusText}
        </span>
      </div>

      <button
        type="button"
        onClick={onStop}
        className="rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
      >
        Done
      </button>
    </motion.div>
  );
};
