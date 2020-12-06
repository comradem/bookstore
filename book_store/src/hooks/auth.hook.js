import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {

    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userType, setUserType] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback((jwt, id, type) => {
        setUserId(id);
        setUserToken(jwt);
        setUserType(type);
        setIsLoggedIn(true);
        localStorage.setItem(storageName, JSON.stringify({userId: id, userToken: jwt, userType: type}));
    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        setUserToken(null);
        setUserType(null);
        setIsLoggedIn(false);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.userToken){
            login(data.userToken, data.userId, data.userType);
        }
    }, [login])


    return {userToken, userId, userType,login,logout, isLoggedIn}
};
