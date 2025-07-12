import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, CheckCircle, Clock, User, Truck, Package, AlertCircle, CreditCard } from 'lucide-react';
import { mockOrders, mockUsers, getOrdersByClientId, updateOrderStatus, updatePaymentStatus, updateOrderCost } from '../../data/mockData';
import OrderDetailsModal from './OrderDetailsModal';
import CreateOrderModal from './CreateOrderModal';

const OrdersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'accepted':
        return { label: 'Принят', color: 'bg-blue-100 text-blue-800', icon: CheckCircle };
      case 'assigned':
        return { label: 'Назначен водитель', color: 'bg-purple-100 text-purple-800', icon: User };
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

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'paid':
        return { label: 'Оплачено', color: 'bg-green-100 text-green-800' };
      case 'unpaid':
        return { label: 'Не оплачено', color: 'bg-red-100 text-red-800' };
      case 'invoice_requested':
        return { label: 'Запрошен счет', color: 'bg-yellow-100 text-yellow-800' };
      case 'invoice_sent':
        return { label: 'Счет отправлен', color: 'bg-blue-100 text-blue-800' };
      case 'overdue':
        return { label: 'Просрочено', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted');
    // Refresh the component or update local state
    window.location.reload();
  };

  const handleUpdatePaymentStatus = (orderId: string, status: string) => {
    updatePaymentStatus(orderId, status);
    window.location.reload();
  };

  const handleUpdateOrderCost = (orderId: string, cost: number) => {
    updateOrderCost(orderId, cost);
    window.location.reload();
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesClient = clientFilter === 'all' || order.clientId === clientFilter;
    const matchesWarehouse = warehouseFilter === 'all' || 
                            order.pickupAddress.toLowerCase().includes(warehouseFilter.toLowerCase()) ||
                            order.deliveryAddress.toLowerCase().includes(warehouseFilter.toLowerCase());
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesClient && matchesWarehouse && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary-800">Управление заявками</h2>
          <p className="text-gray-600">Всего заявок: {mockOrders.length}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Создать заявку
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по номеру, адресам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="accepted">Принят</option>
            <option value="assigned">Назначен водитель</option>
            <option value="pickup">Забор груза</option>
            <option value="in_transit">В пути</option>
            <option value="delivered">Доставлено</option>
            <option value="failed">Не доставлено</option>
            <option value="returned">Возвращено</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="all">Все оплаты</option>
            <option value="unpaid">Не оплачено</option>
            <option value="invoice_requested">Запрошен счет</option>
            <option value="invoice_sent">Счет отправлен</option>
            <option value="paid">Оплачено</option>
            <option value="overdue">Просрочено</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="all">Все клиенты</option>
            {mockUsers.filter(user => user.role === 'client').map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Фильтр по складу"
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Заказ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Время забора
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Состав груза
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  Склад
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Водитель
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Оплата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Стоимость
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const client = mockUsers.find(user => user.id === order.clientId);
                const statusInfo = getStatusInfo(order.status);
                const paymentInfo = getPaymentStatusInfo(order.paymentStatus);
                const StatusIcon = statusInfo.icon;

                return (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {client?.firstName} {client?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{client?.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        с {order.pickupTimeFrom} до {order.pickupTimeTo}
                      </div>
                      <div className="text-sm text-gray-500">{order.pickupDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.boxes > 0 && `${order.boxes} коробок`}
                        {order.pallets > 0 && ` ${order.pallets} паллет`}
                      </div>
                      <div className="text-sm text-gray-500">{order.weight}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={order.deliveryAddress}>
                        {order.deliveryAddress}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate" title={order.pickupAddress}>
                        Забор: {order.pickupAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.assignedDriver || 'Не назначен'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </div>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="mt-1 text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                        >
                          Принять
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentInfo.color}`}>
                        {paymentInfo.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.cost.toLocaleString('ru-RU')} ₽
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="text-accent-600 font-medium">
                        Подробнее →
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onUpdateOrderCost={handleUpdateOrderCost}
        onAssignToRoute={(orderId, routeId) => {
          // Логика назначения заказа в маршрут
          console.log(`Назначение заказа ${orderId} в маршрут ${routeId}`);
          // Здесь будет обновление данных
          window.location.reload();
        }}
      />

      <CreateOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default OrdersTab;