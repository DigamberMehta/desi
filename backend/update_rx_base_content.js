/**
 * Run with: node update_rx_base_content.js
 * Updates the Utopic RX Base Smart Lock product with rich content sections.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const name = {
  en: "DESi Utopic RX Smart Lock",
  ar: "قفل DESi Utopic RX الذكي",
};

const description = {
  en: "Don't worry about forgetting, losing, or carrying your keys! Control your door from anywhere with the DESi Smart app — no drilling, no cylinder change required.",
  ar: "لا تقلق بشأن نسيان مفاتيحك أو فقدانها! تحكّم ببابك من أي مكان عبر تطبيق DESi Smart — بدون حفر وبدون تغيير الأسطوانة.",
};

const bullets = {
  en: [
    "No Drilling",
    "Semi-Auto Mode",
    "Siri / Alexa",
    "6 Month Battery",
    "37 Users",
    "App Control",
  ],
  ar: [
    "بدون حفر",
    "وضع شبه تلقائي",
    "Siri / Alexa",
    "بطارية 6 أشهر",
    "37 مستخدماً",
    "تحكم بالتطبيق",
  ],
};

const announcementBar = {
  en: "⚠️ Utopic RX Smart Lock — Universal euro-profile smart lock. No drilling, no cylinder change. Works with your existing key.",
  ar: "⚠️ قفل Utopic RX الذكي — قفل ذكي شامل للأسطوانة الأوروبية. بدون حفر، بدون تغيير الأسطوانة. يعمل مع مفتاحك الحالي.",
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
    label: {
      en: "SIRI / ALEXA / GOOGLE HOME",
      ar: "Siri / Alexa / Google Home",
    },
    sub: {
      en: "Control your door with voice commands.",
      ar: "تحكّم ببابك بالأوامر الصوتية.",
    },
  },
];

const contentSections = [
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
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rxbanner2.png",
  },
  {
    type: "text-image",
    tag: { en: "E-KEY", ar: "مفتاح إلكتروني" },
    heading: {
      en: "No Keypad on Your Door? No Problem!",
      ar: "لا لوحة مفاتيح على بابك؟ لا مشكلة!",
    },
    text: {
      en: "Create one-time e-keys through the app and share them with visitors so they can open your door using the DESi Smart app on their phones.",
      ar: "أنشئ مفاتيح إلكترونية أحادية الاستخدام وشاركها مع الزوار ليفتحوا بابك عبر تطبيق DESi Smart على هواتفهم.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/desismarenban2.jpg",
  },
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
    image:
      "https://endesi.tsoftstatic.com/Data/EditorFiles/desismarenban23.jpg",
  },
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
  {
    type: "text-image",
    tag: { en: "BATTERY LIFE", ar: "عمر البطارية" },
    heading: {
      en: "Up to 6 Months of Battery Life",
      ar: "حتى 6 أشهر عمر للبطارية",
    },
    text: {
      en: "Rechargeable lithium batteries provide 4 to 6 months of battery life per charge depending on your chosen connection mode. Charge via the included Type-C cable. Monitor battery status anytime via the DESi Smart app. If you forget to charge, you can always open your door with your key.",
      ar: "توفر البطاريات الليثيومية القابلة للشحن 4–6 أشهر بحسب وضع الاتصال. اشحن بكابل Type-C المرفق وراقب مستوى البطارية عبر التطبيق. إذا نسيت الشحن، يمكنك دائماً الفتح بالمفتاح.",
    },
    note: {
      en: "6 months applies to energy saving mode.",
      ar: "مدة 6 أشهر تنطبق على وضع توفير الطاقة.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/rx6.png",
  },
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
  {
    type: "text-banner",
    tag: { en: "ENERGY SAVING", ar: "توفير الطاقة" },
    heading: {
      en: "Knock on Your Door 3 Times to Wake It Up",
      ar: "اطرق بابك 3 مرات لتنشيطه",
    },
    text: {
      en: "If unused for 3 days, the lock slows connection scanning. After 7 days of inactivity, it completely shuts off. Simply knock on your door 3–4 times to wake up the Utopic RX — it will immediately be ready for phone connections and other features.",
      ar: "إذا لم يُستخدم لمدة 3 أيام، يبطئ مسح الاتصال. بعد 7 أيام، يُغلق كلياً. اطرق بابك 3–4 مرات فقط لتنشيط Utopic RX — سيصبح فوراً جاهزاً للاتصال بالهاتف وغيرها.",
    },
    note: {
      en: 'This feature is available under "Connection Speed" in the app.',
      ar: 'هذه الميزة متاحة في إعداد "سرعة الاتصال" في التطبيق.',
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/RX2new.jpg",
  },
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
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-7.png",
  },
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
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/gif-2-en.gif",
  },
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
    image: "https://endesi.tsoft.biz/Data/EditorFiles/banner-5.png",
  },
  {
    type: "text-banner",
    tag: { en: "SMART BRIDGE", ar: "الجسر الذكي" },
    heading: {
      en: "Control Your Door from Anywhere",
      ar: "تحكّم ببابك من أي مكان",
    },
    text: {
      en: "With the separately sold DESi Smart Bridge, unlock or lock your smart lock via the internet. Integrates seamlessly with Google Home, Amazon Alexa and Home Assistant.",
      ar: "مع جسر DESi Smart المباع بشكل منفصل، أقفل أو افتح قفلك الذكي عبر الإنترنت. يتكامل بسلاسة مع Google Home وAmazon Alexa وHome Assistant.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/banner-8.jpg",
  },
  {
    type: "image-text",
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
      { en: "Adds up to 37 users", ar: "يستوعب حتى 37 مستخدماً" },
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
        en: "Smart Bridge for remote internet access (sold separately)",
        ar: "جسر ذكي للوصول عن بُعد عبر الإنترنت (يُباع بشكل منفصل)",
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

const gallery = [
  "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-169-67-K.png",
  "https://endesi.tsoft.biz/Data/EditorFiles/RXnew1.png",
  "https://endesi.tsoftstatic.com/Data/EditorFiles/rx6.png",
];

async function run() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae",
  );
  console.log("Connected to MongoDB.");

  const result = await Product.findOneAndUpdate(
    { slug: "desi-utopic-rx-base" },
    {
      $set: {
        name,
        description,
        bullets,
        announcementBar,
        quickFeatures,
        contentSections,
        specGroups,
        boxContents,
        gallery,
        isNew: true,
        isActive: true,
      },
    },
    { new: true },
  );

  if (result) {
    console.log(`✅ Updated: ${result.name.en}`);
    console.log(`   contentSections: ${result.contentSections.length}`);
    console.log(`   specGroups: ${result.specGroups.length}`);
    console.log(`   boxContents: ${result.boxContents.length}`);
    console.log(`   quickFeatures: ${result.quickFeatures.length}`);
    console.log(`   gallery: ${result.gallery.length}`);
  } else {
    console.log("❌ Product not found: desi-utopic-rx-base");
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
