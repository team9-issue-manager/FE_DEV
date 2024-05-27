import REact from 'react';
import './LoginForm.css';
import logo_img from '../Assets/logo.png';

const LoginForm = () => {
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
                <form action="">
                    <img src={logo_img} width="282px" height="192px"></img>
                    <div className="input-box">
                        <input type="id" placeholder='ID' required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='PW' required />
                    </div>
                    <button type="submit">Login</button>
                    <div className='register-link'>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;