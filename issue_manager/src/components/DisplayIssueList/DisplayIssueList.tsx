import './DisplayIssueList.css';
import IssueListElement from '../IssueListElement/IssueListElement.tsx'

import { IoFilter } from "react-icons/io5";

const DisplayIssueList = () => {
    return (
        <div>
            <button className='filterButton'>
                <IoFilter />
                <span className='buttonLabel'>Filter</span>
            </button>
            <div className='line'></div>
            <IssueListElement />
            <IssueListElement />
            <IssueListElement />
            <IssueListElement />
            <IssueListElement />
        </div>
    )
}

export default DisplayIssueList;