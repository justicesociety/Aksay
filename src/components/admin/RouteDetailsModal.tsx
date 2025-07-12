import React, { useState } from 'react';
import { MapPin, User, Building, Package, Clock, Truck, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';
import Modal from '../Modal';
import { Route, mockDrivers } from '../../data/mockData';

interface RouteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: Route | null;
  availableOrders: any[];
  onAddOrder: (routeId: string, orderId: string) => void;
  onRemoveOrder: (routeId: string, orderId: string) => void;
  onStatusChange: (routeId: string, newStatus: string) => void;
  onUpdateRouteCost: (routeId: string, newCost: number) => void;
}

const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({
  isOpen,
  onClose,
  route,
  availableOrders,
  onAddOrder,
  onRemoveOrder,
  onStatusChange,
  onUpdateRouteCost
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState('');

  if (!route) return null;

  // Получаем данные водителя по ID
  const driver = mockDrivers.find(d => d.id === route.driverId);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'created':
        return { label: 'Создан', color: 'bg-gray-100 text-gray-800', icon: Clock };
      case 'in_progress':
        return { label: 'В работе', color: 'bg-blue-100 text-blue-800', icon: Truck };
      case 'at_warehouse':
        return { label: 'На складе', color: 'bg-yellow-100 text-yellow-800', icon: Package };
      case 'completed':
        return { label: 'Сдан', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };

  const statusInfo = getStatusInfo(route.status);
  const StatusIcon = statusInfo.icon;

  // Фильтруем заявки: только принятые и с подходящими складами
  const filteredOrders = availableOrders.filter(order => 
    order.status === 'accepted' && 
    !route.orderIds.includes(order.id) && // Исключаем заявки уже в маршруте
    route.warehouses.some(warehouse => 
      order.deliveryAddress && 
      typeof order.deliveryAddress === 'string' && 
      (order.deliveryAddress.includes(warehouse) || warehouse.includes(order.deliveryAddress))
    )
  );

  const handleAddOrder = () => {
    if (selectedOrderId) {
      onAddOrder(route.id, selectedOrderId);
      
      // Обновляем локальные данные для демонстрации
      const order = availableOrders.find(o => o.id === selectedOrderId);
      if (order) {
        route.orderIds.push(selectedOrderId);
        route.totalCost += order.cost;
        // Пересчитываем общий вес
        const totalWeight = route.orderIds.reduce((sum, orderId) => {
          const orderInRoute = availableOrders.find(o => o.id === orderId);
          if (orderInRoute) {
            const weight = parseInt(orderInRoute.weight.replace(/\D/g, '')) || 0;
            return sum + weight;
          }
          return sum;
        }, 0);
        route.totalWeight = `${totalWeight} кг`;
      }
      
      setSelectedOrderId('');
    }
  };

  const getNextStatus = () => {
    switch (route.status) {
      case 'created': return 'in_progress';
      case 'in_progress': return 'at_warehouse';
      case 'at_warehouse': return 'completed';
      default: return route.status;
    }
  };

  const getStatusButtonText = () => {
    switch (route.status) {
      case 'created': return 'Отправить в работу';
      case 'in_progress': return 'Прибыл на склад';
      case 'at_warehouse': return 'Груз сдан';
      default: return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Маршрут #${route.id}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Заголовок с статусом */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{route.name}</h2>
          <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${statusInfo.color}`}>
            <StatusIcon className="w-4 h-4 mr-2" />
            {statusInfo.label}
          </div>
        </div>

        {/* Информация о маршруте */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Водитель */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Водитель
            </h3>
            {driver ? (
              <div className="space-y-1 text-blue-700">
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm">{driver.phone}</p>
                <p className="text-sm">{driver.carBrand} ({driver.carNumber})</p>
              </div>
            ) : (
              <p className="text-blue-600 italic">Водитель не назначен</p>
            )}
          </div>

          {/* Склады */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Склады ({route.warehouses.length})
            </h3>
            <div className="space-y-1">
              {route.warehouses.map((warehouse, index) => (
                <p key={index} className="text-sm text-green-700">
                  {warehouse}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Комментарий */}
        {route.comment && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Комментарий</h3>
            <p className="text-gray-700">{route.comment}</p>
          </div>
        )}

        {/* Заказы в маршруте */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Заказы в маршруте ({route.orderIds.length})
          </h3>
          
          {route.orderIds.length > 0 ? (
            <div className="space-y-3 mb-4">
              {route.orderIds.map((orderId) => {
                const order = availableOrders.find(o => o.id === orderId);
                if (!order) return null;
                
                return (
                <div key={orderId} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div>
                    <div className="font-medium text-purple-800">Заказ #{orderId}</div>
                    <div className="text-sm text-purple-600">
                      {order.clientName} • {order.deliveryAddress}
                    </div>
                    <div className="text-sm text-purple-600">
                      Груз: {order.boxes > 0 ? `${order.boxes} коробок` : ''} {order.pallets > 0 ? `${order.pallets} паллет` : ''} • {order.weight}
                    </div>
                    <div className="text-sm text-purple-600">
                      Забор: {order.pickupDate} {order.pickupTime} • Сдача: {order.deliveryDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-800 font-medium">
                      {order.cost.toLocaleString('ru-RU')} ₽
                    </div>
                    <button
                      onClick={() => onRemoveOrder(route.id, orderId)}
                      className="text-red-600 hover:text-red-700 p-1"
                      disabled={route.status !== 'created'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg mb-4">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>В маршруте пока нет заказов</p>
            </div>
          )}

          {/* Добавление заказов (только для созданных маршрутов) */}
          {route.status === 'created' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Добавить заказ в маршрут</h4>
              <div className="flex space-x-3">
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Выберите заказ</option>
                  {filteredOrders.map((order) => (
                    <option key={order.id} value={order.id}>
                      Заказ #{order.id} - {order.clientName} - {order.deliveryAddress} - {order.cost.toLocaleString('ru-RU')} ₽
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddOrder}
                  disabled={!selectedOrderId}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Добавить
                </button>
              </div>
              {filteredOrders.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Нет свободных заказов для этого маршрута. Показываются только принятые заказы с подходящими складами, которые еще не добавлены в маршруты.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Итоги */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Итоги маршрута</h3>
          
          {/* Информация о маршруте */}
          <div className="mb-4 p-3 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-800 mb-2">Информация о маршруте</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Дата создания:</span>
                <div className="font-medium">{route.createdDate}</div>
              </div>
              <div>
                <span className="text-gray-600">Статус:</span>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo.label}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Склады в маршруте:</span>
                <div className="font-medium">{route.warehouses.length}</div>
              </div>
              <div>
                <span className="text-gray-600">Заказов в маршруте:</span>
                <div className="font-medium">{route.orderIds?.length ?? 0}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {(route?.totalCost ?? 0).toLocaleString('ru-RU')} ₽
              </div>
              
              {/* Manual Route Cost Control */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Стоимость маршрута:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={route?.totalCost ?? 0}
                    onChange={(e) => onUpdateRouteCost(route.id, parseInt(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    min="0"
                  />
                  <span className="text-gray-500">₽</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Автоматический расчет: {(route?.orderIds?.reduce((sum, orderId) => {
                    const order = availableOrders.find(o => o.id === orderId);
                    return sum + (order?.cost || 0);
                  }, 0) ?? 0).toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="text-sm text-gray-600">Общая стоимость</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {route?.orderIds?.length ?? 0}
              </div>
              <div className="text-sm text-gray-600">Заказов</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {route?.totalWeight ?? '0 кг'}
              </div>
              <div className="text-sm text-gray-600">Общий вес</div>
            </div>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
          
          <div className="flex space-x-3">
            {route.status !== 'completed' && (
              <button
                onClick={() => onStatusChange(route.id, getNextStatus())}
                className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                  route.status === 'created' ? 'bg-blue-600 hover:bg-blue-700' :
                  route.status === 'in_progress' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                {getStatusButtonText()}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RouteDetailsModal;