import React from 'react';
import { User, Phone, MapPin, Package, MessageSquare, CheckCircle, AlertCircle, Clock, Truck, Edit, Trash2, Route } from 'lucide-react';
import Modal from '../Modal';
import PaymentManagement from './PaymentManagement';
import { Order, updateOrderStatus, mockRoutes, mockDrivers } from '../../data/mockData';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onPaymentUpdate: (orderId: string, newStatus: string) => void;
  onAssignToRoute?: (orderId: string, routeId: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
  onPaymentUpdate,
  onAssignToRoute
}) => {
  const [driverComment, setDriverComment] = React.useState(order?.driverComment || '');
  const [currentStatus, setCurrentStatus] = React.useState(order?.status || '');
  const [selectedRouteId, setSelectedRouteId] = React.useState('');

  React.useEffect(() => {
    if (order) {
      setDriverComment(order.driverComment || '');
      setCurrentStatus(order.status || '');
    }
  }, [order]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'accepted':
        return { label: 'Принят', color: 'bg-blue-100 text-blue-800', icon: CheckCircle };
      case 'pickup':
        return { label: 'Забор груза', color: 'bg-blue-100 text-blue-800', icon: Truck };
      case 'in_transit':
        return { label: 'В пути', color: 'bg-blue-100 text-blue-800', icon: Truck };
      case 'delivered':
        return { label: 'Доставлено', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'failed':
        return { label: 'Не доставлено', color: 'bg-red-100 text-red-800', icon: AlertCircle };
      case 'returned':
        return { label: 'Возвращено', color: 'bg-gray-100 text-gray-800', icon: Package };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800', icon: Clock };
    }
  };

  const handleStatusChange = () => {
    if (order) {
      updateOrderStatus(order.id, currentStatus, driverComment);
      onStatusChange(order.id, currentStatus);
    }
    onClose();
  };

  const handleAssignToRoute = () => {
    if (order && selectedRouteId && onAssignToRoute) {
      onAssignToRoute(order.id, selectedRouteId);
      setSelectedRouteId('');
      onClose();
    }
  };

  // Получаем доступные маршруты для назначения
  const getAvailableRoutes = () => {
    if (!order) return [];
    
    return mockRoutes.filter(route => 
      route.status === 'created' && // Только созданные маршруты
      route.warehouses.some(warehouse => 
        order.deliveryAddress.includes(warehouse) || warehouse.includes(order.deliveryAddress)
      ) &&
      !route.orderIds.includes(order.id) // Исключаем маршруты, где заказ уже есть
    );
  };

  // Получаем информацию о назначенном водителе
  const getAssignedDriver = () => {
    if (!order?.assignedDriver) return null;
    return mockDrivers.find(driver => driver.name === order.assignedDriver);
  };

  // Получаем маршрут, в котором находится заказ
  const getCurrentRoute = () => {
    if (!order) return null;
    return mockRoutes.find(route => route.orderIds.includes(order.id));
  };

  if (!order) return null;

  const availableRoutes = getAvailableRoutes();
  const assignedDriver = getAssignedDriver();
  const currentRoute = getCurrentRoute();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Заказ #${order.id}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Информация о заказе */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Информация о заказе
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Номер заказа:</span>
                <span className="font-medium">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата создания:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата забора:</span>
                <span className="font-medium">{order.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Плановая сдача:</span>
                <span className="font-medium">{order.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Коробки:</span>
                <span className="font-medium">{order.boxes} шт</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Паллеты:</span>
                <span className="font-medium">{order.pallets} шт</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Общий вес:</span>
                <span className="font-medium">{order.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Стоимость:</span>
                <span className="font-bold text-green-600">{order.cost.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Клиент
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">Название:</span>
                <p className="font-medium">{order.clientName}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Телефон:</span>
                <p className="font-medium">
                  <a href={`tel:${order.clientPhone}`} className="text-blue-600 hover:text-blue-700 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {order.clientPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Адреса */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Адреса
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-gray-600 text-sm font-medium">Забор груза:</span>
              <p className="font-medium mt-1">{order.pickupAddress}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-gray-600 text-sm font-medium">Доставка:</span>
              <p className="font-medium mt-1">{order.deliveryAddress}</p>
            </div>
          </div>
          
          {order.comment && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-800 text-sm font-medium">Комментарий к заказу:</span>
              <p className="text-blue-700 mt-1">{order.comment}</p>
            </div>
          )}
        </div>

        {/* Информация о водителе */}
        {(assignedDriver || currentRoute) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Информация о назначении
            </h4>
            
            {assignedDriver && (
              <div className="mb-3">
                <span className="text-blue-600 text-sm font-medium">Водитель:</span>
                <div className="text-blue-700">
                  <p className="font-medium">{assignedDriver.name}</p>
                  <p className="text-sm">{assignedDriver.phone}</p>
                  <p className="text-sm">{assignedDriver.carBrand} ({assignedDriver.carNumber})</p>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    assignedDriver.status === 'busy' ? 'bg-red-100 text-red-800' : 
                    assignedDriver.status === 'free' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {assignedDriver.status === 'busy' ? 'Занят' : 
                     assignedDriver.status === 'free' ? 'Свободен' : 'Неактивен'}
                  </div>
                </div>
              </div>
            )}
            
            {currentRoute && (
              <div>
                <span className="text-blue-600 text-sm font-medium">Маршрут:</span>
                <div className="text-blue-700">
                  <p className="font-medium">{currentRoute.name}</p>
                  <p className="text-sm">Статус: {
                    currentRoute.status === 'created' ? 'Создан' :
                    currentRoute.status === 'in_progress' ? 'В работе' :
                    currentRoute.status === 'at_warehouse' ? 'На складе' :
                    currentRoute.status === 'completed' ? 'Завершен' : 'Неизвестно'
                  }</p>
                  <p className="text-sm">Заказов в маршруте: {currentRoute.orderIds.length}</p>
                  <p className="text-sm">Общая стоимость: {currentRoute.totalCost.toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Назначение в маршрут */}
        {order.status === 'accepted' && !currentRoute && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
              <Route className="w-5 h-5 mr-2" />
              Назначить в маршрут
            </h4>
            
            {availableRoutes.length > 0 ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Выберите маршрут:
                  </label>
                  <select
                    value={selectedRouteId}
                    onChange={(e) => setSelectedRouteId(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Выберите маршрут</option>
                    {availableRoutes.map((route) => {
                      const driver = mockDrivers.find(d => d.id === route.driverId);
                      return (
                        <option key={route.id} value={route.id}>
                          {route.name} - {driver?.name} ({driver?.carNumber}) - {route.totalCost.toLocaleString('ru-RU')} ₽
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <button
                  onClick={handleAssignToRoute}
                  disabled={!selectedRouteId}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Route className="w-4 h-4 mr-2" />
                  Назначить в маршрут
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-700 text-sm mb-2">
                  Нет доступных маршрутов для этого заказа
                </p>
                <p className="text-green-600 text-xs">
                  Создайте маршрут с подходящими складами или проверьте, что маршрут имеет статус "Создан"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Информация о том, почему нельзя назначить в маршрут */}
        {order.status !== 'accepted' && !currentRoute && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Назначение в маршрут
            </h4>
            <p className="text-yellow-700 text-sm">
              {order.status === 'pending' ? 
                'Сначала примите заказ, чтобы назначить его в маршрут' :
                'Заказ можно назначить в маршрут только со статусом "Принят"'
              }
            </p>
          </div>
        )}

        {/* Информация о назначенном маршруте */}
        {currentRoute && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
              <Route className="w-5 h-5 mr-2" />
              Заказ в маршруте
            </h4>
            <p className="text-purple-700 text-sm">
              Заказ уже назначен в маршрут "{currentRoute.name}". 
              Для изменения маршрута обратитесь к разделу "Маршруты".
            </p>
          </div>
        )}

        {/* Управление оплатой */}
        <PaymentManagement 
          order={order}
          onPaymentUpdate={onPaymentUpdate}
        />

        {/* Статус и комментарий */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Edit className="w-5 h-5 mr-2 text-blue-600" />
            Управление статусом
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус заказа</label>
              <select 
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="pending">Ожидает</option>
                <option value="accepted">Принят</option>
                <option value="assigned">Назначен водитель</option>
                <option value="pickup">Забор груза</option>
                <option value="in_transit">В пути</option>
                <option value="delivered">Доставлено</option>
                <option value="failed">Не доставлено</option>
                <option value="returned">Возвращено</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Комментарий
              </label>
              <textarea
                value={driverComment}
                onChange={(e) => setDriverComment(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Комментарий о выполнении заказа..."
              />
            </div>
          </div>
        </div>

        {/* История статусов */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">История изменений</h3>
          <div className="space-y-3">
            {order.statusHistory.map((history, index) => {
              const statusInfo = getStatusInfo(history.status);
              const StatusIcon = statusInfo.icon;
              return (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                  <div className={`p-2 rounded-full ${statusInfo.color.replace('text-', 'bg-').replace('-800', '-100')}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{statusInfo.label}</span>
                      <span className="text-sm text-gray-500">{new Date(history.date).toLocaleString('ru-RU')}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{history.comment}</p>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Закрыть
            </button>
            <button 
              onClick={handleStatusChange}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;