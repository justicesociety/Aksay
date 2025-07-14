import React from 'react';
import { Calendar, Clock, MapPin, Package, Truck, CheckCircle } from 'lucide-react';

const Schedule = () => {
  const moscowSchedule = {
    title: 'Московские склады',
    description: 'На все московские склады возим ежедневно',
    deadline: 'Прием заявок до 18:00 по МСК',
    icon: <Truck className="w-6 h-6" />,
    color: 'bg-green-500',
    textColor: 'text-green-800',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  };

  const regionalSchedule = [
    {
      city: 'Казань',
      deadline: 'Прием заявок до 18:00',
      schedule: [
        { day: 'Среда', action: 'забор', delivery: 'четверг сдача' },
        { day: 'Суббота', action: 'забор', delivery: 'воскресенье сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-blue-500',
      textColor: 'text-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      city: 'Тула (Алексин)',
      deadline: 'Прием заявок до 18:00',
      schedule: [
        { day: 'Вторник, четверг, суббота', action: 'забор и сдача', delivery: 'день в день' }
      ],
      minPallets: 'От 5 паллет в любой день',
      color: 'bg-purple-500',
      textColor: 'text-purple-800',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      city: 'Рязань',
      deadline: 'Прием заявок до 18:00',
      schedule: [
        { day: 'Вторник и четверг', action: 'забор и сдача', delivery: 'день в день' }
      ],
      minPallets: 'От 5 паллет в любой день',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-800',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      city: 'Новосемейкино',
      deadline: 'Прием заявок понедельник до 18:00',
      schedule: [
        { day: 'Вторник', action: 'забор', delivery: 'четверг сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-teal-500',
      textColor: 'text-teal-800',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      city: 'Краснодар',
      deadline: 'Прием заявок вторник до 15:00',
      schedule: [
        { day: 'Четверг', action: 'забор', delivery: 'суббота сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-red-500',
      textColor: 'text-red-800',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      city: 'Невинномысск',
      deadline: 'Прием заявок вторник до 15:00',
      schedule: [
        { day: 'Четверг', action: 'забор', delivery: 'воскресенье сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-orange-500',
      textColor: 'text-orange-800',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      city: 'Котовск',
      deadline: 'Прием заявок четверг до 18:00',
      schedule: [
        { day: 'Пятница', action: 'забор', delivery: 'суббота сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-pink-500',
      textColor: 'text-pink-800',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      city: 'Волгоград',
      deadline: 'Прием заявок четверг до 18:00',
      schedule: [
        { day: 'Пятница', action: 'забор', delivery: 'воскресенье сдача' }
      ],
      minPallets: 'От 10 паллет в любой день',
      color: 'bg-amber-500',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  return (
    <section id="schedule" className="py-16 lg:py-24" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="w-8 h-8 text-accent-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800">
              График работы
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Расписание доставки по регионам и условия приема заявок
          </p>
        </div>

        {/* Московские склады */}
        <div className={`${moscowSchedule.bgColor} border ${moscowSchedule.borderColor} rounded-2xl p-8 mb-8 shadow-lg`}>
          <div className="flex items-center justify-center mb-6">
            <div className={`${moscowSchedule.color} text-white p-4 rounded-xl mr-4`}>
              {moscowSchedule.icon}
            </div>
            <div className="text-center">
              <h3 className={`text-2xl font-bold ${moscowSchedule.textColor} mb-2`}>
                {moscowSchedule.title}
              </h3>
              <p className={`${moscowSchedule.textColor} text-lg`}>
                {moscowSchedule.description}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center ${moscowSchedule.textColor} bg-white px-6 py-3 rounded-lg shadow-sm border ${moscowSchedule.borderColor}`}>
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-semibold">{moscowSchedule.deadline}</span>
            </div>
          </div>
        </div>

        {/* Региональные склады */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionalSchedule.map((region, index) => (
            <div key={index} className={`${region.bgColor} border ${region.borderColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
              {/* Заголовок города */}
              <div className="flex items-center mb-4">
                <div className={`${region.color} text-white p-3 rounded-lg mr-3`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold ${region.textColor}`}>
                  {region.city}
                </h3>
              </div>

              {/* Дедлайн приема заявок */}
              <div className={`${region.textColor} bg-white p-3 rounded-lg mb-4 border ${region.borderColor}`}>
                <div className="flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {region.deadline}
                </div>
              </div>

              {/* График */}
              <div className="space-y-3 mb-4">
                {region.schedule.map((item, scheduleIndex) => (
                  <div key={scheduleIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className={`font-semibold ${region.textColor} mb-1`}>
                      {item.day}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="capitalize">{item.action}</span>
                      {item.delivery && (
                        <>
                          <span className="mx-2">→</span>
                          <span>{item.delivery}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Минимальное количество паллет */}
              <div className={`${region.textColor} bg-white p-3 rounded-lg border ${region.borderColor}`}>
                <div className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 mr-2" />
                  {region.minPallets}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Важная информация */}
        <div className="mt-12 bg-gradient-to-r from-primary-800 to-primary-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Важная информация</h3>
            <p className="text-primary-100">
              Обратите внимание на сроки подачи заявок и минимальные объемы
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 mb-3">
                <Clock className="w-8 h-8 text-accent-300 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Строгие дедлайны</h4>
              <p className="text-primary-100 text-sm">
                Заявки принимаются строго до указанного времени
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 mb-3">
                <Package className="w-8 h-8 text-accent-300 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Минимальные объемы</h4>
              <p className="text-primary-100 text-sm">
                Соблюдайте минимальное количество паллет для регионов
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 mb-3">
                <CheckCircle className="w-8 h-8 text-accent-300 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Гарантия сроков</h4>
              <p className="text-primary-100 text-sm">
                При соблюдении условий гарантируем доставку в срок
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;