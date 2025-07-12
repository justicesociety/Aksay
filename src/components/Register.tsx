import React, { useState, useEffect } from 'react';
import { UserPlus, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    agreeToTerms: false
  });

  const [orderData, setOrderData] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // Загружаем данные заказа из localStorage
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      const data = JSON.parse(savedOrderData);
      setOrderData(data);
      
      // Автоматически заполняем поля из заказа
      setFormData(prev => ({
        ...prev,
        company: data.company || '',
        phone: data.phone || ''
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Введите название компании';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласиться с условиями';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        register(formData);
        // Очищаем данные заказа из localStorage
        localStorage.removeItem('orderData');
        navigate('/dashboard');
      } catch (error) {
        alert('Ошибка регистрации. Попробуйте еще раз.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">Регистрация</h1>
          <p className="text-gray-600">Создайте аккаунт для управления заказами</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <UserPlus className="w-6 h-6 text-accent-500 mr-2" />
                <h2 className="text-xl font-semibold text-primary-800">Данные для регистрации</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите имя"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите фамилию"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@mail.ru"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7(999)333-33-33"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Компания *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ИП Смирнов Виктор Алексеевич"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пароль *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Минимум 6 символов"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Подтвердите пароль *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors pr-12 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Повторите пароль"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Agreement */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-accent-600 bg-gray-100 border-gray-300 rounded focus:ring-accent-500 focus:ring-2 mt-1"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Я согласен с{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      условиями использования
                    </a>{' '}
                    и{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent-500 text-white py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-200 hover:shadow-lg"
                >
                  Зарегистрироваться
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Уже есть аккаунт?{' '}
                  <a href="/login" className="text-accent-600 hover:text-accent-700 font-medium">
                    Войти
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            {orderData && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Ваш заказ
                </h3>
                
                <div className="space-y-3 text-sm">
                  {orderData.pickupDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Дата забора:</span>
                      <span className="font-medium">{orderData.pickupDate}</span>
                    </div>
                  )}
                  {orderData.deliveryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Дата доставки:</span>
                      <span className="font-medium">{orderData.deliveryDate}</span>
                    </div>
                  )}
                  {orderData.deliveryAddress && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Склад:</span>
                      <span className="font-medium">{orderData.deliveryAddress}</span>
                    </div>
                  )}
                  {orderData.calculatedCost && (
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-600">Стоимость:</span>
                      <span className="font-bold text-accent-500">
                        {orderData.calculatedCost.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-accent-50 rounded-lg">
                  <p className="text-sm text-accent-700">
                    После регистрации заказ будет автоматически добавлен в ваш личный кабинет
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 bg-gradient-to-br from-primary-800 to-primary-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Преимущества регистрации</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-accent-300" />
                  Отслеживание заказов
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-accent-300" />
                  История доставок
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-accent-300" />
                  Быстрое оформление
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-accent-300" />
                  Персональные скидки
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;