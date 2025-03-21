# Food Store - fullstack проект
Веб-приложение для онлайн-магазина продуктов с авторизацией, управления личным кабинетом и заказами.
## 🔨 Технологии
### Frontend
- React
- TypeScript
- SCSS
- React Router
- Context API для управления состоянием
### Backend
- Node.js
- TypeScript
- Express
- JWT для аутентификации
- File System для хранения данных

## 🔌 API Endpoints
### Аутентификация
- `POST /register` - Регистрация пользователя
- `POST /verify` - Подтверждение кода и авторизация
- `GET /status` - Проверка статуса пользователя
- `POST /logout` - Выход из системы
### Пользователь
- `GET /user-info` - Получение информации о пользователе
- `POST /update-user-info` - Обновление информации пользователя
- `GET /bonus-card` - Получение информации о бонусной карте
- `POST /create-bonus-card` - Создание бонусной карты
### Заказы и избранное
- `GET /user-orders` - Получение заказов пользователя
- `GET /favorites` - Получение списка избранных товаров
- `POST /favorites/add` - Добавление товара в избранное
- `DELETE /favorites/remove` - Удаление товара из избранного
### Продукты
- `GET /products` - Получение списка всех продуктов
- `GET /products/:id` - Получение информации о конкретном продукте
## 📦 Запуск и установка проекта

### Backend
`cd backend`
`npm install`
`cd src`
`ts-node server.ts`
Сервер запустится на http://localhost:5001

### Frontend
`cd frontend`
`npm install`
`npm start`
Приложение будет доступно на http://localhost:3000

## 🛠 Основной функционал
1. Авторизация пользователей через номер телефона
2. Личный кабинет с возможностью:
   - Управления персональными данными
   - Просмотра истории заказов
   - Управления избранными товарами
   - Просмотра бонусной программы
3. Каталог товаров с категориями
4. Система избранных товаров
5. Бонусная программа
## 🔒 Безопасность
- Использование JWT токенов для аутентификации
- Защита роутов на клиенте и сервере
- Валидация данных на обеих сторонах
