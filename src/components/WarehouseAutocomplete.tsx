import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { getAllIndividualWarehouses, getMarketplaceLabel } from '../data/warehouses';

interface WarehouseAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

const WarehouseAutocomplete: React.FC<WarehouseAutocompleteProps> = ({
  value,
  onChange,
  error,
  placeholder = "Начните вводить название склада...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredWarehouses, setFilteredWarehouses] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allWarehouses = getAllIndividualWarehouses();

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allWarehouses.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getMarketplaceLabel(warehouse.marketplace).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWarehouses(filtered.slice(0, 10)); // Показываем максимум 10 результатов
    } else {
      setFilteredWarehouses([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // Если пользователь очищает поле, сбрасываем выбранное значение
    if (newValue === '') {
      onChange('');
    }
  };

  const handleWarehouseSelect = (warehouse: any) => {
    const selectedValue = `${getMarketplaceLabel(warehouse.marketplace)} ${warehouse.name}`;
    setSearchTerm(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {isOpen && (searchTerm.length > 0 || filteredWarehouses.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredWarehouses.length > 0 ? (
            filteredWarehouses.map((warehouse, index) => (
              <button
                key={`${warehouse.id}-${index}`}
                type="button"
                onClick={() => handleWarehouseSelect(warehouse)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
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
                      <span className="font-medium text-gray-900 truncate">
                        {warehouse.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {warehouse.city} • от {warehouse.pricing.toCube.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : searchTerm.length > 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              Склады не найдены
            </div>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              Начните вводить название склада
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WarehouseAutocomplete;