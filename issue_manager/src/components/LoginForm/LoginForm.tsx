import React, { useState } from 'react';
import './LoginForm.css';
import logo_img from '../Assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(' ');

    const handleButtonClick = (buttonId: string) => {
        setActiveButton(buttonId);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const data = {
        //     id,
        //     password
        // };
        // 서버 요청 없이 회원가입 성공을 시뮬레이션하는 코드
        console.log('Login success');
        navigate('/PageFormat'); // 가입 성공 시 로그인 페이지로 이동합니다.
    }
    

    //     try {
    //         const response = await fetch('http://localhost:8080/user/find', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         if (response.ok) {
    //             const responseData = await response.json();
    //             const { success, id, role } = responseData;
    //             if (success) {
    //                 navigate('/PageFormat', { state: { id, role } }); // 다음 페이지로 id와 role 정보를 전달합니다.
    //             } else {
    //                 console.error('Login failed');
    //             }
    //         } else {
    //             console.error('Login failed');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }

    return (
        <div className='wrapper0'>
            <div className='wrapper1'>
                <form>
                    <p>Don't have an account?</p>
                    <p>
                        <Link to="/signup">Register</Link>
                    </p>
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
                    <button type="submit" id={activeButton === 'loginsuccess' ? 'active' : ''} onClick={() => handleButtonClick('loginsuccess')}>
                        <div className='buttonContent'>
                            <span>Login</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
