import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, ReactNode, useContext, useMemo, useState, useEffect} from 'react';

import {LogBox} from 'react-native';

import {supabase} from '../lib/supabase';
import {useAuthUser} from './AuthContext';

type State = {
    userData: {} | null | undefined;
};

export const UserContext = createContext<State | undefined>(undefined);

const UserContextProvider = ({children}: {children: ReactNode}) => {
    const [userData, setUserData] = useState<{} | null | undefined>(undefined);
    const user = useAuthUser();
    const getUserDetails = async () => {
        const { data, error } = await supabase
            .from('user-db')
            .select()
            .match({ uuid: user?.id })
        if (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
        const userDetails = getUserDetails();
        setUserData(userDetails || undefined);
        (async() => {
            const storageUser = await AsyncStorage.getItem("user-data");
            if(!storageUser){
                setUserData((data) => data === undefined ? null : data);
            }
        })(); 
    },[])

    const value = useMemo(() => ({userData}), [userData]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}
const useUserContext = () => {
    const context  = useContext(UserContext);

    if(context === undefined) {
        throw new Error(`useAuthContext must be withing provider`);
    }
    return context;
}


const activeUser = () => {
    const {userData} = useUserContext();
    if(userData === undefined) {return undefined}
    return userData ?? null;
}


export {UserContextProvider, useUserContext, activeUser};