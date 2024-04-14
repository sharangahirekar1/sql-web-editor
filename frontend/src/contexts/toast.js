import React, { createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const toastContext = createContext();

const ToastProvider = ({children}) => {
    const toast = useToast();
    return (
        <toastContext.Provider value={{toast}}>
            {children}
        </toastContext.Provider>
    )
}

export default ToastProvider;
