// src/utils/authFetch.js
export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Access token hết hạn → thử refresh
            const newToken = await refreshToken();
            if (newToken) {
                // Thử lại request gốc với token mới
                const retryResponse = await fetch(url, {
                    ...options,
                    headers: {
                        ...headers,
                        'Authorization': `Bearer ${newToken}`
                    }
                });
                return retryResponse;
            }
        }

        return response;
    } catch (error) {
        console.error('authFetch error:', error);
        throw error;
    }
};

const refreshToken = async () => {
    try {
        const res = await fetch('http://localhost:8080/auth/refresh-token', {
            method: 'POST',
            credentials: 'include'
        });

        const data = await res.json();

        if (data?.data?.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            console.log('✅ Token đã được refresh!');
            return data.data.accessToken;
        } else {
            console.warn('⚠️ Refresh token thất bại');
            return null;
        }
    } catch (error) {
        console.error('❌ Lỗi khi refresh token:', error);
        return null;
    }
};

