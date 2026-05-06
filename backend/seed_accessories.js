    /**
 * Run with: node seed_accessories.js
 * Upserts all 6 DESi accessory products into MongoDB.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const accessories = [
  // ─────────────────────────────────────────────────────────────────
  // 1. Wireless Remote Controller V2BL
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-rx-rxe-wireless-remote-controller-v2bl",
    name: {
      en: "DESi Utopic RX/RXe Wireless Remote Controller V2BL",
      ar: "جهاز التحكم اللاسلكي DESi Utopic RX/RXe V2BL",
    },
    description: {
      en: "Control your Utopic RX or RXe smart lock without taking out your phone. The V2BL Remote delivers instant, encrypted wireless access from up to 50 meters away.",
      ar: "تحكّم في قفلك الذكي Utopic RX أو RXe دون إخراج هاتفك. يوفر جهاز V2BL وصولاً لاسلكياً فورياً ومشفراً من مسافة تصل إلى 50 متراً.",
    },
    badge: "NEW",
    priceAED: 89,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 50,
    ratings: 5,
    reviewCount: 0,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-374-93-O.png",
    ],
    bullets: {
      en: [
        "50m wireless range — instant access without your phone",
        "Rolling code AES encryption — anti-replay protection",
        "CR2032 battery — up to 3 years battery life",
        "LED indicator on every press",
        "Compact ABS housing — pocket & keychain ready",
        "Compatible: Utopic RX, RXe, R+, P, Rc series",
      ],
      ar: [
        "نطاق لاسلكي 50 متراً — وصول فوري دون هاتف",
        "تشفير AES بالكود المتغير — حماية ضد الاختراق",
        "بطارية CR2032 — عمر يصل إلى 3 سنوات",
        "مؤشر LED عند كل ضغطة",
        "هيكل ABS مدمج — مثالي للجيب وسلسلة المفاتيح",
        "متوافق مع: Utopic RX, RXe, R+, P, Rc",
      ],
    },
    quickFeatures: [
      {
        icon: "📡",
        label: { en: "50M RANGE", ar: "نطاق 50 متر" },
        sub: {
          en: "Instant wireless access from across the room.",
          ar: "وصول لاسلكي فوري من أي مكان.",
        },
      },
      {
        icon: "🔒",
        label: { en: "ROLLING CODE", ar: "كود متغير" },
        sub: {
          en: "Every press generates a unique one-time signal.",
          ar: "كل ضغطة تولّد إشارة فريدة لمرة واحدة.",
        },
      },
      {
        icon: "🔋",
        label: { en: "3 YEAR BATTERY", ar: "بطارية 3 سنوات" },
        sub: {
          en: "CR2032 cell lasts years without replacement.",
          ar: "خلية CR2032 تدوم سنوات دون تغيير.",
        },
      },
      {
        icon: "📶",
        label: { en: "434 MHZ", ar: "434 ميغاهرتز" },
        sub: {
          en: "Stable encrypted 434 MHz RF frequency.",
          ar: "تردد RF مشفّر ومستقر على 434 ميغاهرتز.",
        },
      },
    ],
    announcementBar: {
      en: "⚡ Compatible with Utopic RX, RXe, R+, P and Rc series — NOT compatible with Utopic R, Utopic 3 or PiKS.",
      ar: "⚡ متوافق مع سلسلة Utopic RX وRXe وR+ وP وRc — غير متوافق مع Utopic R أو Utopic 3 أو PiKS.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "ONE CLICK", ar: "ضغطة واحدة" },
        heading: {
          en: "Total Control.\nNo Phone Needed.",
          ar: "تحكّم كامل.\nبدون هاتف.",
        },
        text: {
          en: "The V2BL edition brings pocket-sized convenience to your Utopic RX series. Instant lock/unlock from up to 50 meters, with military-grade rolling code encryption that ensures every signal is unique and unrepeatable.",
          ar: "يجلب جهاز V2BL الراحة المدمجة لسلسلة Utopic RX. قفل وفتح فوري من مسافة تصل إلى 50 متراً، مع تشفير بالكود المتغير على درجة عسكرية يضمن أن كل إشارة فريدة وغير قابلة للإعادة.",
        },
        bullets: [
          {
            en: "V2BL Edition — 434 MHz encrypted",
            ar: "طراز V2BL — 434 ميغاهرتز مشفّر",
          },
          {
            en: "CR2032 battery — pocket & keychain ready",
            ar: "بطارية CR2032 — مدمج للجيب وسلسلة المفاتيح",
          },
          {
            en: "Compatible: Utopic RX, RXe, R+, P, Rc series",
            ar: "متوافق مع: Utopic RX, RXe, R+, P, Rc",
          },
        ],
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-374-93-O.png",
      },
      {
        type: "image-text",
        tag: { en: "SECURITY", ar: "الأمان" },
        heading: { en: "Security You Can Feel", ar: "أمان تحسّه" },
        text: {
          en: "Unlike standard fixed-code remotes, the V2BL uses dynamic rolling code encryption. Every single press generates a unique, one-time signal that cannot be intercepted, recorded, or replayed by would-be attackers.",
          ar: "على عكس أجهزة التحكم ذات الكود الثابت، يستخدم V2BL تشفيراً ديناميكياً بالكود المتغير. كل ضغطة تولّد إشارة فريدة لمرة واحدة لا يمكن اعتراضها أو تسجيلها أو إعادة استخدامها.",
        },
        bullets: [
          {
            en: "Rolling Code — anti-replay protection",
            ar: "كود متغير — حماية ضد إعادة التشغيل",
          },
          {
            en: "LED status indicator on every press",
            ar: "مؤشر LED عند كل ضغطة",
          },
          {
            en: "Compact ABS housing — pocket & keychain ready",
            ar: "هيكل ABS مدمج — مثالي للجيب وسلسلة المفاتيح",
          },
        ],
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
      },
    ],
    specGroups: [
      {
        title: { en: "Connectivity", ar: "الاتصال" },
        items: [
          { en: "Frequency: 434 MHz RF", ar: "التردد: 434 ميغاهرتز RF" },
          { en: "Range: Up to 50 meters", ar: "النطاق: حتى 50 متراً" },
          {
            en: "Encryption: AES Rolling Code",
            ar: "التشفير: AES بالكود المتغير",
          },
        ],
      },
      {
        title: { en: "Power", ar: "الطاقة" },
        items: [
          { en: "Battery: CR2032", ar: "البطارية: CR2032" },
          {
            en: "Battery Life: Up to 3 years",
            ar: "عمر البطارية: حتى 3 سنوات",
          },
        ],
      },
      {
        title: { en: "Physical", ar: "المواصفات الفيزيائية" },
        items: [
          { en: "Material: Durable ABS housing", ar: "المادة: هيكل ABS متين" },
          {
            en: "Form Factor: Pocket / keychain ready",
            ar: "الشكل: مناسب للجيب / سلسلة المفاتيح",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX, RXe, R+, P, Rc series",
            ar: "سلسلة Utopic RX, RXe, R+, P, Rc",
          },
          {
            en: "NOT compatible with Utopic R, 3 or PiKS",
            ar: "غير متوافق مع Utopic R أو 3 أو PiKS",
          },
        ],
      },
    ],
    boxContents: [
      {
        icon: "📡",
        name: { en: "V2BL Remote Controller", ar: "جهاز التحكم V2BL" },
      },
      {
        icon: "🔋",
        name: {
          en: "CR2032 Battery (pre-installed)",
          ar: "بطارية CR2032 (مثبتة مسبقاً)",
        },
      },
      { icon: "📄", name: { en: "User Manual", ar: "دليل المستخدم" } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. WiFi Bridge Hub
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-series-compatible-wifi-bridge-hub",
    name: {
      en: "DESi Utopic Smart Bridge — WiFi Hub",
      ar: "DESi Utopic Smart Bridge — مركز WiFi",
    },
    description: {
      en: "The ultimate gateway for your Utopic ecosystem. Control your smart locks from anywhere in the world and integrate them into your smart home network with Google Home, Alexa, and Home Assistant.",
      ar: "البوابة المثلى لنظام Utopic الخاص بك. تحكّم في أقفالك الذكية من أي مكان في العالم وادمجها في شبكة منزلك الذكي مع Google Home وAlexa وHome Assistant.",
    },
    badge: "NEW",
    priceAED: 249,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 30,
    ratings: 5,
    reviewCount: 62,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-series-compatible-wifi-bridge-hub-accessories-338-45-O.png",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-series-compatible-wifi-bridge-hub-accessories-338-45-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-series-compatible-wifi-bridge-hub-accessories-94-45-O.png",
    ],
    bullets: {
      en: [
        "Control smart locks from anywhere in the world",
        "Real-time door status and battery level monitoring",
        "Manage up to 4 smart locks simultaneously",
        "Generate E-keys and OTP for guests remotely",
        "Google Home, Alexa & Home Assistant integration",
        "AES-256 encrypted cloud communication",
        "USB-C powered — easy placement anywhere",
        "Supports up to 18 different users",
      ],
      ar: [
        "تحكّم في الأقفال الذكية من أي مكان في العالم",
        "مراقبة حالة الباب ومستوى البطارية في الوقت الفعلي",
        "إدارة ما يصل إلى 4 أقفال ذكية في آنٍ واحد",
        "إنشاء مفاتيح إلكترونية وكلمات مرور لمرة واحدة للضيوف عن بُعد",
        "تكامل مع Google Home وAlexa وHome Assistant",
        "اتصال سحابي مشفّر AES-256",
        "يعمل بـ USB-C — سهل الوضع في أي مكان",
        "يدعم حتى 18 مستخدماً مختلفاً",
      ],
    },
    quickFeatures: [
      {
        icon: "🌍",
        label: { en: "REMOTE ACCESS", ar: "وصول عن بُعد" },
        sub: {
          en: "Control and monitor your lock from anywhere globally.",
          ar: "تحكّم وراقب قفلك من أي مكان في العالم.",
        },
      },
      {
        icon: "🔗",
        label: { en: "MULTI-LOCK HUB", ar: "مركز متعدد الأقفال" },
        sub: {
          en: "One bridge manages up to 4 Utopic locks.",
          ar: "جسر واحد يدير ما يصل إلى 4 أقفال Utopic.",
        },
      },
      {
        icon: "🏠",
        label: { en: "SMART HOME", ar: "المنزل الذكي" },
        sub: {
          en: "Google Home, Alexa & Home Assistant.",
          ar: "Google Home وAlexa وHome Assistant.",
        },
      },
      {
        icon: "🗝️",
        label: { en: "E-KEYS & OTP", ar: "مفاتيح إلكترونية وOTP" },
        sub: {
          en: "Share access remotely with guests or deliveries.",
          ar: "شارك الوصول عن بُعد مع الضيوف أو التسليم.",
        },
      },
    ],
    announcementBar: {
      en: "🌐 Compatible with Utopic RX, R, ROK & 3 series — place within 5m of the lock and 10m of your WiFi router for best performance.",
      ar: "🌐 متوافق مع سلسلة Utopic RX وR وROK و3 — ضعه على بُعد 5 أمتار من القفل و10 أمتار من راوتر WiFi للأداء الأمثل.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "TOTAL REMOTE CONTROL", ar: "تحكّم عن بُعد كامل" },
        heading: {
          en: "Your Lock.\nAnywhere in the World.",
          ar: "قفلك.\nفي أي مكان في العالم.",
        },
        text: {
          en: "Bring the power of internet connectivity to your door security. Experience real-time status updates and global management — lock, unlock, and monitor your door from your phone no matter where you are.",
          ar: "أضف قوة الاتصال بالإنترنت إلى أمان بابك. اختبر تحديثات الحالة الفورية والإدارة العالمية — أقفل وافتح وراقب بابك من هاتفك أينما كنت.",
        },
        bullets: [
          {
            en: "Real-time lock/unlock status from your phone",
            ar: "حالة القفل والفتح الفورية من هاتفك",
          },
          {
            en: "Battery level monitoring for all connected devices",
            ar: "مراقبة مستوى البطارية لجميع الأجهزة المتصلة",
          },
          {
            en: "Push notifications on every door event",
            ar: "إشعارات فورية على كل حدث للباب",
          },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/45/images/2.jpeg",
      },
      {
        type: "image-text",
        tag: { en: "SMART INTEGRATION", ar: "التكامل الذكي" },
        heading: { en: '"Alexa, Lock the Door"', ar: '"أليكسا، أقفلي الباب"' },
        text: {
          en: "Full ecosystem integration with major smart home platforms for effortless voice-controlled security. Set custom automations, create scenes, and let your home work for you.",
          ar: "تكامل كامل مع منصات المنزل الذكي الرائدة للأمان المتحكّم به صوتياً بكل سهولة. اضبط التشغيل التلقائي المخصص وأنشئ المشاهد ودع منزلك يعمل من أجلك.",
        },
        bullets: [
          {
            en: "Google Home & Google Assistant support",
            ar: "دعم Google Home وGoogle Assistant",
          },
          { en: "Amazon Alexa voice commands", ar: "أوامر صوتية Amazon Alexa" },
          {
            en: "Home Assistant (open source) integration",
            ar: "تكامل Home Assistant (مفتوح المصدر)",
          },
          { en: "Custom scenario creation", ar: "إنشاء سيناريوهات مخصصة" },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/45/images/2.jpeg",
      },
      {
        type: "text-banner",
        tag: { en: "MULTI-LOCK HUB", ar: "مركز متعدد الأقفال" },
        heading: {
          en: "One Bridge.\nFour Locks.",
          ar: "جسر واحد.\nأربعة أقفال.",
        },
        text: {
          en: "A single Smart Bridge can manage and synchronize up to 4 different Utopic smart locks or receivers simultaneously. Share E-keys and one-time passwords with guests remotely — all from one app.",
          ar: "يمكن لجسر Smart Bridge واحد إدارة ومزامنة ما يصل إلى 4 أقفال أو مستقبلات Utopic ذكية مختلفة في آنٍ واحد. شارك المفاتيح الإلكترونية وكلمات المرور لمرة واحدة مع الضيوف عن بُعد — كل ذلك من تطبيق واحد.",
        },
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-series-compatible-wifi-bridge-hub-accessories-94-45-O.png",
      },
    ],
    specGroups: [
      {
        title: { en: "Power & Connectivity", ar: "الطاقة والاتصال" },
        items: [
          {
            en: "Power Input: 5V DC (USB-C)",
            ar: "مدخل الطاقة: 5 فولت تيار مستمر (USB-C)",
          },
          {
            en: "Connectivity: WiFi / BLE / RF 434 MHz",
            ar: "الاتصال: WiFi / BLE / RF 434 ميغاهرتز",
          },
        ],
      },
      {
        title: { en: "Capacity", ar: "السعة" },
        items: [
          {
            en: "User Capacity: 18 different users",
            ar: "سعة المستخدمين: 18 مستخدماً مختلفاً",
          },
          {
            en: "Max Hub Capacity: 4 smart locks",
            ar: "الحد الأقصى للمركز: 4 أقفال ذكية",
          },
        ],
      },
      {
        title: { en: "Smart Home", ar: "المنزل الذكي" },
        items: [
          {
            en: "Google Home / Google Assistant",
            ar: "Google Home / Google Assistant",
          },
          { en: "Amazon Alexa", ar: "Amazon Alexa" },
          {
            en: "Home Assistant (open source)",
            ar: "Home Assistant (مفتوح المصدر)",
          },
        ],
      },
      {
        title: { en: "Installation", ar: "التركيب" },
        items: [
          {
            en: "Place within 5m of the smart lock",
            ar: "ضعه على بُعد 5 أمتار من القفل الذكي",
          },
          {
            en: "Place within 10m of WiFi router",
            ar: "ضعه على بُعد 10 أمتار من راوتر WiFi",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX, R, ROK & 3 series",
            ar: "سلسلة Utopic RX وR وROK و3",
          },
          {
            en: "DESi Smart App (iOS & Android)",
            ar: "تطبيق DESi Smart (iOS وAndroid)",
          },
        ],
      },
    ],
    boxContents: [
      {
        icon: "🌐",
        name: { en: "DESi Smart Bridge Unit", ar: "وحدة DESi Smart Bridge" },
      },
      { icon: "🔌", name: { en: "USB-C Power Cable", ar: "كابل طاقة USB-C" } },
      { icon: "🔌", name: { en: "USB Power Adapter", ar: "محوّل طاقة USB" } },
      { icon: "📄", name: { en: "User Manual", ar: "دليل المستخدم" } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. Door Sensor + Auto Lock V3BL
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-door-sensor-auto-lock-module",
    name: {
      en: "DESi Utopic RX/RXe Door Sensor + Auto Lock V3BL",
      ar: "حساس الباب + القفل التلقائي DESi Utopic RX/RXe V3BL",
    },
    description: {
      en: "The intelligent eye for your Utopic RX series. Automatically detects when your door is closed and triggers instant locking for absolute peace of mind.",
      ar: "العين الذكية لسلسلة Utopic RX الخاصة بك. يكشف تلقائياً عند إغلاق بابك ويشغّل القفل الفوري لراحة بال مطلقة.",
    },
    badge: "NEW",
    priceAED: 89,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 50,
    ratings: 5,
    reviewCount: 0,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
      "https://desien.desi.net.tr/products_images/2026/Accessories/92/images/2.jpeg",
    ],
    bullets: {
      en: [
        "Automatic door-close detection triggers instant locking",
        "Real-time push notifications on door open/close",
        "Passage mode — disable auto-lock during set hours",
        "Magnetic induction sensor — detects up to 15mm gap",
        "1 x AA battery powered — fully wireless",
        "Compatible with Utopic RX and RXe series only",
      ],
      ar: [
        "كشف إغلاق الباب التلقائي يشغّل القفل الفوري",
        "إشعارات فورية عند فتح الباب أو إغلاقه",
        "وضع المرور — تعطيل القفل التلقائي خلال ساعات محددة",
        "حساس حثّ مغناطيسي — يكشف فجوة تصل إلى 15 مم",
        "يعمل بـ بطارية AA واحدة — لاسلكي كامل",
        "متوافق مع سلسلة Utopic RX وRXe فقط",
      ],
    },
    quickFeatures: [
      {
        icon: "🚪",
        label: { en: "AUTO LOCK", ar: "قفل تلقائي" },
        sub: {
          en: "Instantly locks when door closes — every time.",
          ar: "يقفل فوراً عند إغلاق الباب — في كل مرة.",
        },
      },
      {
        icon: "📲",
        label: { en: "REAL-TIME ALERTS", ar: "تنبيهات فورية" },
        sub: {
          en: "Push notifications on every door event.",
          ar: "إشعارات فورية على كل حدث للباب.",
        },
      },
      {
        icon: "🕐",
        label: { en: "PASSAGE MODE", ar: "وضع المرور" },
        sub: {
          en: "Disable auto-lock during office or busy hours.",
          ar: "تعطيل القفل التلقائي خلال ساعات الدوام.",
        },
      },
      {
        icon: "🔋",
        label: { en: "1 x AA BATTERY", ar: "بطارية AA" },
        sub: {
          en: "Single AA battery — long-lasting wireless power.",
          ar: "بطارية AA واحدة — طاقة لاسلكية طويلة الأمد.",
        },
      },
    ],
    announcementBar: {
      en: "⚠️ Designed exclusively for Utopic RX and RXe series. NOT compatible with Utopic R, Utopic 3, or PiKS models.",
      ar: "⚠️ مصمم حصرياً لسلسلة Utopic RX وRXe. غير متوافق مع Utopic R أو Utopic 3 أو PiKS.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "WIRELESS DOOR SENSOR", ar: "حساس الباب اللاسلكي" },
        heading: {
          en: "The Door Closed.\nIt's Already Locked.",
          ar: "الباب أُغلق.\nوالقفل انتهى بالفعل.",
        },
        text: {
          en: "The V3BL door sensor automatically detects the moment your door closes and triggers the Utopic RX lock instantly. No forgetting, no worrying — your home secures itself.",
          ar: "يكشف حساس الباب V3BL تلقائياً اللحظة التي يُغلق فيها بابك ويشغّل قفل Utopic RX فوراً. لا نسيان ولا قلق — منزلك يؤمّن نفسه.",
        },
        bullets: [
          {
            en: "Magnetic induction — detects up to 15mm door gap",
            ar: "حثّ مغناطيسي — يكشف فجوة تصل إلى 15 مم",
          },
          {
            en: "Wireless — no cables, no drilling",
            ar: "لاسلكي — بدون كابلات أو حفر",
          },
          {
            en: "Passage mode via the DESi Smart App",
            ar: "وضع المرور عبر تطبيق DESi Smart",
          },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/92/images/2.jpeg",
      },
      {
        type: "image-text",
        tag: { en: "ALWAYS CONNECTED", ar: "متصل دائماً" },
        heading: {
          en: "Know the Moment\nYour Door Moves.",
          ar: "اعرف اللحظة التي\nيتحرّك فيها بابك.",
        },
        text: {
          en: "Receive instant push notifications on your smartphone whenever your door is opened or closed. Track detailed entry/exit logs with precise timestamps via the DESi Smart Bridge.",
          ar: "استقبل إشعارات فورية على هاتفك الذكي في كل مرة يُفتح فيها بابك أو يُغلق. تتبّع سجلات الدخول والخروج التفصيلية مع طوابع زمنية دقيقة عبر DESi Smart Bridge.",
        },
        note: {
          en: "Requires DESi Smart Bridge for push notifications and remote logging.",
          ar: "يتطلب DESi Smart Bridge للإشعارات الفورية والسجلات عن بُعد.",
        },
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
      },
    ],
    specGroups: [
      {
        title: { en: "Sensor", ar: "الحساس" },
        items: [
          {
            en: "Sensor Type: Magnetic Induction",
            ar: "نوع الحساس: حثّ مغناطيسي",
          },
          { en: "Max Detection Gap: 15 mm", ar: "أقصى فجوة للكشف: 15 مم" },
        ],
      },
      {
        title: { en: "Power", ar: "الطاقة" },
        items: [
          {
            en: "Power Source: 1 x AA Battery",
            ar: "مصدر الطاقة: بطارية AA واحدة",
          },
        ],
      },
      {
        title: { en: "Physical", ar: "المواصفات الفيزيائية" },
        items: [{ en: "Material: Durable ABS", ar: "المادة: ABS متين" }],
      },
      {
        title: { en: "Features", ar: "الميزات" },
        items: [
          {
            en: "Auto-lock trigger on door close",
            ar: "تشغيل القفل التلقائي عند إغلاق الباب",
          },
          {
            en: "Passage mode (disable auto-lock by schedule)",
            ar: "وضع المرور (تعطيل القفل التلقائي بالجدول الزمني)",
          },
          {
            en: "Push notifications (requires Smart Bridge)",
            ar: "إشعارات فورية (تتطلب Smart Bridge)",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX and RXe series ONLY",
            ar: "سلسلة Utopic RX وRXe فقط",
          },
          {
            en: "NOT compatible with Utopic R, 3 or PiKS",
            ar: "غير متوافق مع Utopic R أو 3 أو PiKS",
          },
        ],
      },
    ],
    boxContents: [
      { icon: "🚪", name: { en: "Door Sensor Module", ar: "وحدة حساس الباب" } },
      {
        icon: "🔋",
        name: {
          en: "1 x AA Battery (pre-installed)",
          ar: "بطارية AA واحدة (مثبتة مسبقاً)",
        },
      },
      {
        icon: "🔩",
        name: { en: "Mounting Adhesive & Screws", ar: "لاصق وبراغي التثبيت" },
      },
      { icon: "📄", name: { en: "User Manual", ar: "دليل المستخدم" } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. Smart Home Automation Interface V3BL
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-rx-smart-home-automation-interface-v3",
    name: {
      en: "DESi Utopic RX/RXe Smart Home Automation Interface V3BL",
      ar: "واجهة أتمتة المنزل الذكي DESi Utopic RX/RXe V3BL",
    },
    description: {
      en: "The professional HAI V3BL module bridges the gap between your smart home ecosystem and Utopic RX series locks. Experience encrypted, low-latency control.",
      ar: "تجسّر الوحدة الاحترافية HAI V3BL الفجوة بين منظومة منزلك الذكي وأقفال سلسلة Utopic RX. اختبر التحكم المشفّر منخفض الاستجابة.",
    },
    badge: "NEW",
    priceAED: 129,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 30,
    ratings: 5,
    reviewCount: 0,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-home-automation-interface-v3-accessories-385-85-O.jpg",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-home-automation-interface-v3-accessories-385-85-O.jpg",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-home-automation-interface-v3-accessories-299-85-O.png",
      "https://desien.desi.net.tr/products_images/2026/Accessories/85/images/2.jpeg",
    ],
    bullets: {
      en: [
        "Integrates Utopic RX locks into any smart home automation system",
        "Dry contact input — works with any home automation controller",
        "Encrypted Bluetooth wireless protocol",
        "Custom pulse durations and toggle behaviors",
        "5–12V DC input — flexible power supply",
        "Compatible with Utopic RX and RXe series only",
      ],
      ar: [
        "يدمج أقفال Utopic RX في أي نظام أتمتة منزلي ذكي",
        "مدخل تلامس جاف — يعمل مع أي وحدة تحكم أتمتة",
        "بروتوكول لاسلكي بلوتوث مشفّر",
        "مدد نبضة ومسلوكيات تبديل قابلة للتخصيص",
        "مدخل 5–12 فولت تيار مستمر — إمداد طاقة مرن",
        "متوافق مع سلسلة Utopic RX وRXe فقط",
      ],
    },
    quickFeatures: [
      {
        icon: "🏠",
        label: { en: "HOME AUTOMATION", ar: "أتمتة المنزل" },
        sub: {
          en: "Integrate RX locks into any automation system.",
          ar: "ادمج أقفال RX في أي نظام أتمتة.",
        },
      },
      {
        icon: "🔌",
        label: { en: "DRY CONTACT", ar: "تلامس جاف" },
        sub: {
          en: "Universal dry contact input for any controller.",
          ar: "مدخل تلامس جاف عالمي لأي وحدة تحكم.",
        },
      },
      {
        icon: "⚡",
        label: { en: "5–12V DC", ar: "5–12 فولت" },
        sub: {
          en: "Flexible low-voltage power supply.",
          ar: "إمداد طاقة مرن بجهد منخفض.",
        },
      },
      {
        icon: "📱",
        label: { en: "APP CONTROL", ar: "تحكم بالتطبيق" },
        sub: {
          en: "Configure pulse and toggle via DESi Smart App.",
          ar: "اضبط النبضة والتبديل عبر تطبيق DESi Smart.",
        },
      },
    ],
    announcementBar: {
      en: "⚠️ Exclusively for Utopic RX and RXe series. Electrical connections MUST be performed by a licensed technician.",
      ar: "⚠️ حصرياً لسلسلة Utopic RX وRXe. يجب أن تتم التوصيلات الكهربائية بواسطة فني مرخّص.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "AUTOMATION INTERFACE V3", ar: "واجهة الأتمتة V3" },
        heading: { en: "Your Lock.\nYour Rules.", ar: "قفلك.\nقواعدك." },
        text: {
          en: "The HAI V3BL module is the professional bridge between your smart home automation controller and your Utopic RX lock. Using an encrypted Bluetooth wireless protocol and dry contact input, it enables seamless, low-latency integration with any automation system.",
          ar: "تعدّ وحدة HAI V3BL الجسر الاحترافي بين وحدة تحكم أتمتة منزلك الذكي وقفل Utopic RX. باستخدام بروتوكول بلوتوث لاسلكي مشفّر ومدخل تلامس جاف، تتيح تكاملاً سلساً منخفض الاستجابة مع أي نظام أتمتة.",
        },
        bullets: [
          {
            en: "Dry contact input — pulse-triggered locking",
            ar: "مدخل تلامس جاف — قفل بالنبضة",
          },
          {
            en: "Encrypted Bluetooth wireless protocol",
            ar: "بروتوكول بلوتوث لاسلكي مشفّر",
          },
          {
            en: "5–12V DC operating voltage",
            ar: "جهد تشغيل 5–12 فولت تيار مستمر",
          },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/85/images/2.jpeg",
      },
      {
        type: "image-text",
        tag: { en: "SMART SYNERGY", ar: "التآزر الذكي" },
        heading: {
          en: "Customize Your\nAutomation Logic.",
          ar: "خصّص منطق\nالأتمتة الخاص بك.",
        },
        text: {
          en: "Set pulse durations, toggle behaviors, or delayed actions to match your existing smart home scenes perfectly. Configure everything via the DESi Smart App — no additional hardware required.",
          ar: "اضبط مدد النبضة وسلوكيات التبديل أو الإجراءات المؤجلة لتتناسب تماماً مع مشاهد منزلك الذكي الحالية. اضبط كل شيء عبر تطبيق DESi Smart — لا حاجة لأجهزة إضافية.",
        },
        note: {
          en: "Electrical connections must be performed by a licensed technician. Incorrect wiring can permanently damage the module and void the warranty.",
          ar: "يجب أن تتم التوصيلات الكهربائية بواسطة فني مرخّص. التوصيل الخاطئ قد يتلف الوحدة نهائياً ويبطل الضمان.",
        },
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-home-automation-interface-v3-accessories-299-85-O.png",
      },
    ],
    specGroups: [
      {
        title: { en: "Electrical", ar: "الكهربائية" },
        items: [
          {
            en: "Operating Voltage: 5–12V DC",
            ar: "جهد التشغيل: 5–12 فولت تيار مستمر",
          },
          {
            en: "Current Draw: Max 30 mA",
            ar: "استهلاك التيار: 30 مللي أمبير كحد أقصى",
          },
        ],
      },
      {
        title: { en: "Wireless", ar: "اللاسلكي" },
        items: [
          {
            en: "Protocol: Encrypted Bluetooth",
            ar: "البروتوكول: بلوتوث مشفّر",
          },
          {
            en: "Input Type: Dry Contact (Pulse)",
            ar: "نوع المدخل: تلامس جاف (نبضة)",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX and RXe series ONLY",
            ar: "سلسلة Utopic RX وRXe فقط",
          },
          {
            en: "NOT compatible with Utopic R, 3 or PiKS",
            ar: "غير متوافق مع Utopic R أو 3 أو PiKS",
          },
        ],
      },
      {
        title: { en: "Installation", ar: "التركيب" },
        items: [
          {
            en: "Must be installed by a licensed electrician",
            ar: "يجب التركيب بواسطة كهربائي مرخّص",
          },
        ],
      },
    ],
    boxContents: [
      {
        icon: "⚡",
        name: {
          en: "HAI V3BL Automation Interface Module",
          ar: "وحدة واجهة الأتمتة HAI V3BL",
        },
      },
      { icon: "🔩", name: { en: "Mounting Hardware", ar: "أدوات التثبيت" } },
      { icon: "📄", name: { en: "Technical Manual", ar: "الدليل التقني" } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. Face Recognition + Touch Keypad (RX/RXe)
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad",
    name: {
      en: "DESi Utopic RX/RXe Face Recognition & Touch Keypad",
      ar: "لوحة التعرف على الوجه + لوحة اللمس DESi Utopic RX/RXe",
    },
    description: {
      en: "Step into the future of entry. Advanced 3D facial recognition meets high-capacity secure keypad for a truly keyless, contactless lifestyle.",
      ar: "ادخل إلى مستقبل الدخول. يجتمع التعرف على الوجه ثلاثي الأبعاد المتقدم مع لوحة مفاتيح آمنة عالية السعة لأسلوب حياة خالٍ من المفاتيح والتلامس.",
    },
    badge: "NEW",
    priceAED: 659,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 20,
    ratings: 5,
    reviewCount: 0,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-283-81-O.png",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-283-81-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-346-81-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-347-81-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-284-81-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-386-81-O.jpg",
    ],
    bullets: {
      en: [
        "3D structured light face recognition — 100 face capacity",
        "Anti-spoofing liveness detection — cannot be fooled by photos",
        "Works with glasses, hats, and makeup",
        "Dual IR sensors for superior night vision",
        "Backup PIN keypad — 10 programmable codes",
        "AES-256 GCM military-grade encryption",
        "4 x AA battery powered — fully wireless",
        "CRA 2027 compliant security architecture",
      ],
      ar: [
        "تعرّف على الوجه بالضوء المهيكل ثلاثي الأبعاد — سعة 100 وجه",
        "كشف الحيوية لمكافحة الانتحال — لا يمكن خداعه بالصور",
        "يعمل مع النظارات والقبعات والمكياج",
        "حساسا IR مزدوجان لرؤية ليلية متفوقة",
        "لوحة مفاتيح PIN احتياطية — 10 رموز قابلة للبرمجة",
        "تشفير عسكري AES-256 GCM",
        "يعمل بـ 4 بطاريات AA — لاسلكي كامل",
        "بنية أمنية متوافقة مع CRA 2027",
      ],
    },
    quickFeatures: [
      {
        icon: "😊",
        label: { en: "3D FACE ID", ar: "بطاقة الوجه ثلاثية الأبعاد" },
        sub: {
          en: "100 face capacity with anti-spoofing liveness detection.",
          ar: "سعة 100 وجه مع كشف الحيوية لمكافحة الانتحال.",
        },
      },
      {
        icon: "🔢",
        label: { en: "PIN BACKUP", ar: "PIN احتياطي" },
        sub: {
          en: "10 programmable PIN codes on backlit capacitive keypad.",
          ar: "10 رموز PIN قابلة للبرمجة على لوحة مضيئة.",
        },
      },
      {
        icon: "🔒",
        label: { en: "AES-256 GCM", ar: "تشفير AES-256 GCM" },
        sub: {
          en: "Military-grade encryption for all wireless communications.",
          ar: "تشفير عسكري لجميع الاتصالات اللاسلكية.",
        },
      },
      {
        icon: "🌙",
        label: { en: "NIGHT VISION", ar: "رؤية ليلية" },
        sub: {
          en: "Dual IR sensors for reliable recognition in any light.",
          ar: "حساسا IR مزدوجان للتعرف الموثوق في أي ضوء.",
        },
      },
    ],
    announcementBar: {
      en: "⚠️ Compatible ONLY with DESi Utopic RX and RXe series. NOT compatible with Utopic R, Utopic 3, or PiKS series.",
      ar: "⚠️ متوافق فقط مع سلسلة DESi Utopic RX وRXe. غير متوافق مع Utopic R أو Utopic 3 أو PiKS.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "ACCESS EVOLUTION", ar: "تطور الوصول" },
        heading: { en: "Your Face Is\nYour Key.", ar: "وجهك هو\nمفتاحك." },
        text: {
          en: "The DESi Face Recognition & Keypad unit delivers cutting-edge contactless entry. State-of-the-art 3D structured light technology maps your face in milliseconds — even with glasses, hats, or in complete darkness using dual IR sensors.",
          ar: "توفّر وحدة التعرف على الوجه ولوحة المفاتيح من DESi دخولاً متطوراً بدون تلامس. تقوم تقنية الضوء المهيكل ثلاثي الأبعاد المتطورة برسم خارطة لوجهك في غضون ميلي ثانية — حتى مع النظارات أو القبعات أو في الظلام التام باستخدام حساسي IR مزدوجين.",
        },
        bullets: [
          {
            en: "100 face capacity — enroll family or office staff",
            ar: "سعة 100 وجه — سجّل العائلة أو موظفي المكتب",
          },
          {
            en: "Works with glasses, hats, makeup",
            ar: "يعمل مع النظارات والقبعات والمكياج",
          },
          {
            en: "Anti-spoofing liveness detection",
            ar: "كشف الحيوية لمكافحة الانتحال",
          },
          {
            en: "Dual IR sensors for superior night vision",
            ar: "حساسا IR مزدوجان لرؤية ليلية متفوقة",
          },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/81/images/2.jpeg",
      },
      {
        type: "image-text",
        tag: { en: "DUAL ACCESS", ar: "وصول مزدوج" },
        heading: {
          en: "Face or PIN —\nAlways a Backup.",
          ar: "وجه أو PIN —\nدائماً بديل.",
        },
        text: {
          en: "Full numeric keypad support for up to 10 unique PIN codes. The backlit capacitive touch keypad ensures easy night operation, so you're never locked out when you need access most.",
          ar: "دعم لوحة أرقام كاملة لما يصل إلى 10 رموز PIN فريدة. تضمن لوحة اللمس السعوية المضيئة سهولة التشغيل الليلي، حتى لا تُقفل خارج المنزل أبداً عندما تحتاج الوصول أكثر.",
        },
        bullets: [
          { en: "10 programmable PIN codes", ar: "10 رموز PIN قابلة للبرمجة" },
          { en: "Backlit capacitive touch surface", ar: "سطح لمس سعوي مضيء" },
          {
            en: "AES-256 GCM encrypted wireless — CRA 2027 compliant",
            ar: "لاسلكي مشفّر AES-256 GCM — متوافق مع CRA 2027",
          },
        ],
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-346-81-O.png",
      },
    ],
    specGroups: [
      {
        title: { en: "Biometrics", ar: "القياسات الحيوية" },
        items: [
          {
            en: "Technology: 3D Structured Light",
            ar: "التقنية: ضوء مهيكل ثلاثي الأبعاد",
          },
          { en: "Face Capacity: 100 individuals", ar: "سعة الوجوه: 100 فرد" },
          {
            en: "Anti-spoofing liveness detection",
            ar: "كشف الحيوية لمكافحة الانتحال",
          },
          {
            en: "Dual IR sensors for night vision",
            ar: "حساسا IR مزدوجان للرؤية الليلية",
          },
        ],
      },
      {
        title: { en: "Keypad", ar: "لوحة المفاتيح" },
        items: [
          { en: "PIN Capacity: 10 codes", ar: "سعة PIN: 10 رموز" },
          { en: "Backlit capacitive touch surface", ar: "سطح لمس سعوي مضيء" },
        ],
      },
      {
        title: { en: "Security & Power", ar: "الأمان والطاقة" },
        items: [
          { en: "Encryption: AES-256 GCM", ar: "التشفير: AES-256 GCM" },
          {
            en: "Standard: CRA 2027 compliant",
            ar: "المعيار: متوافق مع CRA 2027",
          },
          {
            en: "Power Supply: 4 x AA Alkaline Batteries",
            ar: "مصدر الطاقة: 4 بطاريات AA Alkaline",
          },
        ],
      },
      {
        title: { en: "Physical", ar: "المواصفات الفيزيائية" },
        items: [
          {
            en: "Material: Zinc Alloy (Zamak) & P/C",
            ar: "المادة: سبيكة الزنك (Zamak) و P/C",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX and RXe series ONLY",
            ar: "سلسلة Utopic RX وRXe فقط",
          },
          {
            en: "NOT compatible with Utopic R, 3 or PiKS",
            ar: "غير متوافق مع Utopic R أو 3 أو PiKS",
          },
        ],
      },
    ],
    boxContents: [
      {
        icon: "😊",
        name: {
          en: "Face Recognition & Keypad Unit",
          ar: "وحدة التعرف على الوجه ولوحة المفاتيح",
        },
      },
      {
        icon: "🔋",
        name: { en: "4 x AA Alkaline Batteries", ar: "4 بطاريات AA Alkaline" },
      },
      {
        icon: "🔩",
        name: { en: "Mounting Hardware & Template", ar: "أدوات وقالب التثبيت" },
      },
      { icon: "📄", name: { en: "User Manual", ar: "دليل المستخدم" } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. Fingerprint + Touch Keypad V3 BL (RX/RXe)
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3",
    name: {
      en: "DESi Utopic RX/RXe Fingerprint Reader & Touch Keypad V3",
      ar: "قارئ بصمة الإصبع + لوحة اللمس DESi Utopic RX/RXe V3",
    },
    description: {
      en: "Total entry freedom through high-performance biometrics. Award-winning fingerprint evaluation meets a secure touch keypad for the ultimate hybrid access.",
      ar: "حرية دخول كاملة من خلال القياسات الحيوية عالية الأداء. يجتمع تقييم بصمة الإصبع الحائز على جوائز مع لوحة مفاتيح لمس آمنة للوصول الهجين المثالي.",
    },
    badge: "NEW",
    priceAED: 659,
    category: "accessories",
    isNew: true,
    isActive: true,
    stock: 20,
    ratings: 5,
    reviewCount: 0,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-344-74-O.png",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-344-74-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-227-74-O.png",
      "https://desien.desi.net.tr/products_images/2026/Accessories/74/images/2.jpeg",
    ],
    bullets: {
      en: [
        "500 DPI industrial-grade capacitive fingerprint sensor",
        "100 fingerprint + 10 PIN code capacity",
        "Recognition in under 1 second",
        "Award-winning biometric evaluation logic",
        "Weather-resistant zinc alloy housing",
        "Cordless oval design — no cables, no drilling",
        "434 MHz encrypted wireless communication",
        "2 x AA battery powered",
      ],
      ar: [
        "حساس بصمة إصبع سعوي صناعي بدقة 500 DPI",
        "سعة 100 بصمة إصبع + 10 رمز PIN",
        "تعرّف في أقل من ثانية واحدة",
        "منطق تقييم بيومتري حائز على جوائز",
        "هيكل من سبيكة الزنك مقاوم للطقس",
        "تصميم بيضاوي لاسلكي — بدون كابلات أو حفر",
        "اتصال لاسلكي مشفّر 434 ميغاهرتز",
        "يعمل بـ 2 بطارية AA",
      ],
    },
    quickFeatures: [
      {
        icon: "👆",
        label: { en: "500 DPI SENSOR", ar: "حساس 500 DPI" },
        sub: {
          en: "Industrial-grade capacitive sensor — < 1 sec recognition.",
          ar: "حساس سعوي صناعي — تعرّف في أقل من ثانية.",
        },
      },
      {
        icon: "🔢",
        label: { en: "100 PRINTS + 10 PINs", ar: "100 بصمة + 10 PIN" },
        sub: {
          en: "High-capacity hybrid access for home or office.",
          ar: "وصول هجين عالي السعة للمنزل أو المكتب.",
        },
      },
      {
        icon: "🌦️",
        label: { en: "WEATHER RESISTANT", ar: "مقاوم للطقس" },
        sub: {
          en: "Zinc alloy housing built for outdoor use.",
          ar: "هيكل من سبيكة الزنك مصمم للاستخدام الخارجي.",
        },
      },
      {
        icon: "🔒",
        label: { en: "434 MHZ ENCRYPTED", ar: "434 ميغاهرتز مشفّر" },
        sub: {
          en: "Wireless security against external interception.",
          ar: "أمان لاسلكي ضد الاعتراض الخارجي.",
        },
      },
    ],
    announcementBar: {
      en: "⚠️ Compatible ONLY with DESi Utopic RX and RXe series. NOT compatible with Utopic R, Utopic 3, or PiKS series.",
      ar: "⚠️ متوافق فقط مع سلسلة DESi Utopic RX وRXe. غير متوافق مع Utopic R أو Utopic 3 أو PiKS.",
    },
    contentSections: [
      {
        type: "text-image",
        tag: { en: "FINGERPRINT & KEYPAD", ar: "بصمة الإصبع ولوحة المفاتيح" },
        heading: {
          en: "Touch to Enter.\nIn Under a Second.",
          ar: "المسّ للدخول.\nفي أقل من ثانية.",
        },
        text: {
          en: "The V3 BL fingerprint module combines an award-winning 500 DPI industrial sensor with a secure wireless keypad. Enroll up to 100 fingerprints and 10 PIN codes for complete hybrid access control — no cables, no drilling required.",
          ar: "تجمع وحدة بصمة الإصبع V3 BL بين حساس صناعي 500 DPI الحائز على جوائز ولوحة مفاتيح لاسلكية آمنة. سجّل ما يصل إلى 100 بصمة إصبع و10 رموز PIN للتحكم الكامل في الوصول الهجين — بدون كابلات أو حفر.",
        },
        bullets: [
          {
            en: "500 DPI capacitive sensor — sub-1 second recognition",
            ar: "حساس سعوي 500 DPI — تعرّف في أقل من ثانية",
          },
          {
            en: "100 fingerprint + 10 PIN code capacity",
            ar: "سعة 100 بصمة + 10 رمز PIN",
          },
          {
            en: "Cordless — mount anywhere within wireless range",
            ar: "لاسلكي — ركّبه في أي مكان ضمن النطاق اللاسلكي",
          },
        ],
        image:
          "https://desien.desi.net.tr/products_images/2026/Accessories/74/images/2.jpeg",
      },
      {
        type: "image-text",
        tag: { en: "CORDLESS ELEGANCE", ar: "أناقة لاسلكية" },
        heading: {
          en: "Seamless Design.\nNo Cables Needed.",
          ar: "تصميم سلس.\nبدون كابلات.",
        },
        text: {
          en: "The refined oval module mounts anywhere within wireless range of your Utopic RX lock — no wiring, no drilling. Its weather-resistant zinc alloy housing complements any architectural style while guarding your entrance.",
          ar: "تُركَّب الوحدة البيضاوية المصقولة في أي مكان ضمن النطاق اللاسلكي لقفل Utopic RX — بدون أسلاك أو حفر. يكمّل هيكلها من سبيكة الزنك المقاومة للطقس أي أسلوب معماري أثناء حراسة مدخلك.",
        },
        bullets: [
          {
            en: "Weather-resistant zinc alloy (Zamak) & ABS housing",
            ar: "هيكل من سبيكة الزنك (Zamak) وABS مقاوم للطقس",
          },
          {
            en: "Backlit capacitive keypad for night entry",
            ar: "لوحة مفاتيح سعوية مضيئة للدخول الليلي",
          },
          {
            en: "434 MHz encrypted — protected against interception",
            ar: "434 ميغاهرتز مشفّر — محمي من الاعتراض",
          },
        ],
        image:
          "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-227-74-O.png",
      },
    ],
    specGroups: [
      {
        title: { en: "Fingerprint Sensor", ar: "حساس بصمة الإصبع" },
        items: [
          { en: "Resolution: 500 DPI Capacitive", ar: "الدقة: 500 DPI سعوي" },
          { en: "Fingerprint Capacity: 100", ar: "سعة بصمة الإصبع: 100" },
          {
            en: "Recognition Speed: Under 1 second",
            ar: "سرعة التعرف: أقل من ثانية واحدة",
          },
        ],
      },
      {
        title: { en: "Keypad", ar: "لوحة المفاتيح" },
        items: [
          { en: "PIN Capacity: 10 codes", ar: "سعة PIN: 10 رموز" },
          { en: "Backlit capacitive touch surface", ar: "سطح لمس سعوي مضيء" },
        ],
      },
      {
        title: { en: "Wireless & Power", ar: "اللاسلكي والطاقة" },
        items: [
          {
            en: "Frequency: 434 MHz encrypted",
            ar: "التردد: 434 ميغاهرتز مشفّر",
          },
          {
            en: "Power Supply: 2 x AA Alkaline Batteries",
            ar: "مصدر الطاقة: 2 بطارية AA Alkaline",
          },
        ],
      },
      {
        title: { en: "Physical", ar: "المواصفات الفيزيائية" },
        items: [
          {
            en: "Material: Zinc Alloy (Zamak) & ABS",
            ar: "المادة: سبيكة الزنك (Zamak) وABS",
          },
          {
            en: "Form: Cordless oval module",
            ar: "الشكل: وحدة بيضاوية لاسلكية",
          },
        ],
      },
      {
        title: { en: "Compatibility", ar: "التوافق" },
        items: [
          {
            en: "Utopic RX and RXe series ONLY",
            ar: "سلسلة Utopic RX وRXe فقط",
          },
          {
            en: "NOT compatible with Utopic R, 3 or PiKS",
            ar: "غير متوافق مع Utopic R أو 3 أو PiKS",
          },
        ],
      },
    ],
    boxContents: [
      {
        icon: "👆",
        name: {
          en: "Fingerprint & Keypad Module",
          ar: "وحدة بصمة الإصبع ولوحة المفاتيح",
        },
      },
      {
        icon: "🔋",
        name: { en: "2 x AA Alkaline Batteries", ar: "2 بطارية AA Alkaline" },
      },
      { icon: "🔩", name: { en: "Mounting Hardware", ar: "أدوات التثبيت" } },
      { icon: "📄", name: { en: "User Manual", ar: "دليل المستخدم" } },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — Upsert all accessories into MongoDB
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB.\n");

  for (const acc of accessories) {
    const result = await Product.findOneAndUpdate(
      { slug: acc.slug },
      { $set: acc },
      { upsert: true, new: true },
    );
    console.log(
      `✅ Upserted: ${result.name.en}\n   gallery: ${result.gallery?.length || 0} | sections: ${result.contentSections?.length || 0} | specs: ${result.specGroups?.length || 0}`,
    );
  }

  console.log("\nAll accessories upserted successfully.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
