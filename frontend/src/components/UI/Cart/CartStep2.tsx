import React, { FC, ReactNode } from 'react';
import './CartStep2.scss';

interface ICartStep2Props {
   children: ReactNode;
};

const CartStep2: FC<ICartStep2Props> = ({ children }) => {
   return (
      <main className='main'>
         <div className="main__left">
            <form className="main__form--order">
               <h2 className="main__title">Оформление заказа</h2>
               <div className="main__details">
                  <h3 className="main__subtitle">Ваши данные</h3>
                  <div className="main__details-row">
                     <p className="main__details-fio">Имя Фамилия</p>
                     <button className="main__details-button main__details-button--fio">Изменить получателя</button>
                  </div>
                  <div className="main__details-row">
                     <p className="main__details-phone">+38 999 999 99 99</p>
                     <button className="main__details-button main__details-button--phone">Изменить контактный номер для заказа</button>
                  </div>
                  <p className="main__details-card">К этому номеру телефона привязана карта №a437503</p>
                  <h3 className="main__subtitle">Способ оплаты</h3>
                  <div className="main__radios">
                     <div className="main__radio-row">
                        <input type="radio" name="card-receipt" id="card-receipt" className='main__radio-input' />
                        <label htmlFor="card-receipt" className="main__radio-label">Оплата картой при получении</label>
                     </div>
                     <div className="main__radio-row">
                        <input type="radio" name="cash" id="cash" className='main__radio-input' />
                        <label htmlFor="cash" className="main__radio-label">Оплата наличными при получении</label>
                     </div>
                     <div className="main__radio-row">
                        <input type="radio" name="online" id="online" className='main__radio-input' />
                        <label htmlFor="online" className="main__radio-label">Онлайн оплата</label>
                     </div>
                  </div>
                  <div className="main__details-row">
                     <h3 className="main__subtitle">Способ оплаты</h3>
                     <button className="main__details-button main__details-button--receiver">Изменить получателя</button>
                  </div>
                  <p className="main__details-address">ул. Новая,Ильинское-Усово, городской округ Красногорск</p>
                  <div className="main__details-form-els">
                     <div className="main__form-details-row">
                        <input type="number" name="room" id="room" className='main__details-input' placeholder='Квартира'/>
                        <input type="number" name="floor" id="floor" className='main__details-input' placeholder='Этаж'/>
                        <input name="intercom" id="intercom" className='main__details-input' placeholder='Домофон'/>
                        <input type="number" name="entrance" id="entrance" className='main__details-input' placeholder='Подъезд'/>
                     </div>
                     <textarea name="comment" id="comment" className='main__details-textarea' rows={5} placeholder='Комментарий для курьера' />
                  </div>   
               </div>
            </form>
         </div>
         {children}
      </main>
   )
};

export default CartStep2;