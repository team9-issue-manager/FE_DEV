import React, { useState } from 'react';
import './SignupForm.css';

const LoginForm = () => {
    const [view, setView] = useState(false);
    return (
        <div className='wrapper0'>
            <div className='wrapper1'>
                <form action=''>
                    <p>Already have account?</p>
                    <div className='register-link'>
                        <p><a href="#">Log in</a></p>
                    </div>
                </form>
            </div>
            <div className='wrapper2'>
                <form action="">
                    <div className="input-box">
                        <input type="id" placeholder='ID' required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='PW' required />
                    </div>
                    <select className="dropdownbox" defaultValue={'role'}>
                        <option value="pl">pl</option>
                        <option value="dev" >dev</option>
                        <option value="tester">tester</option>
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

        </div>
    );
};

export default LoginForm;