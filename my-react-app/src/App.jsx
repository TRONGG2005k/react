import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Learn1 from './pages/Learn1';
import './App.css'
function App() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Đang tải thông tin đăng nhập...</div>; // hoặc spinner
    }

    return (
        <Routes>
            <Route path="/" element={
                isAuthenticated ? <Navigate to="/learn1" /> : <LoginForm />
            } />
            <Route path="/learn1" element={
                isAuthenticated ? <Learn1 /> : <Navigate to="/" />
            } />
        </Routes>
    );
}

export default App;
