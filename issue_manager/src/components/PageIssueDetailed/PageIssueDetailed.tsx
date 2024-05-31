import React, { useState } from 'react';
import './PageIssueDetailed.css'
import { Issue } from '../ElementIssueList/ElementIssueList';
import DisplayCommentList from '../DisplayCommentList/DisplayCommentList.tsx'
import { Comment } from '../ElementCommentList/ElementCommentList';

import { IoIosArrowBack } from "react-icons/io";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

type PageIssueDetailedProps = {
    issue: Issue;
    onBack: () => void;
}

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack }) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);

    // 실제 서버 연결
    // const toggleComments = () => {
    //     if (!showComments) {
    //         fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success) {
    //                     setComments(data.comments as Comment[]);
    //                 } else {
    //                     setComments([]);
    //                 }
    //             })
    //             .catch(error => console.error('Error fetching comments:', error));
    //     }
    //     setShowComments(!showComments);
    // };

    // 서버 연결 없이 테스트용
    const toggleComments = () => {
        if (!showComments) {
            const testComments = [
                {
                    issueNum: issue.issueNum,
                    content: "테스트 댓글 1",
                    date: "2024-05-30T11:51:47.825+00:00",
                    commentId: 1,
                    accountId: "testUser1"
                },
                {
                    issueNum: issue.issueNum,
                    content: "테스트 댓글 2",
                    date: "2024-05-30T11:57:27.945+00:00",
                    commentId: 2,
                    accountId: "testUser2"
                }
            ];

            setComments(testComments);
        }
        setShowComments(!showComments);
    };

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
                    <div className='commentBox'>
                        <input
                            type='text'
                            placeholder='Add Comment...'
                            name='comment' />
                    </div>
                    <button className='toggleCommentButton' onClick={toggleComments}>
                        {showComments ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    {showComments && (
                        <div className='containerComment'>
                            <DisplayCommentList comments={comments} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PageIssueDetailed;