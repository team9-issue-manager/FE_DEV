import React, { useState } from 'react';
import './LoginForm.css';
import logo_img from '../Assets/logo.png';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../PageFormat/PageFormat'
import { useNavigate } from 'react-router-dom';



interface LoginFormProps {
    apiUrl: string; // 백엔드 API 주소
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 사용

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            id,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Login successful');
                navigate('/pageformat');
                // 로그인이 성공하면 어떤 동작을 수행할지 여기에 작성합니다.
            } else {
                console.error('Login failed');
                // 로그인이 실패하면 어떤 동작을 수행할지 여기에 작성합니다.
            }
        } catch (error) {
            console.error('Error:', error);
            // 네트워크 또는 기타 오류가 발생하면 여기에 작성합니다.
        }
    };

    return (
        <div className='wrapper0'>
            <div className='wrapper1'>
                <form action=''>
                    <p>Don't have an account?</p>
                    <div className='register-link'>
                        <p><a href="#">Register</a></p>
                    </div>
                </form>
            </div>
            <div className='wrapper2'>
                <form onSubmit={handleSubmit}>
                    <img src={logo_img} alt="Logo" width="282px" height="192px" />
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='ID'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='PW'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
