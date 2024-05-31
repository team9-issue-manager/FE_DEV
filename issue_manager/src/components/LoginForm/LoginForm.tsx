import React, { useState } from 'react';
import './SignupForm.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const navigate = useNavigate();

    const handleItemClick = (item: string) => {
        setRole(item);
        console.log(`${item} clicked`);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            id,
            password,
            role,
        };

        try {
            const response = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                console.log('Signup successful');
                navigate('/LoginFormat'); // 회원가입이 성공하면 로그인 페이지로 이동
            } else {
                console.error(result.result); // 회원가입이 실패하면 실패 메시지 출력
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='wrapper0'>
            <div className='wrapper1'>
                <form action=''>
                    <p>Already have an account?</p>
                    <div className='register-link'>
                        <p><a href="#">Log in</a></p> {/* 클릭 시 로그인 페이지로 이동 */}
                    </div>
                </form>
            </div>
            <div className='wrapper2'>
                <form onSubmit={handleSubmit}>
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
                    <div className="role-select">
                        <Dropdown
                            buttonText="Role"
                            content={
                                <div>
                                    <DropdownItem onClick={() => handleItemClick('tester')}>tester</DropdownItem>
                                    <DropdownItem onClick={() => handleItemClick('pl')}>pl</DropdownItem>
                                    <DropdownItem onClick={() => handleItemClick('dev')}>dev</DropdownItem>
                                </div>
                            }
                            onSelect={handleItemClick}
                            selectedItem={role}
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
