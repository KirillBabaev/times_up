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

/**
 * Context provider component for managing modal state.
 * @param children - The children components to be wrapped by the ModalState.
 * @returns A ModalContext.Provider component with the modal window state and open/close functions.
 */
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