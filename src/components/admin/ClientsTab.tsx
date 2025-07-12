import React from 'react';
import { Plus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  ordersCount: number;
  totalSpent: number;
  registrationDate: string;
}

interface ClientsTabProps {
  clients: Client[];
  onCreateClient: () => void;
}

const ClientsTab: React.FC<ClientsTabProps> = ({ clients, onCreateClient }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Клиенты</h2>
        <button
          onClick={onCreateClient}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить клиента
        </button>
      </div>
      
      <div className="grid gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <p className="text-gray-600">{client.company}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p>Email: {client.email}</p>
                  <p>Телефон: {client.phone}</p>
                  <p>Регистрация: {client.registrationDate}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {client.ordersCount} заказов
                </div>
                <div className="text-green-600 font-medium">
                  {client.totalSpent.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsTab;