import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, setState] = useState(null);

    return (
        <AuthContext.Provider value={{ state, setState }}>
            {children}
        </ AuthContext.Provider>
    );
};

export default AuthContextProvider;

// Custom hook for easier usage
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) { throw new Error("useAuthContextProvider must be used within a AuthContext") }
    return context;
};