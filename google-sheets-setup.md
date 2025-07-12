+# Настройка интеграции с Google Таблицами
+
+## Шаг 1: Создание Google Таблицы
+
+1. Перейдите на [Google Sheets](https://sheets.google.com)
+2. Создайте новую таблицу
+3. Назовите её "Заявки Аксай Логистик"
+4. В первой строке создайте заголовки столбцов:
+   - A1: Дата и время
+   - B1: Компания
+   - C1: Телефон
+   - D1: Дата забора
+   - E1: Дата доставки
+   - F1: Время забора
+   - G1: Адрес забора
+   - H1: Адрес доставки
+   - I1: Коробки
+   - J1: Паллеты
+   - K1: Вес
+   - L1: Погрузка
+   - M1: Паллетирование
+   - N1: Комментарий

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'API работает'}))
    .setMimeType(ContentService.MimeType.JSON);
}
+   - O1: Расчетная стоимость

## Шаг 2: Создание Google Apps Script

1. В Google Таблице перейдите в меню "Расширения" → "Apps Script"
2. Удалите весь код по умолчанию
3. Вставьте этот простой код:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  
  // Получаем таблицу по ID (работает всегда, даже если закрыта)
  var SHEET_ID = 'ВСТАВЬТЕ_СЮДА_ID_ВАШЕЙ_ТАБЛИЦЫ';
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  var sheet = spreadsheet.getSheetByName('Лист1'); // или название вашего листа
  
  sheet.appendRow([
    new Date().toLocaleString('ru-RU'),
    data.company,
    data.phone,
    data.pickupDate,
    data.deliveryDate,
    data.pickupTime,
    data.pickupAddress,
    data.deliveryAddress,
    data.boxes,
    data.pallets,
    data.weight,
    data.loading,
    data.palletizing,
    data.comment,
    data.calculatedCost
  ]);
  
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Альтернативный способ (еще проще):

Если вы создаете скрипт прямо в Google Таблице (через меню "Расширения" → "Apps Script"), то можно использовать еще более простой код:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  
  // Получаем текущую таблицу (ту, из которой запущен скрипт)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Лист1');
  
  sheet.appendRow([
    new Date().toLocaleString('ru-RU'),
    data.company,
    data.phone,
    data.pickupDate,
    data.deliveryDate,
    data.pickupTime,
    data.pickupAddress,
    data.deliveryAddress,
    data.boxes,
    data.pallets,
    data.weight,
    data.loading,
    data.palletizing,
    data.comment,
    data.calculatedCost
  ]);
  
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Шаг 3: Настройка деплоя

1. Нажмите "Сохранить" (иконка дискеты)
2. Нажмите "Развернуть" → "Новое развертывание"
3. Выберите тип: "Веб-приложение"
4. Описание: "API для заявок Аксай Логистик"
5. Выполнять как: "Я"
6. У кого есть доступ: "Все"
7. Нажмите "Развернуть"
8. Скопируйте URL веб-приложения

## Шаг 4: Обновление кода сайта

В файле `src/components/Calculator.tsx` замените:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

На ваш реальный URL из шага 3.

## Дополнительно: Email уведомления (опционально)

Если хотите получать email уведомления о новых заявках, добавьте эту строку перед `return`:

```javascript
MailApp.sendEmail({
  to: 'ваш-email@gmail.com',
  subject: 'Новая заявка на сайте',
  body: 'Новая заявка от ' + data.company + '\nТелефон: ' + data.phone + '\nСтоимость: ' + data.calculatedCost + ' ₽'
});
```

## Шаг 5: Получение ID таблицы (для первого способа)

1. Откройте вашу Google Таблицу
2. Скопируйте ID из URL (часть между `/d/` и `/edit`)
3. Замените `ВСТАВЬТЕ_СЮДА_ID_ВАШЕЙ_ТАБЛИЦЫ` в коде на этот ID

### Пример URL и ID:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    Это ваш ID таблицы
```

## Тестирование

После настройки:
1. Заполните форму на сайте
2. Нажмите "Отправить заявку"
3. Проверьте, появилась ли новая строка в Google Таблице

## Важные моменты:

### **📋 Название листа:**
- По умолчанию лист называется "Лист1"
- Если у вас другое название, замените в коде
- Можно посмотреть название внизу таблицы (на вкладке)

### **🔄 Два способа доступа:**
1. **По ID таблицы** - работает из любого места
2. **Через getActiveSpreadsheet()** - только если скрипт создан в самой таблице

**Рекомендую второй способ** - он проще и надежнее!