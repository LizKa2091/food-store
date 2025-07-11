import React, { FC, useEffect, useState } from 'react';
import { fetchBonusCard } from '../../../services/userService';
import { useMessage } from '../../../context/MessageContext';
import { IUserBonuses } from '../../../types/userData.types';

const BonusCard: FC = () => {
   const [isCardLoading, setIsCardLoading] = useState<boolean>(false);
   const [userBonusCard, setUserBonusCard] = useState<IUserBonuses>({ bonuses: '', cardNumber: '' });

   const { setMessage } = useMessage();

   useEffect(() => {
      loadUserCard();
   }, []);

   const loadUserCard = async () => {
      setIsCardLoading(true);
      const token = localStorage.getItem('token');

      if (token) {
         let response;

         try {
            response = await fetchBonusCard(token);

            setIsCardLoading(false);
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

   return (
      <div className='bonus'>
         {isCardLoading ? (
            <span className='loader'>Загрузка...</span>
         ) : (
            <div className='bonus__inner'>
               <div className="bonus__main">
                  <p className="bonus__text">Получайте кэшбек до 5% с каждого заказа и оплачивайте покупки</p>
                  <p className="bonus__text">Карта №{userBonusCard.cardNumber}</p>
               </div>
               <div className="bonus__extra">
                  <p className="bonus__extra__title">Бонусы</p>
                  <p className="bonus__extra__amount">{userBonusCard.bonuses}</p>
               </div>
            </div>
         )}
      </div>
   )
}

export default BonusCard
