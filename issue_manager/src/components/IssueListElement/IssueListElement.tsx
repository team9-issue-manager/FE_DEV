import React from 'react'
import './IssueListElement.css';

export type Issue = {
    issueNum: number;
    title: string;
    content: string;
    date: string;
    state: number;
    accountId: string;
    devId: string | null;
    projectNum: number;
    tag: string[] | null;
}

type IssueListElementProps = {
    issue: Issue;
    onIssueClick: (issue: Issue) => void;
}

const IssueListElement: React.FC<IssueListElementProps> = ({ issue, onIssueClick }) => {
    return (
        <div>
            <button className='containerIssueListElement' onClick={() => onIssueClick(issue)}>
                <span className='projectTitle'>{issue.projectNum}</span>
                <span className='userId'>{issue.accountId}</span>
                <span className='state'>{issue.state}</span>
                <span className='title'>{issue.title}</span>
                <span className='date'>{issue.date}</span>
            </button>
            <div className='line'></div>
        </div>
    );
}

export default IssueListElement;