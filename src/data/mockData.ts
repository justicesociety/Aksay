// Моковые данные для всего приложения

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  registrationDate: string;
  ordersCount: number;
  totalSpent: number;
  discount: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  carBrand: string;
  carNumber: string;
  palletCapacity: number;
  status: 'free' | 'busy' | 'inactive';
  currentRoute?: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  date: string;
  pickupDate: string;
  deliveryDate: string;
  pickupTime: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'accepted' | 'assigned' | 'pickup' | 'in_transit' | 'delivered' | 'failed' | 'returned';
  paymentStatus: 'unpaid' | 'invoice_requested' | 'invoice_sent' | 'paid' | 'overdue';
  cost: number;
  boxes: number;
  pallets: number;
  weight: string;
  loading: boolean;
  palletizing: boolean;
  comment: string;
  driverComment: string;
  assignedDriver?: string;
  assignedRoute?: string;
  invoiceFile?: string;
  invoiceDate?: string;
  paidDate?: string;
  statusHistory: Array<{
    status: string;
    date: string;
    comment: string;
  }>;
}

export interface Route {
  id: string;
  name: string;
  driverId: string;
  warehouses: string[];
  status: 'created' | 'in_progress' | 'at_warehouse' | 'completed';
  createdDate: string;
  orderIds: string[];
  totalCost: number;
  totalWeight: string;
  comment?: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  number: string;
  date: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  fileName?: string;
  fileUrl?: string;
}

// Моковые пользователи
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'ivanov@example.com',
    firstName: 'Иван',
    lastName: 'Петров',
    company: 'ИП Петров И.И.',
    phone: '+7(999)123-45-67',
    registrationDate: '2023-12-01',
    ordersCount: 15,
    totalSpent: 45000,
    discount: 5
  },
  {
    id: '2',
    email: 'sidorov@example.com',
    firstName: 'Петр',
    lastName: 'Сидоров',
    company: 'ООО "Торговый дом"',
    phone: '+7(999)234-56-78',
    registrationDate: '2023-11-15',
    ordersCount: 8,
    totalSpent: 24000,
    discount: 0
  },
  {
    id: '3',
    email: 'kozlov@example.com',
    firstName: 'Сергей',
    lastName: 'Козлов',
    company: 'ИП Козлов С.А.',
    phone: '+7(999)345-67-89',
    registrationDate: '2024-01-10',
    ordersCount: 3,
    totalSpent: 9000,
    discount: 0
  }
];

// Моковые водители
export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    phone: '+7(999)111-11-11',
    carBrand: 'ГАЗель Next',
    carNumber: 'А123БВ77',
    palletCapacity: 8,
    status: 'busy',
    currentRoute: 'Маршрут #1'
  },
  {
    id: '2',
    name: 'Сидоров Петр Петрович',
    phone: '+7(999)222-22-22',
    carBrand: 'Ford Transit',
    carNumber: 'В456ГД77',
    palletCapacity: 10,
    status: 'busy',
    currentRoute: 'Маршрут #2'
  },
  {
    id: '3',
    name: 'Козлов Сергей Александрович',
    phone: '+7(999)333-33-33',
    carBrand: 'Mercedes Sprinter',
    carNumber: 'Е789ЖЗ77',
    palletCapacity: 12,
    status: 'free'
  },
  {
    id: '4',
    name: 'Новиков Владимир Викторович',
    phone: '+7(999)444-44-44',
    carBrand: 'ГАЗель Next',
    carNumber: 'К012ЛМ77',
    palletCapacity: 8,
    status: 'free'
  },
  {
    id: '5',
    name: 'Морозов Алексей Дмитриевич',
    phone: '+7(999)555-55-55',
    carBrand: 'Iveco Daily',
    carNumber: 'Н345ОП77',
    palletCapacity: 14,
    status: 'inactive'
  }
];

// Моковые заказы
export const mockOrders: Order[] = [
  {
    id: '001',
    clientId: '1',
    clientName: 'ИП Петров И.И.',
    clientPhone: '+7(999)123-45-67',
    date: '2024-01-15',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-16',
    pickupTime: 'с 09:00 до 12:00',
    pickupAddress: 'МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3',
    deliveryAddress: 'WB Коледино',
    status: 'delivered',
    paymentStatus: 'paid',
    cost: 2500,
    boxes: 5,
    pallets: 0,
    weight: '25 кг',
    loading: false,
    palletizing: false,
    comment: 'Хрупкий груз, осторожно',
    driverComment: '',
    assignedDriver: 'Иванов Иван Иванович',
    assignedRoute: 'Маршрут #1',
    paidDate: '2024-01-16',
    statusHistory: [
      { status: 'pending', date: '2024-01-15 09:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-15 09:15', comment: 'Заказ принят к исполнению' },
      { status: 'assigned', date: '2024-01-15 10:00', comment: 'Назначен водитель Иванов И.И.' },
      { status: 'pickup', date: '2024-01-15 14:30', comment: 'Груз забран с адреса' },
      { status: 'in_transit', date: '2024-01-15 16:00', comment: 'Груз в пути на склад' },
      { status: 'delivered', date: '2024-01-16 10:15', comment: 'Груз успешно доставлен на склад WB' }
    ]
  },
  {
    id: '002',
    clientId: '2',
    clientName: 'ООО "Торговый дом"',
    clientPhone: '+7(999)234-56-78',
    date: '2024-01-14',
    pickupDate: '2024-01-14',
    deliveryDate: '2024-01-15',
    pickupTime: 'с 12:00 до 15:00',
    pickupAddress: 'Москва, ул. Промышленная 15',
    deliveryAddress: 'Ozon Королев',
    status: 'in_transit',
    paymentStatus: 'invoice_sent',
    cost: 3100,
    boxes: 0,
    pallets: 1,
    weight: '180 кг',
    loading: true,
    palletizing: false,
    comment: 'Срочная доставка',
    driverComment: '',
    assignedDriver: 'Сидоров Петр Петрович',
    assignedRoute: 'Маршрут #2',
    invoiceDate: '2024-01-14',
    invoiceFile: 'invoice_002.pdf',
    statusHistory: [
      { status: 'pending', date: '2024-01-14 08:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-14 08:30', comment: 'Заказ принят к исполнению' },
      { status: 'assigned', date: '2024-01-14 11:00', comment: 'Назначен водитель Сидоров П.П.' },
      { status: 'pickup', date: '2024-01-14 12:00', comment: 'Груз забран с адреса' },
      { status: 'in_transit', date: '2024-01-14 15:30', comment: 'Груз в пути на склад' }
    ]
  },
  {
    id: '003',
    clientId: '3',
    clientName: 'ИП Козлов С.А.',
    clientPhone: '+7(999)345-67-89',
    date: '2024-01-13',
    pickupDate: '2024-01-13',
    deliveryDate: '2024-01-14',
    pickupTime: 'с 15:00 до 18:00',
    pickupAddress: 'Подольск, ул. Заводская 8',
    deliveryAddress: 'Яндекс.Маркет Котельники',
    status: 'failed',
    paymentStatus: 'unpaid',
    cost: 3000,
    boxes: 8,
    pallets: 0,
    weight: '45 кг',
    loading: false,
    palletizing: false,
    comment: 'Документы в отдельном пакете',
    driverComment: 'Склад не принял груз - неправильная маркировка товара. Груз возвращен отправителю.',
    statusHistory: [
      { status: 'pending', date: '2024-01-13 10:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-13 10:30', comment: 'Заказ принят к исполнению' },
      { status: 'assigned', date: '2024-01-13 14:00', comment: 'Назначен водитель' },
      { status: 'pickup', date: '2024-01-13 15:00', comment: 'Груз забран с адреса' },
      { status: 'in_transit', date: '2024-01-13 17:30', comment: 'Груз в пути на склад' },
      { status: 'failed', date: '2024-01-14 09:00', comment: 'Склад отказался принимать груз' },
      { status: 'returned', date: '2024-01-14 16:00', comment: 'Груз возвращен отправителю' }
    ]
  },
  {
    id: '004',
    clientId: '1',
    clientName: 'ИП Петров И.И.',
    clientPhone: '+7(999)123-45-67',
    date: '2024-01-16',
    pickupDate: '2024-01-17',
    deliveryDate: '2024-01-18',
    pickupTime: 'с 09:00 до 12:00',
    pickupAddress: 'МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3',
    deliveryAddress: 'WB Электросталь',
    status: 'accepted',
    paymentStatus: 'unpaid',
    cost: 3200,
    boxes: 12,
    pallets: 0,
    weight: '60 кг',
    loading: false,
    palletizing: true,
    comment: 'Обычная доставка',
    driverComment: '',
    statusHistory: [
      { status: 'pending', date: '2024-01-16 14:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-16 14:15', comment: 'Заказ принят к исполнению' }
    ]
  },
  {
    id: '005',
    clientId: '2',
    clientName: 'ООО "Торговый дом"',
    clientPhone: '+7(999)234-56-78',
    date: '2024-01-16',
    pickupDate: '2024-01-17',
    deliveryDate: '2024-01-18',
    pickupTime: 'с 12:00 до 15:00',
    pickupAddress: 'Москва, ул. Промышленная 15',
    deliveryAddress: 'Ozon Балашиха',
    status: 'pending',
    paymentStatus: 'unpaid',
    cost: 3500,
    boxes: 0,
    pallets: 2,
    weight: '320 кг',
    loading: true,
    palletizing: false,
    comment: 'Требуется аккуратная погрузка',
    driverComment: '',
    statusHistory: [
      { status: 'pending', date: '2024-01-16 16:30', comment: 'Заказ принят в обработку' }
    ]
  },
  {
    id: '006',
    clientId: '3',
    clientName: 'ИП Козлов С.А.',
    clientPhone: '+7(999)345-67-89',
    date: '2024-01-15',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-17',
    pickupTime: 'с 15:00 до 18:00',
    pickupAddress: 'Подольск, ул. Заводская 8',
    deliveryAddress: 'WB Белые столбы',
    status: 'assigned',
    paymentStatus: 'invoice_requested',
    cost: 3500,
    boxes: 0,
    pallets: 1,
    weight: '200 кг',
    loading: false,
    palletizing: false,
    comment: 'Стандартная доставка',
    driverComment: '',
    assignedDriver: 'Козлов Сергей Александрович',
    statusHistory: [
      { status: 'pending', date: '2024-01-15 11:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-15 11:30', comment: 'Заказ принят к исполнению' },
      { status: 'assigned', date: '2024-01-15 16:00', comment: 'Назначен водитель Козлов С.А.' }
    ]
  },
  {
    id: '007',
    clientId: '1',
    clientName: 'ИП Петров И.И.',
    clientPhone: '+7(999)123-45-67',
    date: '2024-01-17',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-19',
    pickupTime: 'с 10:00 до 13:00',
    pickupAddress: 'МО, Дмитровский р-н, пос. Деденево, ул. Ленина 3',
    deliveryAddress: 'WB Коледино',
    status: 'accepted',
    paymentStatus: 'unpaid',
    cost: 2700,
    boxes: 0,
    pallets: 1,
    weight: '150 кг',
    loading: false,
    palletizing: false,
    comment: 'Тестовая заявка для назначения в маршрут',
    driverComment: '',
    statusHistory: [
      { status: 'pending', date: '2024-01-17 09:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-17 09:30', comment: 'Заказ принят к исполнению' }
    ]
  },
  {
    id: '008',
    clientId: '2',
    clientName: 'ООО "Торговый дом"',
    clientPhone: '+7(999)234-56-78',
    date: '2024-01-17',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-19',
    pickupTime: 'с 14:00 до 17:00',
    pickupAddress: 'Москва, ул. Промышленная 15',
    deliveryAddress: 'Ozon Королев',
    status: 'accepted',
    paymentStatus: 'unpaid',
    cost: 3100,
    boxes: 8,
    pallets: 0,
    weight: '95 кг',
    loading: true,
    palletizing: false,
    comment: 'Еще одна тестовая заявка для маршрута',
    driverComment: '',
    statusHistory: [
      { status: 'pending', date: '2024-01-17 10:00', comment: 'Заказ принят в обработку' },
      { status: 'accepted', date: '2024-01-17 10:15', comment: 'Заказ принят к исполнению' }
    ]
  }
];

// Моковые маршруты
export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Маршрут #1 - WB Москва',
    driverId: '1',
    warehouses: ['WB Коледино', 'WB Подольск', 'WB Внуково'],
    status: 'in_progress',
    createdDate: '2024-01-15',
    orderIds: ['001', '004'],
    totalCost: 2500,
    totalWeight: '25 кг',
    comment: 'Первый маршрут дня'
  },
  {
    id: '2',
    name: 'Маршрут #2 - Ozon МО',
    driverId: '2',
    warehouses: ['Ozon Королев', 'Ozon Балашиха'],
    status: 'at_warehouse',
    createdDate: '2024-01-14',
    orderIds: ['002'],
    totalCost: 3100,
    totalWeight: '180 кг',
    comment: 'Срочная доставка'
  },
  {
    id: '3',
    name: 'Маршрут #3 - Яндекс.Маркет',
    driverId: '3',
    warehouses: ['Яндекс.Маркет Котельники', 'Яндекс.Маркет Строгино'],
    status: 'created',
    createdDate: '2024-01-13',
    orderIds: [],
    totalCost: 3000,
    totalWeight: '45 кг'
  },
  {
    id: '4',
    name: 'Маршрут #4 - WB Подмосковье',
    driverId: '4',
    warehouses: ['WB Электросталь', 'WB Белые столбы'],
    status: 'created',
    createdDate: '2024-01-16',
    orderIds: [],
    totalCost: 0,
    totalWeight: '0 кг'
  },
  {
    id: '5',
    name: 'Маршрут #5 - Тестовый WB',
    driverId: '3',
    warehouses: ['WB Коледино', 'WB Подольск'],
    status: 'created',
    createdDate: '2024-01-17',
    orderIds: [],
    totalCost: 0,
    totalWeight: '0 кг',
    comment: 'Тестовый маршрут для добавления заявок'
  },
  {
    id: '6',
    name: 'Маршрут #6 - Тестовый Ozon',
    driverId: '4',
    warehouses: ['Ozon Королев', 'Ozon Балашиха'],
    status: 'created',
    createdDate: '2024-01-17',
    orderIds: [],
    totalCost: 0,
    totalWeight: '0 кг',
    comment: 'Еще один тестовый маршрут'
  },
  {
    id: '7',
    name: 'Маршрут #7 - Пустой для тестов',
    driverId: '3',
    warehouses: ['WB Коледино', 'WB Подольск', 'WB Внуково'],
    status: 'created',
    createdDate: '2024-01-18',
    orderIds: [],
    totalCost: 0,
    totalWeight: '0 кг',
    comment: 'Пустой маршрут для тестирования добавления заявок'
  }
];

// Моковые счета
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    orderId: '002',
    number: 'INV-2024-002',
    date: '2024-01-14',
    amount: 3100,
    status: 'sent',
    fileName: 'Счет_INV-2024-002.pdf',
    fileUrl: '/invoices/INV-2024-002.pdf'
  },
  {
    id: '2',
    orderId: '006',
    number: 'INV-2024-006',
    date: '2024-01-15',
    amount: 3500,
    status: 'draft',
    fileName: 'Счет_INV-2024-006.pdf',
    fileUrl: '/invoices/INV-2024-006.pdf'
  }
];

// Функции для работы с данными
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getOrdersByClientId = (clientId: string): Order[] => {
  return mockOrders.filter(order => order.clientId === clientId);
};

export const getDriverById = (id: string): Driver | undefined => {
  return mockDrivers.find(driver => driver.id === id);
};

export const getRouteById = (id: string): Route | undefined => {
  return mockRoutes.find(route => route.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getInvoiceByOrderId = (orderId: string): Invoice | undefined => {
  return mockInvoices.find(invoice => invoice.orderId === orderId);
};

// Функции для обновления данных (для демонстрации)
export const updateOrderStatus = (orderId: string, newStatus: string, comment?: string) => {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus as any;
    order.statusHistory.push({
      status: newStatus,
      date: new Date().toISOString(),
      comment: comment || `Статус изменен на ${newStatus}`
    });
  }
};

export const updatePaymentStatus = (orderId: string, newStatus: string) => {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.paymentStatus = newStatus as any;
    if (newStatus === 'paid') {
      order.paidDate = new Date().toISOString().split('T')[0];
    }
  }
};

export const updateRouteCost = (routeId: string, newCost: number) => {
  const route = mockRoutes.find(r => r.id === routeId);
  if (route) {
    route.totalCost = newCost;
  }
};

// Функция для назначения заказа в маршрут
export const assignOrderToRoute = (routeId: string, orderId: string) => {
  const route = mockRoutes.find(r => r.id === routeId);
  const order = mockOrders.find(o => o.id === orderId);
  const driver = mockDrivers.find(d => d.id === route?.driverId);
  
  if (route && order && !route.orderIds.includes(orderId)) {
    route.orderIds.push(orderId);
    route.totalCost += order.cost;
    
    // Пересчитываем общий вес
    const totalWeight = route.orderIds.reduce((sum, orderIdInRoute) => {
      const orderInRoute = mockOrders.find(o => o.id === orderIdInRoute);
      if (orderInRoute) {
        const weight = parseInt(orderInRoute.weight.replace(/\D/g, '')) || 0;
        return sum + weight;
      }
      return sum;
    }, 0);
    route.totalWeight = `${totalWeight} кг`;
    
    // Обновляем статус заказа
    order.status = 'assigned';
    order.assignedRoute = route.name;
    if (driver) {
      order.assignedDriver = driver.name;
    }
    
    // Добавляем запись в историю
    order.statusHistory.push({
      status: 'assigned',
      date: new Date().toISOString(),
      comment: `Назначен в маршрут "${route.name}" к водителю ${driver?.name || 'неизвестен'}`
    });
  }
};

// Функция для удаления заказа из маршрута
export const removeOrderFromRoute = (routeId: string, orderId: string) => {
  const route = mockRoutes.find(r => r.id === routeId);
  const order = mockOrders.find(o => o.id === orderId);
  
  if (route && order) {
    const orderIndex = route.orderIds.indexOf(orderId);
    if (orderIndex !== -1) {
      route.orderIds.splice(orderIndex, 1);
      route.totalCost -= order.cost;
      
      // Пересчитываем общий вес
      const totalWeight = route.orderIds.reduce((sum, orderIdInRoute) => {
        const orderInRoute = mockOrders.find(o => o.id === orderIdInRoute);
        if (orderInRoute) {
          const weight = parseInt(orderInRoute.weight.replace(/\D/g, '')) || 0;
          return sum + weight;
        }
        return sum;
      }, 0);
      route.totalWeight = `${totalWeight} кг`;
      
      // Обновляем статус заказа
      order.status = 'accepted';
      order.assignedRoute = undefined;
      order.assignedDriver = undefined;
      
      // Добавляем запись в историю
      order.statusHistory.push({
        status: 'accepted',
        date: new Date().toISOString(),
        comment: `Удален из маршрута "${route.name}"`
      });
    }
  }
};

export const attachInvoice = (orderId: string, fileName: string, fileUrl: string) => {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.invoiceFile = fileName;
    order.paymentStatus = 'invoice_sent';
    order.invoiceDate = new Date().toISOString().split('T')[0];
  }
};

export const updateOrderCost = (orderId: string, cost: number) => {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.cost = cost;
  }
};