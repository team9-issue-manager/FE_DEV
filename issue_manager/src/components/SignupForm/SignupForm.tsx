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
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Signup successful');
        // Handle successful signup
      } else {
        console.error('Signup failed');
        // Handle failed signup
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
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
                <>
                  <DropdownItem>pl</DropdownItem>
                  <DropdownItem>tester</DropdownItem>
                  <DropdownItem>dev</DropdownItem>
                </>
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
