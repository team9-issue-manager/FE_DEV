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

const PageIssueDetailed: React.FC<PageIssueDetailedProps> = ({ issue, onBack, id, role }) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    // comment 검색 - 서버용
    // const fetchComments = useCallback(async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/issue/${issue.issueNum}/comments`);
    //         const data = await response.json();
    //         if (data.success) {
    //             setComments(data.comments as Comment[]);
    //         } else {
    //             setComments([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //     }
    // }, [issue.issueNum]);
    // comment 검색 - 서버용

    // comment 검색 - 테스트용
    const fetchComments = useCallback(async () => {
        try {
            const localComments: Comment[] = [
                {
                    issueNum: issue.issueNum,
                    content: 'Test comment 1',
                    date: new Date().toISOString(),
                    commentNum: 1,
                    accountId: 'user1'
                },
                {
                    issueNum: issue.issueNum,
                    content: 'Test comment 2',
                    date: new Date().toISOString(),
                    commentNum: 2,
                    accountId: 'user2'
                }
            ];
            setComments(localComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [issue.issueNum]);
    // comment 검색 - 테스트용

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // comment 등록 - 서버용
    // const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const newCommentData = {
    //         issueNum: issue.issueNum,
    //         content: newComment,
    //         accountId: id
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:8080/issue/comments`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newCommentData),
    //         });

    //         const data = await response.json();
    //         if (data.success && data.comment) {
    //             setComments(prevComments => [...prevComments, data.comment as Comment]);
    //             setNewComment('');
    //         } else {
    //             console.error('Invalid comment data:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error posting comment:', error);
    //     }
    // };
    // comment 등록 - 서버용


    // comment 등록 - 테스트용
    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCommentData: Comment = {
            issueNum: issue.issueNum,
            content: newComment,
            date: new Date().toISOString(),
            commentNum: comments.length + 1,  // 임시로 commentId를 설정합니다.
            accountId: id
        };

        try {
            setComments(prevComments => [...prevComments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }
    // comment 등록 - 테스트용

    // assign dev - 서버용
    // const handleAssignDev = async () => {
    //     const assignDevData = {
    //         accountid: id,
    //         issueNum: issue.issueNum,
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:8080/issue/assignDevAuto`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(assignDevData),
    //         });

    //         const data = await response.json();
    //         if (data.success as boolean) {
    //             alert('Developer assigned successfully');
    //         } else {
    //             alert('Failed to assign developer');
    //         }

    //         alert('Developer assigned successfully (test)');
    //     } catch (error) {
    //         console.error('Error assigning developer:', error);
    //         alert('Error assigning developer');
    //     }
    // };
    // assign dev - 서버용

    // assign dev - 테스트용
    const handleAssignDev = async () => {
        try {
            alert('Developer assigned successfully (test)');
        } catch (error) {
            console.error('Error assigning developer:', error);
            alert('Error assigning developer');
        }
    };
    // assign dev - 테스트용

    // change state - 서버용
    // const handleChangeState = async () => {
    //     const changeStateData = {
    //         issueNum: issue.issueNum,
    //         accountId: id
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:8080/issue/changeState`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(changeStateData),
    //         });

    //         const data = await response.json();
    //         if (data.success as boolean) {
    //             alert('Changed state successfully');
    //         } else {
    //             alert('Failed to change state');
    //         }
    //     } catch (error) {
    //         console.error('Error changing state:', error);
    //         alert('Error changing state');
    //     }
    // };
    // change state - 서버용

    // change state - 테스트용
    const handleChangeState = async () => {
        try {
            alert('Changed state successfully (test)');
        } catch (error) {
            console.error('Error changing state:', error);
            alert('Error changing state');
        }
    };
    // change state - 테스트용

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
                    {role === 'pl' && issue.state === 0 && (
                        <div className='containerAssignDev'>
                            <div>Assign Developer: </div>
                            <button className='assignDevButton' onClick={handleAssignDev}>Assign Developer</button>
                        </div>
                    )}
                    {issue.state !== 4 ? (
                        <div className='containerChangeState'>
                            <div>Change State: </div>
                            <button className='changeState' onClick={handleChangeState}>Change to {getStateString(issue.state + 1)}</button>
                        </div>
                    ) : (
                        <div className='containerChangeState'>
                            <div>Reopen State: </div>
                            <button className='changeState' onClick={handleChangeState}>Reopen Issue</button>
                        </div>
                    )}
                    <div>Add Comment: </div>
                    <form className='commentBox' onSubmit={handleCommentSubmit}>
                        <input
                            type='text'
                            placeholder='Enter Comment...'
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
