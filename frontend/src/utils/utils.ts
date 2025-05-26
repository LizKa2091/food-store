export const getMoscowTime = (): string => {
   const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
   };

   const moscowTime = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
   return moscowTime;
};

export const calculateDeliveryTime = (currentTime: string, deliveryOption: 'for 25 mins' | 'for 2 hours'): string => {
   const [hours, minutes] = currentTime.split(':').map(Number);
   const date = new Date();
   
   date.setHours(hours);
   date.setMinutes(minutes);
 
   if (deliveryOption === 'for 25 mins') {
      date.setMinutes(date.getMinutes() + 25);
      const formattedHours = date.getHours().toString().padStart(2, '0');
      const formattedMinutes = date.getMinutes().toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
   } 
   else {
      date.setHours(date.getHours() + 2);
      const formattedHours = date.getHours().toString().padStart(2, '0');
      const formattedMinutes = date.getMinutes().toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
   }
 };