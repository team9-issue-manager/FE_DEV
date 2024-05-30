import React, { useState } from 'react';
import './PageFormat.css';
import ModalPopup from '../Modal/Modal';

import { VscGraph } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineStars } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { RiInbox2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { PiListPlusFill } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { CiMap } from "react-icons/ci";

const PageFormat = () => {
    const [isSdaExpanded, setIsSdaExpanded] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('A');
    const[ModalisOpen,setModalIsOpen]=useState(false);


    const toggleSdaArrow = () => {
        setIsSdaExpanded(!isSdaExpanded);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'A':
                return <span>New Issue</span>;
            case 'B':
                return <span>Search</span>;
            case 'C':
                return <span>Inbox</span>;
            case 'D':
                return <span>My Issue</span>;
            default:
                return <span>New Issue</span>;
        }
    }

    return (
        <div className='page'>
            <div className='sideMenu'>
                <button>
                    <div className='buttonUsernameContent'>
                        <FaRegUser />
                        <span id='userName'>User Name</span>
                        <IoIosArrowForward />
                    </div>
                </button>
                <button onClick={() => setModalIsOpen(true)}>
                    <div className='buttonContent'>
                        <PiListPlusFill />
                        <span className='buttonLabel'>New Issue</span>
                    </div>
                </button>
                <button onClick={() => setCurrentComponent('B')}>
                    <div className='buttonContent'>
                        <GoSearch />
                        <span className='buttonLabel'>Search</span>
                    </div>
                </button>
                <button onClick={() => setCurrentComponent('C')}>
                    <div className='buttonContent'>
                        <RiInbox2Fill />
                        <span className='buttonLabel'>Inbox</span>
                    </div>
                </button>
                <button onClick={() => setCurrentComponent('D')}>
                    <div className='buttonContent'>
                        <VscIssues />
                        <span className='buttonLabel'>My Issue</span>
                    </div>
                </button>
                <button>
                    <div className='buttonContent'>
                        <CiMap />
                        <span className='buttonLabel'>Road Map...</span>
                    </div>
                </button>
                <p id='yourTeam'>Your Team</p>
                <button onClick={toggleSdaArrow}>
                    <div className='buttonContent'>
                        <span id='arrow'>{isSdaExpanded ? <BiSolidDownArrow /> : <BiSolidUpArrow />}</span>
                        <span className='buttonLabel'>SDA</span>
                    </div>
                </button>
                <button>
                    <div className='buttonContent'>
                        <VscGraph />
                        <span className='buttonLabel'>Statistics</span>
                    </div>
                </button>
                <button>
                    <div className='buttonContent'>
                        <MdOutlineStars />
                        <span className='buttonLabel'>Ranking</span>
                    </div>
                </button>
                <button>
                    <div className='buttonContent'>
                        <IoMdNotificationsOutline />
                        <span className='buttonLabel'>Notify</span>
                    </div>
                </button>
            </div>
            <div className='topBanner'>
                <div id='menuName'>
                    menu name
                </div>
                <div>
                    additional buttons
                </div>
            </div>
            <div className='main'>
                {renderComponent()}
            </div>
        </div>
    );
};

export default PageFormat;