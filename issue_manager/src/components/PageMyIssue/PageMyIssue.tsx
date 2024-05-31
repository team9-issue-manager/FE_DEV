import './PageMyIssue.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'

import { IoFilter } from "react-icons/io5";

const PageMyIssue = () => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>My Issues</span>
                <button>
                    <span>Created</span>
                </button>
                <button>
                    <span>Assigned</span>
                </button>
                <button>
                    <span>Subscribed</span>
                </button>
            </div>
            <div className='pageBody'>
                <button className='filterButton'>
                    <IoFilter />
                    <span>Filter</span>
                </button>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <DisplayIssueList />
            </div>
        </div>
    );
}

export default PageMyIssue;