/**
 * Run with: node update_rx_fingerprint_wifi_content.js
 * Updates DESi Utopic RX — Fingerprint + WiFi Set with rich content sections.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const gallery = [
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-178-69-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-179-69-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-180-69-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-181-69-K.png",
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-182-69-K.png",
];

const bullets = {
  en: [
    "Wireless Fingerprint Reader + Touch Keypad included",
    "Smart Bridge included — Google Home, Alexa & Home Assistant",
    "Mounts on your existing key — no drilling",
    "Universal — fits most euro-profile doors",
    "37 users with time-based access control",
    "Type-C rechargeable, 4–6 month battery",
    "Auto-lock 15–360s & silent mode",
    "Activity logs with timestamp & user info",
  ],
  ar: [
    "قارئ بصمة لاسلكي + لوحة لمس مرفقة",
    "جسر ذكي مرفق — Google Home وAlexa وHome Assistant",
    "يثبّت على مفتاحك الحالي — بدون حفر",
    "تصميم شامل يناسب معظم الأبواب الأوروبية",
    "37 مستخدماً بتحكم زمني",
    "بطارية Type-C تدوم 4–6 أشهر",
    "قفل تلقائي 15–360 ثانية ووضع صامت",
    "سجلّ النشاط مع التوقيت ومعلومات المستخدم",
  ],
};

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
  en: "🌐 BUNDLE — Utopic RX Smart Lock + Fingerprint Reader + Keypad + DESi Smart Bridge. Full smart home integration out of the box.",
  ar: "🌐 باقة — قفل Utopic RX الذكي + قارئ بصمة + لوحة مفاتيح + جسر DESi Smart. تكامل كامل مع المنزل الذكي من اليوم الأول.",
};

const contentSections = [
  // 1. INSTALLATION — text + full banner
  {
    type: "text-banner",
    tag: { en: "INSTALLATION", ar: "التركيب" },
    heading: {
      en: "Installation Without Changing Your Existing Cylinder",
      ar: "التركيب دون تغيير أسطوانتك الحالية",
    },
    text: {
      en: "You can install it by simply tightening 4 screws without changing your lock or cutting the key. Thanks to the smart lock's patented feature (exclusive to the Utopic RX series), you can still access your door from the outside using your key in emergencies, eliminating the need for a panic cylinder.",
      ar: "يمكنك تثبيته بشدّ 4 براغي فقط دون تغيير القفل أو قطع المفتاح. بفضل الميزة المسجّلة الحصرية لسلسلة Utopic RX، يمكنك دائماً الوصول من الخارج بمفتاحك في حالات الطوارئ، مما يلغي الحاجة إلى أسطوانة طوارئ.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rxbanner1.png",
  },
  // 2. BIOMETRIC & PIN — image left, text right
  {
    type: "image-text",
    tag: { en: "BIOMETRIC & PIN", ar: "بيومتري ورقم سري" },
    heading: {
      en: "Open Your Door with Fingerprint or Password",
      ar: "افتح بابك ببصمة الإصبع أو كلمة المرور",
    },
    text: {
      en: "You can lock or unlock your door by scanning your fingerprint or entering your password.",
      ar: "يمكنك قفل بابك أو فتحه عبر مسح بصمة إصبعك أو إدخال كلمة المرور.",
    },
    image:
      "https://endesi.tsoft.biz/Data/EditorFiles/whatsapp-gorsel-2024-12-18-saat-105427-bdb8ccf8.jpg",
  },
  // 3. E-KEY — text only (no image on original page for this section)
  {
    type: "text-banner",
    tag: { en: "E-KEY", ar: "مفتاح إلكتروني" },
    heading: {
      en: "No Keypad on Your Door? No Problem!",
      ar: "لا لوحة مفاتيح على بابك؟ لا مشكلة!",
    },
    text: {
      en: "You can create one-time e-keys through the application and share them with your visitors to allow them to open your door using the DESi Smart app on their phones.",
      ar: "يمكنك إنشاء مفاتيح إلكترونية أحادية الاستخدام وشاركها مع الزوار ليفتحوا بابك عبر تطبيق DESi Smart على هواتفهم.",
    },
    image: null,
  },
  // 4. SMART TECHNOLOGY — text + full banner
  {
    type: "text-banner",
    tag: { en: "SMART TECHNOLOGY", ar: "تقنية ذكية" },
    heading: {
      en: "Smartest of Its Series",
      ar: "الأذكى في فئته",
    },
    text: {
      en: "The Utopic RX smart lock monitors your daily usage and proactively adjusts its activity to conserve battery power when not in use, slowing itself down. If the lock remains unused for an extended period, it automatically shuts down completely and enters standby mode. Additionally, with selectable usage modes, you can manage battery consumption yourself.",
      ar: "يراقب قفل Utopic RX الذكي استخدامك اليومي ويضبط نشاطه تلقائياً للحفاظ على البطارية عند عدم الاستخدام. إذا ظل غير مستخدم لفترة طويلة، يُغلق كلياً ويدخل وضع الاستعداد. يمكنك أيضاً اختيار وضع الاتصال للتحكم في استهلاك البطارية.",
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
      en: "You can view the lock/unlock activities with date-time and which user performed the operation. Additionally, thanks to the DESi Smart Bridge, you can instantly see who has unlocked or locked your lock.",
      ar: "يمكنك عرض أنشطة القفل/الفتح مع التاريخ والوقت والمستخدم. بفضل جسر DESi Smart، يمكنك فوراً معرفة من فتح أو أقفل بابك.",
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
      en: "The Utopic RX smart lock mounts onto your existing cylinder. For installation, there must be a minimum gap of 2mm between the cylinder and the door surface. If your cylinder does not protrude beyond the door surface, you can mount it directly onto the door using the special 3M adhesive tape included in the package. For cylinders with a thumbturn, simply remove the thumbturn and attach the plastic adapter provided in the box.",
      ar: "يُركَّب قفل Utopic RX الذكي على أسطوانتك الحالية. يلزم فجوة 2 مم بين الأسطوانة وسطح الباب. إذا لم تبرز الأسطوانة، استخدم اللاصق 3M المرفق للتركيب مباشرةً على الباب. للأسطوانات ذات المقبض، أزل المقبض وركّب المحوّل البلاستيكي المرفق.",
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
      en: "Rechargeable lithium batteries provide a long-lasting battery life of 4 to 6 months per charge, depending on your chosen connection mode (fast, adaptive, or slow). You can recharge the device using the included Type-C cable. Battery status can be actively monitored via the DESi Smart app. Even if you forget to recharge the battery, you can always unlock your door with your keys.",
      ar: "توفر البطاريات الليثيومية القابلة للشحن 4–6 أشهر بحسب وضع الاتصال (سريع، تكيّفي، أو بطيء). اشحن بكابل Type-C المرفق. راقب مستوى البطارية عبر تطبيق DESi Smart. إذا نسيت الشحن، يمكنك دائماً فتح بابك بمفتاحك.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx6.png",
  },
  // 8. LATCH CONTROL — image left, text right
  {
    type: "image-text",
    tag: { en: "LATCH CONTROL", ar: "التحكم بالمزلاج" },
    heading: {
      en: "Adjustable Latch Retraction Durations and Modes",
      ar: "مدد وأوضاع سحب المزلاج قابلة للضبط",
    },
    text: {
      en: "After unlocking your door, you can choose to keep the latch retracted for a customizable duration. Alternatively, you can unlock without retracting the latch at all. All latch retraction processes and configurations can be easily managed from advanced settings.",
      ar: "بعد فتح بابك، يمكنك إبقاء المزلاج مسحوباً لمدة مخصصة. أو يمكنك الفتح دون سحب المزلاج كلياً. جميع إعدادات المزلاج يمكن إدارتها بسهولة من الإعدادات المتقدمة.",
    },
    note: {
      en: "Long press to unlock button on the app.",
      ar: "اضغط طويلاً على زر الفتح في التطبيق.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/gif-2-en.gif",
  },
  // 9. USER INVITE — text only
  {
    type: "text-banner",
    tag: { en: "SMART BRIDGE", ar: "الجسر الذكي" },
    heading: {
      en: "Invite Users with the Smart Bridge",
      ar: "ادعُ المستخدمين عبر الجسر الذكي",
    },
    text: {
      en: "Using the separately sold DESi Smart Bridge, you can invite users via email and grant access permissions on specific days or hours. You can manage or modify these permissions anytime and anywhere.",
      ar: "باستخدام جسر DESi Smart المُباع بشكل منفصل، يمكنك دعوة المستخدمين عبر البريد الإلكتروني ومنح صلاحيات الوصول في أيام أو ساعات محددة. يمكنك إدارة أو تعديل هذه الصلاحيات في أي وقت ومن أي مكان.",
    },
    image: null,
  },
  // 10. SILENT MODE — text left, image right
  {
    type: "text-image",
    tag: { en: "SILENT MODE", ar: "الوضع الصامت" },
    heading: {
      en: "Silent Locking and Unlocking",
      ar: "قفل وفتح صامت",
    },
    text: {
      en: "By long-pressing the lock/unlock icons on the app screen, you can lock or unlock your door slowly and quietly — so you don't disturb anyone at home or your neighbours.",
      ar: "بالضغط الطويل على أيقونات القفل/الفتح في التطبيق، يمكنك قفل بابك أو فتحه ببطء وهدوء — لا تزعج أحداً في المنزل أو الجيران.",
    },
    note: {
      en: "Long press to unlock or lock button on the app.",
      ar: "اضغط طويلاً على زر الفتح أو القفل في التطبيق.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx1111.gif",
  },
  // 11. ENERGY SAVING — text + dark banner
  {
    type: "text-banner",
    tag: { en: "ENERGY SAVING", ar: "توفير الطاقة" },
    heading: {
      en: "Knock on Your Door 3 Times",
      ar: "اطرق بابك 3 مرات",
    },
    text: {
      en: "If unused for 3 days, the lock slows down connection scanning; after 7 days of inactivity, it completely shuts itself off. Simply knock on your door 3–4 times. This action wakes up the Utopic RX, making it immediately ready for phone connections, fingerprint access, and other features.",
      ar: "إذا لم يُستخدم لمدة 3 أيام، يبطئ مسح الاتصال؛ بعد 7 أيام يُغلق كلياً. اطرق بابك 3–4 مرات فقط. يُنشط هذا Utopic RX ويجعله جاهزاً فوراً للاتصال بالهاتف والبصمة وغيرها.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/RX2new.jpg",
  },
  // 12. REMOTE ACCESS — text only
  {
    type: "text-banner",
    tag: { en: "REMOTE ACCESS", ar: "الوصول عن بُعد" },
    heading: {
      en: "No Internet Needed to Create User Passwords or E-Keys",
      ar: "لا إنترنت لإنشاء كلمات المرور أو المفاتيح الإلكترونية",
    },
    text: {
      en: "When you're not at home, use the DESi Smart app to create scheduled user codes. Share them with your friends, Airbnb tenants, your repairman, gardener, etc. No internet or any connection is required to create user codes. You can also create one-time user codes for single entry within the specified date and time range.",
      ar: "عند غيابك عن المنزل، استخدم تطبيق DESi Smart لإنشاء رموز مستخدم مجدولة. شاركها مع أصدقائك ومستأجري Airbnb وعمال الإصلاح. لا يلزم إنترنت لإنشاء الرموز. يمكنك أيضاً إنشاء رموز أحادية الاستخدام ضمن نطاق تاريخ وزمن محدد.",
    },
    image: null,
  },
  // 13. AUTO LOCK — text left, image right
  {
    type: "text-image",
    tag: { en: "AUTO LOCK", ar: "القفل التلقائي" },
    heading: {
      en: "Advanced Automatic Locking Feature",
      ar: "ميزة القفل التلقائي المتقدمة",
    },
    text: {
      en: "By enabling the auto-lock feature, you can choose from time intervals of 15, 30, 45, 60, 120, 180, or 360 seconds. After unlocking, the Utopic RX will automatically re-lock your door within the selected time frame. Additionally, you can schedule auto-lock to activate at specific times — for example, setting your door to automatically lock every day at 10:00 PM.",
      ar: "بتفعيل القفل التلقائي، اختر من 15، 30، 45، 60، 120، 180، أو 360 ثانية. يُقفل Utopic RX بابك تلقائياً ضمن الإطار الزمني المحدد. يمكنك أيضاً جدولة القفل التلقائي في أوقات محددة — مثلاً، قفل الباب تلقائياً كل يوم الساعة 10 مساءً.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-7.png",
  },
  // 14. IOS & ANDROID — image left, text right
  {
    type: "image-text",
    tag: { en: "IOS & ANDROID", ar: "iOS وأندرويد" },
    heading: {
      en: "Hey Siri, Lock My Door!",
      ar: "يا Siri، أقفل بابي!",
    },
    text: {
      en: "Lock or unlock your door with a simple voice command to Siri. Plus, thanks to the shortcuts in our iOS and Android apps, you can lock or unlock your door in seconds without even opening the app.",
      ar: "أقفل بابك أو افتحه بأمر صوتي بسيط عبر Siri. بفضل الاختصارات في تطبيقات iOS وأندرويد، يمكنك التحكم في ثوانٍ دون فتح التطبيق.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/banner-8.jpg",
  },
  // 15. SMART BRIDGE — text + full banner
  {
    type: "text-banner",
    tag: { en: "REMOTE CONTROL", ar: "التحكم عن بُعد" },
    heading: {
      en: "Control Your Door Wherever You Are",
      ar: "تحكّم في بابك من أي مكان",
    },
    text: {
      en: "Thanks to DESi Smart Bridge, you can unlock or lock your smart lock via the internet. Additionally, your smart lock can integrate seamlessly with Google Home, Home Assistant & Alexa.",
      ar: "بفضل جسر DESi Smart، يمكنك قفل قفلك الذكي أو فتحه عبر الإنترنت. يتكامل بسلاسة مع Google Home وHome Assistant وAlexa.",
    },
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-8.png",
  },
  // 16. SEMI-AUTO MODE — text left, image right
  {
    type: "text-image",
    tag: { en: "SEMI-AUTO MODE", ar: "الوضع شبه التلقائي" },
    heading: {
      en: "Lock/Unlock Your Door Effortlessly with Semi-Automatic Mode",
      ar: "أقفل / افتح بحركة واحدة سهلة",
    },
    text: {
      en: "Thanks to its built-in motion detection sensors, RX detects even a slight manual turn from the inside and automatically completes the movement. This allows you to lock or unlock your door with minimal effort. Additionally, the touch button on the device lets you lock the door with a simple tap.",
      ar: "بفضل مستشعرات الحركة المدمجة، يستشعر RX حركة يدوية طفيفة من الداخل ويكملها تلقائياً. يتيح لك قفل بابك أو فتحه بأدنى جهد. زر اللمس على الجهاز يتيح القفل بضغطة واحدة.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx111.jpg",
  },
];

const specGroups = [
  {
    title: { en: "Installation & Compatibility", ar: "التركيب والتوافق" },
    items: [
      {
        en: "One-Touch Door Direction & Lock Turn Adjustment: Easily set door opening direction and number of lock turns with a single button",
        ar: "ضبط اتجاه الباب ودوران القفل بلمسة واحدة",
      },
      {
        en: "Adjustable Motor Speed: Customize motor speed for different door and lock types",
        ar: "سرعة محرك قابلة للضبط لأنواع أبواب وأقفال مختلفة",
      },
      {
        en: "Universal Mounting Compatibility: Designed to fit any type of lock or door",
        ar: "توافق تركيب شامل — مصمم ليناسب أي نوع قفل أو باب",
      },
      {
        en: "Smart, Patented Design: Doesn't interfere with traditional key use",
        ar: "تصميم ذكي مسجّل — لا يتعارض مع الاستخدام التقليدي للمفتاح",
      },
    ],
  },
  {
    title: { en: "User Management", ar: "إدارة المستخدمين" },
    items: [
      {
        en: "Add Up to 37 Users: Manage access for multiple individuals",
        ar: "يستوعب حتى 37 مستخدماً",
      },
      {
        en: "Time-Based Access Control: Grant time-limited access — e.g., allow a cleaner entry only on specific days and times",
        ar: "تحكم زمني بالوصول لكل مستخدم",
      },
      {
        en: "One-Time Access Code Without Internet or Proximity: Generate a one-time guest access code without internet or nearby connection",
        ar: "رمز وصول أحادي الاستخدام دون إنترنت أو قرب",
      },
      {
        en: "Instant Permission Removal: Revoke any user's access instantly",
        ar: "إلغاء صلاحية أي مستخدم فوراً",
      },
      {
        en: "Activity Reporting: View a full history of lock/unlock actions with timestamp and user info",
        ar: "سجل كامل للقفل/الفتح مع التوقيت ومعلومات المستخدم",
      },
    ],
  },
  {
    title: { en: "Locking Features", ar: "ميزات القفل" },
    items: [
      {
        en: "Auto-Lock After Unlocking: Option to automatically re-lock the door every time it's unlocked",
        ar: "قفل تلقائي بعد كل فتح",
      },
      {
        en: "Delayed Locking: Gives you time to exit the house before locking activates",
        ar: "قفل متأخر للخروج الآمن",
      },
      {
        en: "Latch Retraction Settings: Adjust latch pull-in time for different lock types or disable latch pulling for latchless doors",
        ar: "ضبط وقت سحب المزلاج أو تعطيله للأبواب بدون مزلاج",
      },
      {
        en: "Unlock Without Retracting Latch: Option to unlock the door without moving the latch",
        ar: "فتح بدون سحب المزلاج",
      },
    ],
  },
  {
    title: { en: "Connectivity & Integrations", ar: "الاتصال والتكامل" },
    items: [
      {
        en: "Control via DESi Smart App: Manage your lock easily from your smartphone",
        ar: "تحكم عبر تطبيق DESi Smart من هاتفك",
      },
      {
        en: "Smart Bridge — remote internet access (separately sold)",
        ar: "جسر ذكي للوصول عبر الإنترنت (يُباع بشكل منفصل)",
      },
      {
        en: "Google Home & Amazon Alexa integration",
        ar: "تكامل مع Google Home وAmazon Alexa",
      },
      { en: "Home Assistant integration", ar: "تكامل مع Home Assistant" },
      { en: "Siri & iOS/Android shortcuts", ar: "اختصارات Siri وiOS/أندرويد" },
    ],
  },
  {
    title: { en: "Battery & Charging", ar: "البطارية والشحن" },
    items: [
      {
        en: "Easy Charging via Type-C Port: Recharge with the included Type-C cable",
        ar: "شحن سهل عبر Type-C المرفق",
      },
      {
        en: "Battery Monitoring via App: Check battery level from the app (low battery alerts with Smart Bridge)",
        ar: "مراقبة البطارية عبر التطبيق (تنبيهات مع الجسر الذكي)",
      },
      {
        en: "Up to 6 months in energy saving mode",
        ar: "حتى 6 أشهر في وضع توفير الطاقة",
      },
      {
        en: "Works connected to power or powerbank",
        ar: "يعمل متصلاً بالكهرباء أو البطارية المحمولة",
      },
    ],
  },
  {
    title: { en: "Security & Other", ar: "الأمان وغيره" },
    items: [
      {
        en: "View Total Lock Operations: See how many total actions have been performed on the lock",
        ar: "عرض إجمالي عمليات القفل",
      },
      {
        en: "Firmware Updates via App: Receive and install updates released by DESi directly through the app",
        ar: "تحديثات البرنامج الثابت عبر التطبيق",
      },
      {
        en: "Semi-automatic mode with built-in motion sensor",
        ar: "الوضع شبه التلقائي مع مستشعر حركة مدمج",
      },
      {
        en: "Latest encryption protocols & security standards",
        ar: "أحدث بروتوكولات التشفير ومعايير الأمان",
      },
    ],
  },
];

const boxContents = [
  {
    icon: "🔒",
    name: { en: "Utopic RX Smart Lock", ar: "القفل الذكي Utopic RX" },
  },
  { icon: "🌐", name: { en: "Smart Bridge", ar: "الجسر الذكي" } },
  {
    icon: "👆",
    name: {
      en: "Fingerprint Reader + Keypad",
      ar: "قارئ البصمة + لوحة المفاتيح",
    },
  },
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

async function run() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae",
  );
  console.log("Connected to MongoDB.");

  const result = await Product.findOneAndUpdate(
    { slug: "desi-utopic-rx-fingerprint-wifi" },
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
    console.log("❌ Product not found: desi-utopic-rx-fingerprint-wifi");
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
