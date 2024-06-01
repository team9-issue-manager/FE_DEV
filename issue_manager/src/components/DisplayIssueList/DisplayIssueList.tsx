import React from 'react';
import './DisplayIssueList.css';
import ElementIssueList, { Issue } from '../ElementIssueList/ElementIssueList.tsx'

type DisplayIssueListProps = {
    issues: Issue[];
    onIssueClick: (issue: Issue) => void;
};

const DisplayIssueList: React.FC<DisplayIssueListProps>  = ({ issues, onIssueClick }) => {
    return (
        <div>
            {issues.length > 0 ? (
                issues.map(issue => (
                    <ElementIssueList
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