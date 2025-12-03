import { useState, useEffect } from 'react';
import { Download, X, Share, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);
    
    // Detect Android
    const android = /Android/.test(navigator.userAgent);
    setIsAndroid(android);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    // For iOS, show instructions modal
    if (isIOS) {
      setShowModal(true);
      return;
    }

    // For Android with prompt
    if (!deferredPrompt) {
      setShowModal(true);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  // Don't show if already installed
  if (isInstalled) return null;

  const content = {
    ar: {
      install: 'تثبيت التطبيق',
      modalTitle: 'ثبّت تطبيق Fixate',
      modalDesc: 'احصل على تجربة أفضل وأسرع مع التطبيق',
      iosTitle: 'تثبيت على iPhone/iPad',
      iosStep1: '1. اضغط على زر المشاركة',
      iosStep2: '2. اختر "إضافة إلى الشاشة الرئيسية"',
      iosStep3: '3. اضغط "إضافة"',
      androidTitle: 'تثبيت على Android',
      androidStep1: '1. افتح القائمة في المتصفح',
      androidStep2: '2. اختر "إضافة إلى الشاشة الرئيسية"',
      androidStep3: '3. اضغط "تثبيت"',
      close: 'إغلاق',
      available: 'متاح على iOS و Android'
    },
    en: {
      install: 'Install App',
      modalTitle: 'Install Fixate App',
      modalDesc: 'Get a better and faster experience with the app',
      iosTitle: 'Install on iPhone/iPad',
      iosStep1: '1. Tap the Share button',
      iosStep2: '2. Select "Add to Home Screen"',
      iosStep3: '3. Tap "Add"',
      androidTitle: 'Install on Android',
      androidStep1: '1. Open browser menu',
      androidStep2: '2. Select "Add to Home Screen"',
      androidStep3: '3. Tap "Install"',
      close: 'Close',
      available: 'Available on iOS & Android'
    }
  };

  const t = content[language];

  return (
    <>
      <Button
        onClick={handleInstall}
        variant="outline"
        size="sm"
        className="gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-500/30"
      >
        <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="hidden md:inline text-emerald-600 dark:text-emerald-400">{t.install}</span>
      </Button>

      {/* Installation Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in-95">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t.modalTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t.modalDesc}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                {t.available}
              </p>
            </div>

            <div className="space-y-6">
              {/* iOS Instructions */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Share className="w-5 h-5 text-emerald-600" />
                  {t.iosTitle}
                </h4>
                <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Share className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{t.iosStep1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plus className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{t.iosStep2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{t.iosStep3}</span>
                  </li>
                </ol>
              </div>

              {/* Android Instructions */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600" />
                  {t.androidTitle}
                </h4>
                <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0">⋮</span>
                    <span>{t.androidStep1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plus className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{t.androidStep2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{t.androidStep3}</span>
                  </li>
                </ol>
              </div>
            </div>

            <Button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {t.close}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
