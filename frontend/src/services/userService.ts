const fetchUserInfo = async (token: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/user-info', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
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
        return errorData || 'Неизвестная ошибка'
    }
};

const updateUserInfo = async (token: string, nameSurname: string, phoneNumber: string, dateOfBirth: string, email: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/update-user-info', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameSurname: nameSurname, phoneNumber: phoneNumber, dateOfBirth: dateOfBirth, email: email })
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
        return errorData || 'Неизвестная ошибка'
    }
};

const fetchBonusCard = async (token: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/bonus-card', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
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
        return errorData || 'Неизвестная ошибка'
    }
};

const fetchUserOrders = async (token: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/user-orders', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
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
        return errorData || 'Неизвестная ошибка'
    }
};

const fetchUserFavorites = async (token: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/favorites', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
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
        return errorData || 'Неизвестная ошибка'
    }
};

export { fetchUserInfo, updateUserInfo, fetchBonusCard, fetchUserOrders, fetchUserFavorites };