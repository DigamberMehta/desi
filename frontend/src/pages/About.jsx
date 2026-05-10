import React from "react";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";

const About = () => {
  const { t } = useLang();

  return (
    <>
      <SEOHead
        title="About DESi Smart Locks | Leaders in Biometric Security UAE"
        description="DESi Smart Locks - established in 1991, government-approved R&D center. Face recognition technology, 40+ countries served. Official UAE partner for smart security solutions."
        keywords="about DESi, smart locks company, biometric security, face recognition technology, UAE security"
        type="website"
      />
      <main>
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-blue-600 mb-2">
              {t({ en: "About Us", ar: "من نحن" })}
            </h1>
            <p className="text-neutral-400 text-sm">
              {t({ en: "About DESi Smart Locks", ar: "عن أقفال DESi الذكية" })}
            </p>
          </div>

          {/* Lead paragraph — bold */}
          <p className="font-bold text-neutral-900 leading-relaxed mb-4">
            {t({
              en: "DESI, established in 1991 in Istanbul, is a government-approved R&D center. The company manufactures all its products within a single facility.",
              ar: "تأسست DESi عام 1991 في إسطنبول وهي مركز بحث وتطوير معتمد من الحكومة. تصنع الشركة جميع منتجاتها في منشأة واحدة.",
            })}
          </p>

          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "From the design stage to final packaging, including mold making, painting, SMD assembly, and PCB production, every process is carried out under the same roof.",
              ar: "من مرحلة التصميم إلى التعبئة النهائية، بما في ذلك صنع القوالب والطلاء وتجميع SMD وإنتاج PCB، يتم تنفيذ كل عملية تحت سقف واحد.",
            })}
          </p>

          <p className="text-neutral-600 leading-relaxed mb-10">
            {t({
              en: "Additionally, DESI develops its server and cloud-based applications entirely in-house with its own engineering team, without relying on external support.",
              ar: "بالإضافة إلى ذلك، تقوم DESi بتطوير تطبيقات الخادم والتطبيقات السحابية بالكامل داخلياً مع فريقها الهندسي الخاص، دون الاعتماد على دعم خارجي.",
            })}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex-1 border-t border-neutral-200" />
            <span className="mx-4 text-neutral-300 text-lg">—</span>
            <div className="flex-1 border-t border-neutral-200" />
          </div>

          {/* Market Leader */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            {t({ en: "Market Leader", ar: "رائد السوق" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-10">
            {t({
              en: "DESI is also one of the oldest smart lock manufacturers in Europe region. The company produces approximately 15 different ODM and OEM products, making DESI the largest ODM and OEM smart lock manufacturer in Europe region.",
              ar: "DESi هي أيضاً واحدة من أقدم شركات تصنيع الأقفال الذكية في منطقة أوروبا. تنتج الشركة حوالي 15 منتجاً مختلفاً من ODM و OEM، مما يجعل DESi أكبر شركة مصنعة للأقفال الذكية ODM و OEM في منطقة أوروبا.",
            })}
          </p>

          {/* Our Philosophy */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            {t({ en: "Our Philosophy", ar: "فلسفتنا" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: 'Since its inception, DESi has based its strategies on the principle of "producing quality at an affordable price" and has brought a new perspective to the industry. Opposing the approach of presenting products that meet one of the most fundamental human needs—security—as luxury goods, DESi has created a new market in its sector.',
              ar: 'منذ تأسيسها، اعتمدت DESi استراتيجياتها على مبدأ "إنتاج الجودة بسعر معقول" وأضافت منظوراً جديداً للصناعة. معارضةً لنهج تقديم المنتجات التي تلبي أحد أهم الاحتياجات الإنسانية—الأمان—كسلع فاخرة، أوجدت DESi سوقاً جديدة في قطاعها.',
            })}
          </p>
          <p className="text-neutral-600 leading-relaxed mb-10">
            {t({
              en: "It has become the first and only alarm system in Turkey that is \"requested by name\" and has successfully established itself as a recognized brand. By thoroughly analyzing the needs of its target audience and adhering to a customer-centric principle, DESi has been able to offer products that address these needs. To ensure continuous customer satisfaction, DESi views requests and complaints from the market as opportunities to improve its products based on this feedback.",
              ar: "أصبحت الشركة أول وأوحد نظام إنذار في تركيا يُطلب باسمه وأثبتت نفسها كعلامة تجارية معروفة. من خلال تحليل دقيق لاحتياجات جمهورها المستهدف والالتزام بمبدأ التمحور حول العميل، تمكنت DESi من تقديم منتجات تلبي هذه الاحتياجات. لضمان رضا العملاء المستمر، تنظر DESi إلى الطلبات والشكاوى من السوق كفرص لتحسين منتجاتها بناءً على هذه التغذية الراجعة.",
            })}
          </p>

          {/* R&D and Innovation */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            {t({ en: "R&D and Innovation", ar: "البحث والتطوير والابتكار" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-10">
            {t({
              en: 'The R&D department, which is rarely implemented effectively in companies in Turkey, has become the driving force of the firm. DESi\'s R&D engineers, who are continuously active in both improving products in the portfolio and developing new ones, have achieved many firsts in Turkey and worldwide. The company holds over 20 "patent," "utility model," or "industrial design" certificates.',
              ar: 'أصبح قسم البحث والتطوير، الذي نادراً ما يُطبَّق بفعالية في شركات تركيا، المحرك الرئيسي للشركة. حقق مهندسو البحث والتطوير في DESi، المنخرطون باستمرار في تحسين المنتجات الحالية وتطوير منتجات جديدة، إنجازات عديدة في تركيا وعالمياً. تمتلك الشركة أكثر من 20 شهادة "براءة اختراع" أو "نموذج مفيد" أو "تصميم صناعي".',
            })}
          </p>

          {/* Quality Management */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            {t({ en: "Quality Management", ar: "إدارة الجودة" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "Recognizing that a healthy business can only be achieved through a healthy management approach, DESi received the ISO 9001:2000 certificate from TUV International Management Systems Certification Company, documenting the quality of its existing management system.",
              ar: "إدراكاً بأن العمل الصحي لا يمكن تحقيقه إلا من خلال نهج إدارة سليم، حصلت DESi على شهادة ISO 9001:2000 من شركة TUV الدولية لشهادات أنظمة الإدارة، موثِّقةً جودة نظام إدارتها القائم.",
            })}
          </p>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "The quality of DESi-branded products has been approved by both national and international authorities. DESi produces in compliance with the relevant regulations of the Turkish Standards Institution and is the only producer in its sector with approval from the Telecommunications Authority. DESi also meets the conditions required to use the CE mark, which is mandatory for products marketed in Europe and indicates that the product is safe when used as intended. DESi has earned the right to use this mark on many of its products. Additionally, DESi applied for the e-mark symbol for its \"central locking control system,\" which is required for products manufactured for the European automotive sector, and successfully passed the necessary tests to obtain this symbol.",
              ar: "تمت الموافقة على جودة منتجات DESi من قبل السلطات الوطنية والدولية. تنتج DESi وفقاً للوائح مؤسسة المعايير التركية وهي المنتج الوحيد في قطاعها الحاصل على موافقة هيئة الاتصالات. كما تستوفي DESi شروط استخدام علامة CE الإلزامية للمنتجات المسوَّقة في أوروبا. وقد تقدمت DESi أيضاً للحصول على رمز e-mark لـ \"نظام التحكم في القفل المركزي\" ونجحت في اجتياز الاختبارات اللازمة.",
            })}
          </p>

          {/* Social Responsibility — italic */}
          <p className="text-neutral-600 leading-relaxed italic mt-10">
            {t({
              en: "Representing a large family with its employees and a network of over 500 dealers across Turkey, DESi fulfills its social responsibilities. From the engineering phase to production, DESi utilizes entirely local resources and employs SMD (Surface Mount Device) technology, the latest advancement in electronic circuit production. Producing at the same quality level as global giants, DESi takes great pride in contributing positively to the national economy.",
              ar: "بوصفها عائلة كبيرة من الموظفين وشبكة تضم أكثر من 500 موزع في تركيا، تؤدي DESi مسؤولياتها الاجتماعية. من مرحلة الهندسة إلى الإنتاج، تعتمد DESi كلياً على الموارد المحلية وتستخدم تقنية SMD الأحدث في إنتاج الدوائر الإلكترونية. وتفخر DESi بإنتاجها بجودة مماثلة للعمالقة العالميين ومساهمتها الإيجابية في الاقتصاد الوطني.",
            })}
          </p>
        </div>
      </main>
    </>
  );
};

export default About;
