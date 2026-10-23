import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  adminPanel: string;
  customerChat: string;
  help: string;
  lightMode: string;
  darkMode: string;
  language: string;
  exportData: string;
  importData: string;
  resetDemo: string;
  saveChanges: string;
  savedSuccessfully: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  close: string;
  search: string;

  // Roles & Identity
  roleBoshliq: string;
  roleIshchi: string;
  roleMijoz: string;
  enterYourName: string;
  firdavsBossNotice: string;
  staffDirectoryTitle: string;
  staffDirectoryDesc: string;
  selectIdentity: string;
  switchUser: string;
  currentRole: string;
  continueAsCustomer: string;
  selectFromStaff: string;
  bossBadge: string;
  staffBadge: string;
  customerBadge: string;
  department: string;
  position: string;
  statusActive: string;
  statusOnDuty: string;
  statusLeave: string;
  addEmployee: string;
  employeeName: string;
  tabStaff: string;

  // Industry & Network Selection
  chooseIndustry: string;
  customNetwork: string;
  industryIT: string;
  industryLogistics: string;
  industryRetail: string;
  industryClinic: string;
  industryEducation: string;
  industryFinance: string;
  industryCafe: string;
  networkDefinePrompt: string;
  applyNetwork: string;

  // Admin tabs
  tabProfile: string;
  tabKnowledge: string;
  tabBotSettings: string;
  tabAnalytics: string;

  // Profile Form
  companyName: string;
  companyDescription: string;
  workingHours: string;
  phone: string;
  address: string;
  website: string;
  companyLogo: string;
  uploadLogo: string;
  removeLogo: string;

  // Knowledge Base
  faqSectionTitle: string;
  faqSectionDesc: string;
  addFaq: string;
  editFaq: string;
  questionLabel: string;
  answerLabel: string;
  noFaqsFound: string;
  freeTextTitle: string;
  freeTextDesc: string;
  addSection: string;
  sectionTitle: string;
  sectionContent: string;
  sectionCategory: string;
  categoryPrices: string;
  categoryDelivery: string;
  categoryReturns: string;
  categoryPolicies: string;
  categoryCustom: string;
  docUploadTitle: string;
  docUploadDesc: string;
  dropFileHere: string;
  uploadDocBtn: string;
  extractingText: string;
  docsExtracted: string;

  // Bot Settings
  botSettingsTitle: string;
  botSettingsDesc: string;
  botName: string;
  greetingMessage: string;
  botTone: string;
  toneFormal: string;
  toneFriendly: string;
  toneShort: string;
  fallbackMessage: string;
  liveBotPreview: string;
  testYourBot: string;

  // Customer Chat
  chatPlaceholder: string;
  send: string;
  quickQuestions: string;
  talkToHuman: string;
  clearChat: string;
  voiceInput: string;
  listening: string;
  stopListening: string;
  speechNotSupported: string;
  uploadImage: string;
  removeImage: string;
  readAloud: string;
  copied: string;
  copyText: string;
  like: string;
  dislike: string;
  retry: string;
  online: string;
  typing: string;

  // Lead Modal
  leadModalTitle: string;
  leadModalDesc: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  leadMessage: string;
  submitLead: string;
  leadSuccess: string;

  // Analytics
  analyticsTitle: string;
  totalChats: string;
  totalMessages: string;
  satisfactionRate: string;
  unansweredCount: string;
  leadsCount: string;
  chatsTrend: string;
  leadsTableTitle: string;
  unansweredTableTitle: string;
  exportCsv: string;
  addToKnowledgeBase: string;
  statusNew: string;
  statusContacted: string;
  statusResolved: string;
  noLeadsYet: string;
  noUnansweredYet: string;
  added: string;

  // Docs Modal
  docsTitle: string;
  docsClose: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'AskDesk Enterprise',
    tagline: 'AI Corporate Support & Staff Grounding Platform',
    adminPanel: 'Admin Panel',
    customerChat: 'Customer Chat',
    help: 'Documentation',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language',
    exportData: 'Export JSON',
    importData: 'Import JSON',
    resetDemo: 'Reset Data',
    saveChanges: 'Save Changes',
    savedSuccessfully: 'Settings saved successfully',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    search: 'Search...',

    roleBoshliq: 'Head / CEO (Boshliq)',
    roleIshchi: 'Employee / Staff',
    roleMijoz: 'Client / Customer',
    enterYourName: 'Enter your full name',
    firdavsBossNotice: 'Welcome Firdavs Nematjanov! You are recognized as the Chief Executive (Boshliq) with full administrative authority.',
    staffDirectoryTitle: 'Staff Roster & Employees Directory',
    staffDirectoryDesc: 'Comprehensive directory of all corporate employees, departments, and active statuses.',
    selectIdentity: 'Identify Your Role & Sign In',
    switchUser: 'Switch User',
    currentRole: 'Active Status',
    continueAsCustomer: 'Continue as Client / Customer',
    selectFromStaff: 'Select from Staff Roster',
    bossBadge: 'Boshliq (CEO)',
    staffBadge: 'Staff',
    customerBadge: 'Client',
    department: 'Department',
    position: 'Position',
    statusActive: 'Active',
    statusOnDuty: 'On Duty',
    statusLeave: 'On Leave',
    addEmployee: 'Add Employee',
    employeeName: 'Full Name',
    tabStaff: 'Employees Roster',

    chooseIndustry: 'Select Industry / Network',
    customNetwork: 'Custom Network / My Chosen Industry',
    industryIT: 'IT & Software Engineering',
    industryLogistics: 'Logistics, Cargo & Delivery',
    industryRetail: 'Retail, E-Commerce & Chain Stores',
    industryClinic: 'Medical Center & Healthcare Clinic',
    industryEducation: 'Education, University & Academy',
    industryFinance: 'FinTech, Banking & Investment',
    industryCafe: 'Hospitality, Restaurant & Cafe',
    networkDefinePrompt: 'You determine the company and industry. Select a pre-configured template or customize freely.',
    applyNetwork: 'Apply Industry Setup',

    tabProfile: 'Company Profile',
    tabKnowledge: 'Knowledge Base',
    tabBotSettings: 'Bot Configuration',
    tabAnalytics: 'Analytics & Leads',

    companyName: 'Company Name',
    companyDescription: 'About the Company',
    workingHours: 'Working Hours',
    phone: 'Phone Number',
    address: 'Physical Address',
    website: 'Website URL',
    companyLogo: 'Company Logo',
    uploadLogo: 'Upload Logo',
    removeLogo: 'Remove',

    faqSectionTitle: 'Frequently Asked Questions (FAQ)',
    faqSectionDesc: 'The AI assistant prioritizes these verified question-and-answer pairs.',
    addFaq: 'Add FAQ Entry',
    editFaq: 'Edit FAQ Entry',
    questionLabel: 'Question',
    answerLabel: 'Verified Answer',
    noFaqsFound: 'No FAQ entries found. Add your first question above.',
    freeTextTitle: 'Policies, Pricing & Guides',
    freeTextDesc: 'Provide detailed free-form information on services, pricing, terms, and policies.',
    addSection: 'Add Policy Section',
    sectionTitle: 'Section Title',
    sectionContent: 'Section Content (Pricing, terms, policies)',
    sectionCategory: 'Category',
    categoryPrices: 'Prices & Services',
    categoryDelivery: 'Delivery & Logistics',
    categoryReturns: 'Refunds & Guarantees',
    categoryPolicies: 'Terms & Internal Policies',
    categoryCustom: 'Custom Information',
    docUploadTitle: 'Import Documents (TXT, Markdown, CSV)',
    docUploadDesc: 'Extract and import company documents straight into the knowledge base.',
    dropFileHere: 'Drag & drop text or document file here or click to browse',
    uploadDocBtn: 'Choose File',
    extractingText: 'Extracting document text...',
    docsExtracted: 'Document imported into Knowledge Base',

    botSettingsTitle: 'Bot Identity & Behavior',
    botSettingsDesc: 'Customize how your virtual support agent presents itself and replies.',
    botName: 'Bot Display Name',
    greetingMessage: 'Initial Greeting Message',
    botTone: 'Tone of Voice',
    toneFormal: 'Formal & Corporate',
    toneFriendly: 'Warm & Friendly',
    toneShort: 'Concise & Direct',
    fallbackMessage: 'Fallback Message (When Answer is Missing)',
    liveBotPreview: 'Live Interactive Preview',
    testYourBot: 'Test your bot with current settings',

    chatPlaceholder: 'Ask a question or request information...',
    send: 'Send',
    quickQuestions: 'Suggested Questions',
    talkToHuman: 'Talk to a Human',
    clearChat: 'Clear Chat',
    voiceInput: 'Voice Input',
    listening: 'Listening... speak clearly',
    stopListening: 'Stop listening',
    speechNotSupported: 'Speech recognition is not supported in this browser.',
    uploadImage: 'Upload Photo / Document',
    removeImage: 'Remove Photo',
    readAloud: 'Read Aloud',
    copied: 'Copied to clipboard',
    copyText: 'Copy text',
    like: 'Helpful',
    dislike: 'Not helpful',
    retry: 'Retry response',
    online: 'Online',
    typing: 'AskDesk is typing...',

    leadModalTitle: 'Connect with Our Team',
    leadModalDesc: 'Leave your contact details and message, and our representative will reach out promptly.',
    leadName: 'Full Name',
    leadPhone: 'Phone Number',
    leadEmail: 'Email Address (optional)',
    leadMessage: 'Your Message / Inquiry',
    submitLead: 'Submit Request',
    leadSuccess: 'Thank you! Your request has been forwarded to our team.',

    analyticsTitle: 'Performance & Operations',
    totalChats: 'Total Chats',
    totalMessages: 'Total Messages',
    satisfactionRate: 'Satisfaction Rate',
    unansweredCount: 'Unanswered Inquiries',
    leadsCount: 'Human Inquiries (Leads)',
    chatsTrend: 'Weekly Chat Activity',
    leadsTableTitle: 'Customer Callback Requests',
    unansweredTableTitle: 'Unanswered Customer Questions',
    exportCsv: 'Export CSV',
    addToKnowledgeBase: 'Add Answer to KB',
    statusNew: 'New',
    statusContacted: 'Contacted',
    statusResolved: 'Resolved',
    noLeadsYet: 'No human lead requests recorded yet.',
    noUnansweredYet: 'Great job! No unanswered queries detected.',
    added: 'Added to FAQ',

    docsTitle: 'AskDesk Architecture, Testing & Deployment Guide',
    docsClose: 'Close Documentation',
  },

  ru: {
    appName: 'AskDesk Корпоративный',
    tagline: 'ИИ-платформа поддержки клиентов и сотрудников компании',
    adminPanel: 'Панель управления',
    customerChat: 'Чат с клиентом',
    help: 'Документация',
    lightMode: 'Светлая тема',
    darkMode: 'Тёмная тема',
    language: 'Язык',
    exportData: 'Экспорт JSON',
    importData: 'Импорт JSON',
    resetDemo: 'Сбросить данные',
    saveChanges: 'Сохранить изменения',
    savedSuccessfully: 'Настройки успешно сохранены',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Изменить',
    add: 'Добавить',
    close: 'Закрыть',
    search: 'Поиск...',

    roleBoshliq: 'Руководитель / CEO (Бошлиқ)',
    roleIshchi: 'Сотрудник компании',
    roleMijoz: 'Клиент / Пользователь',
    enterYourName: 'Введите ваше имя и фамилию',
    firdavsBossNotice: 'Здравствуйте, Фирдавс Нематжанов! Вы авторизованы как руководитель (Бошлиқ / CEO) с полным доступом ко всей системе.',
    staffDirectoryTitle: 'Табель всех сотрудников компании',
    staffDirectoryDesc: 'Полный реестр сотрудников, отделов, должностей и текущих смен.',
    selectIdentity: 'Вход и выбор статуса',
    switchUser: 'Сменить пользователя',
    currentRole: 'Текущий статус',
    continueAsCustomer: 'Войти как клиент компании',
    selectFromStaff: 'Выбрать из табеля сотрудников',
    bossBadge: 'Бошлиқ (CEO)',
    staffBadge: 'Сотрудник',
    customerBadge: 'Клиент',
    department: 'Отдел',
    position: 'Должность',
    statusActive: 'Активен',
    statusOnDuty: 'На смене',
    statusLeave: 'В отпуске',
    addEmployee: 'Добавить сотрудника',
    employeeName: 'ФИО сотрудника',
    tabStaff: 'Табель сотрудников',

    chooseIndustry: 'Выбор сферы и отрасли компании',
    customNetwork: 'Своя отрасль / Любое направление',
    industryIT: 'IT и разработка ПО',
    industryLogistics: 'Логистика, доставка и карго',
    industryRetail: 'Ритейл и сеть магазинов',
    industryClinic: 'Медицинский центр и клиника',
    industryEducation: 'Образовательный центр и академия',
    industryFinance: 'Финтех и банковские сервисы',
    industryCafe: 'Ресторанный бизнес и кафе',
    networkDefinePrompt: 'Вы сами определяете отрасль. Выберите готовый шаблон или настройте индивидуально.',
    applyNetwork: 'Применить отрасль',

    tabProfile: 'Профиль компании',
    tabKnowledge: 'База знаний',
    tabBotSettings: 'Настройки бота',
    tabAnalytics: 'Аналитика и заявки',

    companyName: 'Название компании',
    companyDescription: 'Описание компании',
    workingHours: 'Режим работы',
    phone: 'Номер телефона',
    address: 'Фактический адрес',
    website: 'Веб-сайт',
    companyLogo: 'Логотип компании',
    uploadLogo: 'Загрузить логотип',
    removeLogo: 'Удалить',

    faqSectionTitle: 'Часто задаваемые вопросы (FAQ)',
    faqSectionDesc: 'ИИ-консультант в первую очередь использует эти проверенные пары вопрос-ответ.',
    addFaq: 'Добавить вопрос в FAQ',
    editFaq: 'Редактировать FAQ',
    questionLabel: 'Вопрос клиента',
    answerLabel: 'Официальный ответ',
    noFaqsFound: 'Записи FAQ пока отсутствуют. Добавьте первый вопрос.',
    freeTextTitle: 'Прайс-листы, доставка и регламенты',
    freeTextDesc: 'Подробная информация о ценах, услугах, сроках доставки и условиях возврата.',
    addSection: 'Добавить раздел регламента',
    sectionTitle: 'Заголовок раздела',
    sectionContent: 'Содержимое (цены, условия, правила)',
    sectionCategory: 'Категория',
    categoryPrices: 'Цены и услуги',
    categoryDelivery: 'Условия доставки',
    categoryReturns: 'Возврат и гарантия',
    categoryPolicies: 'Регламенты и правила',
    categoryCustom: 'Дополнительные данные',
    docUploadTitle: 'Импорт документов (TXT, Markdown, CSV)',
    docUploadDesc: 'Извлечение текста из файлов компании и мгновенное добавление в базу знаний.',
    dropFileHere: 'Перетащите файл документа сюда или выберите на диске',
    uploadDocBtn: 'Выбрать файл',
    extractingText: 'Извлечение текста...',
    docsExtracted: 'Документ успешно добавлен в базу знаний',

    botSettingsTitle: 'Личность и поведение бота',
    botSettingsDesc: 'Настройте имя виртуального ассистента, приветствие и тональность ответов.',
    botName: 'Отображаемое имя бота',
    greetingMessage: 'Приветственное сообщение',
    botTone: 'Тональность общения',
    toneFormal: 'Официальный и деловой',
    toneFriendly: 'Тёплый и дружелюбный',
    toneShort: 'Краткий и по делу',
    fallbackMessage: 'Сообщение при отсутствии ответа в базе',
    liveBotPreview: 'Интерактивный предпросмотр',
    testYourBot: 'Протестируйте бота с текущими настройками',

    chatPlaceholder: 'Задайте вопрос или уточните информацию...',
    send: 'Отправить',
    quickQuestions: 'Популярные вопросы',
    talkToHuman: 'Связаться со специалистом',
    clearChat: 'Очистить чат',
    voiceInput: 'Голосовой ввод',
    listening: 'Слушаю... говорите',
    stopListening: 'Остановить запись',
    speechNotSupported: 'Распознавание речи не поддерживается в этом браузере.',
    uploadImage: 'Прикрепить фото / документ',
    removeImage: 'Удалить фото',
    readAloud: 'Озвучить ответ',
    copied: 'Скопировано в буфер',
    copyText: 'Скопировать текст',
    like: 'Полезно',
    dislike: 'Не помогло',
    retry: 'Повторить запрос',
    online: 'В сети',
    typing: 'AskDesk печатает ответ...',

    leadModalTitle: 'Связь со специалистом',
    leadModalDesc: 'Оставьте ваши контактные данные, и наш менеджер оперативно свяжется с вами.',
    leadName: 'Ваше имя',
    leadPhone: 'Номер телефона',
    leadEmail: 'Email (необязательно)',
    leadMessage: 'Ваш вопрос или комментарий',
    submitLead: 'Отправить заявку',
    leadSuccess: 'Спасибо! Ваша заявка успешно передана операторам компании.',

    analyticsTitle: 'Показатели эффективности',
    totalChats: 'Всего диалогов',
    totalMessages: 'Всего сообщений',
    satisfactionRate: 'Индекс удовлетворенности',
    unansweredCount: 'Ненайденных ответов',
    leadsCount: 'Заявок оператору',
    chatsTrend: 'Активность диалогов за неделю',
    leadsTableTitle: 'Заявки на обратный звонок',
    unansweredTableTitle: 'Вопросы без ответа в базе',
    exportCsv: 'Экспорт в CSV',
    addToKnowledgeBase: 'Добавить ответ в FAQ',
    statusNew: 'Новая',
    statusContacted: 'В обработке',
    statusResolved: 'Решена',
    noLeadsYet: 'Заявок от клиентов пока нет.',
    noUnansweredYet: 'Отлично! Вопросов без ответа не зафиксировано.',
    added: 'Добавлено в FAQ',

    docsTitle: 'Руководство по архитектуре, тестированию и развертыванию AskDesk',
    docsClose: 'Закрыть документацию',
  },

  'uz-latn': {
    appName: 'AskDesk Korporativ',
    tagline: 'Kompaniya ma\'lumotlariga asoslangan AI mijoz va xodimlarni qo\'llab-quvvatlash tizimi',
    adminPanel: 'Boshqaruv paneli',
    customerChat: 'Mijozlar chati',
    help: 'Hujjatlar',
    lightMode: 'Yorug\' rejim',
    darkMode: 'Qorong\'i rejim',
    language: 'Til',
    exportData: 'JSON eksport',
    importData: 'JSON import',
    resetDemo: 'Demoga qaytarish',
    saveChanges: 'Saqlash',
    savedSuccessfully: 'Sozlamalar muvaffaqiyatli saqlandi',
    cancel: 'Bekor qilish',
    delete: 'O\'chirish',
    edit: 'Tahrirlash',
    add: 'Qo\'shish',
    close: 'Yopish',
    search: 'Qidirish...',

    roleBoshliq: 'Boshliq (Rahbar / CEO)',
    roleIshchi: 'Kompaniya ishchisi / Xodim',
    roleMijoz: 'Oddiy mijoz / Foydalanuvchi',
    enterYourName: 'Ism va familiyangizni kiriting',
    firdavsBossNotice: 'Xush kelibsiz, Firdavs Nematjanov! Siz tizimga boshliq (CEO / Owner) maqomida kirdingiz va barcha boshqaruv huquqiga egasiz.',
    staffDirectoryTitle: 'Barcha ishchilar tablosi',
    staffDirectoryDesc: 'Kompaniyadagi barcha ishchilar ro\'yxati, lavozimi, bo\'limi va navbatchilik holati.',
    selectIdentity: 'Tizimga kirish va identifikatsiya',
    switchUser: 'Foydalanuvchini almashtirish',
    currentRole: 'Joriy maqom',
    continueAsCustomer: 'Oddiy mijoz sifatida kirish',
    selectFromStaff: 'Ishchilar tablosidan tanlash',
    bossBadge: 'Boshliq (CEO)',
    staffBadge: 'Xodim',
    customerBadge: 'Mijoz',
    department: 'Bo\'lim',
    position: 'Lavozim',
    statusActive: 'Faol',
    statusOnDuty: 'Navbatchilikda',
    statusLeave: 'Ta\'tilda',
    addEmployee: 'Yangi xodim qo\'shish',
    employeeName: 'Xodimning to\'liq ismi',
    tabStaff: 'Ishchilar tablosi',

    chooseIndustry: 'Kompaniya tarmog\'ini tanlash',
    customNetwork: 'Men aytgan tarmoq / Erkin soha',
    industryIT: 'IT va Dasturiy ta\'minot',
    industryLogistics: 'Logistika va Yuk tashish xizmati',
    industryRetail: 'Savdo va Do\'konlar tarmog\'i',
    industryClinic: 'Tibbiyot va Klinika xizmati',
    industryEducation: 'Ta\'lim markazi va Akademiya',
    industryFinance: 'FinTex va Bank xizmatlari',
    industryCafe: 'Restoran va Kafe tarmog\'i',
    networkDefinePrompt: 'Ilova aynan qaysi tarmoqqa tegishli ekanini o\'zingiz belgilaysiz. Tayyor andozani tanlang yoki o\'zingiz xohlagancha sozlang.',
    applyNetwork: 'Tarmoqni qo\'llash',

    tabProfile: 'Kompaniya profili',
    tabKnowledge: 'Bilimlar bazasi',
    tabBotSettings: 'Bot sozlamalari',
    tabAnalytics: 'Tahlil va arizalar',

    companyName: 'Kompaniya nomi',
    companyDescription: 'Kompaniya tavsifi',
    workingHours: 'Ish tartibi (vaqti)',
    phone: 'Telefon raqam',
    address: 'Manzil',
    website: 'Veb-sayt',
    companyLogo: 'Kompaniya logotipi',
    uploadLogo: 'Logotip yuklash',
    removeLogo: 'O\'chirish',

    faqSectionTitle: 'Ko\'p beriladigan savollar (FAQ)',
    faqSectionDesc: 'AI yordamchisi birinchi navbatda ushbu tasdiqlangan savol-javoblardan foydalanadi.',
    addFaq: 'Savol qo\'shish',
    editFaq: 'Savolni tahrirlash',
    questionLabel: 'Mijoz savoli',
    answerLabel: 'Tasdiqlangan javob',
    noFaqsFound: 'Hozircha savollar mavjud emas. Yuqorida yangi savol qo\'shing.',
    freeTextTitle: 'Narxlar, xizmatlar va qoidalar',
    freeTextDesc: 'Yetkazib berish shartlari, narxlar jadvali, xizmatlar va qaytarish tartibi.',
    addSection: 'Qoida bo\'limi qo\'shish',
    sectionTitle: 'Bo\'lim sarlavhasi',
    sectionContent: 'Tarkibi (narxlar, qoidalar, shartlar)',
    sectionCategory: 'Kategoriya',
    categoryPrices: 'Narxlar va xizmatlar',
    categoryDelivery: 'Yetkazib berish va logistika',
    categoryReturns: 'Kafolat va qaytarish',
    categoryPolicies: 'Nizom va qoidalar',
    categoryCustom: 'Qo\'shimcha ma\'lumot',
    docUploadTitle: 'Hujjatlarni import qilish (TXT, Markdown, CSV)',
    docUploadDesc: 'Matnli fayllardan ma\'lumotlarni ajratib olib bilimlar bazasiga qo\'shish.',
    dropFileHere: 'Faylni bu yerga tortib olib keling yoki tanlang',
    uploadDocBtn: 'Fayl tanlash',
    extractingText: 'Matn ajratilmoqda...',
    docsExtracted: 'Hujjat muvaffaqiyatli bilimlar bazasiga qo\'shildi',

    botSettingsTitle: 'Bot shaxsi va xatti-harakati',
    botSettingsDesc: 'Virtual yordamchining ismi, salomlashish matni va muloqot ohangini sozlang.',
    botName: 'Bot ko\'rinadigan ismi',
    greetingMessage: 'Dastlabki salomlashish xabari',
    botTone: 'Muloqot ohangi',
    toneFormal: 'Rasmiy va ishbilarmon',
    toneFriendly: 'Samimiy va do\'stona',
    toneShort: 'Qisqa va aniq',
    fallbackMessage: 'Javob topilmaganda beriladigan xabar',
    liveBotPreview: 'Jonli sinov paneli',
    testYourBot: 'Joriy sozlamalar bilan botni sinab ko\'ring',

    chatPlaceholder: 'Savolingizni yozing yoki ma\'lumot so\'rang...',
    send: 'Yuborish',
    quickQuestions: 'Ommabop savollar',
    talkToHuman: 'Mutaxassis bilan bog\'lanish',
    clearChat: 'Chatni tozalash',
    voiceInput: 'Ovozli kiritish',
    listening: 'Tinglanmoqda... gapiring',
    stopListening: 'Yozishni to\'xtatish',
    speechNotSupported: 'Ushbu brauzerda ovozni aniqlash qo\'llab-quvvatlanmaydi.',
    uploadImage: 'Rasm / Hujjat biriktirish',
    removeImage: 'Rasmni o\'chirish',
    readAloud: 'Ovoz bilan o\'qish',
    copied: 'Nusxalandi',
    copyText: 'Matnni nusxalash',
    like: 'Foydali',
    dislike: 'Yordam bermadi',
    retry: 'Qayta urinish',
    online: 'Tarmoqda',
    typing: 'AskDesk javob yozmoqda...',

    leadModalTitle: 'Mutaxassis bilan bog\'lanish',
    leadModalDesc: 'Aloqa ma\'lumotlaringizni qoldiring, xodimlarimiz tez orada siz bilan bog\'lanishadi.',
    leadName: 'Ismingiz',
    leadPhone: 'Telefon raqam',
    leadEmail: 'Email (ixtiyoriy)',
    leadMessage: 'Savol yoki xabaringiz',
    submitLead: 'Arizani yuborish',
    leadSuccess: 'Rahmat! Arizangiz mutaxassislarimizga yetkazildi.',

    analyticsTitle: 'Samaradorlik ko\'rsatkichlari',
    totalChats: 'Jami suhbatlar',
    totalMessages: 'Jami xabarlar',
    satisfactionRate: 'Mamnunlik darajasi',
    unansweredCount: 'Topilmagan savollar',
    leadsCount: 'Mutaxassisga arizalar',
    chatsTrend: 'Haftalik suhbatlar faolligi',
    leadsTableTitle: 'Qayta qo\'ng\'iroq arizalari',
    unansweredTableTitle: 'Javobsiz qolgan savollar',
    exportCsv: 'CSV eksport',
    addToKnowledgeBase: 'FAQ ga javob qo\'shish',
    statusNew: 'Yangi',
    statusContacted: 'Jarayonda',
    statusResolved: 'Hal etildi',
    noLeadsYet: 'Hozircha mijoz arizalari mavjud emas.',
    noUnansweredYet: 'Ajoyib! Javobsiz savollar aniqlanmadi.',
    added: 'FAQ ga qo\'shildi',

    docsTitle: 'AskDesk arxitekturasi, sinov va joylashtirish qo\'llanmasi',
    docsClose: 'Hujjatlarni yopish',
  },

  'uz-cyrl': {
    appName: 'AskDesk Корпоратив',
    tagline: 'Компания маълумотларига асосланган AI мижоз ва ходимларни қўллаб-қувватлаш тизими',
    adminPanel: 'Бошқарув панели',
    customerChat: 'Мижозлар чати',
    help: 'Ҳужжатлар',
    lightMode: 'Ёруғ режим',
    darkMode: 'Қоронғи режим',
    language: 'Тил',
    exportData: 'JSON экспорт',
    importData: 'JSON импорт',
    resetDemo: 'Демога қайтариш',
    saveChanges: 'Сақлаш',
    savedSuccessfully: 'Созламалар муваффақиятли сақланди',
    cancel: 'Бекор қилиш',
    delete: 'Ўчириш',
    edit: 'Таҳрирлаш',
    add: 'Қўшиш',
    close: 'Ёпиш',
    search: 'Қидириш...',

    roleBoshliq: 'Бошлиқ (Раҳбар / CEO)',
    roleIshchi: 'Компания ишчиси / Ходим',
    roleMijoz: 'Оддий мижоз / Фойдаланувчи',
    enterYourName: 'Исм ва фамилиянгизни киритинг',
    firdavsBossNotice: 'Хуш келибсиз, Фирдавс Нематжанов! Сиз тизимга бошлиқ (CEO / Owner) мақомида кирдингиз ва барча бошқарув ҳуқуқига эгасиз.',
    staffDirectoryTitle: 'Барча ишчилар таблоси',
    staffDirectoryDesc: 'Компаниядаги барча ишчилар рўйхати, лавозими, бўлими ва навбатчилик ҳолати.',
    selectIdentity: 'Тизимга кириш ва идентификация',
    switchUser: 'Фойдаланувчини алмаштириш',
    currentRole: 'Жорий мақом',
    continueAsCustomer: 'Оддий мижоз сифатида кириш',
    selectFromStaff: 'Ишчилар таблосидан танлаш',
    bossBadge: 'Бошлиқ (CEO)',
    staffBadge: 'Ходим',
    customerBadge: 'Мижоз',
    department: 'Бўлим',
    position: 'Лавозим',
    statusActive: 'Фаол',
    statusOnDuty: 'Навбатчиликда',
    statusLeave: 'Таътилда',
    addEmployee: 'Янги ходим қўшиш',
    employeeName: 'Ходимнинг тўлиқ исми',
    tabStaff: 'Ишчилар таблоси',

    chooseIndustry: 'Компания тармоғини танлаш',
    customNetwork: 'Мен айтган тармоқ / Эркин соҳа',
    industryIT: 'IT ва Дастурий таъминот',
    industryLogistics: 'Логистика ва Юк ташиш хизмати',
    industryRetail: 'Савдо ва Дўконлар тармоғи',
    industryClinic: 'Тиббиёт ва Клиника хизмати',
    industryEducation: 'Таълим маркази ва Академия',
    industryFinance: 'ФинТех ва Банк хизматлари',
    industryCafe: 'Ресторан ва Кафе тармоғи',
    networkDefinePrompt: 'Илова айнан қайси тармоққа тегишли эканини ўзингиз белгилайсиз. Тайёр андозани танланг ёки ўзингиз хоҳлаганча созланг.',
    applyNetwork: 'Тармоқни қўллаш',

    tabProfile: 'Компания профили',
    tabKnowledge: 'Билимлар базаси',
    tabBotSettings: 'Бот созламалари',
    tabAnalytics: 'Таҳлил ва аризалар',

    companyName: 'Компания номи',
    companyDescription: 'Компания тавсифи',
    workingHours: 'Иш тартиби (вақти)',
    phone: 'Телефон рақам',
    address: 'Манзил',
    website: 'Веб-сайт',
    companyLogo: 'Компания логотипи',
    uploadLogo: 'Логотип юклаш',
    removeLogo: 'Ўчириш',

    faqSectionTitle: 'Кўп бериладиган саволлар (FAQ)',
    faqSectionDesc: 'AI ёрдамчиси биринчи навбатда ушбу тасдиқланган савол-жавоблардан фойдаланади.',
    addFaq: 'Савол қўшиш',
    editFaq: 'Саволни таҳрирлаш',
    questionLabel: 'Мижоз саволи',
    answerLabel: 'Тасдиқланган жавоб',
    noFaqsFound: 'Ҳозирча саволлар мавжуд эмас. Юқорида янги савол қўшинг.',
    freeTextTitle: 'Нархлар, хизматлар ва қоидалар',
    freeTextDesc: 'Етказиб бериш шартлари, нархлар жадвали, хизматлар ва қайтариш тартиби.',
    addSection: 'Қоида бўлими қўшиш',
    sectionTitle: 'Бўлим сарлавҳаси',
    sectionContent: 'Таркиби (нархлар, қоидалар, шартлар)',
    sectionCategory: 'Категория',
    categoryPrices: 'Нархлар ва хизматлар',
    categoryDelivery: 'Етказиб бериш ва логистика',
    categoryReturns: 'Кафолат ва қайтариш',
    categoryPolicies: 'Низом ва қоидалар',
    categoryCustom: 'Қўшимча маълумот',
    docUploadTitle: 'Ҳужжатларни импорт қилиш (TXT, Markdown, CSV)',
    docUploadDesc: 'Матнли файллардан маълумотларни ажратиб олиб билимлар базасига қўшиш.',
    dropFileHere: 'Файлни бу ерга тортиб олиб келинг ёки танланг',
    uploadDocBtn: 'Файл танлаш',
    extractingText: 'Матн ажратилмоқда...',
    docsExtracted: 'Ҳужжат муваффақиятли билимлар базасига қўшилди',

    botSettingsTitle: 'Бот шахси ва хатти-ҳаракати',
    botSettingsDesc: 'Виртуал ёрдамчининг исми, саломлашиш матни ва мулоқот оҳангини созланг.',
    botName: 'Бот кўринадиган исми',
    greetingMessage: 'Дастлабки саломлашиш хабари',
    botTone: 'Мулоқот оҳанги',
    toneFormal: 'Расмий ва ишбилармон',
    toneFriendly: 'Самимий ва дўстона',
    toneShort: 'Қисқа ва аниқ',
    fallbackMessage: 'Жавоб топилмаганда бериладиган хабар',
    liveBotPreview: 'Жонли синов панели',
    testYourBot: 'Жорий созламалар билан ботни синаб кўринг',

    chatPlaceholder: 'Саволингизни ёзинг ёки маълумот сўранг...',
    send: 'Юбориш',
    quickQuestions: 'Оммабоп саволлар',
    talkToHuman: 'Мутахассис билан боғланиш',
    clearChat: 'Чатни тозалаш',
    voiceInput: 'Овозли киритиш',
    listening: 'Тингланмоқда... гапиринг',
    stopListening: 'Ёзишни тўхтатиш',
    speechNotSupported: 'Ушбу браузерда овозни аниқлаш қўллаб-қувватланмайди.',
    uploadImage: 'Расм / Ҳужжат бириктириш',
    removeImage: 'Расмни ўчириш',
    readAloud: 'Овоз билан ўқиш',
    copied: 'Нусхаланди',
    copyText: 'Матнни нусхалаш',
    like: 'Фойдали',
    dislike: 'Ёрдам бермади',
    retry: 'Қайта уриниш',
    online: 'Тармоқда',
    typing: 'AskDesk жавоб ёзмоқда...',

    leadModalTitle: 'Мутахассис билан боғланиш',
    leadModalDesc: 'Алоқа маълумотларингизни қолдиринг, ходимларимиз тез орада сиз билан боғланишади.',
    leadName: 'Исмингиз',
    leadPhone: 'Телефон рақам',
    leadEmail: 'Email (ихтиёрий)',
    leadMessage: 'Савол ёки хабарингиз',
    submitLead: 'Аризани юбориш',
    leadSuccess: 'Раҳмат! Аризангиз мутахассисларимизга етказилди.',

    analyticsTitle: 'Самарадорлик кўрсаткичлари',
    totalChats: 'Жами суҳбатлар',
    totalMessages: 'Жами хабарлар',
    satisfactionRate: 'Мамнунлик даражаси',
    unansweredCount: 'Топилмаган саволлар',
    leadsCount: 'Мутахассисга аризалар',
    chatsTrend: 'Ҳафталик суҳбатлар фаоллиги',
    leadsTableTitle: 'Қайта қўнғироқ аризалари',
    unansweredTableTitle: 'Жавобсиз қолган саволлар',
    exportCsv: 'CSV экспорт',
    addToKnowledgeBase: 'FAQ га жавоб қўшиш',
    statusNew: 'Янги',
    statusContacted: 'Жараёнда',
    statusResolved: 'Ҳал этилди',
    noLeadsYet: 'Ҳозирча мижоз аризалари мавжуд эмас.',
    noUnansweredYet: 'Ажойиб! Жавобсиз саволлар аниқланмади.',
    added: 'FAQ га қўшилди',

    docsTitle: 'AskDesk архитектураси, синов ва жойлаштириш қўлланмаси',
    docsClose: 'Ҳужжатларни ёпиш',
  },
};
