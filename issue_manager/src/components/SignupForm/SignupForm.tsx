import React, { useState } from 'react';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [activeButton, setActiveButton] = useState(' ');
    const navigate = useNavigate();

    const handleButtonClick = (buttonId: string) => {
        setActiveButton(buttonId);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const id = (event.currentTarget.elements.namedItem('id') as HTMLInputElement).value;
        const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
        const role = (event.currentTarget.elements.namedItem('dropdownbox') as HTMLSelectElement).value;

        const data = {
            id,
            password,
            role
        };

        console.log('Simulating register success');
        navigate('/');
        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Register successful');
                navigate('/'); // 가입 성공 시 로그인 페이지로 이동합니다.
            } else {
                console.error('Register failed');
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
                        <Link to="/">Log in</Link>
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
                    <button type="submit" id={activeButton === 'registersuccess' ? 'active' : ''} onClick={() => handleButtonClick('registersuccess')}>
                        <div className='buttonContent'>
                            <span>Sign up</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
