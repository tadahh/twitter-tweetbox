import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useTwitterUserSearchApi = () => {
    const [twitterUsers, setTwitterUsers] = useState([]);
    const [user, setUser] = useState('');

    const { checkLocalStorage, saveToLocalStorage } = useLocalStorage();

    useEffect(() => {
        const fetchData = async () => {
            return await axios
                .get(`/twitter/user/search?username=${user}`)
                .then(res => {
                    setTwitterUsers(res.data.users);
                    saveToLocalStorage(user, res.data.users);
                })
                .catch(error => console.log(error));
        };

        fetchData();
    }, [user]);

    const doFetch = user => {
        console.log('check user');
        const localStorageValue = checkLocalStorage(user);

        if (localStorageValue) {
            setTwitterUsers(localStorageValue);
        } else {
            setUser(user);
        }
    };

    const resetTwitterUsers = () => {
        setTwitterUsers([]);
    };

    return { twitterUsers, doFetch, resetTwitterUsers };
};

export default useTwitterUserSearchApi;
