// Dashboard component for client interface

import React, { useState } from 'react';
import { Package, Plus, Clock, CheckCircle, Truck, User, LogOut, FileText, Phone, Calculator as CalcIcon, X, CreditCard, Receipt, Download, MessageSquare, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders, getOrdersByClientId, getUserById } from '../data/mockData';
import Calculator from './Calculator';
import Modal from './Modal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('new-order');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Получаем заказы текущего пользователя
  const userOrders = user ? getOrdersByClientId(user.id) : [];

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

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const handlePayment = (order: any) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handlePaymentMethod = (method: 'invoice' | 'card') => {
    if (method === 'invoice') {
      // Логика запроса счета
      alert('Счет будет выставлен в течение 30 минут');
    } else {
      // Логика оплаты картой
      alert('Перенаправление на страницу оплаты');
    }
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'rgb(239, 238, 249)'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="bg-accent-100 p-3 rounded-full">
                <User className="w-8 h-8 text-accent-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-800">
                  Добро пожаловать, {user?.firstName}!
                </h1>
                <p className="text-gray-600">{user?.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#calculator"
                className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Новый заказ
              </a>
              <button
                onClick={handleLogout}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Выйти
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'new-order', label: 'Новый заказ', icon: CalcIcon },
                { id: 'orders', label: 'Мои заказы', icon: Package },
                { id: 'profile', label: 'Профиль', icon: User },
                { id: 'documents', label: 'Документы', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-accent-500 text-accent-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'new-order' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-4">Создать новый заказ</h2>
                <Calculator />
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-primary-800">История заказов</h2>
                  <span className="text-gray-600">Всего заказов: {userOrders.length}</span>
                </div>
                
                <div className="space-y-4">
                  {userOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div key={order.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="font-semibold text-primary-800">Заказ #{order.id}</h3>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusInfo.color}`}>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                {statusInfo.label}
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Дата:</span> {order.date}
                              </div>
                              <div>
                                <span className="font-medium">Склад:</span> {order.deliveryAddress}
                              </div>
                              <div>
                                <span className="font-medium">Груз:</span> 
                                {order.boxes > 0 && ` ${order.boxes} коробок`}
                                {order.pallets > 0 && ` ${order.pallets} паллет`}
                              </div>
                            </div>
                            
                            {/* Payment Status */}
                            <div className="mt-3">
                              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusInfo(order.paymentStatus).color}`}>
                                {getPaymentStatusInfo(order.paymentStatus).label}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 lg:mt-0 lg:ml-6">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-accent-500">
                                {order.cost.toLocaleString('ru-RU')} ₽
                              </div>
                              <div className="mt-2 space-y-2">
                                <button 
                                  onClick={() => handleOrderDetails(order)}
                                  className="block text-accent-600 hover:text-accent-700 font-medium"
                                >
                                  Подробнее →
                                </button>
                                {order.paymentStatus === 'unpaid' && (
                                  <button 
                                    onClick={() => handlePayment(order)}
                                    className="block bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                                  >
                                    Оплатить
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-6">Профиль пользователя</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                      <input
                        type="text"
                        value={user?.firstName}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                      <input
                        type="text"
                        value={user?.lastName}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                      <input
                        type="text"
                        value={user?.company}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                      <input
                        type="tel"
                        value={user?.phone}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div className="bg-accent-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent-800 mb-2">Статус клиента</h4>
                      <p className="text-accent-700 text-sm">Постоянный клиент</p>
                      <p className="text-accent-600 text-sm">Скидка: 5%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-800 mb-6">Документы</h2>
                <div className="space-y-6">
                  {/* Invoices Section */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-primary-800 mb-4">Счета на оплату</h3>
                    <div className="space-y-3">
                      {mockOrders.filter(order => order.paymentStatus === 'paid' || order.paymentStatus === 'unpaid').map((order) => (
                        <div key={order.id} className="flex items-center justify-between bg-white p-4 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <Receipt className="w-5 h-5 text-accent-600" />
                            <div>
                              <div className="font-medium text-primary-800">
                                Счет №{order.id} от {order.date}
                              </div>
                              <div className="text-sm text-gray-600">
                                Заказ #{order.id} • {order.cost.toLocaleString('ru-RU')} ₽
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusInfo(order.paymentStatus).color}`}>
                              {getPaymentStatusInfo(order.paymentStatus).label}
                            </div>
                            <button className="text-accent-600 hover:text-accent-700 p-2 hover:bg-accent-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {mockOrders.filter(order => order.paymentStatus === 'paid' || order.paymentStatus === 'unpaid').length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Счета отсутствуют</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-primary-800 mb-4">Договоры и документы</h3>
                      <div className="space-y-3">
                        <a href="/offer.html" target="_blank" className="flex items-center text-accent-600 hover:text-accent-700">
                          <FileText className="w-4 h-4 mr-2" />
                          Договор оферты
                        </a>
                        <a href="/requisites.html" target="_blank" className="flex items-center text-accent-600 hover:text-accent-700">
                          <FileText className="w-4 h-4 mr-2" />
                          Реквизиты компании
                        </a>
                        <a href="/privacy.html" target="_blank" className="flex items-center text-accent-600 hover:text-accent-700">
                          <FileText className="w-4 h-4 mr-2" />
                          Политика конфиденциальности
                        </a>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-primary-800 mb-4">Поддержка</h3>
                      <div className="space-y-3">
                        <a href="tel:+79361302070" className="flex items-center text-accent-600 hover:text-accent-700">
                          <Phone className="w-4 h-4 mr-2" />
                          +7 (936) 130-20-70
                        </a>
                        <a href="https://wa.me/79262168760" className="flex items-center text-accent-600 hover:text-accent-700">
                          <Phone className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                        <a href="https://t.me/+79262168760" className="flex items-center text-accent-600 hover:text-accent-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Telegram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder && !showPaymentModal}
        onClose={() => setSelectedOrder(null)}
        title={`Заказ #${selectedOrder?.id}`}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-800">Информация о заказе</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Номер заказа:</span>
                    <span className="font-medium">#{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата создания:</span>
                    <span className="font-medium">{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата забора:</span>
                    <span className="font-medium">{selectedOrder.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Плановая сдача:</span>
                    <span className="font-medium">{selectedOrder.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Груз:</span>
                    <span className="font-medium">{selectedOrder.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Вес:</span>
                    <span className="font-medium">{selectedOrder.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость:</span>
                    <span className="font-bold text-accent-500">{selectedOrder.cost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-800">Адреса</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Забор груза:</span>
                    <p className="font-medium">{selectedOrder.pickupAddress}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Доставка:</span>
                    <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
                
                {selectedOrder.comment && (
                  <div>
                    <span className="text-gray-600 text-sm">Комментарий к заказу:</span>
                    <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">{selectedOrder.comment}</p>
                  </div>
                )}
                
                {/* Driver Information */}
                {selectedOrder.assignedDriver && (
                  <div>
                    <h4 className="text-md font-semibold text-primary-800 mb-2">Информация о водителе</h4>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-800">{selectedOrder.assignedDriver}</p>
                      {selectedOrder.driverPhone && (
                        <p className="text-blue-600 text-sm">{selectedOrder.driverPhone}</p>
                      )}
                      {selectedOrder.assignedRoute && (
                        <p className="text-blue-600 text-sm mt-1">{selectedOrder.assignedRoute}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status and Payment */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-800 mb-3">Статус заказа</h3>
                <div className="flex items-center space-x-3 mb-4">
                  {(() => {
                    const statusInfo = getStatusInfo(selectedOrder.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {statusInfo.label}
                      </div>
                    );
                  })()}
                </div>
                
                {selectedOrder.driverComment && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800">Комментарий водителя</h4>
                        <p className="text-red-700 text-sm mt-1">{selectedOrder.driverComment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary-800 mb-3">Оплата</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusInfo(selectedOrder.paymentStatus).color}`}>
                    {getPaymentStatusInfo(selectedOrder.paymentStatus).label}
                  </div>
                  {selectedOrder.paymentStatus === 'unpaid' && (
                    <button 
                      onClick={() => handlePayment(selectedOrder)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Оплатить
                    </button>
                  )}
                </div>
                
                {selectedOrder.paymentStatus === 'paid' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Оплачено</span>
                      <button className="text-green-700 hover:text-green-800 flex items-center text-sm font-medium">
                        <Download className="w-4 h-4 mr-1" />
                        Скачать чек
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status History */}
            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-4">История изменения статуса</h3>
              <div className="space-y-3">
                {selectedOrder.statusHistory.map((history: any, index: number) => {
                  const statusInfo = getStatusInfo(history.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                      <div className={`p-2 rounded-full ${statusInfo.color.replace('text-', 'bg-').replace('-800', '-100')}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary-800">{statusInfo.label}</span>
                          <span className="text-sm text-gray-500">{new Date(history.date).toLocaleString('ru-RU')}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{history.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Выберите способ оплаты"
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                Заказ #{selectedOrder.id}
              </h3>
              <div className="text-3xl font-bold text-accent-500">
                {selectedOrder.cost.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={() => handlePaymentMethod('invoice')}
                className="flex items-center justify-center space-x-3 bg-primary-700 text-white p-4 rounded-lg hover:bg-primary-800 transition-colors"
              >
                <Receipt className="w-6 h-6" />
                <span className="font-semibold">Запросить счет</span>
              </button>
              
              <button
                onClick={() => handlePaymentMethod('card')}
                className="flex items-center justify-center space-x-3 bg-accent-500 text-white p-4 rounded-lg hover:bg-accent-600 transition-colors"
              >
                <CreditCard className="w-6 h-6" />
                <span className="font-semibold">Оплатить картой</span>
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Безналичный расчет:</strong> После запроса счета, документы будут отправлены на ваш email в течение 30 минут.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;