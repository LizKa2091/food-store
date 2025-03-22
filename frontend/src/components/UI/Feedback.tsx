import React, { FC, useState } from 'react';
import './Feedback.scss';

const Feedback: FC = () => {
   const [linkValue, setLinkValue] = useState<string>('');

   const handleSubmit = () => {
      
   };

   return (
      <div className='feedback'>
         <div className="feedback__inner">
            <div className="feedback__text-info">
               <p className="feedback__title">Не нашли, что искали?</p>
               <p className="feedback__subtitle">Оставьте ссылку на товар или бренд</p>
            </div>
            <form onSubmit={ handleSubmit } className="feedback__form">
               <div className="feedback__form__item">
                  <input type="radio" name="product" id="product" value='product' className='feedback__form__input'/>
                  <label htmlFor="product" className='feedback__form__label'>Товар</label>
               </div>
               <div className="feedback__form__item">
                  <input type="radio" name="brand" id="brand" value='brand' className='feedback__form__input'/>
                  <label htmlFor="brand" className='feedback__form__label'>Бренд</label>
               </div>
               <input onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setLinkValue(e.target.value) } value={ linkValue } type="text" className='feedback__form__input feedback__form__input--link' placeholder='Ссылка'/>
               <button type="submit" className='feedback__form__submit'>Отправить</button>
            </form>
         </div>
      </div>
   )
};

export default Feedback;