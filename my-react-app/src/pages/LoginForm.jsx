import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // import context

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext); // Lấy setIsAuthenticated từ context

    const handleLogin = async () => {
        try {
            const response = await fetch('https://login-4-llw0.onrender.com/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password })
            });

            const data = await response.json();
            console.log(data);

            if (data.data.accessToken) {
                console.log(data.data.accessToken);
                localStorage.setItem('accessToken', data.data.accessToken);
                alert('Login thành công');

                // Cập nhật isAuthenticated ngay lập tức
                setIsAuthenticated(true);

                setTimeout(() => {
                    navigate('/learn1');
                }, 100); // Chờ một chút để tránh vấn đề với alert()
            } else {
                alert('Sai tài khoản hoặc mật khẩu');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <h2>Đăng nhập</h2>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
