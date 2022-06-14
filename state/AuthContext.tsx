import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthSession} from '@supabase/supabase-js';

import {createContext, ReactNode, useContext, useMemo, useState, useEffect} from 'react';

import {LogBox} from 'react-native';

import {supabase} from '../lib/supabase';

type State = {
    session: AuthSession | null | undefined;
};

export const AuthContext = createContext<State | undefined>(undefined);

const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [session, setSession] = useState<AuthSession | null | undefined>(undefined);
    useEffect(() => {
        
        LogBox.ignoreLogs(['Setting a timer']);

        const fetchedSession = supabase.auth.session();

        setSession(fetchedSession || undefined);
        (async() => {
            const storageSession = await AsyncStorage.getItem("supabase.auth.token");
            if(!storageSession){
                setSession((oldSession) => oldSession === undefined ? null : oldSession);
            }
        })(); 

        const {data: authListener} = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                setSession(newSession);
            }
        )
        return () => {
            if(authListener) {
                authListener.unsubscribe();
            }
        }
    },[])

    const value = useMemo(() => ({session}), [session]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

const useAuthContext = () => {
    const context  = useContext(AuthContext);

    if(context === undefined) {
        throw new Error(`useAuthContext must be withing provider`);
    }
    return context;
}

const useAuthUser = () => {
    const {session} = useAuthContext();
    if(session === undefined) {return undefined}
    return session?.user ?? null;
}

export {AuthContextProvider, useAuthContext, useAuthUser};