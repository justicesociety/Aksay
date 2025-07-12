import React from 'react';
import { FileText, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const WorkSteps = () => {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      icon: FileText,
      title: 'Подача заявки',
      description: 'Оставьте заявку через сайт или позвоните нам. Мы обработаем её в течение 15 минут.',
      details: ['Онлайн-форма или звонок', 'Быстрая обработка', 'Расчёт стоимости']
    },
    {
      icon: Truck,
      title: 'Забор товара',
      description: 'Наш курьер приедет в удобное время и заберёт ваш товар с соблюдением всех требований.',
      details: ['Удобное время', 'Профессиональная упаковка', 'Документооборот']
    },
    {
      icon: CheckCircle,
      title: 'Доставка на склад',
      description: 'Доставляем товар на склад маркетплейса точно в срок с предоставлением отчётности.',
      details: ['Точно в срок', 'Отслеживание груза', 'Полная отчётность']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Этапы работы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Простой и понятный процесс доставки в три этапа
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent-300 to-accent-100 transform translate-x-6 z-0"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-accent-200">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="bg-accent-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-primary-800 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Готовы начать работу?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Оставьте заявку прямо сейчас и получите персональное предложение для вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={isAuthenticated ? "/dashboard" : "#calculator"}
                className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-200 hover:shadow-lg"
              >
                {isAuthenticated ? 'Создать заказ' : 'Оформить заявку'}
              </a>
              <a
                href="tel:+79361302070"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-all duration-200"
              >
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSteps;