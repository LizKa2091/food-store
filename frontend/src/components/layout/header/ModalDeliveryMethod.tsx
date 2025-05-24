import React, { FC } from 'react';
import './ModalDeliveryMethod.scss';

const ModalDeliveryMethod: FC = () => {
   return (
      <div className='modal-delivery-container'>
         <form>
            <div className="modal-delivery--left">
               <div className="modal-delivery-row">
                  <button className="modal-delivery__button">
                     Доставка бесплатно от 500₽
                  </button>
                  <button className="modal-delivery__button">
                     Самовывоз бесплатно
                  </button>
               </div>
               <label htmlFor="address">Выберите адрес доставки</label>
               <input type="text" id='address' placeholder='Выберите адрес доставки' />
               <label htmlFor="date">Когда доставить?</label>
               <div className="modal-delivery-row">
                  <input type="date" name="date" id="date" />
                  <select name="time" id="time">
                     <option value="for 25 mins">за 25 мин.</option>
                     <option value="for 2 hours">с 21:00 до 23:00</option>
                  </select>
               </div>
            </div>
            <div className="modal-delivery--right">
               <div style={{position:'relative', overflow: 'hidden'}}>
                  <a href="https://yandex.ru/maps/org/park_fili/1072958798/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top: 0}}>Парк Фили</a>
                  <a href="https://yandex.ru/maps/213/moscow/category/park/184106346/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}>Парк культуры и отдыха в Москве</a>
                  <a href="https://yandex.ru/maps/213/moscow/category/square/223334343586/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px',position:'absolute',top:'28px'}}>Сквер в Москве</a>
                  <iframe src="https://yandex.ru/map-widget/v1/?ll=37.570311%2C55.729953&mode=search&poi%5Bpoint%5D=37.483804%2C55.748278&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1072958798&sll=37.460254%2C55.680326&sspn=0.009194%2C0.003029&text=%D0%BF%D0%B5%D1%80%D0%B5%D0%BA%D1%80%D1%91%D1%81%D1%82%D0%BE%D0%BA&z=12.3" width="560" height="400"></iframe>
               </div>
            </div>
         </form>
      </div>
   )
}

export default ModalDeliveryMethod;
