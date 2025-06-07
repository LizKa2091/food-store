import { CategoryType } from "../components/UI/Categories/Categories";
import { IItemShortInfo, ISubCategory } from "../types/products.types";
import item1Image from '../../../images/webpImages/products/sale-product-1.webp';
import item2Image from '../../../images/webpImages/products/sale-product-2.webp';

export const subCategories: Record<CategoryType, ISubCategory[]> = {
   Супермаркет: [{ name: 'Вода и напитки' }, { name: 'Молоко, масло и яйца' }, { name: 'Снэки и сухофрукты' }, { name: 'Кофе, чай и сладости' }, { name: 'Макароны и крупы' }, { name: 'Хлеб и выпечка' }, { name: 'Масло, соусы и специи' }, { name: 'Консервы и соленья' }],
   Кулинария: [{ name: 'Выпечка' }, { name: 'Пиццы' }, { name: 'Гриль меню' }, { name: 'Свежее мясо' }, { name: 'Салаты' }, { name: 'Супы' }, { name: 'Горячие блюда' }, { name: 'Десерты' }],
   Заморозка: [{ name: 'Пельмени, вареники, равиоли' }, { name: 'Хинкали и манты' }, { name: 'Полу фабрикаты' }, { name: 'Замороженные овощи' }, { name: 'Рыба и морепродукты' }, { name: 'Мясо' }],
   Другое: [{ name: 'Красота и гигиена' }, { name: 'Стирка и уборка' }, { name: 'Полезные мелочи' }, { name: 'Бытовая техника' }],
   Акции: [{ name: 'Сделай предзаказ в кулинарии со скидкой', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Праздник к нам приходит', extra: '15% скидка', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Скидка на третий товар в разделе "Чистая линия"', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Комбо набор 3 пиццы за 1500', extra: 'trio1500', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }]
};

export const saleItems: Record<string, IItemShortInfo> = {
   item1: { productId: '1', imagePath: item1Image, stockQuantity: 2, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
   item2: { productId: '2', imagePath: item2Image, stockQuantity: 33, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 70.90},
   item3: { productId: '3', imagePath: item1Image, stockQuantity: 0, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
};

export const categoriesList: CategoryType[] = ["Супермаркет", "Кулинария", "Заморозка", "Другое", "Акции"];