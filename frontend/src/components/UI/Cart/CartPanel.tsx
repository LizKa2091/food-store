import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useMessage } from '../../../context/MessageContext';
import { CartContext } from '../../../context/CartContext';
import { checkCoupon } from '../../../services/cartService';
import { ICartItem } from '../../../types/cart.types';
import CartLate from './CartLate';
import { getMoscowTime, calculateDeliveryTime } from '../../../utils/utils';
import './CartPanel.scss';

interface ICartPanelProps {
   step: number;
   handleStepChange: (step: number) => void;
};

interface IDeliveryData {
   address: string;
   deliveryDate: string;
   deliveryTime: 'for 25 mins' | 'for 2 hours';
}

const CartPanel: FC<ICartPanelProps> = ({ step, handleStepChange }) => {
   const [currTime, setCurrTime] = useState<string | null>(null);
   const [deliveryTime, setDeliveryTime] = useState<string>(calculateDeliveryTime(getMoscowTime(), 'for 25 mins'));
   const [deliveryTimeType, setDeliveryTimeType] = useState<'for 25 mins' | 'for 2 hours'>('for 25 mins');
   const [address, setAddress] = useState<string>('');
   const [isChangingDeliTime, setIsChangingDeliTime] = useState<boolean>(false);
   const [couponInput, setCouponInput] = useState<string>('');
   const [itemsDiscount, setItemsDiscount] = useState<number>(0);
   const [itemsCount, setItemsCount] = useState<number>(0);
   const [weightCount, setWeightCount] = useState<number>(0);
   
   const authContext = useContext(AuthContext);
   const cartContext = useContext(CartContext) || { cartItems: []};
   const { cartItems, promoDiscount, setPromoDiscount, bonusDiscount, setBonusDiscount } = cartContext;
   const [totalPrice, setTotalPrice] = useState<number>(0);

   const { setMessage } = useMessage();

   useEffect(() => {
      let deliveryDataJson = localStorage.getItem('deliveryInfo');
      if (deliveryDataJson) {
        let deliveryData: IDeliveryData = JSON.parse(deliveryDataJson);

        setDeliveryTimeType(deliveryData.deliveryTime);
        setDeliveryTime(calculateDeliveryTime(getMoscowTime(), deliveryData.deliveryTime));

        setAddress(deliveryData.address);
      }
   }, []);

   useEffect(() => {
      setCurrTime(getMoscowTime);
   }, [currTime]);

   useEffect(() => {
      if (cartItems.length > 0) {
         let price: number = cartItems.reduce((sum, item) => sum + (item.price * item.userQuantity), 0);

         let totalDiscount: number = cartItems.reduce((sum, item) => item.newPrice ? sum + ((item.price - item.newPrice) * item.userQuantity) : sum, 0);
         setItemsDiscount(totalDiscount);

         let finalPrice = price - itemsDiscount - bonusDiscount - promoDiscount;
         setTotalPrice(Math.max(0, +finalPrice.toFixed(2)));

         let totalItemsCount = cartItems.map((item: ICartItem) => item.userQuantity).reduce((a: number, b: number) => a+b, 0);
         setItemsCount(totalItemsCount);

         let totalWeightCount = cartItems.map((item: ICartItem) => +item.weight.replace('л', '').replace('кг', '').replace('kg', '').replace('l', '').trim() * item.userQuantity).reduce((a: number, b: number) => +a + b, 0);
         setWeightCount(totalWeightCount);
      }
      else {
         setTotalPrice(0);
         setItemsDiscount(0);
         setItemsCount(0);
         setWeightCount(0);
      }
   }, [cartItems, promoDiscount, bonusDiscount, itemsDiscount]);
   
   const validateCoupon = async (coupon: string): Promise<void> => {
      if (coupon.trim().length === 0) return;
      
      const token: string | null = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await checkCoupon(token, coupon);
         
         if (!result.exists) {
            setMessage('Такого промокода не существует');
            return;
         }

         if (result && 'error' in result) {
           console.error(result.error);
           setMessage('Ошибка при проверке промокода')
           return;
         }
         
         setPromoDiscount(result.discount);
         setMessage('Промокод успешно применён');
      }
      catch (error) {
         console.error('Ошибка при проверке промокода:', error);
         setMessage(`Ошибка при проверке промокода:, ${error}`);
      }
   };

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleStepChange(2);
   };

   const handleDeliTime = () => {
      if (deliveryTimeType === 'for 25 mins') {
         const [hours] = (currTime || getMoscowTime()).split(':').map(Number);

         if (hours < 7 || hours >= 23) {
           setMessage('Быстрая доставка недоступна с 23:00 до 07:00');
           return;
         }
      }

      const newDeliveryTime = calculateDeliveryTime(currTime || getMoscowTime(), deliveryTimeType);
      setDeliveryTime(newDeliveryTime);
      setIsChangingDeliTime(false);
      setMessage('Время доставки обновлено');
      
      const deliveryData = {
         address: address,
         deliveryDate: new Date().toISOString().split('T')[0],
         deliveryTime: deliveryTimeType
      };

      localStorage.setItem('deliveryInfo', JSON.stringify(deliveryData));
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
               {step === 1 && !isChangingDeliTime &&
                  <>
                     <p className="main__panel-title">Доставка сегодня, {deliveryTime} ({deliveryTimeType === 'for 25 mins' ? 'быстрая' : 'стандартная'})</p>
                     <button onClick={() => setIsChangingDeliTime(true)} className="main__panel-button">Изменить</button>
                  </>
               }
               {step === 1 && isChangingDeliTime &&
                  <div className='main__panel-container'>
                     <label htmlFor='deli-time' className='main__panel-label'>Укажите новое время доставки</label>
                     <div className="main__panel-container-row">
                        <select value={deliveryTimeType} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDeliveryTimeType(e.target.value as 'for 25 mins' | 'for 2 hours')} className='main__panel-select'>
                           <option value="for 25 mins">Быстрая доставка (25 мин)</option>
                           <option value="for 2 hours">Стандартная доставка (2 часа)</option>
                        </select>
                        <button onClick={handleDeliTime} type='button' className="main__panel-button">Сохранить</button>
                     </div>
                  </div>
               }
               {step === 2 && currTime && +currTime?.slice(0, 2) >= 0 && +currTime?.slice(0, 2) < 7 && +currTime?.slice(3) <= 59 &&
                  <CartLate step={2} />
               }
            </div>
            <p className="main__panel-info">{address}</p>
            {step === 1 &&
               <>
                  <div className="main__panel-input-container">
                     {promoDiscount ? (
                        <>
                           <input 
                              className="main__panel-input" placeholder='Есть промокод?' 
                              value={couponInput}
                           />
                           <button className="main__panel-input-button main__panel-input-button--disabled" disabled>Применён</button>
                           <span className='main__panel-input-discount'>Скидка {promoDiscount}%</span>
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
                  <div onClick={() => setBonusDiscount(17)} className="main__panel-row main__panel-row--withdraw">
                     <input type="radio" name="withdraw" id="withdraw" value='withdraw' className='main__panel-radio'/>
                     <label htmlFor="withdraw" className="main__panel-radio-label">Списать бонусы (всего 170 бонусов, доступно к списанию 17 бонусов)</label>
                  </div>
               </>
            }
            <div className="main__panel-total-row">
               <p className="main__panel-total">Товары ({itemsCount})</p>
               <p className="main__panel-total">{weightCount.toFixed(2)} кг</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Скидки</p>
               <p className="main__panel-total main__panel-total--red">-{itemsDiscount} руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Бонусы</p>
               <p className="main__panel-total main__panel-total--red">-{bonusDiscount} руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Промокод</p>
               <p className="main__panel-total">-{promoDiscount} руб</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">Доставка</p>
               <p className="main__panel-total">Бесплатно</p>
            </div>
            <div className="main__panel-total-row">
               <p className="main__panel-total">К оплате</p>
               <p className="main__panel-total main__panel-total--bold">{totalPrice} руб</p>
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