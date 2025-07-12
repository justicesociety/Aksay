import React, { useState } from 'react';
import { CreditCard, FileText, Upload, Download, Check, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { Order, Invoice, mockInvoices, updatePaymentStatus, attachInvoice } from '../../data/mockData';
import Modal from '../Modal';

interface PaymentManagementProps {
  order: Order;
  onPaymentUpdate: (orderId: string, newStatus: string) => void;
}

const PaymentManagement: React.FC<PaymentManagementProps> = ({ order, onPaymentUpdate }) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'unpaid':
        return { label: 'Не оплачено', color: 'bg-red-100 text-red-800', icon: AlertCircle };
      case 'invoice_requested':
        return { label: 'Запрошен счет', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'invoice_sent':
        return { label: 'Счет отправлен', color: 'bg-blue-100 text-blue-800', icon: FileText };
      case 'paid':
        return { label: 'Оплачено', color: 'bg-green-100 text-green-800', icon: Check };
      case 'overdue':
        return { label: 'Просрочено', color: 'bg-red-100 text-red-800', icon: AlertCircle };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };

  const statusInfo = getPaymentStatusInfo(order.paymentStatus);
  const StatusIcon = statusInfo.icon;

  const handleStatusChange = (newStatus: string) => {
    updatePaymentStatus(order.id, newStatus);
    onPaymentUpdate(order.id, newStatus);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceFile(file);
    }
  };

  const handleInvoiceAttach = () => {
    if (invoiceFile) {
      const fileName = invoiceFile.name;
      const fileUrl = `/invoices/${fileName}`;
      attachInvoice(order.id, fileName, fileUrl);
      onPaymentUpdate(order.id, 'invoice_sent');
      setShowInvoiceModal(false);
      setInvoiceFile(null);
    }
  };

  const invoice = mockInvoices.find(inv => inv.orderId === order.id);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Управление оплатой
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusInfo.color}`}>
            <StatusIcon className="w-4 h-4 mr-1" />
            {statusInfo.label}
          </div>
        </div>

        <div className="space-y-4">
          {/* Сумма заказа */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Сумма к оплате:</span>
              <span className="text-xl font-bold text-green-600">
                {order.cost.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          {/* Информация о счете */}
          {order.invoiceFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <div className="font-medium text-blue-800">Счет прикреплен</div>
                    <div className="text-sm text-blue-600">{order.invoiceFile}</div>
                    {order.invoiceDate && (
                      <div className="text-xs text-blue-500">от {order.invoiceDate}</div>
                    )}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Дата оплаты */}
          {order.paidDate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <div className="font-medium text-green-800">Оплачено</div>
                  <div className="text-sm text-green-600">Дата оплаты: {order.paidDate}</div>
                </div>
              </div>
            </div>
          )}

          {/* Действия */}
          <div className="space-y-2">
            {/* Manual Payment Status Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Изменить статус оплаты:
              </label>
              <select
                value={order.paymentStatus}
                onChange={(e) => onUpdatePaymentStatus(order.id, e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              >
                <option value="unpaid">Не оплачено</option>
                <option value="invoice_requested">Запрошен счет</option>
                <option value="invoice_sent">Счет отправлен</option>
                <option value="paid">Оплачено</option>
                <option value="overdue">Просрочено</option>
              </select>
            </div>
            
            {/* Manual Cost Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Стоимость заказа:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={order.cost}
                  onChange={(e) => onUpdateOrderCost(order.id, parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  min="0"
                />
                <span className="text-gray-500">₽</span>
              </div>
            </div>

            {order.paymentStatus === 'invoice_requested' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Прикрепить счет
                </button>
              </div>
            )}

            {(order.paymentStatus === 'unpaid' || order.paymentStatus === 'invoice_sent' || order.paymentStatus === 'overdue') && (
              <button
                onClick={() => handleStatusChange('paid')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Отметить оплаченным
              </button>
            )}

            {order.paymentStatus === 'invoice_sent' && (
              <button
                onClick={() => handleStatusChange('overdue')}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Отметить просроченным
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно прикрепления счета */}
      <Modal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        title="Прикрепить счет"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите файл счета
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG
            </p>
          </div>

          {invoiceFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <div className="font-medium text-blue-800">Выбранный файл:</div>
                  <div className="text-sm text-blue-600">{invoiceFile.name}</div>
                  <div className="text-xs text-blue-500">
                    Размер: {(invoiceFile.size / 1024 / 1024).toFixed(2)} МБ
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleInvoiceAttach}
              disabled={!invoiceFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Прикрепить счет
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentManagement;