import React, { useState, useEffect, useCallback } from 'react';
import './PageIssueDetailed.css';
import { Issue } from '../ElementIssueList/ElementIssueList';
import DisplayCommentList from '../DisplayCommentList/DisplayCommentList.tsx';
import { Comment } from '../ElementCommentList/ElementCommentList';
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

type PageIssueDetailedProps = {
    issue: Issue;
    onBack: () => void;
    id: string;
    role: string;
}

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack, id, role }) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    const fetchComments = useCallback(async () => {
        try {
            // 주석 처리: 서버 요청 대신 로컬 데이터를 사용합니다.
            // const response = await fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`);
            // const data = await response.json();
            // if (data.success) {
            //     setComments(data.comments as Comment[]);
            // } else {
            //     setComments([]);
            // }
            
            // 테스트용 로컬 데이터
            const localComments: Comment[] = [
                {
                    issueNum: issue.issueNum,
                    content: 'Test comment 1',
                    date: new Date().toISOString(),
                    commentId: 1,
                    accountId: 'user1'
                },
                {
                    issueNum: issue.issueNum,
                    content: 'Test comment 2',
                    date: new Date().toISOString(),
                    commentId: 2,
                    accountId: 'user2'
                }
            ];
            setComments(localComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [issue.issueNum]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCommentData: Comment = {
            issueNum: issue.issueNum,
            content: newComment,
            date: new Date().toISOString(),
            commentId: comments.length + 1,  // 임시로 commentId를 설정합니다.
            accountId: id
        };

        try {
            // 주석 처리: 서버 요청 대신 로컬 상태를 업데이트합니다.
            // const response = await fetch(`http://localhost:8080/issue/comments`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(newCommentData),
            // });

            // const data = await response.json();
            // if (data.success && data.comment) {
            //     setComments(prevComments => [...prevComments, data.comment as Comment]);
            //     setNewComment('');
            // } else {
            //     console.error('Invalid comment data:', data);
            // }

            // 테스트용 로컬 상태 업데이트
            setComments(prevComments => [...prevComments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleAssignDev = async () => {
        const assignDevData = {
            accountid: id,
            issueNum: issue.issueNum,
        };

        try {
            // 주석 처리: 서버 요청 대신 알림을 표시합니다.
            // const response = await fetch(`http://localhost:8080/issue/assignDevAuto`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(assignDevData),
            // });

            // const data = await response.json();
            // if (data.success) {
            //     alert('Developer assigned successfully');
            // } else {
            //     alert('Failed to assign developer');
            // }

            // 테스트용 알림
            alert('Developer assigned successfully (test)');
        } catch (error) {
            console.error('Error assigning developer:', error);
            alert('Error assigning developer');
        }
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
                    {role === 'pl' && (
                        <>
                            <div>Assign Dev: </div>
                            <button className='assignDevButton' onClick={handleAssignDev}>Assign Developer</button>
                        </>
                    )}
                    <div>{id} / {role}</div>
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
