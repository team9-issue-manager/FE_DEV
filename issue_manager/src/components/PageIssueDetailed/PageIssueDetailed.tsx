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
    const [newComment, setNewComment] = useState<string>('');

    // 실제 서버 연결 댓글 목록 보기
    // const toggleComments = () => {
    //     fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 setComments(data.comments as Comment[]);
    //             } else {
    //                 setComments([]);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching comments:', error));
    // };

    // 서버 연결 없이 테스트용 댓글 목록 보기
    const fetchComments = () => {
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
    };

    const toggleComments = () => {
        if (!showComments) {
            fetchComments();
        }
        setShowComments(!showComments);
    };

    // 실제 서버 연결 댓글 추가
    // const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const newCommentData = {
    //         issueNum: issue.issueNum,
    //         content: newComment,
    //         accountId: "currentUser" // 현재 사용자 ID로 교체 필요
    //     };

    //     fetch('http://localhost:8080/issue/comments', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newCommentData),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setComments([...comments, data]);
    //             setNewComment('');
    //         })
    //         .catch(error => console.error('Error posting comment:', error));
    // };

    // 테스트용 댓글 추가 기능
    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCommentData: Comment = {
            issueNum: issue.issueNum,
            content: newComment,
            date: new Date().toISOString(),
            commentId: comments.length + 1, // 임시 ID
            accountId: "currentUser" // 현재 사용자 ID로 교체 필요
        };

        setComments([...comments, newCommentData]);
        setNewComment('');
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
                    <div>Description: {issue.content}</div>
                    <div className='divider'></div>
                    <div>Activity</div>
                    <div>// ( role==pl && state==0 ) : Dev 배정: dev 목록에서 고르기.</div>
                    <div>// pl이 dev 배정하면 상태는 자동으로 new에서 assigned로</div>
                    <div>State 변경:</div>
                    <div>// ( role==dev && state==1 ) : [fixed]</div>
                    <div>// ( role==tester && state==2 ) : [resolved] [not fixed]</div>
                    <div>// ( role==pl && state==3 ) : [closed] [not resolved]</div>
                    <form className='commentBox' onSubmit={handleCommentSubmit}>
                        <input
                            type='text'
                            placeholder='Add Comment...'
                            name='comment'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </form>
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