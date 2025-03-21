const addToFavorites = async (token: string, productId: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/favorites/add', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });

        if (!response.ok) {
           const errorData = await response.json();
           return errorData || 'Неизвестная ошибка'
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
      const errorData = await response?.json();
      return errorData || e;
    }
};

const removeFromFavorites = async (token: string, productId: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/favorites/remove', {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });

        if (!response.ok) {
           const errorData = await response.json();
           return errorData || 'Неизвестная ошибка'
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
      const errorData = await response?.json();
      return errorData || e;
    }
};

const getProduct = async (id: string) => {
    let response;
    try {
       response = await fetch(`http://localhost:5001/products/${id}`, {
           method: 'GET',
           headers: {
              'Content-Type': 'application/json'
           }  
       });

       if (!response.ok) {
           const errorData = await response.json();
           return errorData || 'Неизвестная ошибка';
       }

       let result = await response.json();
       return result;
   }
   catch (e) {
       const errorData = await response?.json();
       return errorData || 'Неизвестная ошибка'
  }
};

export { addToFavorites, removeFromFavorites, getProduct };