import { Language } from '../types';

// Declare types for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.speechSynthesis);
}

export function getLocaleForLanguage(lang: Language): string {
  switch (lang) {
    case 'ru':
      return 'ru-RU';
    case 'uz-latn':
    case 'uz-cyrl':
      return 'uz-UZ';
    case 'en':
    default:
      return 'en-US';
  }
}

export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening = false;

  constructor(
    private onResult: (text: string, isFinal: boolean) => void,
    private onError: (error: string) => void,
    private onEnd: () => void
  ) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          this.onResult(final, true);
        } else if (interim) {
          this.onResult(interim, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.onError(event.error || 'Speech recognition error');
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onEnd();
      };
    }
  }

  public start(lang: Language) {
    if (!this.recognition) {
      this.onError('Speech recognition is not supported in this browser.');
      return;
    }
    if (this.isListening) return;

    try {
      this.recognition.lang = getLocaleForLanguage(lang);
      this.recognition.start();
      this.isListening = true;
    } catch (e: any) {
      this.onError(e.message || 'Could not start voice recognition');
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(
  text: string,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!isSpeechSynthesisSupported()) return;

  stopSpeaking();

  // Strip markdown formatting characters for cleaner audio
  const cleanText = text
    .replace(/[*_#`~\[\]]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const targetLocale = getLocaleForLanguage(lang);
  utterance.lang = targetLocale;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Find preferred voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(targetLocale.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    activeUtterance = utterance;
    onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    onEnd?.();
  };

  utterance.onerror = () => {
    activeUtterance = null;
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}
