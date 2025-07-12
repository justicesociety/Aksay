import React, { useState } from 'react';
import { MapPin, Plus, Edit, Truck, Package, Clock, CheckCircle, AlertCircle, User, Calendar, Filter } from 'lucide-react';
import { updateRouteCost, mockRoutes, assignOrderToRoute, removeOrderFromRoute } from '../../data/mockData';
import CreateRouteModal from './CreateRouteModal';
import RouteDetailsModal from './RouteDetailsModal';
import type { Route } from '../../data/mockData';

interface RoutesTabProps {
  drivers: any[];
  orders: any[];
  onCreateRoute: (routeData: any) => void;
  onEditRoute: (route: Route) => void;
  onAddOrderToRoute: (routeId: string, orderId: string) => void;
  onRemoveOrderFromRoute: (routeId: string, orderId: string) => void;
  onRouteStatusChange: (routeId: string, newStatus: string) => void;
}

const RoutesTab: React.FC<RoutesTabProps> = ({ 
  drivers, 
  orders, 
  onCreateRoute, 
  onEditRoute, 
  onAddOrderToRoute, 
  onRemoveOrderFromRoute, 
  onRouteStatusChange 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const filteredRoutes = mockRoutes.filter(route => 
    (filterStatus === 'all' || route.status === filterStatus) &&
    (!filterDateFrom || route.createdDate >= filterDateFrom) &&
    (!filterDateTo || route.createdDate <= filterDateTo)
  );

  const handleCreateRoute = (routeData: any) => {
    onCreateRoute(routeData);
    setShowCreateModal(false);
  };

  const handleAddOrderToRoute = (routeId: string, orderId: string) => {
    assignOrderToRoute(routeId, orderId);
    onAddOrderToRoute(routeId, orderId);
  };

  const handleRemoveOrderFromRoute = (routeId: string, orderId: string) => {
    removeOrderFromRoute(routeId, orderId);
    onRemoveOrderFromRoute(routeId, orderId);
  };
  
  const handleRouteDetails = (route: Route) => {
    setSelectedRoute(route);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (routeId: string, newStatus: string) => {
    onRouteStatusChange(routeId, newStatus);
  };

  const handleUpdateRouteCost = (routeId: string, newCost: number) => {
    updateRouteCost(routeId, newCost);
  };

  return (
    <>
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Управление маршрутами</h2>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Фильтр по датам */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="От"
            />
            <span className="text-gray-400">—</span>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="До"
            />
          </div>
          
          {/* Фильтр по статусу */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-32"
          >
            <option value="all">Все статусы</option>
            <option value="created">Создан</option>
            <option value="in_progress">В работе</option>
            <option value="at_warehouse">На складе</option>
            <option value="completed">Сдан</option>
          </select>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать маршрут
          </button>
        </div>
      </div>

      {/* Routes Grid */}
      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Маршрут
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Водитель
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  Склады
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Заказы
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Статус
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
              {filteredRoutes.map((route) => {
                const statusInfo = getStatusInfo(route.status);
                const StatusIcon = statusInfo.icon;
                const driver = drivers.find(d => d.id === route.driverId);

                return (
                  <tr 
                    key={route.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRouteDetails(route)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{route.name}</div>
                          <div className="text-sm text-gray-500">Создан: {route.createdDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {driver?.name || 'Не назначен'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {driver?.carBrand} ({driver?.carNumber})
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {route.warehouses.slice(0, 2).join(', ')}
                        {route.warehouses.length > 2 && (
                          <span className="text-gray-500"> +{route.warehouses.length - 2} еще</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Складов: {route.warehouses.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {route.orderIds.length} заказов
                      </div>
                      <div className="text-sm text-gray-500">
                        Вес: {route.totalWeight}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </div>
                      {route.status === 'created' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(route.id, 'in_progress');
                          }}
                          className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                        >
                          В работу
                        </button>
                      )}
                      {route.status === 'in_progress' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(route.id, 'at_warehouse');
                          }}
                          className="mt-1 text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                        >
                          На склад
                        </button>
                      )}
                      {route.status === 'at_warehouse' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(route.id, 'completed');
                          }}
                          className="mt-1 text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                        >
                          Сдан
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {route.totalCost.toLocaleString('ru-RU')} ₽
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

      {filteredRoutes.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Маршруты не найдены
          </h3>
          <p className="text-gray-500 mb-6">
            {filterStatus === 'all' 
              ? 'Создайте первый маршрут для начала работы'
              : 'Нет маршрутов с выбранным статусом'
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Создать маршрут
          </button>
        </div>
      )}
    </div>

    {/* Модальные окна */}
    <CreateRouteModal
      isOpen={showCreateModal}
      onClose={() => setShowCreateModal(false)}
      drivers={drivers}
      onSubmit={handleCreateRoute}
    />

    <RouteDetailsModal
      isOpen={showDetailsModal}
      onClose={() => setShowDetailsModal(false)}
      route={selectedRoute}
      availableOrders={orders}
      onAddOrder={handleAddOrderToRoute}
      onRemoveOrder={handleRemoveOrderFromRoute}
      onStatusChange={onRouteStatusChange}
      onUpdateRouteCost={handleUpdateRouteCost}
    />
    </>
  );
};

export default RoutesTab;