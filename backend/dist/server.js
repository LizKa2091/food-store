"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 5001;
;
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
    users[phoneNumber] = { verificationCode, isAuthenticated: false, nameSurname: '', dateOfBirth: '', email: '' };
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
        const token = jsonwebtoken_1.default.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ token });
    }
    else {
        res.status(401).json({ message: 'Неверный код.' });
    }
});
// Обновление информации о пользователе
app.post('/update-user-info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const { nameSurname, phoneNumber, dateOfBirth, email } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = decoded.phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            // Обновляем информацию о пользователе
            user.nameSurname = nameSurname || user.nameSurname;
            user.dateOfBirth = dateOfBirth || user.dateOfBirth;
            user.email = email || user.email;
            res.status(200).json({ message: 'Информация о пользователе обновлена.', user });
        }
        else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
}));
// Получение информации о пользователе
app.get('/user-info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = decoded.phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            res.status(200).json({ user: { nameSurname: user.nameSurname, phoneNumber: phoneNumberFromToken, dateOfBirth: user.dateOfBirth, email: user.email } });
        }
        else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
}));
// Проверка статуса пользователя
app.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = decoded.phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            res.status(200).json({ isAuthenticated: user.isAuthenticated });
        }
        else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
}));
// Логаут пользователя
app.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.', isSuccess: false });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.', isSuccess: false });
        }
        const phoneNumberFromToken = decoded.phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            // Удаляем пользователя из хранилища
            delete users[phoneNumberFromToken];
            res.status(200).json({ message: 'Вы успешно вышли из системы.', isSuccess: true });
        }
        else {
            res.status(404).json({ message: 'Пользователь не найден.', isSuccess: false });
        }
    });
}));
// Хранилище бонусных карт
let bonusCards = {};
// Генерация номера бонусной карты
const generateBonusCardNumber = () => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const digits = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр
    return letter + digits;
};
// Создание бонусной карты
app.post('/create-bonus-card', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    const user = users[phoneNumber];
    if (!user || !user.isAuthenticated) {
        return res.status(401).json({ message: 'Пользователь не авторизован.', users: users[phoneNumber], number: phoneNumber });
    }
    const cardNumber = generateBonusCardNumber();
    const bonusCard = { cardNumber, bonuses: 0 };
    // Сохраняем бонусную карту для пользователя
    bonusCards[phoneNumber] = bonusCard;
    res.status(201).json({ message: 'Бонусная карта создана.', bonusCard });
}));
// Получение информации о бонусной карте
app.get('/bonus-card', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = decoded.phoneNumber;
        const bonusCard = bonusCards[phoneNumberFromToken];
        if (bonusCard) {
            res.status(200).json({ bonusCard });
        }
        else {
            res.status(404).json({ message: 'Бонусная карта не найдена.' });
        }
    });
}));
// Добавление бонусов
app.post('/add-bonuses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, amount } = req.body;
    const user = users[phoneNumber];
    if (!user || !user.isAuthenticated) {
        return res.status(401).json({ message: 'Пользователь не авторизован.' });
    }
    const bonusCard = bonusCards[phoneNumber];
    if (bonusCard) {
        bonusCard.bonuses += amount;
        res.status(200).json({ message: 'Бонусы добавлены.', bonuses: bonusCard.bonuses });
    }
    else {
        res.status(404).json({ message: 'Бонусная карта не найдена.' });
    }
}));
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
