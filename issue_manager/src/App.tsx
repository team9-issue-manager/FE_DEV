import React from 'react';
import SignupForm from './components/SignupForm/SignupForm';
// import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter } from 'react-router-dom';
// import PageFormat from './components/PageFormat/PageFormat'
// import ModalPopup from './components/Modal/Modal'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
      <SignupForm></SignupForm>
      {/* <LoginForm></LoginForm> */}
      {/* <PageFormat></PageFormat> */}
      {/* <ModalPopup></ModalPopup> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
