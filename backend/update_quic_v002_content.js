/**
 * Run with: node update_quic_v002_content.js
 * Updates DESi QuiC V002 with rich content sections.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const gallery = [
  "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-399-94-K.png",
  "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-396-94-K.png",
  "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-397-94-K.png",
  "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-398-94-K.jpg",
];

const bullets = {
  en: [
    "Live video call with visitors via the app",
    "Face recognition, palm vein, fingerprint, PIN & card",
    "Always-on Wi-Fi — no doorbell needed",
    "Compatible with Utopic RX, RXe & R+ smart locks",
    "10 admin users + 240 standard users",
    "OLED display + multilingual voice guidance",
    "Flush or surface mount — fits standard peepholes",
    "IP54 protection, –10°C to +60°C operating range",
  ],
  ar: [
    "مكالمة فيديو مباشرة مع الزوار عبر التطبيق",
    "تعرّف على الوجه، وريد اليد، بصمة الإصبع، PIN والبطاقة",
    "Wi-Fi دائم التشغيل — لا حاجة لجرس الباب",
    "متوافق مع أقفال Utopic RX وRXe وR+ الذكية",
    "10 مشرفين + 240 مستخدماً عادياً",
    "شاشة OLED + إرشاد صوتي متعدد اللغات",
    "تركيب مدمج أو خارجي — يناسب ثقوب الباب القياسية",
    "حماية IP54، نطاق تشغيل –10°C إلى +60°C",
  ],
};

const quickFeatures = [
  {
    icon: "📹",
    label: { en: "LIVE VIDEO CALL", ar: "مكالمة فيديو مباشرة" },
    sub: {
      en: "Video intercom with visitors from anywhere via the app.",
      ar: "اتصال مرئي مع الزوار من أي مكان عبر التطبيق.",
    },
  },
  {
    icon: "😊",
    label: { en: "FACE RECOGNITION", ar: "تعرّف على الوجه" },
    sub: {
      en: "Hands-free entry with facial recognition technology.",
      ar: "دخول بدون لمس بتقنية التعرّف على الوجه.",
    },
  },
  {
    icon: "🖐️",
    label: { en: "PALM VEIN", ar: "وريد اليد" },
    sub: {
      en: "Touchless palm vein scanning — ideal for children too.",
      ar: "مسح وريد اليد بدون لمس — مثالي للأطفال أيضاً.",
    },
  },
  {
    icon: "📡",
    label: { en: "ALWAYS-ON Wi-Fi", ar: "Wi-Fi دائم" },
    sub: {
      en: "Live camera access without needing the doorbell to ring.",
      ar: "وصول مباشر للكاميرا دون الحاجة لجرس الباب.",
    },
  },
];

const announcementBar = {
  en: "🔒 The V001 industrial design is registered under Law No. 6769 on Industrial Property and protected for 5 years from 05/01/2026. 🔗 Compatible with Utopic RX, Utopic RXe and Utopic R+ smart locks via a built-in dedicated module.",
  ar: "🔒 التصميم الصناعي لـ V001 مسجّل بموجب القانون رقم 6769 ومحمي لمدة 5 سنوات من 05/01/2026. 🔗 متوافق مع أقفال Utopic RX وRXe وR+ عبر وحدة مدمجة.",
};

const contentSections = [
  // 1. ABOUT THE PRODUCT — text left, image right (v002.png)
  {
    type: "text-image",
    tag: { en: "ABOUT THE PRODUCT", ar: "عن المنتج" },
    heading: {
      en: "Designed to Fit Peepholes",
      ar: "مصمّم ليناسب ثقوب الباب",
    },
    text: {
      en: "DESi QuiC V002 is an advanced smart viewing and access system for your door. Regardless of your location, you can view your door live via an internet connection and have real-time video calls with your visitors.\n\nThanks to the built-in dedicated module, V002 works seamlessly with your Utopic RX, RXe or R+ smart lock — no additional hardware required.",
      ar: "DESi QuiC V002 هو نظام مشاهدة وصول ذكي متقدم لبابك. بغض النظر عن موقعك، يمكنك مشاهدة بابك مباشرةً عبر الإنترنت وإجراء مكالمات فيديو فورية مع زوارك.\n\nبفضل الوحدة المدمجة، يعمل V002 بسلاسة مع قفل Utopic RX أو RXe أو R+ — دون الحاجة لأي أجهزة إضافية.",
    },
    image: "https://endesi.tsoftstatic.com/Data/EditorFiles/v002.png",
  },
  // 2. SMART ACCESS + TUYA APP — two-column, rendered as text-image
  {
    type: "text-image",
    tag: { en: "SMART ACCESS", ar: "وصول ذكي" },
    heading: {
      en: "A Smart Touch for Modern Living",
      ar: "لمسة ذكية للحياة العصرية",
    },
    text: {
      en: "DESi QuiC V002 provides maximum flexibility in door control with multiple access methods: face recognition, palm vein, fingerprint, card and PIN.\n\nWith its always-active integrated Wi-Fi, you can have instant video calls with visitors and manage your home security effectively from anywhere at any time.",
      ar: "يوفر DESi QuiC V002 أقصى قدر من المرونة في التحكم بالباب مع طرق وصول متعددة: تعرّف الوجه، وريد اليد، البصمة، البطاقة والرقم السري.\n\nبفضل Wi-Fi المدمج الدائم التشغيل، يمكنك إجراء مكالمات فيديو فورية مع الزوار وإدارة أمن منزلك من أي مكان.",
    },
    note: {
      en: "Compatible motorised lock or Utopic RX / RXe / R+ required for lock control.",
      ar: "يلزم قفل محرّك متوافق أو Utopic RX / RXe / R+ للتحكم بالقفل.",
    },
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-397-94-K.png",
  },
  // 3. TUYA APP — image left, text right
  {
    type: "image-text",
    tag: { en: "TUYA APP", ar: "تطبيق TUYA" },
    heading: {
      en: "Practical User Management via Mobile App",
      ar: "إدارة مستخدمين عملية عبر التطبيق",
    },
    text: {
      en: "Easily configure palm vein, fingerprint, PIN and face recognition settings through the TUYA app. Grant instant, secure access to guests and employees without being near the door — and monitor all entries and exits in real time.",
      ar: "عيّن إعدادات وريد اليد والبصمة والرقم السري وتعرّف الوجه بسهولة عبر تطبيق TUYA. امنح وصولاً فورياً وآمناً للضيوف والموظفين دون أن تكون قرب الباب — وراقب جميع الدخول والخروج في الوقت الفعلي.",
    },
    note: {
      en: "Utopic RX / RXe / R+ required for remote unlock.",
      ar: "يلزم Utopic RX / RXe / R+ للفتح عن بُعد.",
    },
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-396-94-K.png",
  },
  // 4. ACCESS CONTROL + INSTALLATION — two columns, rendered as two separate sections
  {
    type: "text-image",
    tag: { en: "ACCESS CONTROL", ar: "التحكم بالوصول" },
    heading: {
      en: "Versatile Entry & Authorisation Options",
      ar: "خيارات دخول وتفويض متنوعة",
    },
    text: {
      en: "DESi QuiC V002 offers a broad authorisation capacity of 10 admin users and up to 240 standard users. Whether for your family or your corporate team, you can create tailored access permissions for every individual.",
      ar: "يوفر DESi QuiC V002 طاقة تفويض واسعة تشمل 10 مشرفين وحتى 240 مستخدماً عادياً. سواء لعائلتك أو فريق عملك، يمكنك إنشاء أذونات وصول مخصصة لكل شخص.",
    },
    bullets: [
      { en: "Palm vein recognition", ar: "تعرّف وريد اليد" },
      { en: "Face recognition technology", ar: "تقنية تعرّف الوجه" },
      { en: "Fingerprint reader", ar: "قارئ بصمة الإصبع" },
      { en: "PIN code entry", ar: "إدخال رمز PIN" },
      { en: "Card (Mifare compatible)", ar: "بطاقة (متوافقة مع Mifare)" },
    ],
    note: {
      en: "Utopic RX / RXe / R+ required for lock control.",
      ar: "يلزم Utopic RX / RXe / R+ للتحكم بالقفل.",
    },
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-399-94-K.png",
  },
  // 5. INSTALLATION — image left, text right
  {
    type: "image-text",
    tag: { en: "INSTALLATION", ar: "التركيب" },
    heading: {
      en: "Flexible Mounting Options",
      ar: "خيارات تركيب مرنة",
    },
    text: {
      en: "Choose your preferred installation method — flush-mounted (recessed into the door) or surface-mounted directly onto the door.",
      ar: "اختر طريقة التركيب المفضلة — مدمج (مغسول في الباب) أو خارجي مباشرةً على الباب.",
    },
    bullets: [
      { en: "Flush / ankastre peephole mounting", ar: "تركيب مدمج / أنكاستر" },
      { en: "Surface mounting on door face", ar: "تركيب خارجي على وجه الباب" },
      {
        en: "Fits standard Turkish door peepholes",
        ar: "يناسب ثقوب الباب التركية القياسية",
      },
    ],
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-398-94-K.jpg",
  },
  // 6. REMOTE ACCESS — full text banner
  {
    type: "text-banner",
    tag: { en: "REMOTE ACCESS", ar: "الوصول عن بُعد" },
    heading: {
      en: "Remote Access and Advanced Smart Security",
      ar: "وصول عن بُعد وأمن ذكي متقدم",
    },
    text: {
      en: "DESi QuiC V002 keeps security at your fingertips at all times. View your door live via the internet, hold video intercom calls with visitors, and monitor the exterior in real time via the integrated camera.",
      ar: "يضع DESi QuiC V002 الأمان بين يديك في جميع الأوقات. شاهد بابك مباشرةً عبر الإنترنت، أجرِ مكالمات فيديو مع الزوار، وراقب الخارج في الوقت الفعلي عبر الكاميرا المدمجة.",
    },
    note: {
      en: "Unlock your door remotely with a separately sold Utopic RX, RXe or R+.",
      ar: "افتح بابك عن بُعد باستخدام Utopic RX أو RXe أو R+ المُباع بشكل منفصل.",
    },
    image: null,
  },
  // 7. BIOMETRIC + USER EXPERIENCE — two columns, rendered as two sections
  {
    type: "text-image",
    tag: { en: "BIOMETRIC", ar: "بيومتري" },
    heading: {
      en: "Secure Palm Vein Recognition Technology",
      ar: "تقنية تعرّف وريد اليد الآمنة",
    },
    text: {
      en: "The ideal solution for children who can't reach face recognition cameras. Your child can easily gain access simply by showing their hand.",
      ar: "الحل المثالي للأطفال الذين لا يمكنهم الوصول إلى كاميرات تعرّف الوجه. يمكن لطفلك الدخول بسهولة بمجرد إظهار يده.",
    },
    bullets: [
      {
        en: "Touchless and hygienic biometric reading",
        ar: "قراءة بيومترية بدون لمس وصحية",
      },
      {
        en: "Suitable for all ages — including children",
        ar: "مناسب لجميع الأعمار — بما فيهم الأطفال",
      },
      { en: "High accuracy and fast recognition", ar: "دقة عالية وتعرّف سريع" },
    ],
    note: {
      en: "Utopic RX / RXe / R+ required for lock control.",
      ar: "يلزم Utopic RX / RXe / R+ للتحكم بالقفل.",
    },
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-396-94-K.png",
  },
  // 8. USER EXPERIENCE — image left, text right
  {
    type: "image-text",
    tag: { en: "USER EXPERIENCE", ar: "تجربة المستخدم" },
    heading: {
      en: "Designed for User Comfort",
      ar: "مصمّم لراحة المستخدم",
    },
    text: {
      en: "DESi QuiC V002 is equipped with a multi-language menu and voice guidance system for effortless daily use. Configure settings quickly via the OLED display and charge the removable battery hassle-free via the Type-C port.",
      ar: "مزوّد بقائمة متعددة اللغات ونظام إرشاد صوتي للاستخدام اليومي السهل. اضبط الإعدادات بسرعة عبر شاشة OLED واشحن البطارية القابلة للإزالة بسهولة عبر منفذ Type-C.",
    },
    bullets: [
      {
        en: "OLED display with easy menu navigation",
        ar: "شاشة OLED بتنقل سهل في القوائم",
      },
      {
        en: "Multilingual voice guidance (TR, EN, RU, AR, ES)",
        ar: "إرشاد صوتي متعدد اللغات (تركية، إنجليزية، روسية، عربية، إسبانية)",
      },
      { en: "Type-C charging", ar: "شحن عبر Type-C" },
      {
        en: "Low battery audio and visual alert",
        ar: "تنبيه صوتي ومرئي لانخفاض البطارية",
      },
    ],
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-397-94-K.png",
  },
];

const specGroups = [
  {
    title: { en: "Language Support", ar: "دعم اللغات" },
    items: [
      { en: "Turkish (Türkçe)", ar: "التركية" },
      { en: "English", ar: "الإنجليزية" },
      { en: "Russian (Русский)", ar: "الروسية" },
      { en: "Arabic (العربية)", ar: "العربية" },
      { en: "Spanish (Español)", ar: "الإسبانية" },
    ],
  },
  {
    title: { en: "User Capacity", ar: "طاقة المستخدمين" },
    items: [
      {
        en: "10 admin users (face, palm vein, PIN, card, fingerprint)",
        ar: "10 مشرفين (وجه، وريد اليد، PIN، بطاقة، بصمة)",
      },
      { en: "240 standard users", ar: "240 مستخدماً عادياً" },
      {
        en: "Last 300 access events logged (date, time, user ID)",
        ar: "تسجيل آخر 300 حدث وصول (التاريخ، الوقت، معرّف المستخدم)",
      },
      {
        en: "Live camera access at all times",
        ar: "وصول مباشر للكاميرا في جميع الأوقات",
      },
      {
        en: "Utopic RX / RXe / R+ required for lock control",
        ar: "يلزم Utopic RX / RXe / R+ للتحكم بالقفل",
      },
    ],
  },
  {
    title: { en: "Build & Protection", ar: "البنية والحماية" },
    items: [
      { en: "Aluminium alloy body", ar: "هيكل من سبيكة الألومنيوم" },
      { en: "IP54 protection standard", ar: "معيار حماية IP54" },
      {
        en: "Operating temperature: -10°C ~ +60°C",
        ar: "درجة حرارة التشغيل: –10°C ~ +60°C",
      },
      {
        en: "Flush or surface mount options",
        ar: "خيارات تركيب مدمج أو خارجي",
      },
    ],
  },
  {
    title: { en: "Connectivity & Monitoring", ar: "الاتصال والمراقبة" },
    items: [
      {
        en: "Built-in Wi-Fi — live door monitoring (no doorbell required)",
        ar: "Wi-Fi مدمج — مراقبة مباشرة للباب (لا حاجة لجرس)",
      },
      {
        en: "Video intercom (diaphon) via mobile app",
        ar: "اتصال مرئي (ديافون) عبر تطبيق الجوال",
      },
      {
        en: "Live exterior monitoring via internal display",
        ar: "مراقبة خارجية مباشرة عبر الشاشة الداخلية",
      },
      { en: "TUYA app integration", ar: "تكامل مع تطبيق TUYA" },
      {
        en: "100% compatible with Utopic RX, RXe, R+",
        ar: "متوافق 100% مع Utopic RX وRXe وR+",
      },
    ],
  },
  {
    title: { en: "Functional Features", ar: "الميزات الوظيفية" },
    items: [
      {
        en: "OLED display with easy menu navigation",
        ar: "شاشة OLED بتنقل سهل في القوائم",
      },
      {
        en: "Turkish voice guidance and menu interface",
        ar: "إرشاد صوتي تركي وواجهة قائمة",
      },
      {
        en: "Emergency key access (barrel & key)",
        ar: "وصول بالمفتاح في الطوارئ (برميل ومفتاح)",
      },
      {
        en: "Mifare card and tag compatibility",
        ar: "توافق بطاقة وعلامة Mifare",
      },
      {
        en: "Temporary security lockout on repeated wrong entries",
        ar: "قفل أمني مؤقت عند الإدخال الخاطئ المتكرر",
      },
      {
        en: "External Type-C emergency charging",
        ar: "شحن طارئ خارجي عبر Type-C",
      },
      {
        en: "Low battery audio and visual alerts",
        ar: "تنبيهات صوتية ومرئية لانخفاض البطارية",
      },
    ],
  },
  {
    title: { en: "Compatibility", ar: "التوافق" },
    items: [
      { en: "Utopic RX — 100% compatible", ar: "Utopic RX — متوافق 100%" },
      { en: "Utopic RXe — 100% compatible", ar: "Utopic RXe — متوافق 100%" },
      { en: "Utopic R+ — 100% compatible", ar: "Utopic R+ — متوافق 100%" },
      {
        en: "Built-in dedicated module — pre-installed in device",
        ar: "وحدة مدمجة خاصة — مثبّتة مسبقاً في الجهاز",
      },
    ],
  },
];

const boxContents = [
  {
    icon: "📷",
    name: {
      en: "QuiC V002 Smart Camera System",
      ar: "نظام كاميرا QuiC V002 الذكي",
    },
  },
  {
    icon: "🔌",
    name: { en: "Charging Cable (Type-C)", ar: "كابل الشحن (Type-C)" },
  },
  {
    icon: "🔩",
    name: {
      en: "Installation Templates & Screws",
      ar: "قوالب التركيب والبراغي",
    },
  },
  {
    icon: "🔗",
    name: {
      en: "Utopic-Compatible Module (pre-installed)",
      ar: "وحدة متوافقة مع Utopic (مثبّتة مسبقاً)",
    },
  },
  {
    icon: "📖",
    name: {
      en: "User Manual & Warranty Card",
      ar: "دليل المستخدم وبطاقة الضمان",
    },
  },
];

async function run() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae",
  );
  console.log("Connected to MongoDB.");

  const result = await Product.findOneAndUpdate(
    { slug: "desi-quic-v002" },
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
    console.log("❌ Product not found: desi-quic-v002");
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
