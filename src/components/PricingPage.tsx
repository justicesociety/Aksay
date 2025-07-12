import React, { useState } from 'react';
import { FileText, Download, Search, Filter, ArrowLeft } from 'lucide-react';
import { warehouses, additionalServices, extraCharges } from '../data/warehouses';
import { useAuth } from '../contexts/AuthContext';

const PricingPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const marketplaces = [
    { value: 'all', label: 'Все маркетплейсы', color: 'bg-gray-500' },
    { value: 'wildberries', label: 'Wildberries', color: 'bg-purple-500' },
    { value: 'ozon', label: 'Ozon', color: 'bg-blue-500' },
    { value: 'yandex', label: 'Яндекс.Маркет', color: 'bg-yellow-500' },
    { value: 'sber', label: 'СберЛогистика', color: 'bg-green-500' },
    { value: 'detmir', label: 'Детский мир', color: 'bg-red-500' }
  ];

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarketplace = selectedMarketplace === 'all' || warehouse.marketplace === selectedMarketplace;
    return matchesSearch && matchesMarketplace;
  });

  const getMarketplaceInfo = (marketplace: string) => {
    return marketplaces.find(m => m.value === marketplace) || marketplaces[0];
  };

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Button */}
        <div className="mb-6">
          <a 
            href="/"
            className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-8 h-8 text-accent-500" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Полный прайс-лист
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Актуальные тарифы на доставку товаров на склады всех маркетплейсов
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по названию или городу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors bg-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Marketplace Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors appearance-none bg-gray-700 text-white"
              >
                {marketplaces.map(marketplace => (
                  <option key={marketplace.value} value={marketplace.value}>
                    {marketplace.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-300">
              Найдено складов: <span className="font-semibold">{filteredWarehouses.length}</span>
            </p>
            <button className="flex items-center bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Скачать прайс
            </button>
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWarehouses.map((warehouse) => {
            const marketplaceInfo = getMarketplaceInfo(warehouse.marketplace);
            return (
              <div key={warehouse.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-700">
                {/* Header */}
                <div className={`${marketplaceInfo.color} text-white p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold mb-1 leading-tight">{warehouse.name}</h2>
                      <div className="flex items-center space-x-2 text-xs">
                        <span>{marketplaceInfo.label}</span>
                        <span>•</span>
                        <span>{warehouse.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Table */}
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 px-2 font-semibold text-gray-300 text-sm">Услуга</th>
                          <th className="text-right py-2 px-2 font-semibold text-gray-300 text-sm">Стоимость</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="py-2 px-2 text-sm text-gray-300">До куба</td>
                          <td className="py-2 px-2 text-right font-semibold text-accent-600 text-sm">
                            {warehouse.pricing.toCube.toLocaleString('ru-RU')} ₽
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 text-sm text-gray-300">Коробки (свыше 1м³)</td>
                          <td className="py-2 px-2 text-right font-semibold text-accent-600 text-sm">
                            {warehouse.pricing.boxes1to3} ₽/шт
                          </td>
                        </tr>
                        {Object.entries(warehouse.pricing.pallets).map(([palletCount, price]) => (
                          <tr key={palletCount}>
                            <td className="py-2 px-2 text-sm text-gray-300">
                              {(() => {
                                const count = parseInt(palletCount);
                                if (count === 1) return '1 паллета';
                                if (count >= 2 && count <= 4) return `${count} паллеты`;
                                if (count >= 5) return `${count} паллет`;
                                return `${palletCount} паллет`;
                              })()}
                            </td>
                            <td className="py-2 px-2 text-right font-semibold text-accent-600 text-sm">
                              {typeof price === 'string' ? price : price.toLocaleString('ru-RU')} ₽
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-700 p-3 mt-4 rounded-lg border border-gray-600">
                    <p className="text-xs text-gray-400 mb-2">
                      * Окончательная стоимость рассчитывается индивидуально с учётом всех параметров груза
                    </p>
                    <a
                      href={isAuthenticated ? "/dashboard" : "/#calculator"}
                      className="inline-flex items-center text-accent-400 font-medium hover:text-accent-300 transition-colors text-xs"
                    >
                      {isAuthenticated ? 'Перейти в личный кабинет →' : 'Рассчитать точную стоимость →'}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Дополнительные услуги</h2>
          
          {/* Основные услуги */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="w-1 h-6 bg-accent-500 rounded mr-3"></div>
              Основные услуги
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {Object.entries(additionalServices).map(([key, service]) => (
                <div key={key} className="bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-white text-lg">{service.name}</h4>
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-lg font-bold text-sm ml-4 flex-shrink-0">
                      {service.price === 0 ? 'По договоренности' : 
                       service.price < 1 ? `${(service.price * 100)}%` :
                       typeof service.price === 'string' ? service.price :
                       `${service.price} ₽`}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные расходы */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="w-1 h-6 bg-red-500 rounded mr-3"></div>
              Дополнительные расходы
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(extraCharges).map(([key, charge]) => (
                <div key={key} className="bg-red-900/20 rounded-xl p-6 border border-red-800">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">{charge.name}</h4>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                      {charge.price} ₽{charge.unit !== 'фиксированная' ? `/${charge.unit}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 text-white border border-gray-600">
          <h3 className="text-xl font-semibold mb-4">Важная информация</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2">
              <li>• Цены указаны без НДС</li>
              <li>• Минимальный заказ: 1 куб</li>
              <li>• Максимальный вес паллеты: 250 кг</li>
              <li>• Работаем круглосуточно</li>
            </ul>
            <ul className="space-y-2">
              <li>• Бесплатная упаковка</li>
              <li>• Страхование грузов</li>
              <li>• Отслеживание доставки</li>
              <li>• Фото-отчеты</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;