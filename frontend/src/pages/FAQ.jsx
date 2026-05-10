import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { structuredData } from "../lib/seo";

const FAQS = [
  {
    q: {
      en: "Can I still open the door with a key after installing the smart lock?",
      ar: "هل يمكنني فتح الباب بالمفتاح بعد تركيب القفل الذكي؟",
    },
    a: {
      en: "You can use your key anytime or in emergencies. It's enough to keep a key in your wallet or bag.",
      ar: "يمكنك استخدام مفتاحك في أي وقت أو في حالات الطوارئ. يكفي الاحتفاظ بمفتاح في محفظتك أو حقيبتك.",
    },
  },
  {
    q: {
      en: "Will my door be damaged during installation?",
      ar: "هل سيتضرر بابي أثناء التركيب؟",
    },
    a: {
      en: "No, you can install Utopic series smart locks just like replacing the same cylinder (barrel). No extra holes are drilled on your door.",
      ar: "لا، يمكنك تركيب أقفال Utopic الذكية تماماً كما لو كنت تستبدل نفس الأسطوانة. لا يتم حفر ثقوب إضافية على بابك.",
    },
  },
  {
    q: {
      en: "Can the smart lock automatically lock and unlock?",
      ar: "هل يمكن للقفل الذكي أن يقفل وينفتح تلقائياً؟",
    },
    a: {
      en: "Our Utopic series smart locks automatically perform full-turn locking and unlocking operations. For this, you just need to send a locking/unlocking command from the phone app, fingerprint-keypad reader, or remote control.",
      ar: "تقوم أقفال Utopic الذكية تلقائياً بعمليات القفل والفتح الكاملة. لهذا، تحتاج فقط إلى إرسال أمر القفل/الفتح من تطبيق الهاتف أو قارئ بصمة لوحة المفاتيح أو جهاز التحكم عن بعد.",
    },
  },
  {
    q: {
      en: "Is the smart lock compatible with my 3-turn lock?",
      ar: "هل القفل الذكي متوافق مع قفلي ذو الثلاث أدوار؟",
    },
    a: {
      en: "During installation, Utopic series smart locks perform an automatic adjustment process to recognize the characteristics of your mechanical lock. This way, it learns how many turns are needed to fully lock or unlock your lock. After doing this once during installation, the settings are saved in memory.",
      ar: "أثناء التركيب، تقوم أقفال Utopic الذكية بعملية تعديل تلقائية لتعرف خصائص قفلك الميكانيكي. بهذه الطريقة، يتعلم عدد الأدوار المطلوبة لقفل أو فتح قفلك بالكامل. بعد القيام بذلك مرة واحدة أثناء التركيب، يتم حفظ الإعدادات في الذاكرة.",
    },
  },
  {
    q: {
      en: "Does it matter if my door is right or left?",
      ar: "هل يؤثر ما إذا كان بابي يميناً أو يساراً؟",
    },
    a: {
      en: "During installation, your smart lock detects whether your door is a left or right door and decides the locking direction accordingly. This is done by selecting in the easy installation wizard.",
      ar: "أثناء التركيب، يكتشف القفل الذكي ما إذا كان بابك من النوع الأيسر أو الأيمن ويحدد اتجاه القفل وفقاً لذلك. يتم هذا من خلال الاختيار في معالج التركيب السهل.",
    },
  },
  {
    q: {
      en: "How can I get additional keys for my smart door lock?",
      ar: "كيف يمكنني الحصول على مفاتيح إضافية لقفلي الذكي؟",
    },
    a: {
      en: "You can duplicate these keys from DESi authorized service centers. Usually, 5 keys come out of the box.",
      ar: "يمكنك تكرار هذه المفاتيح من مراكز الخدمة المرخصة من DESi. عادة، يأتي 5 مفاتيح في الصندوق.",
    },
  },
  {
    q: {
      en: "How can I know if it's suitable for my door?",
      ar: "كيف يمكنني معرفة ما إذا كان مناسباً لبابي؟",
    },
    a: {
      en: "If your door has a cylinder (commonly known as a barrel) lock, Utopic series smart locks will be compatible with your door. In Turkey, doors generally use cylinders with a length of 66mm – 70mm. Utopic R and Utopic 3 smart locks are sold with 66-68mm cylinders. Thanks to its special structure, Utopic R smart locks can be extended by an extra 10mm, making them compatible with almost all doors in Turkey. If your existing cylinder is longer, you can still use Utopic R or Utopic 3 smart locks with a specially sized cylinder.",
      ar: "إذا كان بابك يحتوي على قفل أسطواني (يُعرف عموماً باسم برميل)، فستكون أقفال Utopic الذكية متوافقة مع بابك. في تركيا، تستخدم الأبواب عموماً أسطوانات بطول 66 مم إلى 70 مم. تُباع أقفال Utopic R و Utopic 3 الذكية بأسطوانات 66-68 مم. بفضل هيكلها الخاص، يمكن تمديد أقفال Utopic R الذكية بمقدار 10 مم إضافية، مما يجعلها متوافقة مع جميع الأبواب تقريباً في تركيا. إذا كانت الأسطوانة الحالية أطول، فلا يزال بإمكانك استخدام أقفال Utopic R أو Utopic 3 الذكية بأسطوانة خاصة الحجم.",
    },
  },
  {
    q: {
      en: "Can I use my old cylinder with the smart lock?",
      ar: "هل يمكنني استخدام أسطواني القديمة مع القفل الذكي؟",
    },
    a: {
      en: "Unfortunately, you cannot. Utopic R and Utopic 3 smart locks can only be used with the special cylinders included in the box.",
      ar: "للأسف، لا يمكنك ذلك. يمكن استخدام أقفال Utopic R و Utopic 3 الذكية فقط مع الأسطوانات الخاصة المرفقة في الصندوق.",
    },
  },
  {
    q: {
      en: "Can I install everything myself?",
      ar: "هل يمكنني تركيب كل شيء بنفسي؟",
    },
    a: {
      en: "Yes, you can perform the entire installation by watching support videos on our YouTube support channel. However, if there is any sagging or friction on your door, you need to fix it first.",
      ar: "نعم، يمكنك إجراء التركيب الكامل من خلال مشاهدة مقاطع دعم على قناة YouTube الخاصة بنا. ومع ذلك، إذا كان هناك أي هبوط أو احتكاك على بابك، تحتاج إلى إصلاحه أولاً.",
    },
  },
  {
    q: {
      en: "Do smart locks work on doors with multiple locking points?",
      ar: "هل تعمل الأقفال الذكية على الأبواب التي تحتوي على نقاط قفل متعددة؟",
    },
    a: {
      en: "Our smart locks are compatible with centralized locking systems that have multiple locking points and have the power to lock/unlock from all points.",
      ar: "أقفالنا الذكية متوافقة مع أنظمة القفل المركزية التي تحتوي على نقاط قفل متعددة وتتمتع بالقوة للقفل/الفتح من جميع النقاط.",
    },
  },
  {
    q: {
      en: "Do smart locks have a pull feature for the latch?",
      ar: "هل للأقفال الذكية ميزة سحب للمزلاج؟",
    },
    a: {
      en: "Our smart locks can fully open the door by pulling the latch during the unlocking process.",
      ar: "يمكن لأقفالنا الذكية فتح الباب بالكامل بسحب المزلاج أثناء عملية الفتح.",
    },
  },
  {
    q: {
      en: "Can the smart lock be remotely controlled?",
      ar: "هل يمكن التحكم في القفل الذكي عن بعد؟",
    },
    a: {
      en: "Yes. With the Smart Bridge product, you can open or lock your door remotely.",
      ar: "نعم. مع منتج Smart Bridge، يمكنك فتح أو قفل بابك عن بعد.",
    },
  },
  {
    q: {
      en: "Can I assign the smart lock to multiple users?",
      ar: "هل يمكنني تعيين القفل الذكي لمستخدمين متعددين؟",
    },
    a: {
      en: "Yes, you can share the smart lock with different users through the application and manage their access permissions.",
      ar: "نعم، يمكنك مشاركة القفل الذكي مع مستخدمين مختلفين من خلال التطبيق وإدارة صلاحيات وصولهم.",
    },
  },
  {
    q: {
      en: "Is it safe to use a smart lock in apartment blocks?",
      ar: "هل من الآمن استخدام قفل ذكي في عمارات سكنية؟",
    },
    a: {
      en: "Yes, smart locks are very suitable for apartment blocks. They provide secure access management with easy integration.",
      ar: "نعم، الأقفال الذكية مناسبة جداً لعمارات سكنية. فهي توفر إدارة وصول آمنة مع تكامل سهل.",
    },
  },
  {
    q: {
      en: "Are smart locks secure against hacking?",
      ar: "هل الأقفال الذكية آمنة ضد الاختراق؟",
    },
    a: {
      en: "Yes. AES-256 GCM encryption with the latest security standards protect every operation.",
      ar: "نعم. تشفير AES-256 GCM مع أحدث معايير الأمان يحمي كل عملية.",
    },
  },
  {
    q: {
      en: "Can I see who opened the lock?",
      ar: "هل يمكنني رؤية من فتح القفل؟",
    },
    a: {
      en: "Yes, every lock open or close operation is recorded in the lock. Additionally, you can monitor them in real-time with the externally sold Smart Bridge.",
      ar: "نعم، يتم تسجيل كل عملية فتح أو إغلاق قفل في القفل. بالإضافة إلى ذلك، يمكنك مراقبتهم في الوقت الفعلي باستخدام Smart Bridge المباع خارجياً.",
    },
  },
  {
    q: {
      en: "Can smart locks be used in areas with extremely cold or hot weather?",
      ar: "هل يمكن استخدام الأقفال الذكية في مناطق ذات طقس بارد أو حار جداً؟",
    },
    a: {
      en: "Utopic series smart locks are designed to operate within a wide temperature range and are durable in such conditions.",
      ar: "تم تصميم أقفال Utopic الذكية للعمل ضمن نطاق درجة حرارة واسع وهي متينة في ظل هذه الظروف.",
    },
  },
  {
    q: {
      en: "Are Utopic series locks water or moisture-resistant?",
      ar: "هل أقفال Utopic مقاومة للماء أو الرطوبة؟",
    },
    a: {
      en: "Smart locks are designed for indoor use. It is not recommended to use them in humid or directly water-exposed environments.",
      ar: "تم تصميم الأقفال الذكية للاستخدام في الأماكن المغلقة. لا يُنصح باستخدامها في بيئات رطبة أو معرضة مباشرة للماء.",
    },
  },
  {
    q: {
      en: "Can I move the lock to another house or door?",
      ar: "هل يمكنني نقل القفل إلى منزل أو باب آخر؟",
    },
    a: {
      en: "Yes, it is possible to move the lock, but it may require compatible installation for the new door.",
      ar: "نعم، من الممكن نقل القفل، لكن قد يتطلب تركيباً متوافقاً للباب الجديد.",
    },
  },
  {
    q: {
      en: "Can I use the smart lock for a business as well?",
      ar: "هل يمكنني استخدام القفل الذكي للعمل أيضاً؟",
    },
    a: {
      en: "Yes, smart locks are also suitable for offices or workplaces and provide secure access management.",
      ar: "نعم، الأقفال الذكية مناسبة أيضاً للمكاتب أو مكان العمل وتوفر إدارة وصول آمنة.",
    },
  },
  {
    q: {
      en: "Can I manage the smart lock by granting access only to certain people?",
      ar: "هل يمكنني إدارة القفل الذكي بمنح الوصول فقط لأشخاص معينين؟",
    },
    a: {
      en: "Yes, you can specify who can use your lock through the application. Different levels of access permissions can be granted among users. For example, you can define temporary access permissions within a specific date or time range.",
      ar: "نعم، يمكنك تحديد من يمكنه استخدام قفلك من خلال التطبيق. يمكن منح مستويات مختلفة من صلاحيات الوصول بين المستخدمين. على سبيل المثال، يمكنك تحديد صلاحيات الوصول المؤقتة ضمن نطاق تاريخ أو وقت محدد.",
    },
  },
  {
    q: {
      en: "Can security vulnerabilities occur in smart locks?",
      ar: "هل يمكن حدوث ثغرات أمنية في الأقفال الذكية؟",
    },
    a: {
      en: "All Utopic smart locks are protected with the latest encryption protocols and security standards.",
      ar: "جميع أقفال Utopic الذكية محمية بأحدث بروتوكولات التشفير ومعايير الأمان.",
    },
  },
  {
    q: {
      en: "Can I provide temporary guest access with smart locks?",
      ar: "هل يمكنني توفير وصول مؤقت للضيوف باستخدام الأقفال الذكية؟",
    },
    a: {
      en: "Yes, Utopic smart locks provide temporary guest access. For example, you can define access permissions for guests within a specific day or time range and later cancel this access.",
      ar: "نعم، توفر أقفال Utopic الذكية وصول مؤقت للضيوف. على سبيل المثال، يمكنك تحديد صلاحيات الوصول للضيوف ضمن يوم أو نطاق زمني محدد وإلغاء هذا الوصول لاحقاً.",
    },
  },
  {
    q: {
      en: "Can I share digital keys?",
      ar: "هل يمكنني مشاركة المفاتيح الرقمية؟",
    },
    a: {
      en: "Digital key sharing can be done through the application. This way, you can grant access permissions to another person for a specific duration or permanently. This process is securely encrypted.",
      ar: "يمكن مشاركة المفاتيح الرقمية من خلال التطبيق. بهذه الطريقة، يمكنك منح صلاحيات الوصول لشخص آخر لمدة محددة أو بشكل دائم. تكون هذه العملية مشفرة بشكل آمن.",
    },
  },
];

const FAQ = () => {
  const { t } = useLang();
  const faqs = FAQS;

  return (
    <>
      <SEOHead
        title="DESi Smart Locks FAQ | Frequently Asked Questions"
        description="Get answers to common questions about DESi Smart Locks. Installation, compatibility, security, and user management FAQs."
        keywords="FAQ, frequently asked questions, smart locks, DESi, troubleshooting"
        type="website"
        structuredDataContent={structuredData.faqPage(faqs)}
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "FAQ", ar: "الأسئلة الشائعة" })}
            </p>
            <h1 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-black">
              {t({ en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" })}
            </h1>
            <p className="mt-2 md:mt-3 text-neutral-300 max-w-2xl text-sm md:text-base">
              {t({
                en: "Find answers to common questions about DESi Smart Locks, installation, compatibility, and more.",
                ar: "ابحث عن إجابات للأسئلة الشائعة حول أقفال DESi الذكية والتركيب والتوافق وغير ذلك.",
              })}
            </p>
          </div>
        </section>

        <section className="bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <div className="mt-10">
              <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-xl border border-neutral-200 px-6"
              >
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`q${i}`}>
                    <AccordionTrigger className="text-start font-bold">
                      {t(f.q)}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 leading-relaxed">
                      {t(f.a)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-10 text-center">
              <p className="text-neutral-600">
                {t({ en: "Still have questions?", ar: "لديك أسئلة أخرى؟" })}
              </p>
              <Link to="/contact">
                <Button className="mt-4 h-12 px-7 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider">
                  {t({ en: "Contact Support", ar: "تواصل مع الدعم" })}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
