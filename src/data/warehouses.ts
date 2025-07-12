export interface Warehouse {
  id: string;
  name: string;
  marketplace: 'wildberries' | 'ozon' | 'yandex' | 'sber' | 'detmir';
  city: string;
  pricing: {
    toCube: number;
    boxes1to3: number;
    pallets: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      7: number;
      8: number;
      9: number;
      10: number;
      11?: number;
      12?: number;
      13?: number;
      14?: number;
      15?: number;
      16?: number;
      17?: number;
      18?: number;
      '11-15': number;
      '16-18': number;
    };
  };
}

export const warehouses: Warehouse[] = [
  // WILDBERRIES
  {
    id: 'wb-koledino',
    name: 'WB Коледино, Подольск, Внуково, Белая дача, Вешки',
    marketplace: 'wildberries',
    city: 'Москва',
    pricing: {
      toCube: 2500,
      boxes1to3: 150,
      pallets: {
        1: 2700,
        2: 4400,
        3: 6000,
        4: 6500,
        5: 7000,
        6: 7500,
        7: 8000,
        8: 8500,
        9: 13000,
        10: 13000,
        11: 17000,
        12: 17000,
        13: 17000,
        14: 17000,
        15: 17000,
        16: 21000,
        17: 21000,
        18: 21000
      }
    }
  },
  {
    id: 'wb-elektrostal',
    name: 'WB Электросталь, Пушкино, Обухово, Черная грязь',
    marketplace: 'wildberries',
    city: 'Московская область',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3200,
        2: 5000,
        3: 7000,
        4: 7500,
        5: 8000,
        6: 8500,
        7: 9000,
        8: 9500,
        9: 15000,
        10: 15000,
        '11-15': 19000,
        '16-18': 23000
      }
    }
  },
  {
    id: 'wb-belye-stolby',
    name: 'WB Белые столбы, Радумля, Чехов, Чехов-2',
    marketplace: 'wildberries',
    city: 'Московская область',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3500,
        2: 5300,
        3: 7500,
        4: 8500,
        5: 9000,
        6: 9500,
        7: 10000,
        8: 10500,
        9: 17000,
        10: 17000,
        '11-15': 21000,
        '16-18': 25000
      }
    }
  },
  {
    id: 'wb-ryazan',
    name: 'WB Рязань, Тула',
    marketplace: 'wildberries',
    city: 'Рязань',
    pricing: {
      toCube: 3500,
      boxes1to3: 350,
      pallets: {
        1: 4000,
        2: 7500,
        3: 10500,
        4: 12000,
        5: 15000,
        6: 17000,
        7: 19000,
        8: 21000,
        9: 23000,
        10: 23000,
        '11-15': 27000,
        '16-18': 30000
      }
    }
  },
  {
    id: 'wb-piter',
    name: 'WB Питер',
    marketplace: 'wildberries',
    city: 'Санкт-Петербург',
    pricing: {
      toCube: 4500,
      boxes1to3: 450,
      pallets: {
        1: 5500,
        2: 10000,
        3: 14500,
        4: 19000,
        5: 23500,
        6: 28000,
        7: 32500,
        8: 37000,
        9: 43500,
        10: 48000,
        11: 52500,
        12: 57000,
        13: 61500,
        14: 66000,
        15: 70500,
        16: 77000,
        17: 81500,
        18: 86000
      }
    }
  },
  {
    id: 'wb-kazan',
    name: 'WB Казань',
    marketplace: 'wildberries',
    city: 'Казань',
    pricing: {
      toCube: 4500,
      boxes1to3: 450,
      pallets: {
        1: 5500,
        2: 10000,
        3: 14500,
        4: 19000,
        5: 23500,
        6: 28000,
        7: 32500,
        8: 37000,
        9: 43500,
        10: 48000,
        11: 52500,
        12: 57000,
        13: 61500,
        14: 66000,
        15: 70500,
        16: 77000,
        17: 81500,
        18: 86000
      }
    }
  },
  {
    id: 'wb-krasnodar',
    name: 'WB Краснодар',
    marketplace: 'wildberries',
    city: 'Краснодар',
    pricing: {
      toCube: 6000,
      boxes1to3: 650,
      pallets: {
        1: 7500,
        2: 14000,
        3: 20500,
        4: 28300,
        5: 33800,
        6: 40300,
        7: 47800,
        8: 54300,
        9: 61500,
        10: 68000,
        11: 76500,
        12: 83000,
        13: 89500,
        14: 96000,
        15: 102500,
        16: 111000,
        17: 117500,
        18: 124000
      }
    }
  },
  {
    id: 'wb-nevinnomyssk',
    name: 'WB Невинномысск',
    marketplace: 'wildberries',
    city: 'Невинномысск',
    pricing: {
      toCube: 7000,
      boxes1to3: 750,
      pallets: {
        1: 8500,
        2: 16000,
        3: 23500,
        4: 32300,
        5: 38800,
        6: 46300,
        7: 54800,
        8: 62300,
        9: 70500,
        10: 78000,
        11: 87500,
        12: 94000,
        13: 102500,
        14: 110000,
        15: 117500,
        16: 127000,
        17: 134500,
        18: 142000
      }
    }
  },
  {
    id: 'wb-kotovsk',
    name: 'WB Котовск',
    marketplace: 'wildberries',
    city: 'Котовск',
    pricing: {
      toCube: 4000,
      boxes1to3: 450,
      pallets: {
        1: 4000,
        2: 8000,
        3: 12000,
        4: 16000,
        5: 20000,
        6: 24000,
        7: 28000,
        8: 32000,
        9: 36000,
        10: 40000,
        11: 44000,
        12: 48000,
        13: 52000,
        14: 56000,
        15: 60000,
        16: 64000,
        17: 68000,
        18: 72000
      }
    }
  },
  {
    id: 'wb-volgograd',
    name: 'WB Волгоград, Новосемейкино',
    marketplace: 'wildberries',
    city: 'Волгоград',
    pricing: {
      toCube: 6000,
      boxes1to3: 650,
      pallets: {
        1: 7500,
        2: 15000,
        3: 22500,
        4: 30000,
        5: 37500,
        6: 45000,
        7: 52500,
        8: 60000,
        9: 67500,
        10: 75000,
        11: 82500,
        12: 90000,
        13: 97500,
        14: 105000,
        15: 105000,
        16: 120000,
        17: 127500,
        18: 135000
      }
    }
  },

  // OZON
  {
    id: 'ozon-korolev',
    name: 'Ozon Королев, РЦ Рябиновая, Fresh Рябиновая, Кавказский Хаб, Солнечногорск, Строгино, Светогорская, СЦ1 Медведково, Химки, Осташковский Хаб, Чехов, Тула, Чурилово',
    marketplace: 'ozon',
    city: 'Москва',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3100,
        2: 5000,
        3: 7000,
        4: 7500,
        5: 8000,
        6: 8500,
        7: 9000,
        8: 9500,
        9: 15000,
        10: 15000,
        '11-15': 19000,
        '16-18': 29000
      }
    }
  },
  {
    id: 'ozon-balashikha',
    name: 'Ozon Балашиха, Ногинск, Жуковский, Нижнее Велино, Пушкино, Павловская Слобода, Дзержинское, Петровское, РРЦ1 Софьино, Истра, СЦ1 Воржского, Удмуртия, Пенза, Люберецкий',
    marketplace: 'ozon',
    city: 'Московская область',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3500,
        2: 5300,
        3: 7500,
        4: 8500,
        5: 9000,
        6: 9500,
        7: 10000,
        8: 10500,
        9: 17000,
        10: 17000,
        '11-15': 21000,
        '16-18': 25000
      }
    }
  },

  // ЯНДЕКС МАРКЕТ
  {
    id: 'yandex-kotelniki',
    name: 'Яндекс.Маркет Котельники, Строгино, Томилино, Царицыно',
    marketplace: 'yandex',
    city: 'Москва',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3100,
        2: 5000,
        3: 7000,
        4: 7500,
        5: 8000,
        6: 8500,
        7: 9000,
        8: 9500,
        9: 15000,
        10: 15000,
        '11-15': 19000,
        '16-18': 23000
      }
    }
  },
  {
    id: 'yandex-sofino',
    name: 'Яндекс.Маркет Софьино',
    marketplace: 'yandex',
    city: 'Московская область',
    pricing: {
      toCube: 3000,
      boxes1to3: 200,
      pallets: {
        1: 3500,
        2: 5300,
        3: 7500,
        4: 8500,
        5: 9000,
        6: 9500,
        7: 10000,
        8: 10500,
        9: 17000,
        10: 17000,
        '11-15': 21000,
        '16-18': 25000
      }
    }
  },

  // СБЕР ЛОГИСТИКА
  {
    id: 'sber-sharapovo',
    name: 'СберЛогистика Шарапово',
    marketplace: 'sber',
    city: 'Московская область',
    pricing: {
      toCube: 3500,
      boxes1to3: 200,
      pallets: {
        1: 3500,
        2: 5300,
        3: 7500,
        4: 8500,
        5: 9000,
        6: 9500,
        7: 10000,
        8: 10500,
        9: 17000,
        10: 17000,
        '11-15': 21000,
        '16-18': 25000
      }
    }
  },

  // ДЕТСКИЙ МИР
  {
    id: 'detmir-belskoe',
    name: 'Детский мир Белское',
    marketplace: 'detmir',
    city: 'Московская область',
    pricing: {
      toCube: 7500,
      boxes1to3: 300,
      pallets: {
        1: 7500,
        2: 7500,
        3: 9100,
        4: 12100,
        5: 14800,
        6: 17500,
        7: 21200,
        8: 23900,
        9: 30000,
        10: 30000,
        '11-15': 45500,
        '16-18': 53600
      }
    }
  }
];

// Функция для получения всех отдельных складов из групп
export const getAllIndividualWarehouses = () => {
  const individualWarehouses: Array<{
    id: string;
    name: string;
    fullName: string;
    marketplace: string;
    city: string;
    pricing: any;
  }> = [];

  warehouses.forEach(warehouse => {
    // Разбиваем название на отдельные склады
    const warehouseNames = warehouse.name.split(',').map(name => name.trim());
    
    warehouseNames.forEach((individualName, index) => {
      individualWarehouses.push({
        id: `${warehouse.id}-${index}`,
        name: individualName,
        fullName: warehouse.name,
        marketplace: warehouse.marketplace,
        city: warehouse.city,
        pricing: warehouse.pricing
      });
    });
  });

  return individualWarehouses;
};

export const getMarketplaceLabel = (marketplace: string) => {
  const labels = {
    'wildberries': 'WB',
    'ozon': 'Ozon',
    'yandex': 'Яндекс.Маркет',
    'sber': 'СберЛогистика',
    'detmir': 'Детский мир'
  };
  return labels[marketplace as keyof typeof labels] || marketplace;
};

export const additionalServices = {
  loading: {
    name: 'Погрузка',
    description: '70₽ за коробку до 15кг, 100₽ за коробку свыше 15кг',
    price: '70-100₽/коробка'
  },
  palletizing: {
    name: 'Паллетирование',
    description: '650коробок',
    price: 300
  },
  waitingUnloading: {
    name: 'Ожидание загрузки (при заборе груза)',
    description: '20 мин - бесплатно, далее 20р/мин',
    price: 20
  },
  waitingDelivery: {
    name: 'Ожидание отгрузки при сдаче (на складе маркетплейса)',
    description: 'при ошибке клиента — по договоренности',
    price: 0
  },
  reweighing: {
    name: 'Перевес',
    description: 'Максимальный вес паллеты: 250 кг. Перевес оплачивается отдельно, каждые последующие 50кг - 300р. Паллет не должен превышать 1800кг на тонну (с учетом паллеты)',
    price: 300
  },
  returnGoods: {
    name: 'Возврат товара',
    description: '30% от стоимости доставки',
    price: 0.3
  },
  urgentDelivery: {
    name: 'Срок поставки',
    description: '100% при сдаче заказа менее чем за 24 часа до дня доставки',
    price: 1.0
  },
  pickupFromMarket: {
    name: 'Забор груза с рынков (ТЯК, Садовод, Южные ворота и др.) — только от 10 кубов',
    description: '1500 руб/м3 (сверх по рынкам и потрясе оплачивается дополнительно)',
    price: 1500
  }
};

export const extraCharges = {
  outsideMKAD: {
    name: 'Выезд за МКАД',
    price: 50, // руб/км
    unit: 'км'
  },
  insideTTK: {
    name: 'Выезд в ТТК',
    price: 1000,
    unit: 'фиксированная'
  }
};