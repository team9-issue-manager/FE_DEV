import React, { useState } from 'react';
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

const getStateString = (state: number): string => {
    switch (state) {
        case 0: return 'New';
        case 1: return 'Assigned';
        case 2: return 'Fixed';
        case 3: return 'Resolved';
        case 4: return 'Closed';
        default: return 'Unknown';
    }
}

const getPriorityString = (priority: number): string => {
    switch (priority) {
        case 1: return 'Blocker';
        case 2: return 'Critical';
        case 3: return 'Major';
        case 4: return 'Minor';
        case 5: return 'Trivial';
        default: return 'Major';
    }
}

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack, id, role }) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [devId, setDevId] = useState<string>('');

    // comment 검색 - 서버용
    const fetchComments = () => {
        fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setComments(data.comment as Comment[]);
                } else {
                    setComments([]);
                }
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    const toggleComments = () => {
        fetchComments();
        setShowComments(!showComments);
    };

    // comment 등록 - 서버용
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
            if (data.success && data.comment) {
                setComments(prevComments => [...prevComments, data.comment as Comment]);
                setNewComment('');
            } else {
                console.error('Invalid comment data:', data);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    // assign dev auto - 서버용
    const handleAssignDev = async () => {
        const assignDevData = {
            accountId: id,
            issueNum: issue.issueNum,
        };

        try {
            const response = await fetch(`http://localhost:8080/issue/assignDevAuto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignDevData),
            });

            const data = await response.json();
            if (data.success as boolean) {
                alert('Developer assigned successfully');
            } else {
                alert('Failed to assign developer');
            }
        } catch (error) {
            console.error('Error assigning developer:', error);
            alert('Error assigning developer');
        }
    };


    // direct dev auto - 서버용
    const handleDirectAssign = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const directAssignData = {
            accountId: id,
            issueNum: issue.issueNum,
            devId: devId,
        };

        try {
            const response = await fetch(`http://localhost:8080/issue/assignDev`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(directAssignData),
            });

            const data = await response.json();
            if (data.success) {
                alert('Developer assigned successfully');
            } else {
                alert('Failed to assign developer');
            }
        } catch (error) {
            console.error('Error assigning developer:', error);
            alert('Error assigning developer');
        }
    };

    // change state - 서버용
    const handleChangeState = async () => {
        const changeStateData = {
            issueNum: issue.issueNum,
            accountId: id
        };

        try {
            const response = await fetch(`http://localhost:8080/issue/changeState`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeStateData),
            });

            const data = await response.json();
            if (data.success as boolean) {
                alert('Changed state successfully');
            } else {
                alert('Failed to change state');
            }
        } catch (error) {
            console.error('Error changing state:', error);
            alert('Error changing state');
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
                    <div className='divider'></div>
                    <div className="issueTitle">Issue Title: {issue.title}</div>
                    <div>Project: {issue.projectNum}</div>
                    <div>Priority: {getPriorityString(issue.priority)}</div>
                    <div>Reporter: {issue.accountId}</div>
                    <div>Reported Date: {issue.date}</div>
                    <div>Assignee/Fixer: {issue.devId ? issue.devId : 'N/A'} </div>
                    <div>State: {getStateString(issue.state)}</div>
                    <div className='description'>
                        Description:
                        <div>{issue.content}</div>
                    </div>
                    <div className='divider'></div>
                    <div className='activity'>Activity</div>
                    {(role === 'pl' && issue.state === 0) ? (
                        <div className='containerChangeState'>
                            <div>Assign Developer: </div>
                            <div className='containerAssignDev'>
                                <form className='containerDirectAssign' onSubmit={handleDirectAssign}>
                                    <input 
                                        type='text'
                                        placeholder='Enter Developer ID'
                                        name='devId' 
                                        value={devId}
                                        onChange={(e) => setDevId(e.target.value)}/>
                                    <button type='submit'>Assign</button>
                                </form>
                                <span>OR</span>
                                <button onClick={handleAssignDev}>Auto Assign</button>
                            </div>
                        </div>
                    ) : (
                        issue.state !== 4 ? (
                            <div className='containerChangeState'>
                                <div>Change State: </div>
                                <button className='changeState' onClick={handleChangeState}>Change to {getStateString(issue.state + 1)}</button>
                            </div>
                        ) : (
                            <div className='containerChangeState'>
                                <div>Reopen State: </div>
                                <button className='changeState' onClick={handleChangeState}>Reopen Issue</button>
                            </div>
                        )
                    )}
                    <div>Add Comment: </div>
                    <form className='commentBox' onSubmit={handleCommentSubmit}>
                        <input
                            type='text'
                            placeholder='Enter Comment'
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
