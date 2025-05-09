import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    return (
        <UserContext.Provider value={[users, setUsers]}>
            {children}
        </UserContext.Provider>
    )
}

export default AppProvider
