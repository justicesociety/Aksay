import React, { useState } from 'react';
import { Building2, Search, Filter, MapPin, Package } from 'lucide-react';
import { warehouses, Warehouse } from '../data/warehouses';

const WarehouseDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');

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
    <section id="warehouses" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="w-8 h-8 text-accent-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800">
              Справочник складов
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Полный список складов маркетплейсов с актуальными тарифами на доставку
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по названию или городу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
              />
            </div>

            {/* Marketplace Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors appearance-none"
              >
                {marketplaces.map(marketplace => (
                  <option key={marketplace.value} value={marketplace.value}>
                    {marketplace.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWarehouses.map((warehouse) => {
            const marketplaceInfo = getMarketplaceInfo(warehouse.marketplace);
            return (
              <div key={warehouse.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className={`${marketplaceInfo.color} text-white p-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-semibold text-sm">{marketplaceInfo.label}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{warehouse.city}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-primary-800 mb-3 leading-tight text-sm">
                    {warehouse.name}
                  </h3>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-xs">До куба:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.toCube.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-xs">Коробки:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.boxes1to3} ₽/шт
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-xs">1 паллета:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.pallets['1'].toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-xs">2 паллеты:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.pallets['2'].toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-xs">9-10 паллет:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.pallets['9-10'].toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 text-xs">16-18 паллет:</span>
                      <span className="font-semibold text-accent-600 text-xs">
                        {warehouse.pricing.pallets['16-18'].toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-3 bg-accent-500 text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors text-sm">
                    Выбрать склад
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredWarehouses.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Склады не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-primary-800 to-primary-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Дополнительные расходы</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• Выезд за МКАД: 50 ₽/км</li>
                <li>• Выезд в ТТК: 1 000 ₽</li>
                <li>• Погрузка: 500 ₽</li>
                <li>• Паллетирование: 300 ₽</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Важная информация</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• Цены указаны без НДС</li>
                <li>• Минимальный заказ: 1 куб</li>
                <li>• Максимальный вес паллеты: 250 кг</li>
                <li>• Работаем 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseDirectory;