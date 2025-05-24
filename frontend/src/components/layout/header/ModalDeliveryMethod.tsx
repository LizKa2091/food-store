import React, { FC, useState, MouseEvent } from 'react';
import './ModalDeliveryMethod.scss';

interface IModalDeliveryMethod {
   onModalChange: (modalState: boolean) => void;
};

type deliveryMethods = 'delivery' | 'takeout';

const ModalDeliveryMethod: FC<IModalDeliveryMethod> = ({ onModalChange }) => {
   const [chosenMethod, setChosenMethod] = useState<deliveryMethods>('delivery');

   return (
      <div className='modal-delivery-container'>
         <form className='modal-delivery__form'>
            <div className="modal-delivery--left">
               <div className="modal-delivery-row">
                  <button onClick={ (e: MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setChosenMethod('delivery')} } className={"modal-delivery__button" + (chosenMethod === 'delivery' ? ' active' : '')}>
                     <span className="modal-delivery__button-title">Доставка </span>
                     бесплатно от 500₽
                  </button>
                  <button onClick={(e: MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setChosenMethod('takeout')}} className={"modal-delivery__button" + (chosenMethod === 'takeout' ? ' active' : '')}>
                     <span className="modal-delivery__button-title">Самовывоз </span>
                     бесплатно
                  </button>
               </div>
               <label htmlFor="address" className='modal-delivery__form-label'>Выберите адрес доставки</label>
               <input type="text" id='address' className='modal-delivery__form-input' placeholder='Выберите адрес доставки' />
               <label htmlFor="date" className='modal-delivery__form-label'>Когда доставить?</label>
               <div className="modal-delivery-row">
                  <input className='modal-delivery__form-input modal-delivery__form-input--date' type="date" name="date" id="date" />
                  <select name="time" id="time" className='modal-delivery__form-select'>
                     <option value="for 25 mins">за 25 мин.</option>
                     <option value="for 2 hours">с 21:00 до 23:00</option>
                  </select>
               </div>
            </div>
         </form>
         <iframe title='delivery-map' className='modal-delivery__iframe' src="https://yandex.ru/map-widget/v1/?ll=37.570311%2C55.729953&mode=search&poi%5Bpoint%5D=37.483804%2C55.748278&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1072958798&sll=37.460254%2C55.680326&sspn=0.009194%2C0.003029&text=%D0%BF%D0%B5%D1%80%D0%B5%D0%BA%D1%80%D1%91%D1%81%D1%82%D0%BE%D0%BA&z=12.3" />
         <button onClick={ (e: MouseEvent<HTMLButtonElement>) => {e.stopPropagation(); onModalChange(false)} } className="modal-delivery__close">x</button>
      </div>
   )
}

export default ModalDeliveryMethod;
