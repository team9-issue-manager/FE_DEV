import React from 'react';
import './DisplayIssueList.css';
import IssueListElement, { Issue } from '../IssueListElement/IssueListElement.tsx'

type DisplayIssueListProps = {
    issues: Issue[];
    onIssueClick: (issue: Issue) => void;
};

const DisplayIssueList: React.FC<DisplayIssueListProps>  = ({ issues, onIssueClick }) => {
    return (
        <div className='containerIssueList'>
            {issues.length > 0 ? (
                issues.map(issue => (
                    <IssueListElement 
                        key={issue.issueNum} 
                        issue={issue} 
                        onIssueClick={onIssueClick}/>
                ))
            ) : (
                <div>No issues found</div>
            )}
        </div>
    )
}

export default DisplayIssueList;