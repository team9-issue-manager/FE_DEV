import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import PageFormat from './components/PageFormat/PageFormat';

const App = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/PageFormat" element={<PageFormat />} />
            <Route path="/" element={<LoginForm />} />
        </Routes>
    );
};

export default App;