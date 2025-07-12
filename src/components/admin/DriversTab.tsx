import React from 'react';
import { Plus, Edit } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  carBrand: string;
  carNumber: string;
  palletCapacity: number;
  status: string;
  currentRoute: string | null;
}

interface DriversTabProps {
  drivers: Driver[];
  onAddDriver: () => void;
  onEditDriver: (driver: Driver) => void;
}

const DriversTab: React.FC<DriversTabProps> = ({ drivers, onAddDriver, onEditDriver }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Водители</h2>
        <button 
          onClick={onAddDriver}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить водителя
        </button>
      </div>
      
      <div className="grid gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Телефон: {driver.phone}</p>
                  <p>Машина: {driver.carBrand}</p>
                  <p>Гос. номер: {driver.carNumber}</p>
                  <p>Вместимость: {driver.palletCapacity} паллет</p>
                  {driver.currentRoute && (
                    <p>Текущий маршрут: {driver.currentRoute}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  driver.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {driver.status === 'active' ? 'Активен' : 'Свободен'}
                </div>
                <button
                  onClick={() => onEditDriver(driver)}
                  className="text-blue-600 hover:text-blue-700 p-2"
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

export default DriversTab;