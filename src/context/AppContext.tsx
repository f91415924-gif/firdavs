import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  AppState,
  CompanyProfile,
  KnowledgeBase,
  BotSettings,
  Lead,
  UnansweredQuestion,
  Language,
  FAQItem,
  FreeTextSection,
  UploadedDoc,
  CurrentUser,
  Employee,
  IndustryType,
  UserRole,
} from '../types';
import { initialDemoState, industryTemplates } from '../data/demoData';
import { translations, Translations } from '../translations';

interface AppContextType {
  state: AppState;
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: 'chat' | 'admin';
  setActiveTab: (tab: 'chat' | 'admin') => void;

  // User Authentication & Roles
  currentUser: CurrentUser;
  loginUser: (name: string, role?: UserRole, employeeId?: string) => CurrentUser;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Industry & Network Switcher
  switchIndustry: (industry: IndustryType) => void;

  // Employees Management
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, emp: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;

  // State mutators
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  updateBotSettings: (settings: Partial<BotSettings>) => void;
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  editFaq: (id: string, faq: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;
  addFreeText: (section: Omit<FreeTextSection, 'id' | 'updatedAt'>) => void;
  editFreeText: (id: string, section: Partial<FreeTextSection>) => void;
  deleteFreeText: (id: string) => void;
  addDocument: (doc: Omit<UploadedDoc, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;

  // Leads & Analytics
  addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  recordMessageFeedback: (msgId: string, feedback: 'like' | 'dislike', reason?: string) => void;
  recordUnansweredQuestion: (question: string) => void;
  markQuestionAnswered: (id: string) => void;
  incrementChatCount: () => void;
  incrementMessageCount: () => void;

  // Backup & Restore
  exportStateJson: () => void;
  importStateJson: (jsonString: string) => boolean;
  resetToDemo: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_STATE = 'askdesk_app_state_v2';
const STORAGE_KEY_LANG = 'askdesk_lang_v2';
const STORAGE_KEY_THEME = 'askdesk_theme_v2';
const STORAGE_KEY_USER = 'askdesk_user_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Language state (default uz-latn as user communicates in Uzbek, or saved)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG) as Language;
    if (saved && ['en', 'ru', 'uz-latn', 'uz-cyrl'].includes(saved)) {
      return saved;
    }
    return 'uz-latn';
  });

  // Current User (Identity & Role)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read user from storage', e);
    }
    // Default: Firdavs Nematjanov (Boshliq)
    return {
      name: 'Firdavs Nematjanov',
      role: 'boshliq',
      employeeId: 'emp-1',
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Active top tab (chat or admin)
  const [activeTab, setActiveTab] = useState<'chat' | 'admin'>('chat');

  // App state with employees and industries
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companyProfile && parsed.knowledgeBase) {
          if (!parsed.employees || parsed.employees.length === 0) {
            parsed.employees = initialDemoState.employees;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
    return initialDemoState;
  });

  // Sync theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [state]);

  // Persist user
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  };

  const t = useMemo(() => translations[language] || translations['uz-latn'], [language]);

  // LOGIN FUNCTION WITH SPECIAL FIRDEVS NEMATJANOV DETECTOR
  const loginUser = (name: string, role?: UserRole, employeeId?: string): CurrentUser => {
    const cleanName = (name || '').trim();
    const lowerName = cleanName.toLowerCase();

    let assignedRole: UserRole = role || 'mijoz';
    let matchedEmpId = employeeId;

    // RULE: "agar kirayotganda firdavs nematjanov deb kirsa demk u ishchi emas balki boshliq bo'ladi"
    if (
      lowerName === 'firdavs nematjanov' ||
      lowerName === 'firdavs' ||
      lowerName.includes('firdavs')
    ) {
      assignedRole = 'boshliq';
      matchedEmpId = 'emp-1';
    } else {
      // Check if matches an existing employee in roster
      const foundEmp = state.employees.find(
        (e) => e.name.toLowerCase() === lowerName || (employeeId && e.id === employeeId)
      );
      if (foundEmp) {
        matchedEmpId = foundEmp.id;
        assignedRole = foundEmp.isHead ? 'boshliq' : 'ishchi';
      }
    }

    const newUser: CurrentUser = {
      name: cleanName || (assignedRole === 'boshliq' ? 'Firdavs Nematjanov' : 'Mehmon Mijoz'),
      role: assignedRole,
      employeeId: matchedEmpId,
    };

    setCurrentUser(newUser);
    return newUser;
  };

  const logoutUser = () => {
    setIsAuthModalOpen(true);
  };

  // SWITCH INDUSTRY / NETWORK
  const switchIndustry = (industryKey: IndustryType) => {
    const template = industryTemplates[industryKey];
    if (!template) return;

    setState((prev) => ({
      ...prev,
      currentIndustry: industryKey,
      companyProfile: {
        ...prev.companyProfile,
        name: template.name,
        industry: template.industryTitle,
        description: template.description,
        workingHours: template.workingHours,
        phone: template.phone,
        address: template.address,
        website: template.website,
      },
      botSettings: {
        ...prev.botSettings,
        botName: template.botName,
        greetingMessage: template.greetingMessage,
        fallbackMessage: template.fallbackMessage,
      },
      knowledgeBase: {
        ...prev.knowledgeBase,
        faqs: template.faqs.map((f, i) => ({
          id: `faq-${industryKey}-${i + 1}`,
          question: f.question,
          answer: f.answer,
          category: f.category,
        })),
        freeTexts: template.freeTexts.map((ft, i) => ({
          id: `ft-${industryKey}-${i + 1}`,
          title: ft.title,
          category: ft.category,
          updatedAt: new Date().toISOString().split('T')[0],
          content: ft.content,
        })),
      },
    }));
  };

  // EMPLOYEES CRUD
  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...emp,
      id: 'emp-' + Date.now(),
    };
    setState((prev) => ({
      ...prev,
      employees: [...prev.employees, newEmp],
    }));
  };

  const updateEmployee = (id: string, emp: Partial<Employee>) => {
    setState((prev) => ({
      ...prev,
      employees: prev.employees.map((e) => (e.id === id ? { ...e, ...emp } : e)),
    }));
  };

  const deleteEmployee = (id: string) => {
    setState((prev) => ({
      ...prev,
      employees: prev.employees.filter((e) => e.id !== id),
    }));
  };

  // State mutators
  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    setState((prev) => ({
      ...prev,
      companyProfile: { ...prev.companyProfile, ...profile },
    }));
  };

  const updateBotSettings = (settings: Partial<BotSettings>) => {
    setState((prev) => ({
      ...prev,
      botSettings: { ...prev.botSettings, ...settings },
    }));
  };

  const addFaq = (faq: Omit<FAQItem, 'id'>) => {
    const newItem: FAQItem = {
      ...faq,
      id: 'faq-' + Date.now(),
    };
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        faqs: [newItem, ...prev.knowledgeBase.faqs],
      },
    }));
  };

  const editFaq = (id: string, faq: Partial<FAQItem>) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        faqs: prev.knowledgeBase.faqs.map((f) => (f.id === id ? { ...f, ...faq } : f)),
      },
    }));
  };

  const deleteFaq = (id: string) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        faqs: prev.knowledgeBase.faqs.filter((f) => f.id !== id),
      },
    }));
  };

  const addFreeText = (section: Omit<FreeTextSection, 'id' | 'updatedAt'>) => {
    const newSection: FreeTextSection = {
      ...section,
      id: 'ft-' + Date.now(),
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        freeTexts: [newSection, ...prev.knowledgeBase.freeTexts],
      },
    }));
  };

  const editFreeText = (id: string, section: Partial<FreeTextSection>) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        freeTexts: prev.knowledgeBase.freeTexts.map((item) =>
          item.id === id
            ? { ...item, ...section, updatedAt: new Date().toISOString().split('T')[0] }
            : item
        ),
      },
    }));
  };

  const deleteFreeText = (id: string) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        freeTexts: prev.knowledgeBase.freeTexts.filter((item) => item.id !== id),
      },
    }));
  };

  const addDocument = (doc: Omit<UploadedDoc, 'id' | 'uploadedAt'>) => {
    const newDoc: UploadedDoc = {
      ...doc,
      id: 'doc-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        documents: [newDoc, ...prev.knowledgeBase.documents],
      },
    }));
  };

  const deleteDocument = (id: string) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        documents: prev.knowledgeBase.documents.filter((d) => d.id !== id),
      },
    }));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => {
    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      timestamp: Date.now(),
      status: 'new',
    };
    setState((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    }));
  };

  const deleteLead = (id: string) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
    }));
  };

  const recordMessageFeedback = (_msgId: string, feedback: 'like' | 'dislike') => {
    setState((prev) => ({
      ...prev,
      likesCount: feedback === 'like' ? prev.likesCount + 1 : prev.likesCount,
      dislikesCount: feedback === 'dislike' ? prev.dislikesCount + 1 : prev.dislikesCount,
    }));
  };

  const recordUnansweredQuestion = (question: string) => {
    if (!question || question.trim().length < 3) return;
    setState((prev) => {
      const existing = prev.unansweredQuestions.find(
        (q) => q.question.toLowerCase().trim() === question.toLowerCase().trim()
      );
      if (existing) {
        return {
          ...prev,
          unansweredQuestions: prev.unansweredQuestions.map((q) =>
            q.id === existing.id ? { ...q, count: q.count + 1, timestamp: Date.now() } : q
          ),
        };
      }
      const newQuestion: UnansweredQuestion = {
        id: 'unans-' + Date.now(),
        question: question.trim(),
        timestamp: Date.now(),
        count: 1,
        addedToKB: false,
      };
      return {
        ...prev,
        unansweredQuestions: [newQuestion, ...prev.unansweredQuestions],
      };
    });
  };

  const markQuestionAnswered = (id: string) => {
    setState((prev) => ({
      ...prev,
      unansweredQuestions: prev.unansweredQuestions.map((q) =>
        q.id === id ? { ...q, addedToKB: true } : q
      ),
    }));
  };

  const incrementChatCount = () => {
    setState((prev) => ({
      ...prev,
      chatsCount: prev.chatsCount + 1,
    }));
  };

  const incrementMessageCount = () => {
    setState((prev) => ({
      ...prev,
      messagesCount: prev.messagesCount + 1,
    }));
  };

  const exportStateJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `askdesk_enterprise_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importStateJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.companyProfile && parsed.knowledgeBase && parsed.botSettings) {
        setState(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to import json:', e);
    }
    return false;
  };

  const resetToDemo = () => {
    setState(initialDemoState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        t,
        language,
        setLanguage,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        currentUser,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        switchIndustry,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        updateCompanyProfile,
        updateBotSettings,
        addFaq,
        editFaq,
        deleteFaq,
        addFreeText,
        editFreeText,
        deleteFreeText,
        addDocument,
        deleteDocument,
        addLead,
        updateLeadStatus,
        deleteLead,
        recordMessageFeedback,
        recordUnansweredQuestion,
        markQuestionAnswered,
        incrementChatCount,
        incrementMessageCount,
        exportStateJson,
        importStateJson,
        resetToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
