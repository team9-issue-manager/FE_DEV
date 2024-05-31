import React, { useState } from 'react';
import './SignupForm.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 사용

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
  
      try {
          const response = await fetch('http://localhost:8080/user/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
  
          if (response.ok) {
              const responseData = await response.json();
              if (responseData.success) {
                  console.log('Signup successful');
                  navigate('/LoginPage');
              } else {
                  console.error('Signup failed:', responseData.result);
              }
          } else {
              console.error('Signup failed');
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
