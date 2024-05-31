import React, { useState } from 'react';
import './PageMyIssue.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import { Issue } from '../IssueListElement/IssueListElement'

import { IoFilter } from "react-icons/io5";

const PageMyIssue = () => {
    const [issues, setIssues] = useState<Issue[]>([]);

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
                <div className='divider'></div>
                <DisplayIssueList issues={issues}/>
            </div>
        </div>
    );
}

export default PageMyIssue;