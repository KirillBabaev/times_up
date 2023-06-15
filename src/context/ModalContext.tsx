import React, {createContext, useState} from "react";

interface IModalContext {
    modal: boolean
    open: () => void
    close: () => void
}

export const ModalContext = createContext<IModalContext>({
    modal: false,
    open: () => {
    },
    close: () => {
    }
})

export const ModalState = ({children}: { children: React.ReactNode }) => {
    const [modal, setModal] = useState(false)

    const open = () => {
        setModal(true)
        console.log(modal)
    };
    const close = () => {
        setModal(false)
        console.log(modal)
    };

    return (
        <ModalContext.Provider value={{modal, open, close}}>
            {children}
        </ModalContext.Provider>
    )
}