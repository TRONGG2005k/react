import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password })
            });

            const data = await response.json();
            console.log(data);

            if (data.data?.accessToken) {
                // console.log(data.data.accessToken);
                
                localStorage.setItem('accessToken', data.data.accessToken);
                alert('Login thành công');
                navigate('/learn1'); // dùng React Router để chuyển trang
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
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
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
