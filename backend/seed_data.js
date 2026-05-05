import mongoose from "mongoose";
import dotenv from "dotenv";
import Settings from "./models/Settings.js";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });

const faqs = [
  { q: { en: 'Can I still open the door with a key?', ar: 'هل يمكنني فتح الباب بالمفتاح؟' }, a: { en: 'Yes — anytime. The patented design lets you access from outside even when a key is inside.', ar: 'نعم في أي وقت. يتيح التصميم المسجَّل الدخول من الخارج حتى لو كان المفتاح بالداخل.' } },
  { q: { en: 'Will my door be damaged during installation?', ar: 'هل سيتضرّر بابي عند التركيب؟' }, a: { en: 'No. The lock mounts on the cylinder with screws or 3M adhesive — zero drilling.', ar: 'لا. يُركَّب على الأسطوانة ببراغي أو لاصق 3M — بدون أي حفر.' } },
  { q: { en: 'How long does installation take?', ar: 'كم تستغرق عملية التركيب؟' }, a: { en: 'Typically 1–5 minutes. A user-friendly guide and all accessories are included.', ar: 'عادةً 1–5 دقائق. مرفق دليل سهل وجميع الملحقات.' } },
  { q: { en: 'Is it compatible with my UAE door?', ar: 'هل يتوافق مع بابي في الإمارات؟' }, a: { en: 'If your door has a euro-profile cylinder lock and at least 2mm gap, yes — it fits.', ar: 'إذا كان بابك بأسطوانة أوروبية مع فجوة 2 مم على الأقل، فهو متوافق.' } },
  { q: { en: 'Can I share access with multiple users?', ar: 'هل يمكنني مشاركة الوصول مع عدة أشخاص؟' }, a: { en: 'Yes — up to 37 users with individual time-based permissions via the DESi Smart app.', ar: 'نعم — حتى 37 مستخدماً بصلاحيات زمنية فردية عبر تطبيق DESi Smart.' } },
  { q: { en: 'How long does the battery last?', ar: 'كم تدوم البطارية؟' }, a: { en: 'Up to 6 months in eco mode. Charge via Type-C cable; battery status is shown in the app.', ar: 'حتى 6 أشهر في وضع التوفير. اشحنه بكابل Type-C ويظهر مستوى البطارية في التطبيق.' } },
  { q: { en: 'Does it need internet?', ar: 'هل يحتاج إلى إنترنت؟' }, a: { en: 'No — works via Bluetooth at close range. Add the WiFi Bridge for remote access.', ar: 'لا — يعمل عبر بلوتوث محلياً. أضف جسر WiFi للوصول عن بُعد.' } },
  { q: { en: 'Is it secure against hacking?', ar: 'هل هو آمن ضد الاختراق؟' }, a: { en: 'Yes. AES-256 GCM encryption with the latest security standards protect every operation.', ar: 'نعم. تشفير AES-256 GCM مع أحدث معايير الأمان يحمي كل عملية.' } },
];

const testimonials = [
  { name: 'Ahmed Al Mansouri', city: { en: 'Dubai Marina', ar: 'دبي مارينا' }, text: { en: 'Installed in under 5 minutes. Face recognition is shockingly fast even at night.', ar: 'تم التركيب في أقل من 5 دقائق. التعرّف على الوجه سريع جداً حتى ليلاً.' }, rating: 5 },
  { name: 'Fatima Khan', city: { en: 'Abu Dhabi', ar: 'أبوظبي' }, text: { en: 'My kids forget keys daily. Now they just walk up. Best home upgrade we\'ve made.', ar: 'كان أطفالي ينسون المفاتيح يومياً. الآن يدخلون بسهولة. أفضل ترقية للمنزل.' }, rating: 5 },
  { name: 'James O\'Brien', city: { en: 'Sharjah', ar: 'الشارقة' }, text: { en: 'Airbnb host here — e-key sharing changed my workflow completely. No more lockboxes.', ar: 'كمضيف Airbnb — مشاركة المفاتيح الإلكترونية غيّرت عملي تماماً.' }, rating: 5 },
  { name: 'Maryam Saleh', city: { en: 'Al Ain', ar: 'العين' }, text: { en: 'No drilling needed. The 3M adhesive option saved my brand new fire door.', ar: 'لا حاجة للحفر. اللاصق 3M أنقذ باب الحريق الجديد.' }, rating: 5 },
];

const heroSlides = [
  { id: 1, sub: { en: 'No drilling. No cylinder change. Pure DIY peace of mind.', ar: 'بدون حفر. بدون تغيير الأسطوانة. تركيب ذاتي بكل سهولة.' }, cta: { en: 'Shop Smart Locks', ar: 'تسوق الأقفال الذكية' }, href: '/smart-locks', image: 'https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/whatsapp-image-2025-10-24-at-094606-en-5.jpg?1777801355' },
  { id: 2, sub: { en: 'Just push the door. AI-powered, AES-256 GCM encrypted.', ar: 'فقط ادفع الباب. مدعوم بالذكاء الاصطناعي وتشفير AES-256.' }, cta: { en: 'Discover Utopic RX', ar: 'اكتشف يوتوبيك RX' }, href: '/product/desi-utopic-rx-face-recognition', image: 'https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/revbanner-1-en-6.jpg?1777801355' },
  { id: 3, sub: { en: 'Euro-profile compatible. Mounts on your existing key.', ar: 'متوافق مع الأسطوانة الأوروبية. يثبّت على مفتاحك الحالي.' }, cta: { en: 'Check Compatibility', ar: 'تحقق من التوافق' }, href: '/support', image: 'https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/whatsapp-image-2025-10-24-at-094605-en-4.jpg?1777801355' },
];

const featureHighlights = [
  { icon: 'ScanFace', title: { en: 'Face Recognition', ar: 'التعرف على الوجه' }, desc: { en: 'AI-powered face recognition unlocks your door before you even reach it.', ar: 'التعرّف على الوجه المدعوم بالذكاء الاصطناعي يفتح بابك قبل أن تصل إليه.' } },
  { icon: 'KeyRound', title: { en: 'Universal Mounting', ar: 'تركيب شامل' }, desc: { en: 'Fits existing euro-profile cylinders. No drilling required.', ar: 'يتوافق مع الأسطوانات الأوروبية الحالية. لا يتطلب حفر.' } },
  { icon: 'Smartphone', title: { en: 'Smart App Control', ar: 'تحكم ذكي بالتطبيق' }, desc: { en: 'Control access, manage users and view logs right from your phone.', ar: 'تحكم بالوصول وعرض السجلات مباشرة من هاتفك.' } },
  { icon: 'Battery', title: { en: 'Long Battery Life', ar: 'بطارية تدوم طويلاً' }, desc: { en: 'Type-C rechargeable battery lasts up to 6 months.', ar: 'بطارية قابلة للشحن عبر Type-C تدوم حتى 6 أشهر.' } },
  { icon: 'Users', title: { en: 'Multi-User Support', ar: 'دعم عدة مستخدمين' }, desc: { en: 'Share keys with up to 37 users easily within seconds.', ar: 'شارك المفاتيح مع ما يصل إلى 37 مستخدماً بسهولة خلال ثوانٍ.' } },
  { icon: 'ShieldCheck', title: { en: 'High Security', ar: 'أمان عالي' }, desc: { en: 'Bank-grade AES-256 encryption keeps your home secure.', ar: 'تشفير AES-256 البنكي يحافظ على أمان منزلك.' } }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae");
  console.log("Connected to MongoDB.");
  
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
  }
  settings.heroSlides = heroSlides;
  settings.faqs = faqs;
  settings.testimonials = testimonials;
  await settings.save();
  console.log("Settings updated.");

  await Product.updateMany({}, {
    $set: { featureHighlights: featureHighlights }
  });
  console.log("Products updated with feature highlights.");

  process.exit();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
