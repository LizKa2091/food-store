import React, { FC, useState, useEffect } from 'react';
import { fetchUserOrders } from '../../../services/userService';

interface IDeliveryAddress {
    street: string;
    apartment: string;
    apartmentNumber: number;
};

interface IOrder {
    orderId: string;
    status: 'в работе' | 'выполнен';
    orderType: 'Доставка' | 'Самовывоз';
    orderDate: string;
    deliveryAddress: IDeliveryAddress;
    orderCost: number;
};

type UserOrders = Record<string, IOrder>;

const OrderHistory: FC = () => {
    const [userOrders, setUserOrders] = useState<UserOrders>({});

    useEffect(() => {
        getUserOrders();
    }, []);

    const getUserOrders = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const response = await fetchUserOrders(token);
            setUserOrders(response.orders);
        }
        else {
            throw new Error('ошибка, пользователь не авторизован');
        }
    };

    return (
        <div className='order'>
            <p className="order__extra">Если не понравился вкус или качество продукта — поможем по всем вопросам. Поддержка 8 800 999 99 99</p>
            <div className="order__inner">
                {Object.entries(userOrders).length !== 0 ? (
                    <ul className='order__list'>
                        {Object.entries(userOrders).map(([orderBasicId, order]) => (
                            <li key={orderBasicId} className={'order__item ' + (order.status === 'в работе' ? 'order__item--in-work' : 'order__item--completed')}>
                                <p className={"order__item--status " + (order.status === 'в работе' ? 'order__item--status--in-work' : 'order__item--status--completed')}>{order.status}</p>
                                <p className="order__item--id">Заказ №{order.orderId}</p>
                                <div className="order__item__row">
                                    <p className="order__item--type">{order.orderType}</p>
                                    <p className="order__item--date">{new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                                {order.deliveryAddress && (
                                    <p className="order__item--address">
                                        {order.deliveryAddress.street}, д. {order.deliveryAddress.apartment}, кв {order.deliveryAddress.apartmentNumber}
                                    </p>
                                )}
                                <div className="order__item__row order__item__row--last">
                                    <p className="order__item--cost">{order.orderCost} руб.</p>
                                    <button className={'order__item--button ' + (order.status === 'в работе' ? 'order__item--button--in-work' : 'order__item--button--completed')}>{order.status === 'в работе' ? 'Отследить' : 'Повторить'}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>У вас нет заказов</p>
                )}
            </div>
        </div>
    )
};

export default OrderHistory;