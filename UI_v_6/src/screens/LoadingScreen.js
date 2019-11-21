import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const LoadingScreen = () => {
    const {tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);
    return null;
};

export default LoadingScreen;