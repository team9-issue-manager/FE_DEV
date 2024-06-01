import { useState } from 'react';
import './PageFormat.css';
import PageDefault from '../PageDefault/PageDefault.tsx'
import PageSearch from '../PageSearch/PageSearch.tsx'
import PageMyIssue from '../PageMyIssue/PageMyIssue.tsx'

import ModalPopup from '../Modal/Modal';

import { VscGraph } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineStars } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { RiInbox2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { PiListPlusFill } from "react-icons/pi";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


const PageFormat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, role } = location.state || { id: 'defaultID', role: 'tester' };
    const [isSdaExpanded, setIsSdaExpanded] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    const [ModalisOpen, setModalIsOpen] = useState(false);


    const toggleSdaArrow = () => {
        setIsSdaExpanded(!isSdaExpanded);
    };

    const handleButtonClick = (component: string, buttonId: string) => {
        setActiveButton(buttonId);
        navigate(`${component}`, { state: { id, role } });
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
                <button id={activeButton === 'search' ? 'active' : ' '} onClick={() => handleButtonClick('search', 'search')}>
                    <div className='buttonContent'>
                        <GoSearch />
                        <span>Search</span>
                    </div>
                </button>
                <button id={activeButton === 'inbox' ? 'active' : ' '} onClick={() => handleButtonClick('inbox', 'inbox')}>
                    <div className='buttonContent'>
                        <RiInbox2Fill />
                        <span>Inbox</span>
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
                <p id='yourTeam'>Your Team</p>
                <button id={isSdaExpanded ? 'active' : ' '} onClick={toggleSdaArrow}>
                    <div className='buttonContent'>
                        <span id='arrow'>{isSdaExpanded ? <BiSolidDownArrow /> : <BiSolidUpArrow />}</span>
                        <span>SDA</span>
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
                <button id={activeButton === 'notify' ? 'active' : ' '} onClick={() => handleButtonClick('notify', 'notify')}>
                    <div className='buttonContent'>
                        <IoMdNotificationsOutline />
                        <span>Notify</span>
                    </div>
                </button>
            </div>
            <div className='main'>
                <Routes>
                    <Route path="search" element={<PageSearch />} />
                    <Route path="inbox" element={<div>Inbox Page</div>} />
                    <Route path="myIssue" element={<PageMyIssue />} />
                    <Route path="roadMap" element={<div>Road Map Page</div>} />
                    <Route path="statistics" element={<div>Statistics Page</div>} />
                    <Route path="ranking" element={<div>Ranking Page</div>} />
                    <Route path="notify" element={<div>Notify Page</div>} />
                    <Route path="/" element={<PageDefault />} />
                </Routes>
            </div>
            <ModalPopup isOpen={ModalisOpen} closeModal={() => setModalIsOpen(false)} />
        </div>
    );
};

export default PageFormat;