import React, { useState, useEffect } from 'react';
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

    const fetchComments = async () => {
        try {
            console.log(4);
            const response = await fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`);
            console.log(5);
            const data = await response.json();
            console.log(6);
            if (data.success) {
                console.log(7-1);
                setComments(data.comments as Comment[]);
            } else {
                console.log(7-2);
                setComments([]);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [issue.issueNum]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCommentData = {
            issueNum: issue.issueNum,
            content: newComment,
            accountId: id
        };

        try {
            const response = await fetch(`http://localhost:8080/issue/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentData),
            });

            const data = await response.json();
            console.log('New Comment Data:', data); // 서버에서 반환된 데이터 확인
            console.log('Data success:', data.success);
            console.log('Data comment:', data.comment);
            if (data.success && data.comment) {
                console.log(1);
                setComments(prevComments => [...prevComments, data.comment as Comment]);
                console.log(2);
                setNewComment('');
                console.log(3);
                fetchComments(); // 새로운 댓글 추가 후 모든 댓글 다시 가져오기
                console.log(8);
            } else {
                console.error('Invalid comment data:', data);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
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
                    <div>{id} / {role}</div>
                    <form className='commentBox' onSubmit={handleCommentSubmit}>
                        <input
                            type='text'
                            placeholder='Add Comment...'
                            name='comment'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type='submit'>Submit</button>
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
