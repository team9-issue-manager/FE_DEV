import React from 'react';
import './PageIssueDetailed.css'
import { Issue } from '../ElementIssueList/ElementIssueList';
import DisplayCommentList from '../DisplayCommentList/DisplayCommentList.tsx'

import { IoIosArrowBack } from "react-icons/io";

type PageIssueDetailedProps = {
    issue: Issue;
    onBack: () => void;
}

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack }) => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>Issue Detail Page</span>
            </div>
            <div className='pageBody'>
                <button className='backToListButton' onClick={onBack}>
                    <IoIosArrowBack />
                    <span>Back to List</span>
                </button>
                <div className='containerIssueDetailed'>
                    <div>Project: {issue.projectNum}</div>
                    <div>Issue Title: {issue.title}</div>
                    <div>Created by: {issue.accountId}</div>
                    <div>Created Date: {issue.date}</div>
                    <div>State: {issue.state}</div>
                    <div>Issue Content: {issue.content}</div>
                    <div className='divider'></div>
                    <div>Activity</div>
                    <div>State 변경: </div>
                    <div>Comment 입력창: </div>
                    <div className='commentBox'>
                        <input
                            type='text'
                            placeholder='Add Comment...'
                            name='comment' />
                    </div>
                    <div>Comment 불러오기: </div>
                    <div className='containerComment'>
                       <DisplayCommentList /> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageIssueDetailed;