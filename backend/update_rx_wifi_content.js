/**
 * Run with: node update_rx_wifi_content.js
 * Updates DESi Utopic RX — WiFi Bridge Edition with rich content sections.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const gallery = [
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-196-71-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-188-71-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-221-71-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-193-71-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-189-71-K.png",
];

const quickFeatures = [
  {
    icon: "⚡",
    label: { en: "QUICK INSTALL", ar: "تركيب سريع" },
    sub: {
      en: "4 screws, no drilling, no cylinder change. Done in minutes.",
      ar: "4 براغي، بدون حفر، بدون تغيير الأسطوانة. جاهز في دقائق.",
    },
  },
  {
    icon: "🔑",
    label: { en: "KEY COMPATIBLE", ar: "متوافق مع المفتاح" },
    sub: {
      en: "Use your existing key anytime, even when a key is inside.",
      ar: "استخدم مفتاحك الحالي في أي وقت، حتى لو كان المفتاح في الداخل.",
    },
  },
  {
    icon: "🔋",
    label: { en: "6 MONTH BATTERY", ar: "بطارية 6 أشهر" },
    sub: {
      en: "Up to 6 months on a single charge in energy saving mode.",
      ar: "حتى 6 أشهر على شحنة واحدة في وضع توفير الطاقة.",
    },
  },
  {
    icon: "🎙",
    label: { en: "SIRI / ALEXA", ar: "Siri / Alexa" },
    sub: {
      en: "Control your door with voice commands.",
      ar: "تحكّم ببابك بالأوامر الصوتية.",
    },
  },
];

const announcementBar = {
  en: "🌐 BUNDLE — Utopic RX Smart Lock + DESi Smart Bridge. Control your door remotely via internet. Google Home, Amazon Alexa & Home Assistant ready.",
  ar: "🌐 باقة — قفل Utopic RX الذكي + جسر DESi Smart. تحكّم في بابك عن بُعد عبر الإنترنت. متوافق مع Google Home وAmazon Alexa وHome Assistant.",
};

const contentSections = [
  // 1. INSTALLATION — full-width text + banner image below
  {
    type: "text-banner",
    tag: { en: "INSTALLATION", ar: "التركيب" },
    heading: {
      en: "Install Without Changing Your Existing Cylinder",
      ar: "ثبّته دون تغيير أسطوانتك الحالية",
    },
    text: {
      en: "Install by simply tightening 4 screws — no lock replacement, no key cutting required. Thanks to the patented feature exclusive to the Utopic RX series, you can still access your door from outside using your key at any time, eliminating the need for a panic cylinder.",
      ar: "ثبّته بشدّ 4 براغي فقط — دون تغيير القفل أو قطع المفاتيح. بفضل الميزة المسجّلة الحصرية لسلسلة Utopic RX، يمكنك دائماً الدخول من الخارج بمفتاحك في أي وقت.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rxbanner1.png",
  },
  // 2. BIOMETRIC & PIN — image left, text right
  {
    type: "image-text",
    tag: { en: "BIOMETRIC & PIN", ar: "بيومتري ورقم سري" },
    heading: {
      en: "Open with Fingerprint or Password",
      ar: "افتح ببصمة الإصبع أو كلمة المرور",
    },
    text: {
      en: "Lock or unlock your door by scanning your fingerprint or entering your PIN code.",
      ar: "أقفل بابك أو افتحه عبر مسح بصمة إصبعك أو إدخال رقمك السري.",
    },
    note: {
      en: "Fingerprint reader sold separately.",
      ar: "قارئ البصمة يُباع بشكل منفصل.",
    },
    image:
      "https://endesi.tsoft.biz/Data/EditorFiles/whatsapp-gorsel-2024-12-18-saat-105427-bdb8ccf8.jpg",
  },
  // 3. E-KEY & USER INVITE — text left, image right
  {
    type: "text-image",
    tag: { en: "E-KEY & USER INVITE", ar: "مفتاح إلكتروني ودعوة المستخدمين" },
    heading: {
      en: "Invite Users with the Smart Bridge",
      ar: "ادعُ المستخدمين عبر الجسر الذكي",
    },
    text: {
      en: "Using the included DESi Smart Bridge, invite users via email and grant access permissions on specific days or hours. Manage or modify permissions anytime, from anywhere.\n\nYou can also create one-time e-keys through the app and share them so visitors can open your door using the DESi Smart app on their phones — no internet required to generate codes.",
      ar: "باستخدام جسر DESi Smart المرفق، ادعُ المستخدمين عبر البريد الإلكتروني ومنح صلاحيات الوصول في أيام أو ساعات محددة. أدِر الصلاحيات في أي وقت من أي مكان.\n\nيمكنك أيضاً إنشاء مفاتيح إلكترونية أحادية الاستخدام وشاركها مع الزوار ليفتحوا بابك عبر تطبيق DESi Smart — دون إنترنت لإنشاء الرموز.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/desismarenban2.jpg",
  },
  // 4. SMART TECHNOLOGY — text + full banner
  {
    type: "text-banner",
    tag: { en: "SMART TECHNOLOGY", ar: "تقنية ذكية" },
    heading: {
      en: "The Smartest of Its Series",
      ar: "الأذكى في فئته",
    },
    text: {
      en: "The Utopic RX monitors your daily usage habits and proactively slows its connection scanning to conserve battery when not in use. If left idle for an extended period, it completely shuts down and enters standby mode. Different connection modes let you decide your own energy consumption balance.",
      ar: "يراقب Utopic RX عاداتك اليومية ويبطئ مسح الاتصال تلقائياً لحفظ البطارية. يدخل وضع الاستعداد تلقائياً عند التوقف لفترة طويلة. أوضاع اتصال متعددة تتيح لك التحكم في استهلاك الطاقة.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/banner-en-5.jpg",
  },
  // 5. REPORTING — image left, text right
  {
    type: "image-text",
    tag: { en: "REPORTING", ar: "التقارير" },
    heading: {
      en: "Track All Activities with Detailed Reports",
      ar: "تتبّع جميع الأنشطة بتقارير تفصيلية",
    },
    text: {
      en: "View lock/unlock activities with date, time and the user who performed the operation. With the DESi Smart Bridge, monitor access in real time from anywhere.",
      ar: "اعرض أنشطة القفل/الفتح مع التاريخ والوقت والمستخدم. مع جسر DESi Smart، راقب الوصول في الوقت الفعلي من أي مكان.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-5.png",
  },
  // 6. MOUNTING OPTIONS — text + full banner
  {
    type: "text-banner",
    tag: { en: "MOUNTING OPTIONS", ar: "خيارات التركيب" },
    heading: {
      en: "Various Installation Options",
      ar: "خيارات تركيب متعددة",
    },
    text: {
      en: "The Utopic RX mounts onto your existing cylinder. A minimum 2mm gap between the cylinder and door surface is required. If your cylinder doesn't protrude beyond the surface, use the included 3M adhesive tape to mount directly on the door. For thumbturn cylinders, remove the thumbturn and attach the plastic adapter included in the box.",
      ar: "يُركَّب Utopic RX على أسطوانتك الحالية. يلزم فجوة 2 مم بين الأسطوانة وسطح الباب. إذا لم تبرز الأسطوانة، استخدم اللاصق 3M المرفق للتركيب مباشرةً على الباب.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/RXnew1.png",
  },
  // 7. BATTERY LIFE — text left, image right
  {
    type: "text-image",
    tag: { en: "BATTERY LIFE", ar: "عمر البطارية" },
    heading: {
      en: "Up to 6 Months of Battery Life",
      ar: "حتى 6 أشهر عمر للبطارية",
    },
    text: {
      en: "Rechargeable lithium batteries provide 4 to 6 months of battery life per charge depending on your chosen connection mode. Charge via the included Type-C cable.\n\nMonitor battery status anytime via the DESi Smart app. If you forget to charge, you can always open your door with your key.",
      ar: "توفر البطاريات الليثيومية القابلة للشحن 4–6 أشهر بحسب وضع الاتصال. اشحن بكابل Type-C المرفق.\n\nراقب مستوى البطارية عبر التطبيق. إذا نسيت الشحن، يمكنك دائماً الفتح بالمفتاح.",
    },
    note: {
      en: "6 months applies to energy saving mode.",
      ar: "مدة 6 أشهر تنطبق على وضع توفير الطاقة.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx6.png",
  },
  // 8. LATCH CONTROL — image left, text right
  {
    type: "image-text",
    tag: { en: "LATCH CONTROL", ar: "التحكم بالمزلاج" },
    heading: {
      en: "Adjustable Latch Retraction Durations",
      ar: "مدة سحب المزلاج قابلة للضبط",
    },
    text: {
      en: "After unlocking, keep the latch retracted for a customisable duration — or unlock without retracting the latch at all. All latch settings are accessible from the advanced menu.",
      ar: "بعد الفتح، أبقِ المزلاج مسحوباً لمدة مخصصة — أو افتح دون سحبه كلياً. جميع إعدادات المزلاج متاحة من القائمة المتقدمة.",
    },
    note: {
      en: "Long press the unlock button in the app to access options.",
      ar: "اضغط طويلاً على زر الفتح في التطبيق للوصول إلى الخيارات.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/gif-2-en.gif",
  },
  // 9. SILENT MODE — text left, image right
  {
    type: "text-image",
    tag: { en: "SILENT MODE", ar: "الوضع الصامت" },
    heading: {
      en: "Silent Locking and Unlocking",
      ar: "قفل وفتح صامت",
    },
    text: {
      en: "Long-press the lock/unlock icons in the app to operate the lock slowly and silently — so you don't disturb anyone at home or your neighbours.",
      ar: "اضغط طويلاً على أيقونة القفل/الفتح في التطبيق لتشغيل القفل ببطء وصمت — لا تزعج أحداً في المنزل أو الجيران.",
    },
    note: {
      en: "Long press the lock or unlock button in the app to access this option.",
      ar: "اضغط طويلاً على زر القفل أو الفتح في التطبيق للوصول إلى هذا الخيار.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx1111.gif",
  },
  // 10. ENERGY SAVING — text + full banner
  {
    type: "text-banner",
    tag: { en: "ENERGY SAVING", ar: "توفير الطاقة" },
    heading: {
      en: "Knock on Your Door 3 Times to Wake It Up",
      ar: "اطرق بابك 3 مرات لتنشيطه",
    },
    text: {
      en: "If unused for 3 days, the lock slows connection scanning. After 7 days of inactivity, it completely shuts off. Simply knock on your door 3–4 times to wake up the Utopic RX — it will immediately be ready for phone connections, fingerprint access, and other features.",
      ar: "إذا لم يُستخدم لمدة 3 أيام، يبطئ مسح الاتصال. بعد 7 أيام، يُغلق كلياً. اطرق بابك 3–4 مرات فقط لتنشيط Utopic RX — سيصبح فوراً جاهزاً للاتصال بالهاتف والبصمة وغيرها.",
    },
    note: {
      en: 'This feature is available under "Connection Speed" in the app.',
      ar: 'هذه الميزة متاحة في إعداد "سرعة الاتصال" في التطبيق.',
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/RX2new.jpg",
  },
  // 11. REMOTE ACCESS — image left, text right + bullets
  {
    type: "image-text",
    tag: { en: "REMOTE ACCESS", ar: "الوصول عن بُعد" },
    heading: {
      en: "No Internet Needed to Create E-Keys",
      ar: "لا إنترنت لإنشاء المفاتيح الإلكترونية",
    },
    text: {
      en: "Create scheduled user codes via the DESi Smart app even when you're away from home. Share them with friends, Airbnb guests, repairmen, or anyone who needs access.",
      ar: "أنشئ رموز وصول مجدولة عبر تطبيق DESi Smart حتى عند غيابك عن المنزل. شاركها مع الأصدقاء وضيوف Airbnb والعمال.",
    },
    bullets: [
      {
        en: "One-time or time-limited codes (up to 60 days)",
        ar: "رموز أحادية الاستخدام أو محددة الوقت (حتى 60 يوماً)",
      },
      {
        en: "Set specific date and time ranges for access",
        ar: "حدّد نطاقات التاريخ والوقت للوصول",
      },
      {
        en: "Revoke codes anytime via the DESi Smart Bridge",
        ar: "ألغِ الرموز في أي وقت عبر DESi Smart Bridge",
      },
    ],
    image:
      "https://endesi.tsoftstatic.com/Data/EditorFiles/desismarenban23.jpg",
  },
  // 12. AUTO LOCK — text left, image right
  {
    type: "text-image",
    tag: { en: "AUTO LOCK", ar: "القفل التلقائي" },
    heading: {
      en: "Advanced Automatic Locking Feature",
      ar: "ميزة القفل التلقائي المتقدمة",
    },
    text: {
      en: "Enable auto-lock and choose from 15 to 360 seconds. The Utopic RX automatically re-locks after the selected time. You can also schedule auto-lock to activate at specific times of day.",
      ar: "فعّل القفل التلقائي واختر من 15 إلى 360 ثانية. يُقفل Utopic RX تلقائياً بعد الوقت المحدد. يمكنك أيضاً جدولة القفل التلقائي في أوقات محددة.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-7.png",
  },
  // 13. iOS & ANDROID — image left, text right
  {
    type: "image-text",
    tag: { en: "IOS & ANDROID", ar: "iOS وأندرويد" },
    heading: {
      en: "Hey Siri, Lock My Door!",
      ar: "يا Siri، أقفل بابي!",
    },
    text: {
      en: "Lock or unlock your door with a simple Siri voice command. iOS and Android app shortcuts let you control your door in seconds without even opening the app.",
      ar: "أقفل بابك أو افتحه بأمر صوتي بسيط عبر Siri. اختصارات iOS وأندرويد تتيح التحكم خلال ثوانٍ دون فتح التطبيق.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/banner-8.jpg",
  },
  // 14. INCLUDED IN THIS BUNDLE — text + full banner
  {
    type: "text-banner",
    tag: { en: "INCLUDED IN THIS BUNDLE", ar: "مرفق في هذه الباقة" },
    heading: {
      en: "Control Your Door from Anywhere",
      ar: "تحكّم في بابك من أي مكان",
    },
    text: {
      en: "The included DESi Smart Bridge connects your lock to the internet via Wi-Fi. Unlock or lock your door remotely, view access logs in real time, and manage users from anywhere in the world.\n\nIntegrates seamlessly with Google Home, Amazon Alexa and Home Assistant — control your door with voice commands or build smart home automations.",
      ar: "يربط جسر DESi Smart المرفق قفلك بالإنترنت عبر Wi-Fi. أقفل بابك أو افتحه عن بُعد، اعرض سجلات الوصول في الوقت الفعلي، وأدِر المستخدمين من أي مكان في العالم.\n\nيتكامل بسلاسة مع Google Home وAmazon Alexa وHome Assistant.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-8.png",
  },
  // 15. SEMI-AUTO MODE — text left, image right
  {
    type: "text-image",
    tag: { en: "SEMI-AUTO MODE", ar: "الوضع شبه التلقائي" },
    heading: {
      en: "Lock / Unlock with One Effortless Move",
      ar: "أقفل / افتح بحركة واحدة سهلة",
    },
    text: {
      en: "Built-in motion detection sensors detect even a slight manual turn from inside and automatically complete the movement. Lock or unlock with minimal effort. The touch button on the device also lets you lock with a single tap.",
      ar: "تستشعر مستشعرات الحركة المدمجة حركة يدوية طفيفة من الداخل وتكمل الحركة تلقائياً. أقفل أو افتح بأدنى جهد. زر اللمس على الجهاز يتيح القفل بضغطة واحدة.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rxgif1.gif",
  },
];

const specGroups = [
  {
    title: { en: "Installation & Compatibility", ar: "التركيب والتوافق" },
    items: [
      {
        en: "One-touch door direction & lock turn adjustment",
        ar: "ضبط اتجاه الباب ودوران القفل بلمسة واحدة",
      },
      {
        en: "Adjustable motor speed for different door & lock types",
        ar: "سرعة محرك قابلة للضبط لأنواع أبواب وأقفال مختلفة",
      },
      {
        en: "Universal mounting — fits any euro profile cylinder",
        ar: "تركيب شامل — يناسب أي أسطوانة أوروبية",
      },
      {
        en: "Adhesive tape mounting option (no screws needed)",
        ar: "خيار التركيب باللاصق (بدون براغي)",
      },
      {
        en: "Compatible with thumbturn and standard cylinders",
        ar: "متوافق مع أسطوانات المقبض والأسطوانات القياسية",
      },
    ],
  },
  {
    title: { en: "User Management", ar: "إدارة المستخدمين" },
    items: [
      { en: "Add up to 37 users", ar: "يستوعب حتى 37 مستخدماً" },
      {
        en: "Time-based access control per user",
        ar: "تحكم بالوصول الزمني لكل مستخدم",
      },
      {
        en: "Generate one-time codes without internet",
        ar: "إنشاء رموز أحادية الاستخدام دون إنترنت",
      },
      {
        en: "Activity log with timestamp & user info",
        ar: "سجل النشاط مع التوقيت ومعلومات المستخدم",
      },
      { en: "Instant permission removal", ar: "إلغاء الصلاحيات فوري" },
    ],
  },
  {
    title: { en: "Locking Features", ar: "ميزات القفل" },
    items: [
      {
        en: "Auto-lock (15–360 seconds, adjustable)",
        ar: "قفل تلقائي (15–360 ثانية، قابل للضبط)",
      },
      { en: "Delayed locking for safe exit", ar: "قفل متأخر للخروج الآمن" },
      {
        en: "Adjustable latch retraction durations",
        ar: "مدة سحب المزلاج قابلة للضبط",
      },
      { en: "Unlock without retracting latch", ar: "فتح بدون سحب المزلاج" },
      {
        en: "Silent & slow lock/unlock mode",
        ar: "وضع القفل/الفتح الصامت والبطيء",
      },
    ],
  },
  {
    title: { en: "Connectivity & Integrations", ar: "الاتصال والتكامل" },
    items: [
      {
        en: "Mobile App — close-range control",
        ar: "تطبيق الجوال — تحكم عن قرب",
      },
      {
        en: "Smart Bridge included — remote internet access out of the box",
        ar: "جسر ذكي مرفق — وصول إنترنت عن بُعد فور الفتح",
      },
      {
        en: "Google Home & Amazon Alexa integration",
        ar: "تكامل مع Google Home وAmazon Alexa",
      },
      { en: "Home Assistant integration", ar: "تكامل مع Home Assistant" },
      { en: "Siri & iOS/Android shortcuts", ar: "اختصارات Siri وiOS/أندرويد" },
      { en: "ISM 434 MHz communication", ar: "اتصال ISM 434 MHz" },
    ],
  },
  {
    title: { en: "Battery & Charging", ar: "البطارية والشحن" },
    items: [
      {
        en: "Up to 6 months in energy saving mode",
        ar: "حتى 6 أشهر في وضع توفير الطاقة",
      },
      { en: "Type-C cable charging", ar: "شحن عبر كابل Type-C" },
      {
        en: "Works connected to power or powerbank",
        ar: "يعمل متصلاً بالكهرباء أو البطارية المحمولة",
      },
      {
        en: "Real-time battery monitoring via app",
        ar: "مراقبة البطارية في الوقت الفعلي عبر التطبيق",
      },
      {
        en: "Low battery alerts via Smart Bridge",
        ar: "تنبيهات انخفاض البطارية عبر الجسر الذكي",
      },
    ],
  },
  {
    title: { en: "Security & Other", ar: "الأمان وغيره" },
    items: [
      {
        en: "Patented design — key always accessible from outside",
        ar: "تصميم مسجّل — المفتاح متاح دائماً من الخارج",
      },
      {
        en: "Latest encryption protocols & security standards",
        ar: "أحدث بروتوكولات التشفير ومعايير الأمان",
      },
      { en: "View total lock operation count", ar: "عرض إجمالي عمليات القفل" },
      {
        en: "Firmware updates via app",
        ar: "تحديثات البرنامج الثابت عبر التطبيق",
      },
      {
        en: "Semi-automatic mode with built-in motion sensor",
        ar: "الوضع شبه التلقائي مع مستشعر حركة مدمج",
      },
    ],
  },
];

const boxContents = [
  {
    icon: "🔒",
    name: { en: "Utopic RX Smart Lock", ar: "القفل الذكي Utopic RX" },
  },
  { icon: "🌐", name: { en: "DESi Smart Bridge", ar: "جسر DESi الذكي" } },
  { icon: "🔌", name: { en: "Type-C USB Cable", ar: "كابل USB Type-C" } },
  { icon: "🔧", name: { en: "2× Allen Wrenches", ar: "مفكّان ألن ×2" } },
  { icon: "🩹", name: { en: "Door Surface Adhesive", ar: "لاصق سطح الباب" } },
  {
    icon: "🔩",
    name: { en: "Plastic Adapter for Key", ar: "محوّل بلاستيكي للمفتاح" },
  },
  {
    icon: "⚙️",
    name: { en: "Plastic Adapter for Thumbturn", ar: "محوّل بلاستيكي للمقبض" },
  },
];

const bullets = {
  en: [
    "Smart Bridge included — control from anywhere",
    "iOS & Android app + Siri & Alexa",
    "Mounts on your existing key — no drilling",
    "Universal — fits most euro-profile doors",
    "37 users with time-based access",
    "Type-C rechargeable, 6-month battery",
    "Google Home & Home Assistant ready",
    "Activity logs with timestamp",
  ],
  ar: [
    "جسر ذكي مرفق — تحكم من أي مكان",
    "تطبيق iOS/أندرويد + Siri وAlexa",
    "يثبّت على مفتاحك الحالي — بدون حفر",
    "تصميم شامل يناسب معظم الأبواب الأوروبية",
    "37 مستخدماً بتحكم زمني",
    "بطارية تدوم 6 أشهر (Type-C)",
    "متوافق مع Google Home وHome Assistant",
    "سجلّ النشاط مع التوقيت",
  ],
};

async function run() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae",
  );
  console.log("Connected to MongoDB.");

  const result = await Product.findOneAndUpdate(
    { slug: "desi-utopic-rx-wifi" },
    {
      $set: {
        gallery,
        bullets,
        quickFeatures,
        announcementBar,
        contentSections,
        specGroups,
        boxContents,
      },
    },
    { new: true },
  );

  if (result) {
    console.log(`✅ Updated product: ${result.name.en}`);
    console.log(`   gallery: ${result.gallery.length}`);
    console.log(`   contentSections: ${result.contentSections.length}`);
    console.log(`   specGroups: ${result.specGroups.length}`);
    console.log(`   boxContents: ${result.boxContents.length}`);
  } else {
    console.log("❌ Product not found: desi-utopic-rx-wifi");
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
