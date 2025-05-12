import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
const port = process.env.PORT || 5001;

interface User {
    verificationCode: string;
    isAuthenticated: boolean;
    nameSurname: string;
    dateOfBirth: string;
    email: string;
};

app.get('/products', (req: Request, res: Response) => {
   const filePath = path.join(__dirname, 'data', 'products.json');
   
   fs.readFile(filePath, 'utf8', (err, data) => {
     if (err) {
       console.error('Ошибка чтения файла с продуктами:', err);
       return res.status(500).json({ message: 'Ошибка при чтении файла с продуктами.' });
     }
     
     try {
       const products = JSON.parse(data);
       res.status(200).json({ products });
     } catch (parseError) {
       console.error('Ошибка парсинга JSON:', parseError);
       res.status(500).json({ message: 'Ошибка при разборе файла с продуктами.' });
     }
   });
 });

 app.get('/products/:id', (req: Request, res: Response) => {
   const filePath = path.join(__dirname, 'data', 'products.json');
   fs.readFile(filePath, 'utf8', (err, data) => {
     if (err) {
       console.error('Ошибка чтения файла с продуктами:', err);
       return res.status(500).json({ message: 'Ошибка при чтении файла с продуктами.' });
     }
     try {
       const products = JSON.parse(data);
       const requestedId = req.params.id;
       // Поиск товара по productId
       const product = products.find((item: any) => item.productId === requestedId);
       if (!product) {
         return res.status(404).json({ message: 'Товар не найден.' });
       }
       res.status(200).json({ product });
     } catch (parseError) {
       console.error('Ошибка парсинга JSON:', parseError);
       res.status(500).json({ message: 'Ошибка при разборе файла с продуктами.' });
     }
   });
 });

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
    orderId: string;
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
const generateOrderId = (): string => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
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

// Хранилище промокодов
const coupons: Record<string, number> = {
   'PROMO10A': 10,
   'PROMO10B': 10,
   'PROMO10C': 10,
};
// Обработчик для проверки промокода
app.post('/check-coupon', (req: Request, res: Response): Promise<any> => {
   return new Promise((resolve) => {
       const { couponCode } = req.body;
       if (!couponCode) {
           return resolve(res.status(400).json({ message: 'Промокод не указан.' }));
       }
       const discount = coupons[couponCode];
       if (discount) {
           return resolve(res.status(200).json({ exists: true, discount }));
       } else {
           return resolve(res.status(404).json({ exists: false, discount: 0 }));
       }
   });
});

// Интерфейс для любимого товара
interface FavoriteItem {
    productId: string;
    name: string;
    price: number;
    stockQuantity: number;
    weight: string;
    newPrice?: number;
    imagePath?: string;
};

// Хранилище любимых товаров (в реальном приложении используйте базу данных)
let favoriteItems: Record<string, FavoriteItem[]> = {};

// Инициализация любимых товаров для пользователей (пример)
const initializeFavoriteItems = (phoneNumber: string) => {
    if (!favoriteItems[phoneNumber]) {
        favoriteItems[phoneNumber] = [];
    }
};

// Получение любимых товаров пользователя
app.get('/favorites', async (req: Request, res: Response): Promise<any> => {
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
            // Инициализация любимых товаров для пользователя, если они еще не инициализированы
            initializeFavoriteItems(phoneNumberFromToken);
            // Возвращаем любимые товары пользователя
            const favorites = favoriteItems[phoneNumberFromToken];
            res.status(200).json({ favorites });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

// Добавление товара в любимые
app.post('/favorites/add', async (req: Request, res: Response): Promise<any> => {
   const token = req.headers['authorization'];
   const { productId } = req.body; // Предполагаем, что вы передаете ID товара в теле запроса
   if (!token) {
       return res.status(401).json({ message: 'Токен не предоставлен.' });
   }
   jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
       if (err) {
           return res.status(401).json({ message: 'Неверный токен.' });
       }
       const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
       const user = users[phoneNumberFromToken];
       if (user) {
           // Инициализация любимых товаров, если они еще не инициализированы
           initializeFavoriteItems(phoneNumberFromToken);
           
           try {
               const filePath = path.join(__dirname, 'data', 'products.json');
               const data = await fs.promises.readFile(filePath, 'utf8');
               const products = JSON.parse(data);
               // Проверка, существует ли товар
               const product = products.find((item: any) => item.productId === productId);
               if (!product) {
                   return res.status(404).json({ message: 'Товар не найден.' });
               }
               // Проверка, существует ли товар уже в избранном
               const existingFavorite = favoriteItems[phoneNumberFromToken].find(item => item.productId === productId);
               if (existingFavorite) {
                   return res.status(400).json({ message: 'Товар уже в избранном.', warning: 'Товар уже в избранном.' });
               }
               // Добавляем товар в избранное
               favoriteItems[phoneNumberFromToken].push(product);
               res.status(200).json({ message: 'Товар добавлен в избранное.', favorites: favoriteItems[phoneNumberFromToken] });
           } catch (readErr) {
               console.error('Ошибка чтения файла с продуктами:', readErr);
               res.status(500).json({ message: 'Ошибка при чтении данных о продуктах.' });
           }
       } else {
           res.status(404).json({ message: 'Пользователь не найден.' });
       }
   });
});

// Удаление товара из любимых
app.delete('/favorites/remove', async (req: Request, res: Response): Promise<any> => {
    const token = req.headers['authorization'];
    const { productId } = req.body; // Предполагаем, что вы передаете ID товара в теле запроса
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
            // Инициализация любимых товаров, если они еще не инициализированы
            initializeFavoriteItems(phoneNumberFromToken);
            
            // Находим индекс товара в избранном
            const index = favoriteItems[phoneNumberFromToken].findIndex(item => item.productId === productId);
            if (index === -1) {
                return res.status(404).json({ message: 'Товар не найден в избранном.' });
            }
            
            // Удаляем товар из избранного
            favoriteItems[phoneNumberFromToken].splice(index, 1);
            res.status(200).json({ message: 'Товар удален из избранного.', favorites: favoriteItems[phoneNumberFromToken] });
        } else {
            res.status(404).json({ message: 'Пользователь не найден.' });
        }
    });
});

app.get('/vacancies', (req: Request, res: Response) => {
    // Формируем путь к файлу vacancies.json, который находится в /src/data
    const filePath = path.join(__dirname, 'data', 'vacancies.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла с вакансиями:', err);
            return res.status(500).json({ message: 'Ошибка при чтении файла с вакансиями.' });
        }
        try {
            const vacancies = JSON.parse(data);
            res.status(200).json({ vacancies });
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            res.status(500).json({ message: 'Ошибка при разборе файла с вакансиями.' });
        }
    });
});

app.post('/products-by-category', async (req: Request, res: Response): Promise<any> => {
    const { catalogCategory } = req.body;
    // Проверка на наличие категории
    if (!catalogCategory) {
        return res.status(400).json({ message: 'Категория не указана.' });
    }
    const filePath = path.join(__dirname, 'data', 'catalogItems.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла с товарами каталога:', err);
            return res.status(500).json({ message: 'Ошибка при чтении файла с товарами каталога.' });
        }
        try {
            const catalogItems = JSON.parse(data);
            // Фильтрация товаров по категории
            const filteredProducts = catalogItems.filter((item: any) => item.category === catalogCategory);
            if (filteredProducts.length === 0) {
                return res.status(404).json({ message: 'Товары не найдены для указанной категории.' });
            }
            res.status(200).json({ products: filteredProducts });
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            res.status(500).json({ message: 'Ошибка при разборе файла с товарами каталога.' });
        }
    });
});

// Хранилище корзин пользователей
let userCarts: Record<string, { productId: string; name: string; price: number; stockQuantity: number; userQuantity: number; weight: string; newPrice?: number; imagePath: string }[]> = {
   '79999999999': [{productId: '1', name: 'Продукт 1', price: 100, stockQuantity: 50, userQuantity: 1, weight: '1kg', newPrice: 90, imagePath: '../images/webpImages/catalogItems/catalog-item-1.webp'}]
};

app.post('/cart/add', async (req: Request, res: Response): Promise<any> => {
   const token = req.headers['authorization'];
   const { productId, quantity } = req.body; // Предполагаем, что вы передаете ID товара и количество в теле запроса
   if (!token) {
       return res.status(401).json({ message: 'Токен не предоставлен.' });
   }
   jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
       if (err) {
           return res.status(401).json({ message: 'Неверный токен.' });
       }
       const phoneNumberFromToken = (decoded as JwtPayload).phoneNumber;
       const user = users[phoneNumberFromToken];
       if (user) {
           // Инициализация корзины, если она еще не инициализирована
           if (!userCarts[phoneNumberFromToken]) {
               userCarts[phoneNumberFromToken] = [];
           }
           // Проверка, существует ли товар
           const filePath = path.join(__dirname, 'data', 'products.json');
           const data = await fs.promises.readFile(filePath, 'utf8');
           const products = JSON.parse(data);
           const product = products.find((item: any) => item.productId === productId);
           if (!product) {
               return res.status(404).json({ message: 'Товар не найден.' });
           }
           // Проверка, существует ли товар уже в корзине
           const existingCartItem = userCarts[phoneNumberFromToken].find(item => item.productId === productId);
           if (existingCartItem) {
               existingCartItem.userQuantity += quantity; // Увеличиваем количество
           } else {
               userCarts[phoneNumberFromToken].push({ ...product, userQuantity: quantity }); // Добавляем новый товар в корзину
           }
           res.status(200).json({ message: 'Товар добавлен в корзину.', cart: userCarts[phoneNumberFromToken] });
       } else {
           res.status(404).json({ message: 'Пользователь не найден.' });
       }
   });
});

app.post('/cart/update', async (req: Request, res: Response): Promise<any> => {
   const token = req.headers['authorization'];
   const { productId, quantity } = req.body; // Предполагаем, что вы передаете ID товара и новое количество в теле запроса
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
           const cartItem = userCarts[phoneNumberFromToken]?.find(item => item.productId === productId);
           if (cartItem) {
               cartItem.userQuantity = quantity; // Обновляем количество
               res.status(200).json({ message: 'Количество товара обновлено.', cart: userCarts[phoneNumberFromToken] });
           } else {
               res.status(404).json({ message: 'Товар не найден в корзине.' });
           }
       } else {
           res.status(404).json({ message: 'Пользователь не найден.' });
       }
   });
});

app.delete('/cart/remove', async (req: Request, res: Response): Promise<any> => {
   const token = req.headers['authorization'];
   const { productId } = req.body; // Предполагаем, что вы передаете ID товара в теле запроса
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
           const cartIndex = userCarts[phoneNumberFromToken]?.findIndex(item => item.productId === productId);
           if (cartIndex !== undefined && cartIndex !== -1) {
               userCarts[phoneNumberFromToken].splice(cartIndex, 1); // Удаляем товар из корзины
               res.status(200).json({ message: 'Товар удален из корзины.', cart: userCarts[phoneNumberFromToken] });
           } else {
               res.status(404).json({ message: 'Товар не найден в корзине.' });
           }
       } else {
           res.status(404).json({ message: 'Пользователь не найден.' });
       }
   });
});

app.get('/cart', async (req: Request, res: Response): Promise<any> => {
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
           const cart = userCarts[phoneNumberFromToken] || [];
           res.status(200).json({ cart });
       } else {
           res.status(404).json({ message: 'Пользователь не найден.' });
       }
   });
});

app.delete('/cart/clear', async (req: Request, res: Response): Promise<any> => {
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
         userCarts[phoneNumberFromToken] = [];
         res.status(200).json({ message: 'Корзина очищена.', cart: userCarts[phoneNumberFromToken] });
      } 
      else {
         res.status(404).json({ message: 'Пользователь не найден.' });
      }
   });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});