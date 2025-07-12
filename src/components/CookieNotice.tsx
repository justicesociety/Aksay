import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже согласие на куки
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary-800 mb-1">
                Мы используем файлы cookie
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Этот сайт использует файлы cookie для улучшения пользовательского опыта, 
                анализа трафика и персонализации контента. Продолжая использовать сайт, 
                вы соглашаетесь с нашей{' '}
                <button 
                  className="text-accent-600 hover:text-accent-700 underline"
                  onClick={() => {/* Открыть модальное окно политики */}}
                >
                  политикой конфиденциальности
                </button>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Отклонить
            </button>
            <button
              onClick={handleAccept}
              className="bg-accent-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors"
            >
              Принять
            </button>
            <button
              onClick={handleDecline}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieNotice;