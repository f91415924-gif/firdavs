import { AppState, Employee, IndustryType } from '../types';

export const DEMO_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="black"/><path d="M28 35C28 35 28 62 48 62C68 62 68 35 68 35" stroke="white" stroke-width="6" stroke-linecap="round"/><path d="M68 42H75C78 42 80 44 80 47V49C80 52 78 54 75 54H66" stroke="white" stroke-width="5" stroke-linecap="round"/><path d="M24 72H72" stroke="white" stroke-width="6" stroke-linecap="round"/><path d="M38 22C38 22 41 26 38 29" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M48 20C48 20 51 25 48 29" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M58 22C58 22 61 26 58 29" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>`;

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Firdavs Nematjanov',
    roleTitle: 'Boshliq (CEO & Founder)',
    department: 'Rahbariyat & Boshqaruv (Executive Board)',
    email: 'firdavs@askdesk.uz',
    phone: '+998 90 000 00 01',
    status: 'active',
    isHead: true,
  },
  {
    id: 'emp-2',
    name: 'Alisher Zokirov',
    roleTitle: 'Bosh operatsion menejer (COO)',
    department: 'Operatsion boshqaruv bo\'limi',
    email: 'alisher.z@askdesk.uz',
    phone: '+998 90 123 45 67',
    status: 'active',
  },
  {
    id: 'emp-3',
    name: 'Malika Karimova',
    roleTitle: 'Katta qo\'llab-quvvatlash mutaxassisi (Support Lead)',
    department: 'Mijozlar bilan ishlash bo\'limi',
    email: 'malika.k@askdesk.uz',
    phone: '+998 93 234 56 78',
    status: 'on_duty',
  },
  {
    id: 'emp-4',
    name: 'Jasur Rahimov',
    roleTitle: 'Yetakchi texnik koordinatori (Tech Lead)',
    department: 'Texnologiyalar va IT ta\'minot',
    email: 'jasur.r@askdesk.uz',
    phone: '+998 97 345 67 89',
    status: 'on_duty',
  },
  {
    id: 'emp-5',
    name: 'Nigora Usmonova',
    roleTitle: 'Moliya va buxgalteriya bo\'limi boshlig\'i (CFO)',
    department: 'Moliya va audit',
    email: 'nigora.u@askdesk.uz',
    phone: '+998 94 456 78 90',
    status: 'active',
  },
  {
    id: 'emp-6',
    name: 'Dilshod Ergashev',
    roleTitle: 'Logistika va xizmat ko\'rsatish menejeri',
    department: 'Logistika va ta\'minot',
    email: 'dilshod.e@askdesk.uz',
    phone: '+998 91 567 89 01',
    status: 'leave',
  },
];

export interface IndustryTemplate {
  id: IndustryType;
  name: string;
  industryTitle: string;
  description: string;
  workingHours: string;
  phone: string;
  address: string;
  website: string;
  botName: string;
  greetingMessage: string;
  fallbackMessage: string;
  faqs: { question: string; answer: string; category: string }[];
  freeTexts: { title: string; content: string; category: 'prices' | 'delivery' | 'returns' | 'policies' | 'custom' }[];
}

export const industryTemplates: Record<IndustryType, IndustryTemplate> = {
  it: {
    id: 'it',
    name: 'NextGen IT Solutions',
    industryTitle: 'IT & Dasturiy ta\'minot xizmatlari',
    description: 'Boshqaruv tizimlari, mobil ilovalar, AI integratsiyalari va korporativ dasturlar ishlab chiqaruvchi yetakchi texnologik kompaniya.',
    workingHours: 'Dushanba - Juma: 09:00 - 18:00 (24/7 Monitoring)',
    phone: '+998 71 200 90 90',
    address: 'IT Park, Toshkent shahri, O\'zbekiston',
    website: 'https://nextgen-it.uz',
    botName: 'IT Support AI',
    greetingMessage: 'Assalomu alaykum! NextGen IT Solutions qo\'llab-quvvatlash xizmatiga xush kelibsiz. Dasturiy ta\'minot, serverlar yoki loyiha baholash bo\'yicha qanday yordam bera olaman?',
    fallbackMessage: 'Kechirasiz, ushbu texnik masala bo\'yicha kompaniyamiz bazasida ma\'lumot topilmadi. Iltimos, +998 71 200 90 90 raqamiga qo\'ng\'iroq qiling yoki "Mutaxassis bilan bog\'lanish" tugmasini bosing.',
    faqs: [
      {
        question: 'Dasturiy loyihani ishlab chiqish muddatlari va narxi qanday aniqlanadi?',
        answer: 'Loyiha narxi va muddati Texnik Topshiriq (TZ) asosida 2-3 ish kunida bepul baholanadi. MVP tayyorlash odatda 4 haftadan 8 haftagacha davom etadi.',
        category: 'pricing',
      },
      {
        question: 'Sizda texnik qo\'llab-quvvatlash (SLA) xizmati bormi?',
        answer: 'Ha, barcha mijozlarimiz uchun 24/7 monitoring va 99.9% uptime kafolatlangan SLA shartnomasi taqdim etiladi.',
        category: 'support',
      },
    ],
    freeTexts: [
      {
        title: 'Xizmatlar katalogi va tariflar',
        category: 'prices',
        content: `IT XIZMATLARI VA TAXMINIY NARXLAR:
- Korporativ veb-portal va CRM tizim: $2,500 dan boshlab
- iOS va Android mobil ilova: $4,000 dan boshlab
- Sun'iy intellekt (LLM) chatbot integratsiyasi: $1,200 dan boshlab
- Cloud infratuzilma va DevOps optimizatsiyasi: oyiga $500 dan`,
      },
    ],
  },

  logistics: {
    id: 'logistics',
    name: 'SilkRoad Express Cargo',
    industryTitle: 'Xalqaro va ichki logistika tarmog\'i',
    description: 'Xitoy, Turkiya, BAA va Yevropadan yuklarni O\'zbekiston bo\'ylab tezkor va xavfsiz yetkazib berish xizmati.',
    workingHours: 'Har kuni: 08:30 - 20:30',
    phone: '+998 71 205 33 44',
    address: 'Qo\'yliq logistika markazi, 12-ombor, Toshkent',
    website: 'https://silkroad-cargo.uz',
    botName: 'CargoBot',
    greetingMessage: 'Salom! SilkRoad Express Cargo virtual assistentiman. Yukni kuzatish, yetkazish narxi yoki bojxona rasmiylashtiruvi bo\'yicha savollaringiz bormi?',
    fallbackMessage: 'Bunday ma\'lumot logistika bazamizda topilmadi. Operatorlarimiz bilan bog\'lanish uchun +998 71 205 33 44 raqamiga murojaat qiling.',
    faqs: [
      {
        question: 'Xitoydan yuk qancha vaqtda yetib keladi?',
        answer: 'Avia-kargo orqali 5-8 kun, Avto/Temir yo\'l orqali 14-20 kun ichida Toshkent omboriga yetkazib beriladi.',
        category: 'delivery',
      },
    ],
    freeTexts: [
      {
        title: 'Tariflar va og\'irlik me\'yorlari',
        category: 'prices',
        content: `LOGISTIKA TARIFLARI:
- Avia (Guanchjou - Toshkent): $6.5 / kg
- Avto (Urumchi - Toshkent): $2.2 / kg
- Shahar ichida kurerlik yetkazish: 25 000 so'm`,
      },
    ],
  },

  retail: {
    id: 'retail',
    name: 'UrbanStyle Do\'konlar Tarmog\'i',
    industryTitle: 'Zamonaviy kiyim-kechak va e-commerce savdo tarmog\'i',
    description: 'Sifatli va qulay kiyimlar, aksessuarlar hamda butun O\'zbekiston bo\'ylab tezkor buyurtma xizmati.',
    workingHours: 'Dushanba - Yakshanba: 10:00 - 22:00',
    phone: '+998 71 207 77 88',
    address: 'Toshkent shahri, Chilonzor 1-mavze, 45-uy',
    website: 'https://urbanstyle.uz',
    botName: 'UrbanBot',
    greetingMessage: 'Xush kelibsiz! UrbanStyle do\'konlar tarmog\'iga xush kelibsiz. O\'lchamlar, chegirmalar va yangi kolleksiya bo\'yicha qanday yordam bera olaman?',
    fallbackMessage: 'Afsuski, ushbu mahsulot yoki ma\'lumot bo\'yicha aniq yozuv topilmadi. Do\'konimiz telefoniga qo\'ng\'iroq qiling yoki arizangizni qoldiring.',
    faqs: [
      {
        question: 'Mahsulotni qaytarish yoki almashtirish mumkinmi?',
        answer: 'Ha, xarid qilingan kiyimni kvitansiya va tegishli birkasi saqlangan holda 14 kun ichida bepul almashtirib beramiz.',
        category: 'returns',
      },
    ],
    freeTexts: [
      {
        title: 'Yetkazib berish va to\'lov shartlari',
        category: 'delivery',
        content: `BUYURTMA VA TO'LOV:
- 300 000 so'mdan yuqori buyurtmalarga shahar ichida yetkazib berish bepul.
- Click, Payme, Uzum Pay va tovar qabul qilinganda naqd to'lov qabul qilinadi.`,
      },
    ],
  },

  clinic: {
    id: 'clinic',
    name: 'Shifo Med Tibbiyot Markazi',
    industryTitle: 'Ko\'p tarmoqli xususiy klinika va diagnostika',
    description: 'Yuqori aniqlikdagi laboratoriya, MRT, UZI, kardiologiya, pediatriya va tajribali shifokorlar xizmati.',
    workingHours: 'Dushanba - Shanba: 08:00 - 20:00 (Qabulxona 24/7)',
    phone: '+998 71 209 11 03',
    address: 'Toshkent shahri, Yunusobod 4-mavze, 18-uy',
    website: 'https://shifomed.uz',
    botName: 'MedAssistent',
    greetingMessage: 'Assalomu alaykum! Shifo Med klinikasiga xush kelibsiz. Shifokor qabuli, tahlillar yoki narxlar bo\'yicha ma\'lumot kerakmi?',
    fallbackMessage: 'Ushbu tibbiy ma\'lumot ro\'yxatimizda mavjud emas. Shoshilinch savollar bo\'yicha registratura bilan bog\'laning: +998 71 209 11 03.',
    faqs: [
      {
        question: 'Shifokor qabuliga qanday yozilish mumkin?',
        answer: 'Qabulga oldindan telefon orqali yoki veb-saytimizda onlayn ro\'yxatdan o\'tish mumkin.',
        category: 'appointment',
      },
    ],
    freeTexts: [
      {
        title: 'Tibbiy xizmatlar va tahlillar narxi',
        category: 'prices',
        content: `KLINIKA XIZMATLARI:
- Umumiy qon tahlili: 45 000 so'm
- Terapevt / Pediatriya ko'rigi: 120 000 so'm
- UZI tekshiruvi (bitta a'zo): 90 000 so'm
- MRT tekshiruvi: 350 000 so'm`,
      },
    ],
  },

  education: {
    id: 'education',
    name: 'Everest Ta\'lim Akademiyasi',
    industryTitle: 'Xalqaro tillar, IT va Universitetga tayyorlov',
    description: 'IELTS, SAT, dasturlash va xorijiy universitetlarga grant yutish bo\'yicha yetakchi akademiya.',
    workingHours: 'Dushanba - Shanba: 08:30 - 20:30',
    phone: '+998 71 202 55 66',
    address: 'Oybek metrosi, Afrosiyob ko\'chasi, 8-bino',
    website: 'https://everest-academy.uz',
    botName: 'EverestBot',
    greetingMessage: 'Salom! Everest Akademiyasiga xush kelibsiz. Kurslar jadvali, IELTS tayyorlov va bepul sinov darsi haqida ma\'lumot berishim mumkin.',
    fallbackMessage: 'Ushbu kurs yoki guruh haqida ma\'lumot topilmadi. Qabul bo\'limi bilan bog\'lanish: +998 71 202 55 66.',
    faqs: [
      {
        question: 'Birinchi dars bepulmi?',
        answer: 'Ha, har qanday kursimizga yozilishdan avval 1-bepul sinov darsida qatnashishingiz mumkin.',
        category: 'courses',
      },
    ],
    freeTexts: [
      {
        title: 'Kurslar narxlari va davomiyligi',
        category: 'prices',
        content: `O'QUV KURSLARI:
- General English & IELTS Intensive: oyiga 650 000 so'm
- Frontend / Backend dasturlash: oyiga 850 000 so'm
- Bolalar uchun robototexnika: oyiga 550 000 so'm`,
      },
    ],
  },

  finance: {
    id: 'finance',
    name: 'Apex Capital & FinTech',
    industryTitle: 'Moliya, mikromoliya va investitsiya konsaltingi',
    description: 'Biznesni moliyalashtirish, faktoring, onlayn to\'lovlar va investitsion xizmatlar.',
    workingHours: 'Dushanba - Juma: 09:00 - 18:00',
    phone: '+998 71 204 88 00',
    address: 'Toshkent sh., Mirobod tumani, Nukus ko\'chasi 29',
    website: 'https://apexcapital.uz',
    botName: 'FinAdvisor',
    greetingMessage: 'Assalomu alaykum! Apex Capital moliyaviy assistentiman. Kredit shartlari, investitsiya va korporativ xizmatlar bo\'yicha qanday yordam bera olaman?',
    fallbackMessage: 'Moliyaviy shartnomalar bazasida bu haqda aniq ma\'lumot topilmadi. Moliya menejeri bilan bog\'laning: +998 71 204 88 00.',
    faqs: [
      {
        question: 'Biznes krediti uchun qanday hujjatlar talab etiladi?',
        answer: 'Kompaniya guvohnomasi, oxirgi 12 oylik aylanma hisoboti va garov ta\'minoti hujjatlari kerak bo\'ladi.',
        category: 'finance',
      },
    ],
    freeTexts: [
      {
        title: 'Moliyaviy xizmatlar stavkalari',
        category: 'prices',
        content: `TARIFLAR:
- Kichik biznes uchun mikrokredit: yillik 22% dan
- Faktoring xizmati: 1.5% - 2.5% komissiya
- Moliyaviy konsalting: bepul dastlabki audit`,
      },
    ],
  },

  cafe: {
    id: 'cafe',
    name: 'Demo Cafe & Roastery',
    industryTitle: 'Artisan specialty coffee, nonushtalar va pishiriqlar',
    description: 'Yangi qovurilgan maxsus qahvalar, tabiiy xamirdan pishiriqlar va kundalik mazali nonushtalar.',
    workingHours: 'Dushanba - Juma: 08:00 - 22:00 | Shanba - Yakshanba: 09:00 - 23:00',
    phone: '+998 71 200 44 88',
    address: 'Amir Temur shoh ko\'chasi, 42-uy, Toshkent',
    website: 'https://democafe.uz',
    botName: 'CafeBot',
    greetingMessage: 'Demo Cafe ga xush kelibsiz! ☕ Qahvalar, nonushta menyusi yoki yetkazib berish bo\'yicha qanday yordam bera olaman?',
    fallbackMessage: 'Demo Cafe bazasida bu haqda ma\'lumot topilmadi. +998 71 200 44 88 raqamiga qo\'ng\'iroq qiling yoki mutaxassis bilan bog\'lanish tugmasini bosing.',
    faqs: [
      {
        question: 'Ish vaqtingiz qanday?',
        answer: 'Dushanba - Juma: 08:00 dan 22:00 gacha, Shanba - Yakshanba: 09:00 dan 23:00 gacha.',
        category: 'hours',
      },
      {
        question: 'Yetkazib berish shartlari qanday?',
        answer: 'Har kuni 08:30 dan 21:30 gacha yetkazib beramiz. 120 000 so\'mdan yuqori buyurtmalarga bepul, aks holda 18 000 so\'m.',
        category: 'delivery',
      },
    ],
    freeTexts: [
      {
        title: 'Qahvalar va Nonushta Menyusi',
        category: 'prices',
        content: `QAHVALAR:
- Espresso: 22 000 so'm
- Kapuchino (220ml): 32 000 so'm
- Flat White: 34 000 so'm
- Avokado-tost: 65 000 so'm
- Fransuz krassani: 24 000 so'm`,
      },
    ],
  },

  custom: {
    id: 'custom',
    name: 'Mening Korporatsiyam',
    industryTitle: 'Erkin tarmoq / Foydalanuvchi tanlagan soha',
    description: 'Ushbu ilova foydalanuvchi xohlagan har qanday tashkilot, kompaniya yoki biznes tarmog\'iga to\'liq moslashadi.',
    workingHours: 'Har kuni: 09:00 - 21:00',
    phone: '+998 90 000 00 00',
    address: 'Toshkent shahri, Markaziy bino',
    website: 'https://enterprise.uz',
    botName: 'Universal AI Assist',
    greetingMessage: 'Assalomu alaykum! Tashkilotimizning sun\'iy intellekt xizmatiga xush kelibsiz. Qanday ma\'lumot kerak?',
    fallbackMessage: 'Ushbu masala bo\'yicha ma\'lumotlar bazamizda topilmadi. Iltimos, ma\'muriyatimiz bilan bog\'laning.',
    faqs: [
      {
        question: 'Xizmatlar bilan qayerda tanishish mumkin?',
        answer: 'Barcha xizmatlar va tartib-qoidalar kompaniyamizning rasmiy bilimlar bazasida keltirilgan.',
        category: 'general',
      },
    ],
    freeTexts: [
      {
        title: 'Kompaniya reglamenti va qoidalari',
        category: 'policies',
        content: `ASOSIY TARTIB-QOIDALAR:
- Xizmat ko'rsatish rasmiy shartnoma asosida amalga oshiriladi.
- Har bir mijoz va xodim uchun 24/7 aloqa kanallari ochiq.`,
      },
    ],
  },
};

export const initialDemoState: AppState = {
  companyProfile: {
    name: industryTemplates.it.name,
    industry: industryTemplates.it.industryTitle,
    description: industryTemplates.it.description,
    workingHours: industryTemplates.it.workingHours,
    phone: industryTemplates.it.phone,
    address: industryTemplates.it.address,
    website: industryTemplates.it.website,
    logo: DEMO_LOGO_SVG,
  },
  currentIndustry: 'it',
  knowledgeBase: {
    faqs: industryTemplates.it.faqs.map((f, i) => ({
      id: `faq-${i + 1}`,
      question: f.question,
      answer: f.answer,
      category: f.category,
    })),
    freeTexts: industryTemplates.it.freeTexts.map((ft, i) => ({
      id: `ft-${i + 1}`,
      title: ft.title,
      category: ft.category,
      updatedAt: '2026-10-23',
      content: ft.content,
    })),
    documents: [
      {
        id: 'doc-1',
        filename: 'nextgen_it_company_charter_2026.txt',
        size: 4200,
        extractedText: 'NextGen IT Solutions Corporate Guidelines: All customer technical incidents must be addressed under our enterprise SLA tier. Firdavs Nematjanov is Chief Executive Officer and Head of Operations.',
        uploadedAt: '2026-10-23',
      },
    ],
  },
  botSettings: {
    botName: industryTemplates.it.botName,
    greetingMessage: industryTemplates.it.greetingMessage,
    tone: 'friendly',
    fallbackMessage: industryTemplates.it.fallbackMessage,
  },
  employees: initialEmployees,
  leads: [
    {
      id: 'lead-1',
      name: 'Aziz Rakhimov',
      phone: '+998 90 123 45 67',
      email: 'aziz.r@example.com',
      message: 'Korxona uchun CRM tizimi va AI chatbot integratsiyasi bo\'yicha tijoriy taklif kerak.',
      timestamp: Date.now() - 3600 * 1000 * 14,
      status: 'contacted',
    },
    {
      id: 'lead-2',
      name: 'Elena Smirnova',
      phone: '+998 97 888 22 11',
      email: 'elena.s@example.com',
      message: 'Mobil ilovamizning iOS versiyasini yangilash va test qilish xizmati bo\'yicha bog\'laning.',
      timestamp: Date.now() - 3600 * 1000 * 28,
      status: 'new',
    },
  ],
  unansweredQuestions: [
    {
      id: 'unans-1',
      question: 'Dasturchilar bilan to\'g\'ridan-to\'g\'ri texnik intervyu tashkil qilsa bo\'ladimi?',
      timestamp: Date.now() - 3600 * 1000 * 18,
      count: 3,
      addedToKB: false,
    },
  ],
  chatsCount: 168,
  messagesCount: 612,
  likesCount: 112,
  dislikesCount: 5,
  dailyStats: [
    { date: 'Mon', chats: 22, messages: 84, satisfaction: 96 },
    { date: 'Tue', chats: 28, messages: 104, satisfaction: 95 },
    { date: 'Wed', chats: 31, messages: 118, satisfaction: 98 },
    { date: 'Thu', chats: 35, messages: 132, satisfaction: 94 },
    { date: 'Fri', chats: 42, messages: 160, satisfaction: 97 },
    { date: 'Sat', chats: 18, messages: 68, satisfaction: 96 },
    { date: 'Sun', chats: 14, messages: 52, satisfaction: 95 },
  ],
};
