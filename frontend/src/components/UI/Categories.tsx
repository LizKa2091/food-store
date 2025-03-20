import './Categories.scss';

interface ICategoriesProps {
    category: CategoryType;
}

export type CategoryType = 'Супермаркет' | 'Кулинария' | 'Заморозка' | 'Другое' | 'Акции';

interface ISubCategory {
    name: string;
    extra?: string;
};

const Categories = ({ category }: ICategoriesProps) => {
    const subCategories: Record<CategoryType, ISubCategory[]> = {
        Супермаркет: [{ name: 'Вода и напитки' }, { name: 'Молоко, масло и яйца' }, { name: 'Снэки и сухофрукты' }, { name: 'Кофе, чай и сладости' }, { name: 'Макароны и крупы' }, { name: 'Хлеб и выпечка' }, { name: 'Масло, соусы и специи' }, { name: 'Консервы и соленья' }],
        Кулинария: [{ name: 'Выпечка' }, { name: 'Пиццы' }, { name: 'Гриль меню' }, { name: 'Свежее мясо' }, { name: 'Салаты' }, { name: 'Супы' }, { name: 'Горячие блюда' }, { name: 'Десерты' }],
        Заморозка: [{ name: 'Пельмени, вареники, равиоли' }, { name: 'Хинкали и манты' }, { name: 'Полу фабрикаты' }, { name: 'Замороженные овощи' }, { name: 'Рыба и морепродукты' }, { name: 'Мясо' }],
        Другое: [{ name: 'Красота и гигиена' }, { name: 'Стирка и уборка' }, { name: 'Полезные мелочи' }, { name: 'Бытовая техника' }],
        Акции: [{ name: 'Сделай предзаказ в кулинарии со скидкой' }, { name: 'Праздник к нам приходит', extra: '15% скидка' }, { name: 'Скидка на третий товар в разделе "Чистая линия"' }, { name: 'Комбо набор 3 пиццы за 1500', extra: 'trio1500' }]
    };

    return (
        <section className='category-section'>
            <div className="category__info">
                <h4 className='category__title'>{category}</h4>
                <button className="category__button">Смотреть все</button>
            </div>
                <ul className={`category__list ${category}`}>
                {subCategories[category].map(el => 
                    <li className={`subcategory__item ${category} ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`} key={el.name}>
                        <p className={`subcategory__title ${category}`}>{el.name}</p>
                        {el.extra &&
                            <span className='subcategory__extra'>{el.extra}</span>
                        }
                    </li>
                )}
            </ul>
        </section>
    );
};

export default Categories;
