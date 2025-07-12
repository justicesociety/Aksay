import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Package, Building, Phone, MessageSquare } from 'lucide-react';
import Modal from '../Modal';
import { warehouses } from '../../data/warehouses';
import WarehouseAutocomplete from '../WarehouseAutocomplete';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: any[];
  onCreateClient: () => void;
  onSubmit: (orderData: any) => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  clients,
  onCreateClient,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    clientId: '',
    pickupDate: '',
    deliveryDate: '',
    pickupTime: '',
    pickupAddress: '',
    deliveryAddress: '',
    pallets: '',
    boxes: '',
    weight: '',
    loading: false,
    palletizing: false,
    comment: ''
  });

  const [errors, setErrors] = useState<any>({});

  const timeSlots = [
    'с 09:00 до 12:00',
    'с 12:00 до 15:00', 
    'с 15:00 до 18:00',
    'с 18:00 до 21:00',
    'Весь день (09:00-21:00)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.clientId) {
      newErrors.clientId = 'Выберите клиента';
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Выберите дату забора';
    } else if (formData.pickupDate < today) {
      newErrors.pickupDate = 'Дата забора не может быть раньше сегодняшнего дня';
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Выберите дату доставки';
    }
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Выберите время забора';
    }
    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Укажите адрес забора';
    }
    if (!formData.deliveryAddress) {
      newErrors.deliveryAddress = 'Выберите склад доставки';
    }
    
    const boxes = parseInt(formData.boxes || '0');
    const pallets = parseInt(formData.pallets || '0');
    
    if (boxes === 0 && pallets === 0) {
      newErrors.boxes = 'Укажите количество коробок или паллет';
      newErrors.pallets = 'Укажите количество коробок или паллет';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        clientId: '',
        pickupDate: '',
        deliveryDate: '',
        pickupTime: '',
        pickupAddress: '',
        deliveryAddress: '',
        pallets: '',
        boxes: '',
        weight: '',
        loading: false,
        palletizing: false,
        comment: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      clientId: '',
      pickupDate: '',
      deliveryDate: '',
      pickupTime: '',
      pickupAddress: '',
      deliveryAddress: '',
      pallets: '',
      boxes: '',
      weight: '',
      loading: false,
      palletizing: false,
      comment: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Создать заказ"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Выбор клиента */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Клиент *
          </label>
          <div className="flex space-x-2">
            <WarehouseAutocomplete
              value={formData.clientId}
              onChange={(value) => setFormData(prev => ({ ...prev, deliveryAddress: value }))}
              error={errors.deliveryAddress}
              placeholder="Начните вводить название склада..."
            />
            <button
              type="button"
              onClick={onCreateClient}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Новый клиент
            </button>
          </div>
          {errors.clientId && (
            <p className="mt-1 text-sm text-red-600">{errors.clientId}</p>
          )}
        </div>

        {/* Даты */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Дата забора *
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.pickupDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.pickupDate && (
              <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Дата доставки *
            </label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              min={formData.pickupDate || new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.deliveryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
            )}
          </div>
        </div>

        {/* Время и адреса */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Время забора *
          </label>
          <select
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.pickupTime ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Выберите время</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.pickupTime && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Адрес забора *
          </label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleInputChange}
            placeholder="МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.pickupAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.pickupAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Склад доставки *
          </label>
          <WarehouseAutocomplete
            value={formData.deliveryAddress}
            onChange={(value) => setFormData(prev => ({ ...prev, deliveryAddress: value }))}
            error={errors.deliveryAddress}
            placeholder="Начните вводить название склада..."
          />
          {errors.deliveryAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>
          )}
        </div>

        {/* Груз */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-1" />
              Количество коробок
            </label>
            <input
              type="number"
              name="boxes"
              value={formData.boxes}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.boxes ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.boxes && (
              <p className="mt-1 text-sm text-red-600">{errors.boxes}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-1" />
              Количество паллет
            </label>
            <input
              type="number"
              name="pallets"
              value={formData.pallets}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.pallets ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.pallets && (
              <p className="mt-1 text-sm text-red-600">{errors.pallets}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Вес (кг)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="0"
            />
          </div>
        </div>

        {/* Дополнительные услуги */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Дополнительные услуги</h3>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="loading"
              name="loading"
              checked={formData.loading}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="loading" className="text-sm text-gray-700">
              Погрузка (+500 ₽)
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="palletizing"
              name="palletizing"
              checked={formData.palletizing}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="palletizing" className="text-sm text-gray-700">
              Паллетирование (+300 ₽ за паллету)
            </label>
          </div>
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
            placeholder="Дополнительная информация о заказе..."
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
            Создать заказ
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrderModal;