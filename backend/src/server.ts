import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5001;
dotenv.config();

interface User {
    verificationCode: string;
    isAuthenticated: boolean;
    nameSurname: string;
    dateOfBirth: string;
    email: string;
};

// Хранилище пользователей (в реальном приложении используйте базу данных)
let users: Record<string, User> = {};

// Генерация случайного четырехзначного кода
const generateVerificationCode = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Обработчик для корневого маршрута
app.get('/', (req: Request, res: Response) => {
    res.send('Сервер работает!');
});

// Регистрация пользователя
app.post('/register', (req: Request, res: Response) => {
    const { phoneNumber } = req.body;
    // Генерация кода подтверждения
    const verificationCode = generateVerificationCode();
    // Сохранение пользователя и кода (в реальном приложении используйте базу данных)
    users[phoneNumber] = { verificationCode, isAuthenticated: false, nameSurname: '', dateOfBirth: '', email: '' };
    // Здесь вы можете отправить код пользователю, но в нашем случае просто вернем его
    res.status(200).json({ message: 'Код подтверждения сгенерирован.', verificationCode });
});

// Подтверждение кода и авторизация
app.post('/verify', (req: Request, res: Response) => {
    const { phoneNumber, code } = req.body;
    const user = users[phoneNumber];
    if (user && user.verificationCode === code) {
        // Успешная авторизация
        user.isAuthenticated = true;
        // Создание JWT
        const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET!, { expiresIn: '12h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Неверный код.' });
    }
});

// Обновление информации о пользователе
app.post('/update-user-info', async (req: Request, res: Response): Promise<any>  => {
    const token = req.headers['authorization'];
    const { nameSurname, phoneNumber, dateOfBirth, email } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            // Обновляем информацию о пользователе
            user.nameSurname = nameSurname || user.nameSurname;
            user.dateOfBirth = dateOfBirth || user.dateOfBirth;
            user.email = email || user.email;
            res.status(200).json({ message: 'Информация о пользователе обновлена.', user });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

// Получение информации о пользователе
app.get('/user-info', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            res.status(200).json({ user: { nameSurname: user.nameSurname, phoneNumber: phoneNumberFromToken, dateOfBirth: user.dateOfBirth, email: user.email } });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

// Проверка статуса пользователя
app.get('/status', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            res.status(200).json({ isAuthenticated: user.isAuthenticated });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

// Логаут пользователя
app.post('/logout', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.', isSuccess: false });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.', isSuccess: false });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            // Удаляем пользователя из хранилища
            delete users[phoneNumberFromToken];
            res.status(200).json({ message: 'Вы успешно вышли из системы.', isSuccess: true });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.', isSuccess: false });
        }
    });
});

// Хранилище бонусных карт
let bonusCards: Record<string, { cardNumber: string; bonuses: number }> = {};

// Генерация номера бонусной карты
const generateBonusCardNumber = (): string => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const digits = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр
    return letter + digits;
};

// Создание бонусной карты
app.post('/create-bonus-card', async (req: Request, res: Response): Promise<any> => {
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
});

// Получение информации о бонусной карте
app.get('/bonus-card', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const bonusCard = bonusCards[phoneNumberFromToken];
        if (bonusCard) {
            res.status(200).json({ bonusCard });
        } else {
            res.status(404).json({ message: 'Бонусная карта не найдена.' });
        }
    });
});

// Добавление бонусов
app.post('/add-bonuses', async (req: Request, res: Response): Promise<any> => {
    const { phoneNumber, amount } = req.body;
    const user = users[phoneNumber];
    if (!user || !user.isAuthenticated) {
        return res.status(401).json({ message: 'Пользователь не авторизован.' });
    }
    const bonusCard = bonusCards[phoneNumber];
    if (bonusCard) {
        bonusCard.bonuses += amount;
        res.status(200).json({ message: 'Бонусы добавлены.', bonuses: bonusCard.bonuses });
    } else {
        res.status(404).json({ message: 'Бонусная карта не найдена.' });
    }
});

interface Order {
    orderId: number;
    status: 'в работе' | 'выполнен';
    orderType: 'Доставка' | 'Самовывоз';
    orderDate: string;
    deliveryAddress?: {
        street: string;
        apartment: string;
        apartmentNumber: number;
    };
    orderCost: number;
};

// Хранилище заказов (в реальном приложении используйте базу данных)
let userOrders: Record<string, Order[]> = {};

// Функция для генерации случайного 9-значного номера заказа
const generateOrderId = (): number => {
    return Math.floor(100000000 + Math.random() * 900000000);
};

// Инициализация заказов для пользователей
const initializeUserOrders = (phoneNumber: string) => {
    if (!userOrders[phoneNumber]) {
        userOrders[phoneNumber] = [
            {
                orderId: generateOrderId(),
                status: 'в работе',
                orderType: 'Доставка',
                orderDate: new Date().toISOString(),
                deliveryAddress: { street: 'улица Новая', apartment: '13', apartmentNumber: 33 },
                orderCost: 586,
            },
            {
                orderId: generateOrderId(),
                status: 'выполнен',
                orderType: 'Самовывоз',
                orderDate: new Date().toISOString(),
                deliveryAddress: { street: 'улица Новая', apartment: '13', apartmentNumber: 33 },
                orderCost: 586,
            },
        ];
    }
};

// Получение заказов пользователя
app.get('/user-orders', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен.' });
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
        const user = users[phoneNumberFromToken];
        if (user) {
            // Инициализация заказов для пользователя, если они еще не инициализированы
            initializeUserOrders(phoneNumberFromToken);
            // Возвращаем заказы пользователя
            const orders = userOrders[phoneNumberFromToken];
            res.status(200).json({ orders });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});