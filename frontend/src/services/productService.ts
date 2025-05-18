const baseUrl = 'http://localhost:5001';

const addToFavorites = async (token: string, productId: string) => {
    let response;
    try {
        response = await fetch(`${baseUrl}/favorites/add`, {
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
        response = await fetch(`${baseUrl}/favorites/remove`, {
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
       response = await fetch(`${baseUrl}/products/${id}`, {
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

const getCatalogProducts = async (category: string) => {
    let response;

    try {
        response = await fetch(`${baseUrl}/products-by-category`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ catalogCategory: category })
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

const searchProductByKeyword = async (keyword: string) => {
   let response;

   try {
      response = await fetch(`${baseUrl}/search-products`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ searchTerm: keyword })
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
}

export { addToFavorites, removeFromFavorites, getProduct, getCatalogProducts, searchProductByKeyword };