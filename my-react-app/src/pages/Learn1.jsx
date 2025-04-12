import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/authFetch';

const Learn1 = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await authFetch('https://login-4-llw0.onrender.com/api/users/myInfo');

                // const res = await authFetch('http://localhost:8080/api/users/myInfo');
                if (res.ok) {
                    const data = await res.json();
                    setUserInfo(data);
                } else if (res.status === 401) {
                    // vẫn không lấy được sau khi refresh
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    return (
        <div>
            {userInfo ? (
                <h2>
                    Xin chào {userInfo.userName} - Quyền: {userInfo.role} - Email: {userInfo.email}
                </h2>
            ) : (
                <p>Đang tải thông tin người dùng...</p>
            )}
        </div>
    );
};

export default Learn1;