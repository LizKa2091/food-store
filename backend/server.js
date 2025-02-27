const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5001;
// Хранилище пользователей (в реальном приложении используйте базу данных)
let users = {};
// Генерация случайного четырехзначного кода
const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
// Обработчик для корневого маршрута
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});
// Регистрация пользователя
app.post('/register', (req, res) => {
    const { phoneNumber } = req.body;
    // Генерация кода подтверждения
    const verificationCode = generateVerificationCode();
    // Сохранение пользователя и кода (в реальном приложении используйте базу данных)
    users[phoneNumber] = { verificationCode, isAuthenticated: false };
    // Здесь вы можете отправить код пользователю, но в нашем случае просто вернем его
    res.status(200).json({ message: 'Код подтверждения сгенерирован.', verificationCode });
});
// Подтверждение кода и авторизация
app.post('/verify', (req, res) => {
    const { phoneNumber, code } = req.body;
    const user = users[phoneNumber];
    if (user && user.verificationCode === code) {
        // Успешная авторизация
        user.isAuthenticated = true;
        // Создание JWT
        const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(400).json({ message: 'Неверный код.' });
    }
});
// Проверка статуса пользователя
app.get('/status', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const user = users[decoded.phoneNumber];
        if (user) {
            res.status(200).json({ isAuthenticated: user.isAuthenticated });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});