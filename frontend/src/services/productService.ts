const addToFavorites = async (token: string, productId: string) => {
    try {
        const response = await fetch('http://localhost:5001/favorites/add', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`)
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const removeFromFavorites = async (token: string, productId: string) => {
    try {
        const response = await fetch('http://localhost:5001/favorites/remove', {
            method: 'DELETE ',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`)
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

export { addToFavorites, removeFromFavorites };