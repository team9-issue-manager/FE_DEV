import React from 'react'
import './IssueListElement.css';

export type Issue = {
    issueNum: number;
    title: string;
    content: string;
    devId: string;
    projectId: number;
    projectTitle: string;
    state: number;
    date: string;
}

type IssueListElementProps = {
    issue: Issue;
    onIssueClick: (issue: Issue) => void;
}

const IssueListElement: React.FC<IssueListElementProps> = ({ issue, onIssueClick }) => {
    return (
        <div>
            <button className='containerIssueListElement' onClick={() => onIssueClick(issue)}>
                <span className='projectTitle'>{issue.projectTitle}</span>
                <span className='devId'>{issue.devId}</span>
                <span className='state'>{issue.state}</span>
                <span className='title'>{issue.title}</span>
                <span className='date'>{issue.date}</span>
            </button>
            <div className='line'></div>
        </div>
    );
}

export default IssueListElement;