import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { additionalServices, extraCharges } from '../data/warehouses';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { isAuthenticated } = useAuth();

  const pricingData = [
    {
      service: 'Доставка до куба',
      price: 'от 2 500 ₽',
      description: 'Мелкогабаритные грузы'
    },
    {
      service: 'Коробки (1-3 шт)',
      price: 'от 150 ₽/коробка',
      description: 'За каждую коробку'
    },
    {
      service: 'Паллетная доставка',
      price: 'от 2 700 ₽/паллета',
      description: 'За каждую паллету'
    },
    {
      service: additionalServices.loading.name,
      price: additionalServices.loading.price,
      description: additionalServices.loading.description
    },
    {
      service: additionalServices.palletizing.name,
      price: `${additionalServices.palletizing.price} ₽`,
      description: additionalServices.palletizing.description
    },
    {
      service: extraCharges.outsideMKAD.name,
      price: `${extraCharges.outsideMKAD.price} ₽/${extraCharges.outsideMKAD.unit}`,
      description: 'Дополнительная плата за километр'
    },
    {
      service: extraCharges.insideTTK.name,
      price: `${extraCharges.insideTTK.price} ₽`,
      description: 'Фиксированная доплата'
    }
  ];

  const features = [
    'Бесплатная упаковка',
    'Отслеживание груза',
    'SMS-уведомления',
    'Фото-отчёт доставки',
    'Поддержка 24/7',
    'Гарантия сохранности'
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Тарифы на доставку
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Прозрачные цены без скрытых комиссий. Стоимость зависит от веса, объёма и направления доставки
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-primary-800 text-white p-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Тарифы Аксай Логистик
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {pricingData.map((item, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-primary-800 mb-1">
                          {item.service}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-500">
                          {item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-accent-50 p-6">
                <p className="text-sm text-gray-600 mb-4">
                  * Окончательная стоимость рассчитывается индивидуально с учётом всех параметров груза
                </p>
                <a
                  href={isAuthenticated ? "/dashboard" : "#calculator"}
                  className="inline-flex items-center text-accent-600 font-medium hover:text-accent-700 transition-colors"
                >
                  {isAuthenticated ? 'Создать заказ →' : 'Оформить заявку →'}
                </a>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-6">
                Что входит в стоимость
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Скидки для постоянных клиентов
              </h3>
              <div className="space-y-3 text-accent-100">
                <div className="flex justify-between">
                  <span>От 10 заказов:</span>
                  <span className="font-semibold">-5%</span>
                </div>
                <div className="flex justify-between">
                  <span>От 50 заказов:</span>
                  <span className="font-semibold">-10%</span>
                </div>
                <div className="flex justify-between">
                  <span>От 100 заказов:</span>
                  <span className="font-semibold">-15%</span>
                </div>
              </div>
              <button className="w-full bg-white text-accent-600 py-3 rounded-lg font-semibold mt-6 hover:bg-accent-50 transition-colors">
                Узнать больше
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <FileText className="w-5 h-5 mr-2" />
            Открыть полный прайс-лист
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;