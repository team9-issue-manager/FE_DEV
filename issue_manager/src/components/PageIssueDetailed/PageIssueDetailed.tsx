import React from 'react';
import './PageIssueDetailed.css'
import { Issue } from '../IssueListElement/IssueListElement';

type PageIssueDetailedProps = {
    issue: Issue;
    onBack: () => void;
}

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack }) => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>Issues</span>
            </div>
            <div className='pageBody'>
                <button onClick={onBack}>Back to List</button>
                <div>
                    Issue Title
                </div>
                <div>
                    Activity
                </div>
            </div>
        </div>
    );
}

export default PageIssueDetailed;