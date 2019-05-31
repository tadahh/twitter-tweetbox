const useLocalStorage = () => {
    const checkLocalStorage = key => {
        const cachedUserData = localStorage.getItem(key);

        if (cachedUserData) {
            return JSON.parse(cachedUserData);
        }

        return null;
    };

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return { checkLocalStorage, saveToLocalStorage };
};

export default useLocalStorage;
