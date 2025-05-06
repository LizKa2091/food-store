import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import CartLate from './CartLate';
import { checkCoupon } from '../../../services/cartService';
import './CartPanel.scss';

interface ICartPanelProps {
   step: number;
   handleStepChange: (step: number) => void;
};

const CartPanel: FC<ICartPanelProps> = ({ step, handleStepChange }) => {
   const [currTime, setCurrTime] = useState<string | null>(null);
   const [couponInput, setCouponInput] = useState<string>('');
   const [discount, setDiscount] = useState<number>(0);
   const authContext = useContext(AuthContext);
   
   useEffect(() => {
      setCurrTime(getMoscowTime);
   }, [currTime]);

   const getMoscowTime = () => {
      const options: Intl.DateTimeFormatOptions = {
         timeZone: 'Europe/Moscow',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false
      };
      const moscowTime = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
      return moscowTime;
   };

   const validateCoupon = async (coupon: string) => {
      if (coupon.trim().length === 0) return;
      
      const token = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await checkCoupon(token, coupon);
         
         if (!result.exists) {
            console.log('не существует');
            return;
         }

         if (result && 'error' in result) {
           console.error(result.error);
           return;
         }

         setDiscount(result.discount);
      }
      catch (error) {
         console.error('ошибка при инициализации корзины:', error);
      }
   };

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleStepChange(2);
   };

   if (!authContext?.isAuthed) {
      return (
         <div className="main__right main__panel main__panel--not-authed"></div>
      )
   }

   return (
      <div className="main__right main__panel">
         <form onSubmit={handleFormSubmit} className="main__panel-form">
            <div className="main__panel-row">
               <p className="main__panel-title">Доставка сегодня, 18:11</p>
               {step === 1 &&
                  <button className="main__panel-button">Изменить</button>
               }
               {step === 2 && currTime && +currTime?.slice(0, 2) >= 0 && +currTime?.slice(0, 2) < 7 && +currTime?.slice(3) <= 59 &&
                  <CartLate step={2} />
               }
            </div>
            <p className="main__panel-info">ул. Новая, д. 13, посёлок Ильинское-Усово, городской округ Красногорск</p>
            {step === 1 &&
               <>
                  <div className="main__panel-input-container">
                     {discount ? (
                        <>
                           <input 
                              className="main__panel-input" placeholder='Есть промокод?' 
                              value={couponInput}
                           />
                           <button className="main__panel-input-button main__panel-input-button--disabled" disabled>Применён</button>
                           <span className='main__panel-input-discount'>Скидка {discount}%</span>
                        </>
                     ) : (
                        <>
                           <input 
                              className="main__panel-input" placeholder='Есть промокод?' 
                              value={couponInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setCouponInput(e.target.value)}
                           />
                           <button className="main__panel-input-button" onClick={() => validateCoupon(couponInput)} type='button'>Применить</button>
                        </>
                     )}
                  </div>
                  <div className="main__panel-row main__panel-row--withdraw">
                     <input type="radio" name="withdraw" id="withdraw" value='withdraw' className='main__panel-radio'/>
                     <label htmlFor="withdraw" className="main__panel-radio-label">Списать бонусы (всего 170 бонусов, доступно к списанию 17 бонусов)</label>
                  </div>
               </>
            }
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
            <button className="main__panel-submit" type='submit'>
               {step === 1 ? 'Оформить заказ' : 'Оформить'}
            </button>
            <p className="main__panel-extra">Будет начислено 25 бонусов</p>
         </form>
      </div>
   )
};

export default CartPanel;