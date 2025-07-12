import React from 'react';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section id="home" className="pt-20 lg:pt-24 pb-16 lg:pb-24 bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-accent-400" />
              <span className="text-accent-300 font-medium">Работаем 24/7</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Доставка товаров на склады{' '}
              <span className="text-accent-400">маркетплейсов</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Профессиональная логистика для вашего бизнеса. Быстро, надёжно и с гарантией качества. 
              Собственный автопарк и круглосуточная поддержка.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Собственный автопарк',
                'Поддержка 24/7',
                'Быстрая обработка',
                'Гарантия качества'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center group"
              >
                Оформить заявку
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contacts"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-all duration-200 text-center"
              >
                Связаться с нами
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-blue-100 rounded-2xl shadow-2xl p-8 lg:p-12 border border-blue-300" style={{background: 'linear-gradient(to bottom right, rgb(219, 234, 254), #1283ec)'}}>
              {/* Header with icon and badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-r from-accent-500 to-accent-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Онлайн
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  Работаем 24/7
                </h3>
                <p className="text-blue-800 mb-8 leading-relaxed">
                  Принимаем и обрабатываем заявки круглосуточно. 
                  Быстрая обработка и профессиональный сервис.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-700 mb-1">24</div>
                    <div className="text-sm text-blue-800 font-medium">часа</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-800 mb-1">7</div>
                    <div className="text-sm text-blue-900 font-medium">дней</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-700 mb-1">365</div>
                    <div className="text-sm text-blue-800 font-medium">дней</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Обработка заявок за 15 минут</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Поддержка в мессенджерах</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Отслеживание груза онлайн</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-accent-400 rounded-full opacity-60"></div>
            <div className="absolute top-1/4 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;