export type Language = 'en' | 'ru' | 'uz-latn' | 'uz-cyrl';

export type BotTone = 'formal' | 'friendly' | 'short';

export type UserRole = 'boshliq' | 'ishchi' | 'mijoz';

export type IndustryType =
  | 'custom'
  | 'it'
  | 'logistics'
  | 'retail'
  | 'clinic'
  | 'education'
  | 'finance'
  | 'cafe';

export interface CurrentUser {
  name: string;
  role: UserRole;
  employeeId?: string;
}

export interface Employee {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on_duty' | 'leave';
  isHead?: boolean;
}

export interface CompanyProfile {
  name: string;
  industry: string;
  description: string;
  workingHours: string;
  phone: string;
  address: string;
  website: string;
  logo: string; // base64 or URL
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  language?: Language | 'all';
}

export interface FreeTextSection {
  id: string;
  title: string;
  content: string;
  category: 'prices' | 'delivery' | 'returns' | 'policies' | 'custom';
  updatedAt: string;
}

export interface UploadedDoc {
  id: string;
  filename: string;
  size: number;
  extractedText: string;
  uploadedAt: string;
}

export interface KnowledgeBase {
  faqs: FAQItem[];
  freeTexts: FreeTextSection[];
  documents: UploadedDoc[];
}

export interface BotSettings {
  botName: string;
  greetingMessage: string;
  tone: BotTone;
  fallbackMessage: string;
  avatar?: string;
}

export interface MessageImage {
  data: string; // base64
  mimeType: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  image?: MessageImage;
  feedback?: 'like' | 'dislike';
  feedbackReason?: string;
  isStreaming?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  timestamp: number;
  status: 'new' | 'contacted' | 'resolved';
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  timestamp: number;
  count: number;
  addedToKB: boolean;
}

export interface DailyStat {
  date: string;
  chats: number;
  messages: number;
  satisfaction: number; // 0-100%
}

export interface AppState {
  companyProfile: CompanyProfile;
  knowledgeBase: KnowledgeBase;
  botSettings: BotSettings;
  leads: Lead[];
  unansweredQuestions: UnansweredQuestion[];
  chatsCount: number;
  messagesCount: number;
  likesCount: number;
  dislikesCount: number;
  dailyStats: DailyStat[];
  employees: Employee[];
  currentIndustry: IndustryType;
}
