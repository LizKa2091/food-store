import './Categories.scss';

interface CategoresProps {
    category: CategoryType;
}

type CategoryType = 'Супермаркет' | 'Кулинария';

const Categories = ({ category }: CategoresProps) => {
    const subCategories: Record<CategoryType, { name: string }[]> = {
        Супермаркет: [
            { name: 'Вода и напитки' },
            { name: 'Молоко, масло и яйца' },
            { name: 'Снэки и сухофрукты' },
            { name: 'Кофе, чай и сладости' },

            { name: 'Макароны и крупы' },
            { name: 'Хлеб и выпечка' },
            { name: 'Масло, соусы и специи' },
            { name: 'Консервы и соленья' },
        ],
        Кулинария: [
            { name: 'Выпечка' },
            { name: 'Пиццы' },
            { name: 'Гриль-меню' },
            { name: 'Свежее мясо' },

            { name: 'Салаты' },
            { name: 'Супы' },
            { name: 'Горячие блюда' },
            { name: 'Десерты' },
        ]
    };

    return (
        <section className='category-section'>
            <div className="category__info">
                <h4 className='category__title'>{category}</h4>
                <button className="category__button">Смотреть все</button>
            </div>
            <ul className="category__list">
                {subCategories[category].map((el, i) => 
                    <li className={`subcategory__item ${category} ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`} key={i} datatype=''>
                        <p className="subcategory__title">{el.name}</p>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default Categories;