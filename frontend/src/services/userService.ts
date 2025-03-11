const fetchUserInfo = async (token: string) => {
    try {
        const response = await fetch('http://localhost:5001/user-info', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
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

const updateUserInfo = async (token: string, nameSurname: string, phoneNumber: string, dateOfBirth: string, email: string) => {
    try {
        const response = await fetch('http://localhost:5001/update-user-info', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameSurname: nameSurname, phoneNumber: phoneNumber, dateOfBirth: dateOfBirth, email: email })
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`)
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`http ошибка: ${e}`);
    }
};

const fetchBonusCard = async (token: string) => {
    try {
        const response = await fetch('http://localhost:5001/bonus-card', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`)
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`http ошибка: ${e}`);
    }
};

export {fetchUserInfo, updateUserInfo, fetchBonusCard};