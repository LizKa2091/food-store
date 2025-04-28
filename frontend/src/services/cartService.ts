const baseUrl = 'http://localhost:5001';

const addItemToCart = async (productId: string, quantity: number, token: string) => {
   let response;
   try {
      response = await fetch(`${baseUrl}/cart/add`, {
         method: 'POST',
         headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ productId: productId, quantity: quantity })
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error(errorData || 'ошибка при добавлении товара в корзину');
         return { error: errorData.message || 'ошибка при добавлении товара в корзину' };
     }

      let result = await response.json();
      return result;
   }
   catch (e) {
      const errorData = await response?.json();
      console.error(errorData || 'ошибка при добавлении товара в корзину');
      return { error: errorData.message || 'ошибка при добавлении товара в корзину' };
   }
};

const updateItemInCart = async (productId: string, quantity: number, token: string) => {
   let response;
   try {
      response = await fetch(`${baseUrl}/cart/update`, {
         method: 'POST',
         headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ productId: productId, quantity: quantity })
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error(errorData || 'ошибка при обновлении товара в корзине');
         return { error: errorData.message || 'ошибка при обновлении товара в корзине' };
      }

      let result = await response.json();
      return result;
   }
   catch (e) {
      const errorData = await response?.json();
      console.error(errorData || 'ошибка при обновлении товара в корзине');
      return { error: errorData.message || 'ошибка при обновлении товара в корзине' };
   }
};

const removeItemFromCart = async (productId: string, token: string) => {
   let response;
   try {
      response = await fetch(`${baseUrl}/cart/remove`, {
         method: 'DELETE',
         headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ productId: productId })
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error(errorData || 'ошибка при удалении товара из корзины');
         return { error: errorData.message || 'ошибка при удалении товара из корзины' };
     }

      let result = await response.json();
      return result;
   }
   catch (e) {
      const errorData = await response?.json();
      console.error(errorData || 'ошибка при удалении товара из корзины');
      return { error: errorData.message || 'ошибка при удалении товара из корзины' };
   }
};

const getCart = async (token: string) => {
   let response;
   try {
      response = await fetch(`${baseUrl}/cart`, {
         method: 'GET',
         headers: {
         'Authorization': token,
         'Content-Type': 'application/json'
         }      
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error(errorData || 'ошибка при инициализации корзины');
         return { error: errorData.message || 'ошибка при инициализации корзины' };
      }

      const result = await response.json();
      return result;
   } 
   catch (e) {
      const errorData = await response?.json();
      console.error(errorData || 'ошибка при инициализации корзины');
      return { error: errorData.message || 'ошибка при инициализации корзины' };
   }
};

export { addItemToCart, updateItemInCart, removeItemFromCart, getCart };