import React, { useState } from 'react';
import { MapPin, User, Building, MessageSquare, Plus, X } from 'lucide-react';
import Modal from '../Modal';
import WarehouseAutocomplete from '../WarehouseAutocomplete';

interface Driver {
  id: string;
  name: string;
  phone: string;
  carBrand: string;
  carNumber: string;
  status: string;
}

interface CreateRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  drivers: Driver[];
  onSubmit: (routeData: any) => void;
}

const CreateRouteModal: React.FC<CreateRouteModalProps> = ({
  isOpen,
  onClose,
  drivers,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    driverId: '',
    warehouses: [] as string[],
    comment: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [warehouseInput, setWarehouseInput] = useState('');

  const availableDrivers = drivers.filter(driver => driver.status === 'free');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addWarehouse = () => {
    if (warehouseInput.trim() && !formData.warehouses.includes(warehouseInput.trim())) {
      setFormData(prev => ({
        ...prev,
        warehouses: [...prev.warehouses, warehouseInput.trim()]
      }));
      setWarehouseInput('');
    }
  };

  const removeWarehouse = (warehouse: string) => {
    setFormData(prev => ({
      ...prev,
      warehouses: prev.warehouses.filter(w => w !== warehouse)
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите название маршрута';
    }
    if (!formData.driverId) {
      newErrors.driverId = 'Выберите водителя';
    }
    if (formData.warehouses.length === 0) {
      newErrors.warehouses = 'Добавьте хотя бы один склад';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        driverId: '',
        warehouses: [],
        comment: ''
      });
      setWarehouseInput('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      driverId: '',
      warehouses: [],
      comment: ''
    });
    setWarehouseInput('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Создать маршрут"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Новый маршрут</h3>
        </div>

        {/* Название маршрута */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название маршрута *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Маршрут #1 - WB Москва"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Выбор водителя */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Водитель *
          </label>
          <select
            name="driverId"
            value={formData.driverId}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.driverId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Выберите водителя</option>
            {availableDrivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} - {driver.carBrand} ({driver.carNumber})
              </option>
            ))}
          </select>
          {errors.driverId && (
            <p className="mt-1 text-sm text-red-600">{errors.driverId}</p>
          )}
          {availableDrivers.length === 0 && (
            <p className="mt-1 text-sm text-amber-600">Нет свободных водителей</p>
          )}
        </div>

        {/* Склады */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-1" />
            Склады назначения *
          </label>
          
          {/* Добавление склада */}
          <div className="flex space-x-2 mb-3">
            <div className="flex-1">
              <WarehouseAutocomplete
                value={warehouseInput}
                onChange={setWarehouseInput}
                placeholder="Начните вводить название склада..."
              />
            </div>
            <button
              type="button"
              onClick={addWarehouse}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Список выбранных складов */}
          {formData.warehouses.length > 0 && (
            <div className="space-y-2 mb-3">
              {formData.warehouses.map((warehouse, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-900">{warehouse}</span>
                  <button
                    type="button"
                    onClick={() => removeWarehouse(warehouse)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.warehouses && (
            <p className="mt-1 text-sm text-red-600">{errors.warehouses}</p>
          )}
        </div>

        {/* Комментарий */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Комментарий
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder="Дополнительная информация о маршруте..."
          />
        </div>

        {/* Кнопки */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Создать маршрут
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRouteModal;