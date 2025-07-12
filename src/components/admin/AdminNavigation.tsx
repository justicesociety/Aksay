import React from 'react';
import { FileText, Users, MapPin, Truck, Building2 } from 'lucide-react';

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'orders', label: 'Заявки', icon: FileText },
    { id: 'clients', label: 'Клиенты', icon: Users },
    { id: 'routes', label: 'Маршруты', icon: MapPin },
    { id: 'drivers', label: 'Водители', icon: Truck },
    { id: 'warehouses', label: 'Склады', icon: Building2 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
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
    </div>
  );
};

export default AdminNavigation;