const postPhoneNum = async (phoneNumber: string) => {
    try {
        const response = await fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber })
        });

        if (!response.ok) {
            throw new Error(`http ошибка ${response.status}`);
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const postCode = async (phoneNumber: string, code: string) => {
    let response;
    try {
        response = await fetch('http://localhost:5001/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code })
        });

        if (!response.ok && response.status === 401) {
            const errorData = await response.json();
            return errorData || 'Неизвестная ошибка'
        }
        
        let result = await response.json();
        return result;
    }
    catch (e) {
        const errorData = await response?.json();

        return errorData || 'Неизвестная ошибка';
    }
};

const createBonusCard = async (phoneNumber: string) => {
    try {
        const response = await fetch('http://localhost:5001/create-bonus-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: phoneNumber })
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`)
        }

        const result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const verifyUser = async (token: string) => {
    try {
        const response = await fetch('http://localhost:5001/status', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`);
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const logout = async (token: string) => {
    try {
        const response = await fetch('http://localhost:5001/logout', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`);
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

export { postPhoneNum, postCode, createBonusCard, verifyUser, logout }