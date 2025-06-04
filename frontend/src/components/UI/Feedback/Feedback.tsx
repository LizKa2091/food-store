import React, { FC, useState } from 'react';
import './Feedback.scss';

const Feedback: FC = () => {
   const [linkValue, setLinkValue] = useState<string>('');

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
   };

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLinkValue(e.target.value)
   };

   return (
      <div className='feedback'>
         <div className="feedback__inner">
            <div className="feedback__text-info">
               <p className="feedback__title">Не нашли, что искали?</p>
               <p className="feedback__subtitle">Оставьте ссылку на товар или бренд</p>
            </div>
            <form onSubmit={handleSubmit} className="feedback__form">
               <div className="feedback__form__item">
                  <input type="radio" name="itemInfo" id="product" value='product' className='feedback__form__input feedback__form__input--radio'/>
                  <label htmlFor="product" className='feedback__form__label'>Товар</label>
               </div>
               <div className="feedback__form__item">
                  <input type="radio" name="itemInfo" id="brand" value='brand' className='feedback__form__input feedback__form__input--radio'/>
                  <label htmlFor="brand" className='feedback__form__label'>Бренд</label>
               </div>
               <input onChange={onInputChange} value={linkValue} required type="text" className='feedback__form__input feedback__form__input--link' placeholder='Ссылка' />
               <button type="submit" className='feedback__form__submit'>Отправить</button>
            </form>
         </div>
      </div>
   )
};

export default Feedback;