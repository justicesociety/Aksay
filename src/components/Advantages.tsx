import React from 'react';
import { Truck, Headphones, Clock, Shield, MapPin, Users } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: Truck,
      title: 'Собственный автопарк',
      description: 'Современные грузовики и фургоны для любых типов грузов'
    },
    {
      icon: Headphones,
      title: 'Поддержка 24/7',
      description: 'Круглосуточная техническая поддержка и консультации'
    },
    {
      icon: Clock,
      title: 'Быстрая обработка',
      description: 'Обработка заявок в течение 15 минут после подачи'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Страхование грузов и гарантия сохранности товаров'
    },
    {
      icon: MapPin,
      title: 'Широкая география',
      description: 'Доставка по всей России и в страны СНГ'
    },
    {
      icon: Users,
      title: 'Опытная команда',
      description: 'Профессиональные логисты с опытом работы от 5 лет'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Мы предоставляем полный спектр логистических услуг с гарантией качества и надёжности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-xl bg-gray-800 border border-gray-700 hover:border-accent-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-accent-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-400 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 lg:p-12 border border-gray-600">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Городов доставки</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">99.8%</div>
              <div className="text-gray-300">Успешных доставок</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Режим работы</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;