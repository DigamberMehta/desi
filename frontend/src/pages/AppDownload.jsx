import React from "react";
import { ArrowLeft, Apple, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const AppDownload = () => {
  const { t } = useLang();

  // Update these with your actual QR code URLs or image paths
  const qrCodes = {
    ios: {
      name: "Apple App Store",
      qrImage: "/ios.png", // iOS QR code from public folder
      appLink: "https://apps.apple.com/app/desi-smart-app", // Add your actual iOS app link
      icon: Apple,
    },
    android: {
      name: "Google Play Store",
      qrImage: "/android.png", // Android QR code from public folder
      appLink:
        "https://play.google.com/store/apps/details?id=com.desi.smartapp", // Add your actual Android app link
      icon: Download,
    },
  };

  return (
    <>
      <SEOHead
        title="DESi Smart App Download | iOS & Android"
        description="Download the DESi Smart App for iOS and Android. Control your smart locks, manage access, and monitor your door from anywhere."
        keywords="DESi app, smart app download, iOS app, Android app"
        type="website"
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <Link
              to="/support"
              className="flex items-center gap-2 text-[#E60012] hover:text-[#b8000e] mb-4 md:mb-6 w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-semibold">
                {t({ en: "Back to Support", ar: "العودة إلى الدعم" })}
              </span>
            </Link>
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "Mobile App", ar: "تطبيق الهاتف المحمول" })}
            </p>
            <h1 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-black">
              {t({
                en: "DESi Smart App",
                ar: "تطبيق DESi الذكي",
              })}
            </h1>
            <p className="mt-2 md:mt-3 text-neutral-300 max-w-2xl text-sm md:text-base">
              {t({
                en: "Download the official DESi Smart App for iOS and Android. Control your locks, manage users, and monitor access from anywhere in the world.",
                ar: "حمّل تطبيق DESi الرسمي لأجهزة iOS وAndroid. تحكم بأقفالك وإدارة المستخدمين ومراقبة الوصول من أي مكان.",
              })}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* iOS */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 md:mb-8">
                <div className="text-[#E60012] mb-3 md:mb-4">
                  <Apple className="w-10 h-10 md:w-12 md:h-12 mx-auto" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                  Apple App Store
                </h2>
                <p className="text-neutral-600 mb-4 md:mb-6 text-xs md:text-sm">
                  {t({
                    en: "Available for iPhone and iPad",
                    ar: "متاح لأجهزة iPhone و iPad",
                  })}
                </p>
              </div>

              {qrCodes.ios.qrImage ? (
                <div className="border-4 border-[#E60012] p-4 rounded-xl bg-white mb-6">
                  <img
                    src={qrCodes.ios.qrImage}
                    alt="iOS QR Code"
                    className="w-48 h-48"
                  />
                </div>
              ) : (
                <div className="border-4 border-neutral-200 p-4 rounded-xl bg-neutral-50 mb-6 w-48 h-48 flex items-center justify-center">
                  <p className="text-neutral-400 text-sm">
                    {t({
                      en: "QR Code coming soon",
                      ar: "كود QR قريباً",
                    })}
                  </p>
                </div>
              )}

              <a
                href={qrCodes.ios.appLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-12 px-8 bg-black hover:bg-neutral-800 text-white font-bold rounded-lg transition-colors">
                  <Apple className="w-5 h-5 mr-2" />
                  App Store
                </Button>
              </a>
            </div>

            {/* Android */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-8">
                <div className="text-[#E60012] mb-4">
                  <Download className="w-12 h-12 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Google Play Store</h2>
                <p className="text-neutral-600 mb-6">
                  {t({
                    en: "Available for Android phones and tablets",
                    ar: "متاح لهواتف Android والأجهزة اللوحية",
                  })}
                </p>
              </div>

              {qrCodes.android.qrImage ? (
                <div className="border-4 border-[#E60012] p-4 rounded-xl bg-white mb-6">
                  <img
                    src={qrCodes.android.qrImage}
                    alt="Android QR Code"
                    className="w-48 h-48"
                  />
                </div>
              ) : (
                <div className="border-4 border-neutral-200 p-4 rounded-xl bg-neutral-50 mb-6 w-48 h-48 flex items-center justify-center">
                  <p className="text-neutral-400 text-sm">
                    {t({
                      en: "QR Code coming soon",
                      ar: "كود QR قريباً",
                    })}
                  </p>
                </div>
              )}

              <a
                href={qrCodes.android.appLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-12 px-8 bg-[#3DDC84] hover:bg-[#2db86c] text-white font-bold rounded-lg transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Play Store
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-black mb-6">
              {t({
                en: "App Features",
                ar: "ميزات التطبيق",
              })}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: { en: "Remote Lock Control", ar: "التحكم عن بعد" },
                  desc: {
                    en: "Lock and unlock your door from anywhere in the world",
                    ar: "إقفال وفتح الباب من أي مكان في العالم",
                  },
                },
                {
                  title: {
                    en: "Multi-User Management",
                    ar: "إدارة متعددة المستخدمين",
                  },
                  desc: {
                    en: "Manage up to 37 users with individual permissions",
                    ar: "إدارة ما يصل إلى 37 مستخدماً بصلاحيات فردية",
                  },
                },
                {
                  title: { en: "Access History", ar: "سجل الوصول" },
                  desc: {
                    en: "View detailed logs of who accessed your door and when",
                    ar: "عرض سجلات مفصلة لمن وصل وفي أي وقت",
                  },
                },
                {
                  title: { en: "Battery Monitoring", ar: "مراقبة البطارية" },
                  desc: {
                    en: "Real-time battery status and low battery alerts",
                    ar: "حالة البطارية في الوقت الفعلي وتنبيهات البطارية الضعيفة",
                  },
                },
                {
                  title: { en: "Temporary Access", ar: "وصول مؤقت" },
                  desc: {
                    en: "Create one-time codes for guests and visitors",
                    ar: "إنشاء رموز لمرة واحدة للضيوف والزوار",
                  },
                },
                {
                  title: { en: "Smart Notifications", ar: "إشعارات ذكية" },
                  desc: {
                    en: "Instant notifications for all lock activities",
                    ar: "إشعارات فورية لجميع أنشطة الأقفال",
                  },
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl border border-neutral-200"
                >
                  <h3 className="font-bold text-lg mb-2">{t(feature.title)}</h3>
                  <p className="text-neutral-600">{t(feature.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AppDownload;
