/*
Here's the fixed version with missing closing brackets and required whitespace. The main issue was missing the closing bracket for the time slots label section. Here's the complete fix:
*/

import React, { useState } from 'react';
import { Calculator as CalcIcon, MapPin, Package, Weight, Calendar, Clock, Building, Phone, MessageSquare, CheckCircle, X } from 'lucide-react';
import { warehouses, additionalServices, extraCharges } from '../data/warehouses';
import WarehouseAutocomplete from './WarehouseAutocomplete';
import Modal from './Modal';

const Calculator = () => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    deliveryDate: '',
    company: '',
    phone: '',
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

  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Функция отправки данных в Google Таблицы
  const sendToGoogleSheets = async (orderData: any) => {
    try {
      // ВАЖНО: Замените на ваш реальный URL Google Apps Script Web App
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
      
      // Проверяем, что URL настроен
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL не настроен. Пропускаем отправку в Google Таблицы.');
        return false;
      }
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupDate: new Date(orderData.pickupDate).toLocaleDateString('ru-RU'),
          deliveryDate: new Date(orderData.deliveryDate).toLocaleDateString('ru-RU'),
          company: orderData.company,
          phone: orderData.phone,
          pickupTime: orderData.pickupTime,
          pickupAddress: orderData.pickupAddress,
          deliveryAddress: orderData.deliveryAddress,
          pallets: orderData.pallets || 0,
          boxes: orderData.boxes || 0,
          weight: orderData.weight,
          loading: orderData.loading ? 'Да' : 'Нет',
          palletizing: orderData.palletizing ? 'Да' : 'Нет',
          comment: orderData.comment,
          calculatedCost: result || 0,
          finalCost: '' // Пустое поле для финальной стоимости, которую заполнит менеджер
        })
      });
      
      return true;
    } catch (error) {
      console.warn('Google Таблицы недоступны:', error);
      return false;
    }
  };

  // Функция отправки уведомления в Telegram
  const sendToTelegram = async (orderData: any) => {
    try {
      // Замените на ваш Bot Token и Chat ID
      const BOT_TOKEN = '7791875105:AAEPoWoP_gwLbuUSLcbIYfdjRhjSHqZle6M';
      const CHAT_ID = '1774311470';
      
      const message = `🚚 *НОВАЯ ЗАЯВКА НА ДОСТАВКУ*

👤 *Компания:* ${orderData.company}
📞 *Телефон:* ${orderData.phone}

📅 *Дата забора:* ${new Date(orderData.pickupDate).toLocaleDateString('ru-RU')}
⏰ *Время забора:* ${orderData.pickupTime}
📍 *Адрес забора:* ${orderData.pickupAddress}

📅 *Дата доставки:* ${new Date(orderData.deliveryDate).toLocaleDateString('ru-RU')}
🏢 *Склад доставки:* ${orderData.deliveryAddress}

📦 *Груз:*
${orderData.boxes ? `• Коробки: ${orderData.boxes} шт` : ''}
${orderData.pallets ? `• Паллеты: ${orderData.pallets} шт` : ''}
${orderData.weight ? `• Вес: ${orderData.weight}` : ''}

🔧 *Дополнительные услуги:*
${orderData.loading ? '• ✅ Погрузка' : '• ❌ Погрузка'}
${orderData.palletizing ? '• ✅ Паллетирование' : '• ❌ Паллетирование'}

${orderData.comment ? `💬 *Комментарий:* ${orderData.comment}` : ''}

⏰ *Время подачи заявки:* ${new Date().toLocaleString('ru-RU')}`;

      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        return true;
      } else {
        console.error('Ошибка отправки в Telegram:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      return false;
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    const today = new Date().toISOString().split('T')[0];

    // Обязательные поля
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Выберите дату забора груза';
    } else if (formData.pickupDate < today) {
      newErrors.pickupDate = 'Дата забора не может быть раньше сегодняшнего дня';
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Выберите плановую дату сдачи груза';
    } else if (formData.deliveryDate < today) {
      newErrors.deliveryDate = 'Дата сдачи не может быть раньше сегодняшнего дня';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Укажите название компании';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Укажите номер телефона';
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Выберите время забора груза';
    }

    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Укажите адрес забора груза';
    }

    if (!formData.deliveryAddress) {
      newErrors.deliveryAddress = 'Выберите склад для доставки';
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Укажите общий вес груза';
    }

    // Проверяем, что указано хотя бы количество коробок или паллет
    const boxes = parseInt(formData.boxes || '0');
    const pallets = parseInt(formData.pallets || '0');
    
    if (boxes === 0 && pallets === 0) {
      newErrors.boxes = 'Укажите количество коробок или паллет';
      newErrors.pallets = 'Укажите количество коробок или паллет';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Функция для поиска склада по названию
  const findWarehouseByName = (deliveryAddress: string) => {
    if (!deliveryAddress) return null;
    
    // Нормализуем адрес для поиска
    const normalizedAddress = deliveryAddress.toLowerCase();
    
    return warehouses.find(warehouse => {
      // Разбиваем название склада на отдельные склады
      const warehouseNames = warehouse.name.toLowerCase().split(',').map(name => name.trim());
      
      // Проверяем каждое название склада
      return warehouseNames.some(warehouseName => {
        // Убираем префиксы маркетплейсов для более точного поиска
        const cleanWarehouseName = warehouseName
          .replace(/^(wb|ozon|яндекс\.маркет|сберлогистика|детский мир)\s*/i, '')
          .trim();
        
        // Проверяем вхождение названия склада в адрес доставки
        return normalizedAddress.includes(cleanWarehouseName) || 
               cleanWarehouseName.includes(normalizedAddress.replace(/^(wb|ozon|яндекс\.маркет|сберлогистика|детский мир)\s*/i, '').trim());
      });
    });
  };

  // Автоматический пересчет при изменении ключевых полей
  React.useEffect(() => {
    const shouldCalculate = formData.deliveryAddress && 
                           (formData.boxes || formData.pallets) && 
                           formData.weight;
    
    if (shouldCalculate) {
      // Добавляем небольшую задержку для плавности
      const timer = setTimeout(() => {
        calculateCostAuto();
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResult(null);
    }
  }, [formData.deliveryAddress, formData.boxes, formData.pallets, formData.loading, formData.palletizing]);

  // Автоматический расчет без валидации всех полей
  const calculateCostAuto = async () => {
    if (!formData.deliveryAddress || (!formData.boxes && !formData.pallets)) {
      setResult(null);
      return;
    }

    setIsCalculating(true);
    
    // Имитируем небольшую задержку для анимации
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const boxes = parseInt(formData.boxes || '0');
    const pallets = parseInt(formData.pallets || '0');
    
    // Находим выбранный склад для получения цен
    const selectedWarehouse = findWarehouseByName(formData.deliveryAddress);
    
    // Если склад не найден, используем базовые московские цены
    const warehousePricing = selectedWarehouse?.pricing || {
      toCube: 2500,
      boxes1to3: 150,
      pallets: { 1: 2700 }
    };
    
    let baseCost = 0;
    
    // Расчет стоимости согласно прайсу выбранного склада
    if (boxes > 0 && pallets === 0) {
      // Только коробки без паллет
      if (boxes <= 10) {
        // 1-10 коробок = до куба
        baseCost += warehousePricing.toCube;
      } else if (boxes <= 16) {
        // 11-16 коробок = 1 паллета
        const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
        baseCost += palletPrice;
      } else {
        // 17+ коробок = 1 паллета + до куба за лишние
        const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
        baseCost += palletPrice; // 1 паллета за первые 16 коробок
        baseCost += warehousePricing.toCube; // до куба за лишние коробки
      }
    } else if (boxes === 0 && pallets > 0) {
      // Только паллеты без коробок
      const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
      baseCost += pallets * palletPrice;
    } else if (boxes > 0 && pallets > 0) {
      // И коробки, и паллеты
      const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
      baseCost += pallets * palletPrice;
      if (boxes <= 10) {
        // 1-10 коробок = до куба
        baseCost += warehousePricing.toCube;
      } else if (boxes <= 16) {
        // 11-16 коробок = еще 1 паллета
        baseCost += palletPrice;
      } else {
        // 17+ коробок = еще 1 паллета + до куба за лишние
        baseCost += palletPrice; // еще 1 паллета за коробки 11-16
        baseCost += warehousePricing.toCube; // до куба за лишние коробки
      }
    }
    
    const loadingCost = formData.loading ? 500 : 0;
    let palletizingCost = 0;
    if (formData.palletizing) {
      palletizingCost = pallets * 300;
    }
    
    const total = baseCost + loadingCost + palletizingCost;
    setResult(total);
    setIsCalculating(false);
  };

  const calculateCost = () => {
    if (!validateForm()) {
      return;
    }

    const boxes = parseInt(formData.boxes || '0');
    const pallets = parseInt(formData.pallets || '0');
    
    // Находим выбранный склад для получения цен
    const selectedWarehouse = findWarehouseByName(formData.deliveryAddress);
    
    // Если склад не найден, используем базовые московские цены
    const warehousePricing = selectedWarehouse?.pricing || {
      toCube: 2500,
      boxes1to3: 150,
      pallets: { 1: 2700 }
    };
    
    let baseCost = 0;
    
    // Расчет стоимости согласно прайсу выбранного склада
    if (boxes > 0 && pallets === 0) {
      // Только коробки без паллет
      if (boxes <= 10) {
        // 1-10 коробок = до куба
        baseCost += warehousePricing.toCube;
      } else if (boxes <= 16) {
        // 11-16 коробок = 1 паллета
        const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
        baseCost += palletPrice;
      } else {
        // 17+ коробок = 1 паллета + до куба за лишние
        const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
        baseCost += palletPrice; // 1 паллета за первые 16 коробок
        baseCost += warehousePricing.toCube; // до куба за лишние коробки
      }
    } else if (boxes === 0 && pallets > 0) {
      // Только паллеты без коробок
      const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
      baseCost += pallets * palletPrice;
    } else if (boxes > 0 && pallets > 0) {
      // И коробки, и паллеты
      const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
      baseCost += pallets * palletPrice; // стоимость паллет
      if (boxes <= 10) {
        // 1-10 коробок = до куба
        baseCost += warehousePricing.toCube; // до куба за коробки
      } else if (boxes <= 16) {
        // 11-16 коробок = еще 1 паллета
        baseCost += palletPrice;
      } else {
        // 17+ коробок = еще 1 паллета + до куба за лишние
        baseCost += palletPrice; // еще 1 паллета за коробки 11-16
        baseCost += warehousePricing.toCube; // до куба за лишние коробки
      }
    }
    
    const loadingCost = formData.loading ? 500 : 0;
    
    // Паллетирование применяется только к указанным паллетам
    let palletizingCost = 0;
    if (formData.palletizing) {
      palletizingCost = pallets * 300;
    }
    
    const total = baseCost + loadingCost + palletizingCost;
    setResult(total);
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (result === null) {
      alert('Сначала рассчитайте стоимость доставки');
      return;
    }

    // Блокируем кнопку
    setIsSubmitting(true);

    // Отправляем данные в Google Таблицы и Telegram
    const [sheetsSuccess, telegramSuccess] = await Promise.all([
      sendToGoogleSheets(formData),
      sendToTelegram(formData)
    ]);
    
    // Показываем успех, если хотя бы одна отправка прошла успешно
    if (sheetsSuccess || telegramSuccess) {
      setShowSuccessModal(true);
      
      // Очищаем форму
      setFormData({
        pickupDate: '',
        deliveryDate: '',
        company: '',
        phone: '',
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
      setResult(null);
      setErrors({});
      
      // Логируем результаты отправки
      if (!sheetsSuccess) {
        console.warn('Не удалось отправить в Google Таблицы');
      }
      if (!telegramSuccess) {
        console.warn('Не удалось отправить в Telegram');
      }
    } else {
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону: +7 (936) 130-20-70');
    }
    
    // Разблокируем кнопку
    setIsSubmitting(false);
  };

  const timeSlots = [
    'с 09:00 до 12:00',
    'с 12:00 до 15:00', 
    'с 15:00 до 18:00',
    'с 18:00 до 21:00',
    'с 10:00 до 18:00',
    'Весь день (09:00-21:00)'
  ];
  const warehouseOptions = warehouses.map(warehouse => ({
    value: warehouse.id,
    label: warehouse.name,
    marketplace: warehouse.marketplace
  }));

  return (
    <section id="calculator" className="py-16 lg:py-24" style={{backgroundColor: 'rgb(239, 238, 249)'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CalcIcon className="w-8 h-8 text-accent-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800">
              Калькулятор стоимости
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Заполните форму для оформления заявки на доставку
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">
                  Параметры заявки
                </h3>

                {/* Даты */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Дата забора груза *
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, pickupDate: e.target.value }));
                      }}
                    />
                    {errors.pickupDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Плановая сдача груза *
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, deliveryDate: e.target.value }));
                      }}
                    />
                    {errors.deliveryDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
                    )}
                  </div>
                </div>

                {/* Контактная информация */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Ваша компания *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="ИП Смирнов Виктор Алексеевич"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.company ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Ваш телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7(999)333-33-33"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Время и адреса */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Время забора груза *
                  </label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Выберите время</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.pickupTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Адрес забора груза *
                  </label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    placeholder="МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      errors.pickupAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickupAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Адрес доставки груза *
                  </label>
                  <WarehouseAutocomplete
                    value={formData.deliveryAddress}
                    onChange={(value) => setFormData(prev => ({ ...prev, deliveryAddress: value }))}
                    error={errors.deliveryAddress}
                    placeholder="Начните вводить название склада..."
                  />
                  {errors.deliveryAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>
                  )}
                </div>

                {/* Параметры груза */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 min-h-[2.5rem] flex items-end">
                      <Package className="w-4 h-4 inline mr-1" />
                      Кол-во коробов *
                    </label>
                    <input
                      type="number"
                      name="boxes"
                      value={formData.boxes}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.boxes ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.boxes && (
                      <p className="mt-1 text-sm text-red-600">{errors.boxes}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 min-h-[2.5rem] flex items-end">
                      <Package className="w-4 h-4 inline mr-1" />
                      Количество паллет *
                    </label>
                    <input
                      type="number"
                      name="pallets"
                      value={formData.pallets}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.pallets ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.pallets && (
                      <p className="mt-1 text-sm text-red-600">{errors.pallets}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 min-h-[2.5rem] flex items-end">
                      <Weight className="w-4 h-4 inline mr-1" />
                      Общий вес *
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="25 кг"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.weight ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.weight && (
                      <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                    )}
                  </div>
                </div>

                {/* Дополнительные услуги */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="loading"
                      checked={formData.loading}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-accent-600 bg-gray-100 border-gray-300 rounded focus:ring-accent-500 focus:ring-2"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Погрузка (+500 ₽)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="palletizing"
                      checked={formData.palletizing}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-accent-600 bg-gray-100 border-gray-300 rounded focus:ring-accent-500 focus:ring-2"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Паллетирование (+300 ₽ за каждую паллету)
                    </label>
                  </div>
                </div>

                {/* Комментарий */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Комментарий
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Дополнительная информация о грузе или особые требования"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors resize-none"
                  />
                </div>

                {/* Результат расчета */}
                {(result !== null || isCalculating) && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                    {isCalculating ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                          <span className="text-green-700 font-medium">Рассчитываем стоимость...</span>
                        </div>
                      </div>
                    ) : result !== null ? (
                      <>
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            {result.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-green-700 font-medium">Стоимость доставки</div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-green-800">
                          <div className="flex justify-between">
                            <span>Расчет:</span>
                            <span className="font-medium">Детализация</span>
                          </div>
                          {(() => {
                            const selectedWarehouse = findWarehouseByName(formData.deliveryAddress);
                            const warehouseName = selectedWarehouse ? 
                              `${selectedWarehouse.name.split(',')[0]} (${selectedWarehouse.city})` : 
                              'Базовые цены';
                            return (
                              <div className="flex justify-between">
                                <span>Склад:</span>
                                <span className="font-medium text-xs">{warehouseName}</span>
                              </div>
                            );
                          })()}
                          {formData.boxes && parseInt(formData.boxes) > 0 && (
                            <div className="flex justify-between">
                              <span>
                                {(() => {
                                  const boxes = parseInt(formData.boxes);
                                  if (boxes <= 10) {
                                    return `Коробки (${boxes} шт): до куба`;
                                  } else if (boxes <= 16) {
                                    return `Коробки (${boxes} шт): 1 паллета`;
                                  } else {
                                    return `Коробки (${boxes} шт): 1 паллета + до куба`;
                                  }
                                })()}
                              </span>
                              <span className="font-medium">
                                {(() => {
                                  const selectedWarehouse = findWarehouseByName(formData.deliveryAddress);
                                  const warehousePricing = selectedWarehouse?.pricing || {
                                    toCube: 2500,
                                    boxes1to3: 150,
                                    pallets: { 1: 2700 }
                                  };
                                  const boxes = parseInt(formData.boxes);
                                  if (boxes <= 10) {
                                    // 1-10 коробок = до куба
                                    return warehousePricing.toCube.toLocaleString('ru-RU');
                                  } else if (boxes <= 16) {
                                    // 11-16 коробок = 1 паллета
                                    const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
                                    return palletPrice.toLocaleString('ru-RU');
                                  } else {
                                    // 17+ коробок = 1 паллета + до куба
                                    const palletPrice = warehousePricing.pallets[1] || warehousePricing.pallets['1'] || 2700;
                                    return (palletPrice + warehousePricing.toCube).toLocaleString('ru-RU');
                                  }
                                })()} ₽
                              </span>
                            </div>
                          )}
                          {formData.pallets && parseInt(formData.pallets) > 0 && (
                            <div className="flex justify-between">
                              <span>Паллеты ({formData.pallets} шт):</span>
                              <span className="font-medium">
                                {(() => {
                                  const selectedWarehouse = findWarehouseByName(formData.deliveryAddress);
                                  const palletPrice = selectedWarehouse?.pricing.pallets[1] || selectedWarehouse?.pricing.pallets['1'] || 2700;
                                  return (parseInt(formData.pallets) * palletPrice).toLocaleString('ru-RU');
                                })()} ₽
                              </span>
                            </div>
                          )}
                          {formData.loading && (
                            <div className="flex justify-between">
                              <span>Погрузка:</span>
                              <span className="font-medium">500 ₽</span>
                            </div>
                          )}
                          {formData.palletizing && (
                            <div className="flex justify-between">
                              <span>
                                Паллетирование ({parseInt(formData.pallets || '0')} паллет):
                              </span>
                              <span className="font-medium">
                                {parseInt(formData.pallets || '0') * 300} ₽
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : null}

                    {result !== null && !isCalculating && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <strong>Обратите внимание:</strong> Итоговая стоимость может отличаться от расчетной. 
                          Менеджер свяжется с вами и назовет точную сумму с учетом всех особенностей заказа.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {result === null ? (
                  <button
                    onClick={calculateCost}
                    className="w-full bg-accent-500 text-white py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    Рассчитать стоимость
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-primary-800 text-white hover:bg-primary-700 hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? 'Отправляем заявку...' : 'Подтвердить заявку'}
                  </button>
                )}
              </div>

              {/* Info Panel */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">
                  Информация о доставке
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-primary-800 mb-2">Как мы работаем:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Обработка заявки за 15 минут</li>
                      <li>• Забор груза в удобное время</li>
                      <li>• Доставка точно в срок</li>
                      <li>• Полная отчетность</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-primary-800 mb-2">Что включено:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Бесплатная упаковка</li>
                      <li>• Отслеживание груза</li>
                      <li>• SMS-уведомления</li>
                      <li>• Фото-отчет доставки</li>
                    </ul>
                  </div>
                  
                  <div className="bg-accent-100 rounded-lg p-4">
                    <h4 className="font-semibold text-accent-800 mb-2">Связаться с нами:</h4>
                    <div className="space-y-2 text-sm">
                      <a href="tel:+79361302070" className="block text-accent-700 hover:text-accent-800">
                        📞 +7 (936) 130-20-70
                      </a>
                      <a href="https://wa.me/79361302070" className="block text-accent-700 hover:text-accent-800">
                        💬 WhatsApp
                      </a>
                      <a href="https://t.me/+79262168760" className="block text-accent-700 hover:text-accent-800">
                        📱 Telegram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title=""
        size="sm"
      >
        <div className="text-center py-4">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Заявка успешно отправлена!
          </h2>
          
          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
            Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
          </p>
          
          <div className="mb-4">
            <p className="text-gray-600 text-xs mb-3 text-center">
              Или свяжитесь с нами прямо сейчас:
            </p>
            <div className="flex justify-center space-x-3">
              <a
                href="tel:+79361302070"
                className="flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-1 max-w-[80px]"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/79361302070"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex-1 max-w-[80px]"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/+79262168760"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors flex-1 max-w-[80px]"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <button
            onClick={() => setShowSuccessModal(false)}
            className="bg-accent-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-sm"
          >
            Понятно
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Calculator;