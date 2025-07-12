import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Truck, Phone, Mail, MapPin, Clock, MessageCircle, Package, Shield, Zap } from 'lucide-react';
import Modal from './Modal';

const Footer = () => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isRequisitesModalOpen, setIsRequisitesModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [activeServiceModal, setActiveServiceModal] = useState<string | null>(null);
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer id="contacts" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <a href="/" onClick={handleHomeClick} className="flex items-center">
                <img 
                  src="/LOGOAKSAY.png" 
                  alt="Аксай Логистик" 
                  className="h-32 w-auto bg-white rounded-lg p-2 shadow-lg"
                />
              </a>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Профессиональная доставка товаров на склады маркетплейсов. 
              Работаем по всей России с гарантией качества.
            </p>
            <div className="flex items-center text-accent-400 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Работаем 24/7</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-accent-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+79361302070" className="hover:text-accent-400 transition-colors block">
                    +7 (936) 130-20-70
                  </a>
                  <a href="tel:+79262168760" className="hover:text-accent-400 transition-colors block">
                    +7 (926) 216-87-60
                  </a>
                  <p className="text-gray-400 text-sm">Круглосуточно</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-accent-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:Gruzoperevozki-moskva24@mail.ru" className="hover:text-accent-400 transition-colors">
                    Gruzoperevozki-moskva24@mail.ru
                  </a>
                  <p className="text-gray-400 text-sm">Ответим в течение часа</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-accent-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Москва, 1-й Дорожный пр. д 7, стр.1</p>
                  <p className="text-gray-400 text-sm">Офис и склад</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Услуги</h4>
            <ul className="space-y-3">
              {[
                { name: 'Доставка на Wildberries', key: 'wildberries' },
                { name: 'Доставка на Ozon', key: 'ozon' },
                { name: 'Доставка на Яндекс.Маркет', key: 'yandex' },
                { name: 'Доставка на Avito', key: 'avito' },
                { name: 'Экспресс-доставка', key: 'express' }
              ].map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setActiveServiceModal(service.key)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Messengers & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Мессенджеры</h4>
            <div className="space-y-4 mb-8">
              <a
                href="https://wa.me/79361302070"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp
              </a>
              <a
                href="https://t.me/+79262168760"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Telegram
              </a>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Быстрая связь</h5>
              <p className="text-gray-300 text-sm mb-3">
                Напишите нам в мессенджер для быстрого ответа
              </p>
              <a
                href="https://wa.me/79361302070"
                className="bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors inline-block"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 lg:mb-0">
              <p>© 2024 Аксай Логистик. Все права защищены.</p>
              <p className="mt-1">
                ИП Сулейманов Марат Сулейманович | ИНН: 053400672413 | ОГРНИП: 320057100041610 | 
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-white ml-1 underline"
                >
                  Политика конфиденциальности
                </button>
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Договор оферты
              </button>
              <button 
                onClick={() => setIsRequisitesModalOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Реквизиты
              </button>
            </div>
          </div>
        </div>
      </div>
      </footer>

      {/* Модальные окна */}
      {/* Модальные окна услуг */}
      <Modal
        isOpen={activeServiceModal === 'wildberries'}
        onClose={() => setActiveServiceModal(null)}
        title="Доставка на Wildberries"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-800">Wildberries</h3>
              <p className="text-gray-600">Крупнейший маркетплейс России</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Наши склады WB:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Коледино, Подольск, Внуково</li>
                <li>• Белая дача, Вешки</li>
                <li>• Электросталь, Пушкино</li>
                <li>• Обухово, Черная грязь</li>
                <li>• Белые столбы, Радумля</li>
                <li>• Чехов, Чехов-2</li>
                <li>• Рязань, Тула</li>
                <li>• Санкт-Петербург</li>
                <li>• Казань, Краснодар</li>
                <li>• Невинномысск, Котовск</li>
                <li>• Волгоград, Новосемейкино</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Особенности доставки:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Строгие требования к упаковке</li>
                <li>• Обязательная маркировка</li>
                <li>• Точное соблюдение слотов</li>
                <li>• Максимальный вес паллеты: 250 кг</li>
                <li>• Предварительная запись</li>
                <li>• Контроль качества товаров</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Стоимость доставки:</h4>
            <p className="text-purple-700 text-sm">
              От 2500₽ за куб до московских складов. Стоимость зависит от конкретного склада и объема груза.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeServiceModal === 'ozon'}
        onClose={() => setActiveServiceModal(null)}
        title="Доставка на Ozon"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-800">Ozon</h3>
              <p className="text-gray-600">Быстрорастущий маркетплейс</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Наши склады Ozon:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Королев, РЦ Рябиновая</li>
                <li>• Fresh Рябиновая</li>
                <li>• Кавказский Хаб</li>
                <li>• Солнечногорск, Строгино</li>
                <li>• Светогорская</li>
                <li>• СЦ1 Медведково</li>
                <li>• Химки, Осташковский Хаб</li>
                <li>• Чехов, Тула, Чурилово</li>
                <li>• Балашиха, Ногинск</li>
                <li>• Жуковский, Нижнее Велино</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Особенности доставки:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Гибкая система приемки</li>
                <li>• Возможность доставки Fresh-товаров</li>
                <li>• Быстрая обработка документов</li>
                <li>• Электронный документооборот</li>
                <li>• Контроль температурного режима</li>
                <li>• Приемка в выходные дни</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Стоимость доставки:</h4>
            <p className="text-blue-700 text-sm">
              От 3000₽ за куб до московских складов. Специальные тарифы для Fresh-товаров.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeServiceModal === 'yandex'}
        onClose={() => setActiveServiceModal(null)}
        title="Доставка на Яндекс.Маркет"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-800">Яндекс.Маркет</h3>
              <p className="text-gray-600">Маркетплейс от Яндекса</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Наши склады Яндекс.Маркет:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Котельники</li>
                <li>• Строгино</li>
                <li>• Томилино</li>
                <li>• Царицыно</li>
                <li>• Софьино</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Особенности доставки:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Высокие стандарты качества</li>
                <li>• Быстрая приемка товаров</li>
                <li>• Современные складские комплексы</li>
                <li>• Автоматизированная обработка</li>
                <li>• Строгий контроль сроков</li>
                <li>• Удобная система записи</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Стоимость доставки:</h4>
            <p className="text-yellow-700 text-sm">
              От 3000₽ за куб до московских складов. Конкурентные тарифы для постоянных клиентов.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeServiceModal === 'avito'}
        onClose={() => setActiveServiceModal(null)}
        title="Доставка на Avito"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-800">Avito</h3>
              <p className="text-gray-600">Популярная торговая площадка</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Услуги доставки:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Доставка на склады Avito</li>
                <li>• Фулфилмент услуги</li>
                <li>• Доставка до покупателей</li>
                <li>• Возврат товаров</li>
                <li>• Обработка заказов</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Особенности:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Гибкие условия сотрудничества</li>
                <li>• Быстрое подключение</li>
                <li>• Поддержка различных категорий</li>
                <li>• Удобная система отчетности</li>
                <li>• Интеграция с личным кабинетом</li>
                <li>• Профессиональная поддержка</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Стоимость доставки:</h4>
            <p className="text-green-700 text-sm">
              Индивидуальные тарифы в зависимости от объема и типа товаров. Консультация бесплатно.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeServiceModal === 'express'}
        onClose={() => setActiveServiceModal(null)}
        title="Экспресс-доставка"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-800">Экспресс-доставка</h3>
              <p className="text-gray-600">Срочная доставка в кратчайшие сроки</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Сроки доставки:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• В день обращения</li>
                <li>• В течение 2-4 часов</li>
                <li>• Ночная доставка</li>
                <li>• Доставка в выходные</li>
                <li>• Доставка в праздники</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-3">Особенности:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Приоритетная обработка</li>
                <li>• Персональный менеджер</li>
                <li>• Отслеживание в реальном времени</li>
                <li>• SMS-уведомления</li>
                <li>• Фото-отчеты</li>
                <li>• Гарантия сроков</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Стоимость:</h4>
            <p className="text-red-700 text-sm">
              Доплата 100% к стандартному тарифу при заказе менее чем за 24 часа до доставки.
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">Важно:</h4>
            <p className="text-amber-700 text-sm">
              Экспресс-доставка доступна только для московского региона и при наличии свободного транспорта.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title="Договор оферты"
        size="xl"
      >
        <div className="prose max-w-none">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary-800 mb-4">
              ДОГОВОР ОФЕРТЫ<br />на оказание логистических услуг
            </h1>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-2">1.1. Настоящий договор-оферта (далее - "Договор") является официальным предложением ИП Сулейманов Марат Сулейманович (далее - "Исполнитель") заключить договор на оказание логистических услуг.</p>
              <p className="mb-2">1.2. Акцептом настоящей оферты является подача заявки на оказание услуг любым из способов, указанных на сайте.</p>
              <p>1.3. Договор считается заключенным с момента получения Исполнителем заявки от Заказчика.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">2. ПРЕДМЕТ ДОГОВОРА</h2>
              <p className="mb-2">2.1. Исполнитель обязуется оказать Заказчику логистические услуги по доставке товаров на склады маркетплейсов, а Заказчик обязуется принять и оплатить оказанные услуги.</p>
              <p className="mb-2">2.2. Перечень услуг:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Забор товаров с адреса Заказчика</li>
                <li>Транспортировка товаров</li>
                <li>Доставка на склады маркетплейсов (Wildberries, Ozon, Яндекс.Маркет, Avito и др.)</li>
                <li>Предоставление отчетности о выполненных услугах</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">3. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ</h2>
              <p className="mb-2">3.1. Стоимость услуг определяется согласно действующему прайс-листу, размещенному на сайте.</p>
              <p className="mb-2">3.2. Окончательная стоимость рассчитывается индивидуально с учетом:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Веса и объема груза</li>
                <li>Расстояния доставки</li>
                <li>Срочности выполнения</li>
                <li>Дополнительных услуг</li>
              </ul>
              <p>3.3. Оплата производится по факту оказания услуг наличными или безналичным расчетом.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">4. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
              <p className="mb-2">4.1. Исполнитель обязуется:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Оказать услуги качественно и в установленные сроки</li>
                <li>Обеспечить сохранность груза</li>
                <li>Предоставить отчетность о выполненных работах</li>
                <li>Соблюдать конфиденциальность информации Заказчика</li>
              </ul>
              <p className="mb-2">4.2. Заказчик обязуется:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Предоставить достоверную информацию о грузе</li>
                <li>Обеспечить доступ к грузу в согласованное время</li>
                <li>Своевременно оплатить оказанные услуги</li>
                <li>Предоставить необходимые документы</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">5. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
              <p className="mb-2">5.1. За утрату или повреждение груза Исполнитель несет ответственность в размере его действительной стоимости, но не более 100 000 рублей за одну поставку.</p>
              <p className="mb-2">5.2. Исполнитель не несет ответственности за:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Задержки, вызванные форс-мажорными обстоятельствами</li>
                <li>Повреждения груза вследствие его естественных свойств</li>
                <li>Скрытые дефекты упаковки</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800 mb-3">6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-2">6.1. Договор действует до полного исполнения сторонами своих обязательств.</p>
              <p className="mb-2">6.2. Изменения в договор вносятся по соглашению сторон.</p>
              <p>6.3. Договор регулируется законодательством Российской Федерации.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-800 mb-2">РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</h3>
              <p>
                <strong>ИП Сулейманов Марат Сулейманович</strong><br />
                ОГРНИП: 320057100041610<br />
                ИНН: 053400672413<br />
                Адрес: Москва, 1-й Дорожный пр. д 7, стр.1<br />
                Телефон: +7 (936) 130-20-70, +7 (926) 216-87-60<br />
                Email: Gruzoperevozki-moskva24@mail.ru
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRequisitesModalOpen}
        onClose={() => setIsRequisitesModalOpen(false)}
        title="Реквизиты компании"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent-500">
            <h3 className="font-semibold text-primary-800 mb-3">Основные реквизиты</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Наименование:</span>
                <span className="font-medium">ИП Сулейманов Марат Сулейманович</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ОГРНИП:</span>
                <span className="font-medium">320057100041610</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ИНН:</span>
                <span className="font-medium">053400672413</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent-500">
            <h3 className="font-semibold text-primary-800 mb-3">Банковские реквизиты</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Банк:</span>
                <span className="font-medium">ПАО "Сбербанк России"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">БИК:</span>
                <span className="font-medium">044525225</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Корр. счет:</span>
                <span className="font-medium">30101810400000000225</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Расчетный счет:</span>
                <span className="font-medium">40802810938000123456</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent-500">
            <h3 className="font-semibold text-primary-800 mb-3">Контактная информация</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Адрес:</span>
                <span className="font-medium">Москва, 1-й Дорожный пр. д 7, стр.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Телефон:</span>
                <span className="font-medium">+7 (936) 130-20-70, +7 (926) 216-87-60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">Gruzoperevozki-moskva24@mail.ru</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Политика конфиденциальности"
        size="lg"
      >
        <div className="prose max-w-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">1. Общие положения</h3>
              <p className="text-gray-700">Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта ИП Сулейманов Марат Сулейманович.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">2. Сбор персональных данных</h3>
              <p className="text-gray-700 mb-2">Мы собираем следующие персональные данные:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Фамилия, имя, отчество</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Адреса доставки</li>
                <li>Информация о грузах</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">3. Цели обработки данных</h3>
              <p className="text-gray-700 mb-2">Персональные данные используются для:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Оказания логистических услуг</li>
                <li>Связи с клиентами</li>
                <li>Выполнения договорных обязательств</li>
                <li>Ведения отчетности</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">4. Защита данных</h3>
              <p className="text-gray-700">Компания принимает необходимые меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">5. Права субъектов данных</h3>
              <p className="text-gray-700 mb-2">Вы имеете право:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Получать информацию об обработке ваших данных</li>
                <li>Требовать уточнения, блокирования или уничтожения данных</li>
                <li>Отзывать согласие на обработку данных</li>
              </ul>
            </div>

            <div className="bg-accent-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary-800 mb-2">Контактная информация</h4>
              <p className="text-gray-700">
                По вопросам обработки персональных данных обращайтесь:<br />
                Email: Gruzoperevozki-moskva24@mail.ru<br />
                Телефон: +7 (936) 130-20-70
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Footer;