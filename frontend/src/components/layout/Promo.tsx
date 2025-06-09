import React, { FC, useState, useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import './Promo.scss';
import star from '../../images/webpImages/star.webp';
import { Link } from 'react-router-dom';

const Promo: FC = () => {
   const [currMainSlide, setCurrMainSlide] = useState<number>(0);
   const [isAnimating, setIsAnimating] = useState<boolean>(false);
   const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

   const promoContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleWindowResize = () => {
         setDeviceWidth(window.innerWidth);
      };

      window.addEventListener('windowResize', handleWindowResize);

      handleWindowResize();
      return () => window.removeEventListener('windowResize', handleWindowResize);
   }, []);

   const changeSlide = useCallback((direction: 'next' | 'prev') => {
      setIsAnimating(true);
      setCurrMainSlide(prev => {
         const total = promoItems.length;
         return direction === 'next' 
            ? (prev + 1) % total 
            : (prev - 1 + total) % total;
      });
   }, []);

   const handleNextClick = () => changeSlide('next');
   const handlePrevClick = () => changeSlide('prev');

   useLayoutEffect(() => {
      const container = promoContainerRef.current;
      if (!container) return;

      const handleTransitionEnd = () => setIsAnimating(false);
      container.addEventListener('transitionend', handleTransitionEnd);
      
      return () => {
         container.removeEventListener('transitionend', handleTransitionEnd);
      };
   }, []);

   const promoItems = [
      {
         id: 1,
         title: "Начните день с вкусной выпечки из нашей кулинарии",
         link: "/catalog",
         linkText: deviceWidth > 500 ? "Перейти к покупкам" : 'К покупкам',
         className: 'promo__first',
         gridSpan: 'span 1 / span 1',
         bgClass: 'promo__first__plain',
         titleClass: 'promo__title--first'
      },
      {
         id: 2,
         title: "Кэшбэк с каждой покупки",
         className: 'promo__second',
         gridSpan: 'span 1 / span 1',
         bgClass: 'promo__second__content',
         titleClass: 'promo__title--second'
      },
      {
         id: 3,
         title: "Оставьте отзыв и получите 5% скидку",
         className: 'promo__third',
         gridSpan: 'span 1 / span 1',
         bgClass: 'promo__third__content',
         titleClass: 'promo__title--third',
         withStars: true
      }
   ];
  
   return (
      <section className="promo" ref={promoContainerRef}>
         {promoItems.map((item, index) => (
            <div key={item.id} data-active={index === currMainSlide} className={`${item.className} ${index === currMainSlide ? 'promo__main' : ''} promo__item`}
               style={{
                  gridColumn: index === currMainSlide ? 'span 2' : 'span 1',
                  gridRow: index === currMainSlide ? 'span 2' : 'span 1',
                  order: (index - currMainSlide + promoItems.length) % promoItems.length
               }}
            >
               <div className={item.bgClass}>
                  {item.withStars && (
                     <div className="promo__third__rating">
                        {[...Array(5)].map((_, i) => (
                           <img key={i} src={star} alt="звезда" className={"promo__third__star" + (index === currMainSlide ? ' promo__third__star--main' : '')} draggable={false} />
                        ))}
                     </div>
                  )}
                  <p className={`${item.titleClass} ${index === currMainSlide ? 'promo__main-title' : ''} promo__${index === 0 ? 'first' : 'extra'}__title`}>
                     {item.title}
                  </p>
                  {item.link && (
                     <Link to={item.link} className={"promo__first__link" + (index === currMainSlide ? "" : " promo__first__link--extra")}>{item.linkText}</Link>
                  )}
               </div>
                  {index === currMainSlide && (
                     <div className="promo__first__controls">
                        <button onClick={handlePrevClick} disabled={isAnimating} className="promo__first__button promo__first__button--arrow-left" />
                        <button onClick={handleNextClick} disabled={isAnimating} className="promo__first__button promo__first__button--arrow-right" />
                     </div>
                  )}
            </div>
         ))}
      </section>
   );
};

export default Promo;