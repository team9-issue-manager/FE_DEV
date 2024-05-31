import React, { useState } from 'react';
import './SignupForm.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 사용

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const id = event.currentTarget.id.valueOf;
        const password = event.currentTarget.password.value;
        const role = event.currentTarget.dropdownbox.value;

        const data = {
            id,
            password,
            role
        };

        try {
            const response = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Signup successful');
                navigate('/LoginPage');
                // 회원가입이 성공하면 어떤 동작을 수행할지 여기에 작성합니다.
            } else {
                console.error('Signup failed');
                // 회원가입이 실패하면 어떤 동작을 수행할지 여기에 작성합니다.
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
                            name="id"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='PW'
                            name="password"
                            required
                        />
                    </div>
                    <div className="role-select">
                        <select className="dropdownbox" defaultValue={'role'} name="dropdownbox">
                            <option value="pl">pl</option>
                            <option value="dev">dev</option>
                            <option value="tester">tester</option>
                        </select>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
