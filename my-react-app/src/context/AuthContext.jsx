
// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const refreshToken = async () => {
        try {
            const res = await fetch('https://login-4-llw0.onrender.com/auth/refresh-token', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (data?.data?.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('accessToken');
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error('Không thể refresh token:', err);
            setIsAuthenticated(false);
        } finally {
            setLoading(false); // ✅ đừng quên
        }
    };

    useEffect(() => {
        console.log('🔥 useEffect in AuthContext chạy');
        refreshToken(); // ✅ gọi luôn refreshToken
    
        // Nếu muốn, bạn vẫn có thể log token cũ (chỉ để debug)
        const token = localStorage.getItem('accessToken');
        console.log('📦 Token từ localStorage:', token);
    }, []);
    
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
