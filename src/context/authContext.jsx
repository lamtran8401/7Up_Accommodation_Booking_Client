import React, { createContext, useState } from 'react';

const AuthContext = createContext();

// localStorage.setItem(
//     'user',
//     JSON.stringify({
//         id: 12,
//         name: 'Nguyễn Văn A',
//         email: 'alo@gmail.com',
//         phone: '0123456789',
//     }),
// );

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const roles =
        JSON.parse(localStorage.getItem('user')) != null ? JSON.parse(localStorage.getItem('user')).roles : [];
    const [permissions, setPermissions] = useState(roles);
    const logout = () => {
        setUser(null);
        setPermissions([]);
        localStorage.removeItem('user');
    };

    const setCurrentUser = (user) => {
        setUser(user);

        setPermissions(user.roles);
        localStorage.setItem('user', JSON.stringify(user));
    };
    const hasPermission = (permission) => {
        // Kiểm tra xem người dùng có quyền truy cập hay không
        return permissions.includes(permission);
    };
    const currentUser = user;
    console.log(permissions);
    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser, logout, hasPermission]}>
            {React.Children.only(children)}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
