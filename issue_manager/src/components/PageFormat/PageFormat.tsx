import { useState } from 'react';
import './PageFormat.css';
import PageDefault from '../PageDefault/PageDefault.tsx';
import PageSearch from '../PageSearch/PageSearch.tsx';
import AuthorizePage from '../AuthorizePage/AuthorizePage.tsx';
import ModalPopup from '../Modal/Modal';
import StatisticsPage from '../StatisticsPage/StatisticsPage.tsx';
import CreatePage from '../CreateProject/CreateProject.tsx';
import { VscGraph } from "react-icons/vsc";
import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useLocation } from 'react-router-dom';

const PageFormat = () => {
    const location = useLocation();
    const { id, role } = location.state || { id: 'fff', role: 'pl' };
    const [currentComponent, setCurrentComponent] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [ModalisOpen, setModalIsOpen] = useState(false);

    const handleButtonClick = (component: string, buttonId: string) => {
        if ((component === 'authorize' || component === 'createProject') && role !== 'admin') {
            alert('You do not have permission to access this page.');
            return;
        }
        setCurrentComponent(component);
        setActiveButton(buttonId);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'search':
                return <PageSearch id={id} role={role} />;
            case 'statistics':
                return <span><StatisticsPage /></span>;
            case 'authorize':
                return <AuthorizePage />;
            case 'createProject':
                return <CreatePage />;
            default:
                return <PageDefault />;
        }
    };

    return (
        <div className='page'>
            <div className='sideMenu'>
                <div id='usernameContent'>
                    <FaRegUser />
                    <span>{id} / {role}</span>
                </div>
                <button id='newIssueButton' onClick={() => setModalIsOpen(true)}>
                    <div>
                        <PiListPlusFill />
                        <span id='newIssueLabel'>New Issue</span>
                    </div>
                </button>
                <button id={activeButton === 'search' ? 'active' : ''} onClick={() => handleButtonClick('search', 'search')}>
                    <div className='buttonContent'>
                        <GoSearch />
                        <span>Search</span>
                    </div>
                </button>
                <button id={activeButton === 'statistics' ? 'active' : ''} onClick={() => handleButtonClick('statistics', 'statistics')}>
                    <div className='buttonContent'>
                        <VscGraph />
                        <span>Statistics</span>
                    </div>
                </button>
                {role === 'admin' &&
                    <button id={activeButton === 'authorize' ? 'active' : ''} onClick={() => handleButtonClick('authorize', 'authorize')}>
                    <div className='buttonContent'>
                        <CiLock />
                        <span>Authorize</span>
                    </div>
                </button>
}
                {role === 'admin' &&
                    <button id={activeButton === 'createProject' ? 'active' : ''} onClick={() => handleButtonClick('createProject', 'createProject')}>
                        <div className='buttonContent'>
                            <MdOutlineCreateNewFolder />
                            <span>Create Project</span>
                        </div>
                    </button>
                }
            </div>
            <div className='main'>
                {renderComponent()}
            </div>
            <ModalPopup
                isOpen={ModalisOpen}
                closeModal={() => setModalIsOpen(false)}
                userId={id}
                userRole={role} />
        </div>
    );
};

export default PageFormat;
