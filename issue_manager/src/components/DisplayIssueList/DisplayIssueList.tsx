import './DisplayIssueList.css';

import { IoFilter } from "react-icons/io5";

const DisplayIssueList = () => {
    return (
        <div className='containerDisplayIssueList'>
            <button className='filterButton'>
                <IoFilter />
                <span className='buttonLabel'>Filter</span>
            </button>
            <div className='line'></div>
        </div>
    )
}

export default DisplayIssueList;