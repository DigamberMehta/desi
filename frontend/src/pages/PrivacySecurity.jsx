import React from "react";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";

const PrivacyPolicy = () => {
  const { t } = useLang();

  return (
    <>
      <SEOHead
        title={t({
          en: "Privacy Policy – DESi UAE",
          ar: "سياسة الخصوصية – ديسي الإمارات",
        })}
        description={t({
          en: "Read the DESi Smart App privacy policy.",
          ar: "اقرأ سياسة خصوصية تطبيق ديسي الذكي.",
        })}
      />

      <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-800">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t({
            en: "DESi Smart App – Privacy Policy",
            ar: "سياسة خصوصية تطبيق ديسي الذكي",
          })}
        </h1>

        <p className="mb-8 text-neutral-600 leading-relaxed">
          {t({
            en: 'This Privacy Policy governs the manner in which [DESi Smart] collects, uses, maintains, and discloses information collected from users (each, a "User") of the [DESi Smart] mobile application ("App").',
            ar: "تحكم سياسة الخصوصية هذه الطريقة التي تجمع بها [ديسي سمارت] المعلومات وتستخدمها وتحتفظ بها وتكشف عنها من المستخدمين.",
          })}
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "1. Personal Identification Information",
              ar: "١. معلومات التعريف الشخصية",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-3">
            {t({
              en: "We may collect personal identification information from Users in various ways, including but not limited to when Users download and install the App, register an account, fill out a form within the App, or interact with the App's features and services. The information we may collect includes, but is not limited to:",
              ar: "قد نجمع معلومات التعريف الشخصية من المستخدمين بطرق مختلفة، بما في ذلك عند تنزيل التطبيق أو التسجيل أو ملء نموذج.",
            })}
          </p>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 pl-2">
            <li>{t({ en: "Name and Surname", ar: "الاسم واللقب" })}</li>
            <li>{t({ en: "Email address", ar: "البريد الإلكتروني" })}</li>
            <li>{t({ en: "Phone number", ar: "رقم الهاتف" })}</li>
            <li>
              {t({
                en: "Device information (such as device model, operating system version, and unique device identifiers)",
                ar: "معلومات الجهاز (مثل طراز الجهاز وإصدار نظام التشغيل والمعرّفات الفريدة)",
              })}
            </li>
          </ul>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            {t({
              en: "Users are free to refuse to provide personal identification information. However, it may prevent them from engaging in certain App-related activities.",
              ar: "يحق للمستخدمين رفض تقديم معلومات التعريف الشخصية، غير أن ذلك قد يمنعهم من المشاركة في بعض الأنشطة.",
            })}
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "2. Non-personal Identification Information",
              ar: "٢. معلومات التعريف غير الشخصية",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "We may collect non-personal identification information about Users whenever they interact with our App. Non-personal identification information may include technical information about Users' devices, such as the type of device, operating system, and other similar information.",
              ar: "قد نجمع معلومات تعريف غير شخصية عن المستخدمين في كل مرة يتفاعلون فيها مع تطبيقنا، مثل نوع الجهاز ونظام التشغيل.",
            })}
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "3. How We Use Collected Information",
              ar: "٣. كيف نستخدم المعلومات المجمّعة",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-5">
            {t({
              en: "We may collect and use Users' personal information for the following purposes:",
              ar: "قد نجمع معلومات المستخدمين الشخصية ونستخدمها للأغراض التالية:",
            })}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: {
                  en: "To improve customer service",
                  ar: "لتحسين خدمة العملاء",
                },
                body: {
                  en: "The information you provide helps us respond to your customer service requests and support needs more efficiently.",
                  ar: "تساعدنا المعلومات التي تقدمها في الاستجابة لطلبات خدمة العملاء بكفاءة أكبر.",
                },
              },
              {
                title: {
                  en: "To personalize user experience",
                  ar: "لتخصيص تجربة المستخدم",
                },
                body: {
                  en: "We may use information in the aggregate to understand how our Users as a group use the services and resources provided in our App.",
                  ar: "قد نستخدم المعلومات الإجمالية لفهم كيفية استخدام مجموعة المستخدمين للخدمات.",
                },
              },
              {
                title: { en: "To improve our App", ar: "لتحسين التطبيق" },
                body: {
                  en: "We continually strive to improve our App based on the information and feedback we receive from you.",
                  ar: "نسعى باستمرار إلى تحسين تطبيقنا بناءً على المعلومات والتعليقات التي نتلقاها.",
                },
              },
              {
                title: {
                  en: "To send periodic emails",
                  ar: "لإرسال رسائل بريد إلكتروني دورية",
                },
                body: {
                  en: "We may use the email address provided by Users to respond to inquiries, questions, and/or other requests.",
                  ar: "قد نستخدم عنوان البريد الإلكتروني للرد على الاستفسارات والطلبات.",
                },
              },
            ].map((item) => (
              <div
                key={item.title.en}
                className="border border-blue-100 bg-blue-50 rounded-lg p-4"
              >
                <h3 className="text-blue-700 font-semibold mb-2 text-sm">
                  {t(item.title)}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {t(item.body)}
                </p>
              </div>
            ))}
          </div>

          {/* Geofence box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-sm text-neutral-700 space-y-3">
            <h3 className="font-bold text-neutral-800">
              {t({ en: "Geofence Functionality", ar: "وظيفة السياج الجغرافي" })}
            </h3>
            <p className="text-blue-700">
              {t({
                en: "We use your location and geofence data to provide you with the Geofence feature, including triggering actions or notifications when you enter or exit a defined geofence area.",
                ar: "نستخدم بيانات موقعك والسياج الجغرافي لتزويدك بميزة السياج الجغرافي.",
              })}
            </p>
            <p className="text-blue-700">
              {t({
                en: "If you activate the Auto-Unlock functionality (Geofence), the App will seek your approval to monitor your device's location for the purpose of identifying when it approaches products that you have authorized access to (e.g., when you are in close proximity to your home).",
                ar: "إذا قمت بتفعيل وظيفة الفتح التلقائي، سيطلب التطبيق إذنك لمراقبة موقع جهازك.",
              })}
            </p>
            <p className="font-semibold text-blue-800">
              {t({
                en: "Your location data will be exclusively stored on your device and will not be stored on our servers.",
                ar: "سيتم تخزين بيانات موقعك حصريًا على جهازك ولن يتم تخزينها على خوادمنا.",
              })}
            </p>
            <p className="text-blue-700">
              {t({
                en: "This data will instruct your mobile device to increase its frequency of checking for your lock. This enhancement contributes to the device's efficiency and conserves your mobile device's battery life.",
                ar: "ستوجّه هذه البيانات جهازك المحمول لزيادة تكرار التحقق من قفلك.",
              })}
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "4. How We Protect Your Information",
              ar: "٤. كيف نحمي معلوماتك",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "We adopt appropriate data collection, storage, and processing practices, as well as security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our App. We implement reasonable security measures to protect the confidentiality, integrity, and availability of Users' information. However, please be aware that no data transmission over the internet or electronic storage method is completely secure.",
              ar: "نعتمد ممارسات مناسبة لجمع البيانات وتخزينها ومعالجتها، فضلاً عن تدابير أمنية للحماية من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف.",
            })}
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "5. Sharing Your Personal Information",
              ar: "٥. مشاركة معلوماتك الشخصية",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.",
              ar: "لا نبيع أو نتاجر أو نؤجر معلومات التعريف الشخصية للمستخدمين لأطراف أخرى.",
            })}
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "6. Changes to This Privacy Policy",
              ar: "٦. التغييرات على سياسة الخصوصية هذه",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "We reserve the right to update this Privacy Policy at any time. We encourage Users to frequently check this page for any changes and stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.",
              ar: "نحتفظ بالحق في تحديث سياسة الخصوصية هذه في أي وقت. نشجع المستخدمين على مراجعة هذه الصفحة بانتظام.",
            })}
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({
              en: "7. Your Acceptance of These Terms",
              ar: "٧. قبولك لهذه الشروط",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "By using this App, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not use our App. Your continued use of the App following the posting of changes to this Privacy Policy will be deemed your acceptance of those changes.",
              ar: "باستخدامك لهذا التطبيق، فإنك توافق على سياسة الخصوصية هذه. إذا كنت لا توافق، يرجى عدم استخدام تطبيقنا.",
            })}
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({ en: "8. Your Rights and Choices", ar: "٨. حقوقك وخياراتك" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "Users have certain rights and choices regarding their personal information, which may include the right to access, correct, update, or delete their information. Users may also have the right to withdraw consent or object to certain data processing activities. To exercise these rights or for any privacy-related inquiries, Users can contact us using the information provided below.",
              ar: "يتمتع المستخدمون بحقوق وخيارات معينة فيما يتعلق بمعلوماتهم الشخصية، بما في ذلك الحق في الوصول إليها أو تصحيحها أو حذفها.",
            })}
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 border-l-4 border-[#E60012] pl-3">
            {t({ en: "9. Contact Us", ar: "٩. اتصل بنا" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "If you have any questions about this Privacy Policy or your dealings with the App, please contact us at",
              ar: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على",
            })}{" "}
            <a
              href="mailto:bilgi@desi.com.tr"
              className="text-blue-600 hover:underline"
            >
              bilgi@desi.com.tr
            </a>{" "}
            {t({ en: "or", ar: "أو" })}{" "}
            <a
              href="tel:+902125017272"
              className="text-blue-600 hover:underline"
            >
              +902125017272
            </a>
          </p>
        </section>

        {/* Company info box */}
        <div className="bg-neutral-900 text-neutral-300 rounded-lg p-6 text-sm space-y-2">
          <p className="font-bold text-white">
            Desi Alarm ve Güvenlik Sistemleri San. Ve Tic. A.Ş.
          </p>
          <p>
            Orta mh. Topkapı Maltepe Cd. Anadolu Sk. No:1 Bayrampaşa / İstanbul
            / Türkiye
          </p>
          <p>Tel: +902125017272</p>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
