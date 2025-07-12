import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { Warehouse } from '../../data/warehouses';

interface WarehousesTabProps {
  warehouses: Warehouse[];
  onAddWarehouse: () => void;
  onEditWarehouse: (warehouse: Warehouse) => void;
}

const WarehousesTab: React.FC<WarehousesTabProps> = ({ warehouses, onAddWarehouse, onEditWarehouse }) => {
  const getMarketplaceLabel = (marketplace: string) => {
    const labels = {
      'wildberries': 'Wildberries',
      'ozon': 'Ozon',
      'yandex': 'Яндекс.Маркет',
      'sber': 'СберЛогистика',
      'detmir': 'Детский мир'
    };
    return labels[marketplace as keyof typeof labels] || marketplace;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Склады</h2>
        <button 
          onClick={onAddWarehouse}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить склад
        </button>
      </div>
      
      <div className="grid gap-6">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                <p className="text-blue-600 font-medium">{getMarketplaceLabel(warehouse.marketplace)}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Город: {warehouse.city}</p>
                  <p>Маркетплейс: {getMarketplaceLabel(warehouse.marketplace)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="space-y-1 text-sm">
                  <p>До куба: <span className="font-medium">{warehouse.pricing.toCube} ₽</span></p>
                  <p>Коробки: <span className="font-medium">{warehouse.pricing.boxes1to3} ₽</span></p>
                  <p>1 паллета: <span className="font-medium">{warehouse.pricing.pallets['1']} ₽</span></p>
                  <p>2 паллеты: <span className="font-medium">{warehouse.pricing.pallets['2']} ₽</span></p>
                </div>
                <button
                  onClick={() => onEditWarehouse(warehouse)}
                  className="mt-2 text-blue-600 hover:text-blue-700 p-2"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehousesTab;