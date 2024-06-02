import React from 'react'
import './ElementIssueList.css';

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
    priority: number;
}

type ElementIssueListProps = {
    issue: Issue;
    onIssueClick: (issue: Issue) => void;
}

// 숫자 상태를 문자열로 변환하는 함수
const getStateString = (state: number): string => {
    switch(state) {
        case 0: return 'New';
        case 1: return 'Assigned';
        case 2: return 'Fixed';
        case 3: return 'Resolved';
        case 4: return 'Closed';
        default: return 'Unknown';
    }
}

const getPriorityString = (priority: number) : string => {
    switch(priority) {
        case 1: return 'Blocker';
        case 2: return 'Critical';
        case 3: return 'Major';
        case 4: return 'Minor';
        case 5: return 'Trivial';
        default: return 'Major';
    }
}

const ElementIssueList: React.FC<ElementIssueListProps> = ({ issue, onIssueClick }) => {
    return (
        <div>
            <button className='containerElementIssueList' onClick={() => onIssueClick(issue)}>
                <span className='priority'>{getPriorityString(issue.priority)}</span>
                <span className='state'>{getStateString(issue.state)}</span>
                <span className='project'>{issue.projectNum}</span>
                <span className='title'>{issue.title}</span>
                <span className='userId'>{issue.accountId}</span>
                <span className='date'>{issue.date}</span>
            </button>
            <div className='line'></div>
        </div>
    );
}

export default ElementIssueList;