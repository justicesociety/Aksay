import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllIndividualWarehouses, getMarketplaceLabel } from '../data/warehouses';
import { 
  mockUsers, 
  mockDrivers, 
  mockOrders, 
  mockRoutes,
  updateOrderStatus,
  updatePaymentStatus,
  getUserById,
  getDriverById
} from '../data/mockData';
import { warehouses as warehousesData } from '../data/warehouses';
import Modal from './Modal';
import WarehouseAutocomplete from './WarehouseAutocomplete';
import AdminHeader from './admin/AdminHeader';
import AdminNavigation from './admin/AdminNavigation';
import OrdersTab from './admin/OrdersTab';
import ClientsTab from './admin/ClientsTab';
import RoutesTab from './admin/RoutesTab';
import DriversTab from './admin/DriversTab';
import WarehousesTab from './admin/WarehousesTab';
import CreateClientModal from './admin/CreateClientModal';
import CreateOrderModal from './admin/CreateOrderModal';
import OrderDetailsModal from './admin/OrderDetailsModal';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const [showCreateRouteModal, setShowCreateRouteModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);
  const [editingRoute, setEditingRoute] = useState<any>(null);
  
  // Состояния для форм
  const [orderFormData, setOrderFormData] = useState({
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
  
  const [clientFormData, setClientFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: ''
  });
  
  const [orderErrors, setOrderErrors] = useState<any>({});
  const [clientErrors, setClientErrors] = useState<any>({});
  
  const [routeFormData, setRouteFormData] = useState({
    name: '',
    driverId: '',
    warehouses: [] as string[],
    comment: ''
  });
  
  const [routeErrors, setRouteErrors] = useState<any>({});

  // Используем реальные данные складов
  const [warehouses, setWarehouses] = useState(warehousesData);

  // Проверяем админскую сессию
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/');
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === mockOrders.length ? [] : mockOrders.map(order => order.id)
    );
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
    // Обновляем локальное состояние для демонстрации
    setSelectedOrder(prev => prev?.id === orderId ? { ...prev, status: newStatus } : prev);
  };

  const handlePaymentUpdate = (orderId: string, newStatus: string) => {
    updatePaymentStatus(orderId, newStatus);
    // Обновляем локальное состояние для демонстрации
    setSelectedOrder(prev => prev?.id === orderId ? { ...prev, paymentStatus: newStatus } : prev);
  };

  const handleOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleAddDriver = () => {
    setEditingDriver(null);
    setShowDriverModal(true);
  };

  const handleEditDriver = (driver: any) => {
    setEditingDriver(driver);
    setShowDriverModal(true);
  };

  const handleAddWarehouse = () => {
    setEditingWarehouse(null);
    setShowWarehouseModal(true);
  };

  const handleEditWarehouse = (warehouse: any) => {
    setEditingWarehouse(warehouse);
    setShowWarehouseModal(true);
  };

  const handleCreateOrder = () => {
    setOrderFormData({
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
    setOrderErrors({});
    setShowCreateOrderModal(true);
  };

  const handleCreateClient = () => {
    setClientFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      password: ''
    });
    setClientErrors({});
    setShowCreateClientModal(true);
  };
  
  const handleCreateRoute = () => {
    setRouteFormData({
      name: '',
      driverId: '',
      warehouses: [],
      comment: ''
    });
    setRouteErrors({});
    setEditingRoute(null);
    setShowCreateRouteModal(true);
  };
  
  // Обработчики изменения форм
  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setOrderFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setOrderFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Очищаем ошибку при изменении поля
    if (orderErrors[name]) {
      setOrderErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleClientFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (clientErrors[name]) {
      setClientErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleRouteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRouteFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (routeErrors[name]) {
      setRouteErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleWarehouseToggle = (warehouse: string) => {
    setRouteFormData(prev => ({
      ...prev,
      warehouses: prev.warehouses.includes(warehouse)
        ? prev.warehouses.filter(w => w !== warehouse)
        : [...prev.warehouses, warehouse]
    }));
  };
  
  // Валидация форм
  const validateOrderForm = () => {
    const newErrors: any = {};
    const today = new Date().toISOString().split('T')[0];

    if (!orderFormData.clientId) {
      newErrors.clientId = 'Выберите клиента';
    }
    if (!orderFormData.pickupDate) {
      newErrors.pickupDate = 'Выберите дату забора';
    } else if (orderFormData.pickupDate < today) {
      newErrors.pickupDate = 'Дата забора не может быть раньше сегодняшнего дня';
    }
    if (!orderFormData.deliveryDate) {
      newErrors.deliveryDate = 'Выберите дату доставки';
    }
    if (!orderFormData.pickupTime) {
      newErrors.pickupTime = 'Выберите время забора';
    }
    if (!orderFormData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Укажите адрес забора';
    }
    if (!orderFormData.deliveryAddress) {
      newErrors.deliveryAddress = 'Выберите склад доставки';
    }
    
    const boxes = parseInt(orderFormData.boxes || '0');
    const pallets = parseInt(orderFormData.pallets || '0');
    
    if (boxes === 0 && pallets === 0) {
      newErrors.boxes = 'Укажите количество коробок или паллет';
      newErrors.pallets = 'Укажите количество коробок или паллет';
    }

    setOrderErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateClientForm = () => {
    const newErrors: any = {};

    if (!clientFormData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    if (!clientFormData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    if (!clientFormData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(clientFormData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!clientFormData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    }
    if (!clientFormData.company.trim()) {
      newErrors.company = 'Введите название компании';
    }
    if (!clientFormData.password) {
      newErrors.password = 'Введите пароль';
    } else if (clientFormData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateRouteForm = () => {
    const newErrors: any = {};

    if (!routeFormData.name.trim()) {
      newErrors.name = 'Введите название маршрута';
    }
    if (!routeFormData.driverId) {
      newErrors.driverId = 'Выберите водителя';
    }
    if (routeFormData.warehouses.length === 0) {
      newErrors.warehouses = 'Выберите хотя бы один склад';
    }

    setRouteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработчики отправки форм
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateOrderForm()) {
      // Находим выбранного клиента
      const selectedClient = mockUsers.find(client => client.id === orderFormData.clientId);
      
      // Рассчитываем стоимость (упрощенный расчет)
      const boxes = parseInt(orderFormData.boxes || '0');
      const pallets = parseInt(orderFormData.pallets || '0');
      let cost = 0;
      
      if (boxes > 0) {
        cost += boxes <= 10 ? 2500 : Math.ceil(boxes / 16) * 2700;
      }
      cost += pallets * 2700;
      if (orderFormData.loading) cost += 500;
      if (orderFormData.palletizing) {
        const totalPallets = pallets + (boxes > 10 ? Math.ceil(boxes / 16) : 0);
        cost += totalPallets * 300;
      }
      
      // Создаем новый заказ
      const newOrder = {
        id: String(Date.now()).slice(-3),
        clientName: selectedClient?.name || '',
        clientPhone: selectedClient?.phone || '',
        date: new Date().toISOString().split('T')[0],
        pickupDate: orderFormData.pickupDate,
        deliveryDate: orderFormData.deliveryDate,
        pickupAddress: orderFormData.pickupAddress,
        deliveryAddress: orderFormData.deliveryAddress,
        status: 'pending',
        paymentStatus: 'unpaid',
        cost: cost,
        items: `${boxes > 0 ? `${boxes} коробок` : ''}${boxes > 0 && pallets > 0 ? ', ' : ''}${pallets > 0 ? `${pallets} паллет` : ''}`,
        weight: orderFormData.weight || 'Не указан',
        comment: orderFormData.comment,
        driverComment: '',
        assignedDriver: null,
        assignedRoute: null,
        driverPhone: null
      };
      
      console.log('Создан новый заказ:', newOrder);
      alert(`Заказ #${newOrder.id} успешно создан для клиента ${selectedClient?.name}`);
      setShowCreateOrderModal(false);
    }
  };
  
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateClientForm()) {
      // Создаем нового клиента
      const newClient = {
        id: String(Date.now()),
        name: `${clientFormData.firstName} ${clientFormData.lastName}`,
        email: clientFormData.email,
        phone: clientFormData.phone,
        company: clientFormData.company,
        ordersCount: 0,
        totalSpent: 0,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      
      console.log('Создан новый клиент:', newClient);
      alert(`Клиент ${newClient.name} успешно создан. Данные для входа отправлены на ${newClient.email}`);
      setShowCreateClientModal(false);
      
      // Если создаем клиента из формы заказа, автоматически выбираем его
      if (showCreateOrderModal) {
        setOrderFormData(prev => ({
          ...prev,
          clientId: newClient.id
        }));
      }
    }
  };
  
  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateRouteForm()) {
      // Находим выбранного водителя
      const selectedDriver = mockDrivers.find(driver => driver.id === routeFormData.driverId);
      
      // Создаем новый маршрут
      const newRoute = {
        id: String(Date.now()).slice(-3),
        name: routeFormData.name,
        driver: selectedDriver,
        warehouses: routeFormData.warehouses,
        status: 'created',
        createdDate: new Date().toISOString().split('T')[0],
        orders: [],
        totalCost: 0,
        totalWeight: '0 кг',
        comment: routeFormData.comment
      };
      
      console.log('Создан новый маршрут:', newRoute);
      alert(`Маршрут "${newRoute.name}" успешно создан для водителя ${selectedDriver?.name}`);
      setShowCreateRouteModal(false);
    }
  };

  const handleEditRoute = (route: any) => {
    console.log('Editing route:', route);
  };

  const handleAddOrderToRoute = (routeId: string, orderId: string) => {
    console.log(`Adding order ${orderId} to route ${routeId}`);
  };

  const handleRemoveOrderFromRoute = (routeId: string, orderId: string) => {
    console.log(`Removing order ${orderId} from route ${routeId}`);
  };

  const handleRouteStatusChange = (routeId: string, newStatus: string) => {
    console.log(`Changing route ${routeId} status to ${newStatus}`);
  };

  const handleSubmitClient = (clientData: any) => {
    console.log('Creating client:', clientData);
  };

  const handleSubmitOrder = (orderData: any) => {
    console.log('Creating order:', orderData);
  };
  
  const timeSlots = [
    'с 09:00 до 12:00',
    'с 12:00 до 15:00', 
    'с 15:00 до 18:00',
    'с 18:00 до 21:00',
    'Весь день (09:00-21:00)'
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="w-full">
          {activeTab === 'orders' && (
            <OrdersTab
              orders={mockOrders}
              selectedOrders={selectedOrders}
              onOrderSelect={handleOrderSelect}
              onSelectAll={handleSelectAll}
              onStatusChange={handleStatusChange}
              onOrderDetails={handleOrderDetails}
              onCreateOrder={handleCreateOrder}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsTab 
              clients={mockUsers}
              onCreateClient={handleCreateClient}
            />
          )}

          {activeTab === 'routes' && (
            <RoutesTab 
              drivers={mockDrivers}
              orders={mockOrders}
              onCreateRoute={(routeData) => {
                console.log('Creating route:', routeData);
                // Здесь будет логика создания маршрута
              }}
              onEditRoute={(route) => {
                console.log('Edit route:', route);
              }}
              onAddOrderToRoute={(routeId, orderId) => {
                console.log('Adding order to route:', { routeId, orderId });
                // Здесь будет логика добавления заказа в маршрут
              }}
              onRemoveOrderFromRoute={(routeId, orderId) => {
                console.log('Removing order from route:', { routeId, orderId });
                // Здесь будет логика удаления заказа из маршрута
              }}
              onRouteStatusChange={(routeId, newStatus) => {
                console.log('Route status change:', { routeId, newStatus });
                // Здесь будет логика изменения статуса маршрута
              }}
            />
          )}

          {activeTab === 'drivers' && (
            <DriversTab
              drivers={mockDrivers}
              onAddDriver={handleAddDriver}
              onEditDriver={handleEditDriver}
            />
          )}

          {activeTab === 'warehouses' && (
            <WarehousesTab
              warehouses={warehouses}
              onAddWarehouse={handleAddWarehouse}
              onEditWarehouse={handleEditWarehouse}
            />
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Заказ #${selectedOrder?.id}`}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация о заказе</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Клиент:</span>
                  <span className="font-medium">{selectedOrder.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Телефон:</span>
                  <span className="font-medium">{selectedOrder.clientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дата забора:</span>
                  <span className="font-medium">{selectedOrder.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дата доставки:</span>
                  <span className="font-medium">{selectedOrder.deliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Груз:</span>
                  <span className="font-medium">{selectedOrder.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-bold text-green-600">{selectedOrder.cost.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Адреса</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 text-sm">Забор:</span>
                  <p className="font-medium">{selectedOrder.pickupAddress}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Доставка:</span>
                  <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>
              
              {selectedOrder.comment && (
                <div className="mt-4">
                  <span className="text-gray-600 text-sm">Комментарий:</span>
                  <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">{selectedOrder.comment}</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Управление маршрутом</h3>
                <div className="space-y-4">
                  {selectedOrder.assignedRoute ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-blue-800">Назначен в маршрут</h4>
                          <p className="text-blue-600">{selectedOrder.assignedRoute}</p>
                          {selectedOrder.assignedDriver && (
                            <p className="text-blue-600 text-sm">Водитель: {selectedOrder.assignedDriver}</p>
                          )}
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Убрать из маршрута
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Добавить в маршрут</h4>
                      <div className="space-y-3">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                          <option value="">Выберите существующий маршрут</option>
                          <option value="1">Маршрут #1 от 15.01.2024 (Иванов И.И.)</option>
                          <option value="2">Маршрут #2 от 14.01.2024 (Сидоров П.П.)</option>
                        </select>
                        <div className="text-center text-gray-500">или</div>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Создать новый маршрут
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Статус</h3>
                <select 
                  value={selectedOrder.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="pending">Ожидает</option>
                  <option value="pickup">Забор груза</option>
                  <option value="in_transit">В пути</option>
                  <option value="delivered">Доставлено</option>
                  <option value="failed">Не доставлено</option>
                </select>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий водителя</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Комментарий о выполнении заказа..."
                  />
                </div>
              </div>
            </div>

            {/* Кнопка применить изменения */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Применить изменения
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <Modal
        isOpen={showCreateOrderModal}
        onClose={() => setShowCreateOrderModal(false)}
        title="Создать заказ"
        size="xl"
      >
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Выбор клиента */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Клиент *
            </label>
            <div className="flex space-x-2">
              <select
                name="clientId"
                value={orderFormData.clientId}
                onChange={handleOrderFormChange}
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  orderErrors.clientId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Выберите клиента</option>
                {mockUsers.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.company})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setShowCreateOrderModal(false);
                  handleCreateClient();
                }}
                className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Новый клиент
              </button>
            </div>
            {orderErrors.clientId && (
              <p className="mt-1 text-sm text-red-600">{orderErrors.clientId}</p>
            )}
          </div>

          {/* Даты */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата забора *
              </label>
              <input
                type="date"
                name="pickupDate"
                value={orderFormData.pickupDate}
                onChange={handleOrderFormChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  orderErrors.pickupDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {orderErrors.pickupDate && (
                <p className="mt-1 text-sm text-red-600">{orderErrors.pickupDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата доставки *
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={orderFormData.deliveryDate}
                onChange={handleOrderFormChange}
                min={orderFormData.pickupDate || new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  orderErrors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {orderErrors.deliveryDate && (
                <p className="mt-1 text-sm text-red-600">{orderErrors.deliveryDate}</p>
              )}
            </div>
          </div>

          {/* Время и адреса */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Время забора *
            </label>
            <select
              name="pickupTime"
              value={orderFormData.pickupTime}
              onChange={handleOrderFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                orderErrors.pickupTime ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите время</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            {orderErrors.pickupTime && (
              <p className="mt-1 text-sm text-red-600">{orderErrors.pickupTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Адрес забора *
            </label>
            <input
              type="text"
              name="pickupAddress"
              value={orderFormData.pickupAddress}
              onChange={handleOrderFormChange}
              placeholder="МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                orderErrors.pickupAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {orderErrors.pickupAddress && (
              <p className="mt-1 text-sm text-red-600">{orderErrors.pickupAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Склад доставки *
            </label>
            <WarehouseAutocomplete
              value={orderFormData.deliveryAddress}
              onChange={(value) => setOrderFormData(prev => ({ ...prev, deliveryAddress: value }))}
              error={orderErrors.deliveryAddress}
              placeholder="Начните вводить название склада..."
            />
            {orderErrors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-600">{orderErrors.deliveryAddress}</p>
            )}
          </div>

          {/* Груз */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество коробок
              </label>
              <input
                type="number"
                name="boxes"
                value={orderFormData.boxes}
                onChange={handleOrderFormChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  orderErrors.boxes ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {orderErrors.boxes && (
                <p className="mt-1 text-sm text-red-600">{orderErrors.boxes}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество паллет
              </label>
              <input
                type="number"
                name="pallets"
                value={orderFormData.pallets}
                onChange={handleOrderFormChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  orderErrors.pallets ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {orderErrors.pallets && (
                <p className="mt-1 text-sm text-red-600">{orderErrors.pallets}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Вес (кг)
              </label>
              <input
                type="number"
                name="weight"
                value={orderFormData.weight}
                onChange={handleOrderFormChange}
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
                checked={orderFormData.loading}
                onChange={handleOrderFormChange}
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
                checked={orderFormData.palletizing}
                onChange={handleOrderFormChange}
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
              Комментарий
            </label>
            <textarea
              name="comment"
              value={orderFormData.comment}
              onChange={handleOrderFormChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Дополнительная информация о заказе..."
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateOrderModal(false)}
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

      {/* Create Client Modal */}
      <Modal
        isOpen={showCreateClientModal}
        onClose={() => setShowCreateClientModal(false)}
        title="Создать клиента"
        size="md"
      >
        <form onSubmit={handleClientSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя *
              </label>
              <input
                type="text"
                name="firstName"
                value={clientFormData.firstName}
                onChange={handleClientFormChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  clientErrors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Иван"
              />
              {clientErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{clientErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фамилия *
              </label>
              <input
                type="text"
                name="lastName"
                value={clientFormData.lastName}
                onChange={handleClientFormChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  clientErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Петров"
              />
              {clientErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{clientErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={clientFormData.email}
              onChange={handleClientFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                clientErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ivan@example.com"
            />
            {clientErrors.email && (
              <p className="mt-1 text-sm text-red-600">{clientErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              name="phone"
              value={clientFormData.phone}
              onChange={handleClientFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                clientErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+7(999)123-45-67"
            />
            {clientErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{clientErrors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Компания *
            </label>
            <input
              type="text"
              name="company"
              value={clientFormData.company}
              onChange={handleClientFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                clientErrors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ИП Петров И.И."
            />
            {clientErrors.company && (
              <p className="mt-1 text-sm text-red-600">{clientErrors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль *
            </label>
            <input
              type="password"
              name="password"
              value={clientFormData.password}
              onChange={handleClientFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                clientErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Минимум 6 символов"
            />
            {clientErrors.password && (
              <p className="mt-1 text-sm text-red-600">{clientErrors.password}</p>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateClientModal(false)}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Создать клиента
            </button>
          </div>
        </form>
      </Modal>

      {/* Create Route Modal */}
      <Modal
        isOpen={showCreateRouteModal}
        onClose={() => setShowCreateRouteModal(false)}
        title={editingRoute ? 'Редактировать маршрут' : 'Создать маршрут'}
        size="xl"
      >
        <form onSubmit={handleRouteSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название маршрута *
              </label>
              <input
                type="text"
                name="name"
                value={routeFormData.name}
                onChange={handleRouteFormChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  routeErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Маршрут #1 - WB Москва"
              />
              {routeErrors.name && (
                <p className="mt-1 text-sm text-red-600">{routeErrors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Водитель *
              </label>
              <select
                name="driverId"
                value={routeFormData.driverId}
                onChange={handleRouteFormChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  routeErrors.driverId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Выберите водителя</option>
                {mockDrivers.filter(driver => driver.status === 'free').map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.carNumber})
                  </option>
                ))}
              </select>
              {routeErrors.driverId && (
                <p className="mt-1 text-sm text-red-600">{routeErrors.driverId}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Склады назначения *
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-2">
                {getAllIndividualWarehouses().map((warehouse, index) => (
                  <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={routeFormData.warehouses.includes(warehouse.name)}
                      onChange={() => handleWarehouseToggle(warehouse.name)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          warehouse.marketplace === 'wildberries' ? 'bg-purple-100 text-purple-800' :
                          warehouse.marketplace === 'ozon' ? 'bg-blue-100 text-blue-800' :
                          warehouse.marketplace === 'yandex' ? 'bg-yellow-100 text-yellow-800' :
                          warehouse.marketplace === 'sber' ? 'bg-green-100 text-green-800' :
                          warehouse.marketplace === 'detmir' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getMarketplaceLabel(warehouse.marketplace)}
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {warehouse.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {warehouse.city}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {routeErrors.warehouses && (
              <p className="mt-1 text-sm text-red-600">{routeErrors.warehouses}</p>
            )}
            <p className="mt-2 text-sm text-gray-600">
              Выбрано складов: {routeFormData.warehouses.length}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий
            </label>
            <textarea
              name="comment"
              value={routeFormData.comment}
              onChange={handleRouteFormChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Дополнительная информация о маршруте..."
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateRouteModal(false)}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {editingRoute ? 'Сохранить изменения' : 'Создать маршрут'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Driver Modal */}
      <Modal
        isOpen={showDriverModal}
        onClose={() => setShowDriverModal(false)}
        title={editingDriver ? 'Редактировать водителя' : 'Добавить водителя'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
            <input
              type="text"
              defaultValue={editingDriver?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Иванов Иван Иванович"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input
              type="tel"
              defaultValue={editingDriver?.phone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="+7(999)123-45-67"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Марка машины</label>
            <input
              type="text"
              defaultValue={editingDriver?.carBrand || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="ГАЗель Next"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Гос. номер</label>
            <input
              type="text"
              defaultValue={editingDriver?.carNumber || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="А123БВ77"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Количество паллет</label>
            <input
              type="number"
              defaultValue={editingDriver?.palletCapacity || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="6"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowDriverModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              {editingDriver ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Warehouse Modal - упрощенная версия */}
      <Modal
        isOpen={showWarehouseModal}
        onClose={() => setShowWarehouseModal(false)}
        title={editingWarehouse ? 'Редактировать склад' : 'Добавить склад'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название склада</label>
            <input
              type="text"
              defaultValue={editingWarehouse?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="WB Коледино"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Маркетплейс</label>
              <select
                defaultValue={editingWarehouse?.marketplace || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Выберите маркетплейс</option>
                <option value="wildberries">Wildberries</option>
                <option value="ozon">Ozon</option>
                <option value="yandex">Яндекс.Маркет</option>
                <option value="sber">СберЛогистика</option>
                <option value="detmir">Детский мир</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
              <input
                type="text"
                defaultValue={editingWarehouse?.city || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Москва"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">До куба (₽)</label>
              <input
                type="number"
                defaultValue={editingWarehouse?.pricing.toCube || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="2500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Коробки (₽/шт)</label>
              <input
                type="number"
                defaultValue={editingWarehouse?.pricing.boxes1to3 || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">1 паллета (₽)</label>
              <input
                type="number"
                defaultValue={editingWarehouse?.pricing.pallets?.['1'] || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="2700"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowWarehouseModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              {editingWarehouse ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальные окна */}
      <CreateClientModal
        isOpen={showCreateClientModal}
        onClose={() => setShowCreateClientModal(false)}
        onSubmit={handleSubmitClient}
      />

      <CreateOrderModal
        isOpen={showCreateOrderModal}
        onClose={() => setShowCreateOrderModal(false)}
        clients={mockUsers}
        onCreateClient={handleCreateClient}
        onSubmit={handleSubmitOrder}
      />

      <OrderDetailsModal
        isOpen={showOrderDetailsModal}
        onClose={() => setShowOrderDetailsModal(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
        onPaymentUpdate={handlePaymentUpdate}
      />
    </div>
  );
};

export default AdminPanel;