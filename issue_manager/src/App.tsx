import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
// import PageFormat from './components/PageFormat/PageFormat'
// import ModalPopup from './components/Modal/Modal'

const App: React.FC = () => {
  return (
    <div>
      {/* <SignupForm></SignupForm> */}
      <LoginForm></LoginForm>
      {/* <PageFormat></PageFormat> */}
      {/* <ModalPopup></ModalPopup> */}
    </div>
  );
}

export default App;
