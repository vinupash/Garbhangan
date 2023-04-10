import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [userTokan, setUserTokan] = useState(null)

    const userLogin = () => {
        setLoading(true)
        setUserTokan('t2g9t2qo2t1dq369tfd6oaif00ak4prs')
        AsyncStorage.setItem('userTokan', 't2g9t2qo2t1dq369tfd6oaif00ak4prs')
        setLoading(false)
    }

    const userLogout = () => {
        setLoading(true)
        setUserTokan(null)
        AsyncStorage.removeItem('userTokan')
        setLoading(false)
    }

    const isUserLogged = async () => {
        try {
            setLoading(true)
            let userTokan = await AsyncStorage.getItem('userTokan')
            setUserTokan(userTokan)
            setLoading(false)
        } catch (error) {
            console.log(`isUserLogged in ${error}`);
        }
    }

    useEffect(() => {
        isUserLogged()
    }, [])

    return (
        <AuthContext.Provider value={{
            userLogin,
            userLogout,
            isLoading,
            userTokan,
        }}>
            {children}
        </AuthContext.Provider>
    )
}