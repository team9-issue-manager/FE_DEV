import React, { useState } from 'react';
import './SignupForm.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';

const SignupForm = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

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
      const response = await fetch('http://localhost:8080/issueFind/', { //여기에 회원가입 url 삽입
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Signup successful');
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
            <p><a href="#">Log in</a></p>
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
                  <DropdownItem onClick={() => handleItemClick('pl')}>pl</DropdownItem>
                  <DropdownItem onClick={() => handleItemClick('tester')}>tester</DropdownItem>
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
