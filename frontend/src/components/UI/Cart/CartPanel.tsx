import React, { FC, FormEvent } from 'react';
import './CartPanel.scss';

interface ICartPanelProps {
   handleStepChange: (step: number) => void;
};

const CartPanel: FC<ICartPanelProps> = ({ handleStepChange }) => {
   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleStepChange(2);
   };

   return (
      <div className="main__right main__panel">
         <form onSubmit={handleFormSubmit} className="main__panel-form">
            <div className="main__panel-row">
               <p className="main__panel-title">Доставка сегодня, 18:11</p>
               <button className="main__panel-button">Изменить</button>
            </div>
            <p className="main__panel-info">ул. Новая, д. 13, посёлок Ильинское-Усово, городской округ Красногорск</p>
            <div className="main__panel-input-container">
               <input type="text" className="main__panel-input" placeholder='Есть промокод?' />
               <button className="main__panel-input-button" type='button'>Применить</button>
            </div>
            <div className="main__panel-row main__panel-row--withdraw">
               <input type="radio" name="withdraw" id="withdraw" value='withdraw' className='main__panel-radio'/>
               <label htmlFor="withdraw" className="main__panel-radio-label">Списать бонусы (всего 170 бонусов, доступно к списанию 17 бонусов)</label>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Товары (5)</p>
               <p className="main__panel-total">2.443 кг</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Скидки</p>
               <p className="main__panel-total main__panel-total--red">-104 руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Бонусы</p>
               <p className="main__panel-total main__panel-total--red">-17 руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Промокод</p>
               <p className="main__panel-total">0 руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Доставка</p>
               <p className="main__panel-total">Бесплатно</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">К оплате</p>
               <p className="main__panel-total main__panel-total--bold">586 руб</p>
            </div>
            <button className="main__panel-submit" type='submit'>Оформить заказ</button>
            <p className="main__panel-extra">Будет начислено 25 бонусов</p>
         </form>
      </div>
   )
};

export default CartPanel;