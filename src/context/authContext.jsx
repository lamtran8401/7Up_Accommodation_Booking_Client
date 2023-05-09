import React, { createContext, useState } from 'react';

const AuthContext = createContext();

localStorage.setItem(
    'user',
    JSON.stringify({
        id: 12,
        name: 'Nguyễn Văn A',
        email: 'alo@gmail.com',
        phone: '0123456789',
    }),
);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || {});
    const setCurrentUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const currentUser = JSON.parse(user);

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {React.Children.only(children)}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
