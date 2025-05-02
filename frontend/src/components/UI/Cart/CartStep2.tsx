import React, { ChangeEvent, MouseEvent, FC, FormEvent, ReactNode, useEffect, useState } from 'react';
import { useMessage } from '../../../context/MessageContext';
import { fetchBonusCard, fetchUserInfo, updateUserInfo } from '../../../services/userService';
import { IUserBonuses, IUserInfo } from '../../../types/userData.types';
import './CartStep2.scss';

interface ICartStep2Props {
   children: ReactNode;
};

const CartStep2: FC<ICartStep2Props> = ({ children }) => {
   const [userInfo, setUserInfo] = useState<IUserInfo>({ nameSurname: '', phoneNumber: '', dateOfBirth: '', email: '' });
   const [userBonusCard, setUserBonusCard] = useState<IUserBonuses>({ bonuses: '', cardNumber: '' });
   const [isInputWrong, setIsInputWrong] = useState<boolean>(false);
   const [isFormSaved, setIsFormSaved] = useState<boolean | null>(null);
   const [isDirty, setIsDirty] = useState<boolean>(false);

   const { setMessage } = useMessage();

   useEffect(() => {
      loadUserInfo();
      loadUserCard();
   }, []);

   const loadUserInfo = async () => {
      const token = localStorage.getItem('token');

      if (token) {
         let response;

         try {
            response = await fetchUserInfo(token);

            setUserInfo(response.user)
         }
         catch (e) {
            setMessage(response.message);
         }
      }
      else {
         setMessage('пользователь не авторизован');
      }
   };

   const loadUserCard = async () => {
      const token = localStorage.getItem('token');

      if (token) {
         let response;

         try {
            response = await fetchBonusCard(token);

            setUserBonusCard(response.bonusCard);
         }
         catch (e) {
            setMessage(response.message);
         }
      }
      else {
         setMessage('пользователь не авторизован');
      }
   };

   const accessValueChange = (valueType: string, e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
   };

   const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setUserInfo((prev) => ({
         ...prev,
         nameSurname: e.target.value
      }));
      setIsDirty(true);

      const nameRegex = /^[A-ZА-Я][a-zа-яё]+ [A-ZА-Я][a-zа-яё]+$/;

      if (!nameRegex.test(e.target.value)) {
         e.target.classList.add('wrong-input');
         setIsInputWrong(true);
      }
      else {
         e.target.classList.remove('wrong-input');
         setIsInputWrong(false);
      }
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isInputWrong && isDirty) {
         const token = localStorage.getItem('token');

         if (token) {
            const { nameSurname, phoneNumber, dateOfBirth, email } = userInfo;
            let response;

            try {
               response = await updateUserInfo(token, nameSurname, phoneNumber, dateOfBirth, email);

               if (response.user) {
                  setIsFormSaved(true);
                  setIsDirty(false);
               }
            }
            catch (e) {
               setMessage(response.message);
            }
         }
         else {
            setMessage('Пользователь не авторизован');
         }
      }
      else if (isDirty) {
         setIsFormSaved(false);
      }
      else {
         setIsFormSaved(!isInputWrong);
      }
   };

   const formatPhoneNum = (num: string) => {
      return `+${num.slice(0, 1)} ${num.slice(1, 4)} ${num.slice(4, 7)} ${num.slice(7, 9)} ${num.slice(9, 11)}`;
   };

   return (
      <main className='main'>
         <div className="main__left">
            <form className="main__form--order">
               <h2 className="main__title">Оформление заказа</h2>
               <div className="main__details">
                  <h3 className="main__subtitle">Ваши данные</h3>
                  <div className="main__details-row">
                     <p className={"main__details-fio" + (userInfo.nameSurname.length === 0 ? ' main__details-fio--empty' : '')}>{userInfo.nameSurname.length > 0 ? userInfo.nameSurname : 'Не указано'}</p>
                     <button onClick={(e: MouseEvent<HTMLButtonElement>) => accessValueChange('fio', e)} className="main__details-button main__details-button--fio">Изменить получателя</button>
                  </div>
                  <div className="main__details-row">
                     <p className="main__details-phone">{formatPhoneNum(userInfo.phoneNumber)}</p>
                     <button onClick={(e: MouseEvent<HTMLButtonElement>) => accessValueChange('phone', e)} className="main__details-button main__details-button--phone">Изменить контактный номер для заказа</button>
                  </div>
                  <p className="main__details-card">К этому номеру телефона привязана карта №{userBonusCard.cardNumber}</p>
                  <h3 className="main__subtitle">Способ оплаты</h3>
                  <div className="main__radios">
                     <div className="main__radio-row">
                        <input type="radio" name="receipt-type" id="card-receipt" value="card-receipt" className='main__radio-input' />
                        <label htmlFor="card-receipt" className="main__radio-label">Оплата картой при получении</label>
                     </div>
                     <div className="main__radio-row">
                        <input type="radio" name="receipt-type" id="cash" value="cash" className='main__radio-input' />
                        <label htmlFor="cash" className="main__radio-label">Оплата наличными при получении</label>
                     </div>
                     <div className="main__radio-row">
                        <input type="radio" name="receipt-type" id="online" value='online' className='main__radio-input' />
                        <label htmlFor="online" className="main__radio-label main__radio-label--last">Онлайн оплата</label>
                     </div>
                  </div>
                  <div className="main__details-row">
                     <h3 className="main__subtitle">Детали адреса</h3>
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