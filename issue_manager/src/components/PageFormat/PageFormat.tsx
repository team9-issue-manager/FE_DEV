import { useState } from 'react';
import './PageFormat.css';
import PageDefault from '../PageDefault/PageDefault.tsx'
import PageSearch from '../PageSearch/PageSearch.tsx'
import PageMyIssue from '../PageMyIssue/PageMyIssue.tsx'

import ModalPopup from '../Modal/Modal';

import { VscGraph } from "react-icons/vsc";
import { MdOutlineStars } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { RiInbox2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { PiListPlusFill } from "react-icons/pi";
import { CiMap } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

import { useLocation } from 'react-router-dom';


const PageFormat = () => {
    const location = useLocation();
    const { id, role } = location.state || { id: 'fff', role: 'pl' };
    console.log('Location state:', location.state);
    const [currentComponent, setCurrentComponent] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [ModalisOpen, setModalIsOpen] = useState(false);

    const handleButtonClick = (component: string, buttonId: string) => {
        setCurrentComponent(component);
        setActiveButton(buttonId);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'search':
                return <PageSearch id={id} role={role} />;
            case 'issueLog':
                return <span>issueLog</span>;
            case 'myIssue':
                return <PageMyIssue />;
            case 'roadMap':
                return <span>roadMap</span>;
            case 'statistics':
                return <span>statistics</span>;
            case 'ranking':
                return <span>ranking</span>;
            case 'authorize':
                return <span>authorize</span>;
            default:
                return <PageDefault />;
        }
    }

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
                <button id={activeButton === 'search' ? 'active' : ' '} onClick={() => handleButtonClick('search', 'search')}>
                    <div className='buttonContent'>
                        <GoSearch />
                        <span>Search</span>
                    </div>
                </button>
                <button id={activeButton === 'issueLog' ? 'active' : ' '} onClick={() => handleButtonClick('issueLog', 'issueLog')}>
                    <div className='buttonContent'>
                        <RiInbox2Fill />
                        <span>Issue Log</span>
                    </div>
                </button>
                <button id={activeButton === 'myIssue' ? 'active' : ' '} onClick={() => handleButtonClick('myIssue', 'myIssue')}>
                    <div className='buttonContent'>
                        <VscIssues />
                        <span>My Issue</span>
                    </div>
                </button>
                <button id={activeButton === 'roadMap' ? 'active' : ' '} onClick={() => handleButtonClick('roadMap', 'roadMap')}>
                    <div className='buttonContent'>
                        <CiMap />
                        <span>Road Map...</span>
                    </div>
                </button>
                <button id={activeButton === 'statistics' ? 'active' : ' '} onClick={() => handleButtonClick('statistics', 'statistics')}>
                    <div className='buttonContent'>
                        <VscGraph />
                        <span>Statistics</span>
                    </div>
                </button>
                <button id={activeButton === 'ranking' ? 'active' : ' '} onClick={() => handleButtonClick('ranking', 'ranking')}>
                    <div className='buttonContent'>
                        <MdOutlineStars />
                        <span>Ranking</span>
                    </div>
                </button>
                <button id={activeButton === 'authorize' ? 'active' : ' '} onClick={() => handleButtonClick('authorize', 'authorize')}>
                    <div className='buttonContent'>
                        <CiLock />
                        <span>Authorize</span>
                    </div>
                </button>
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