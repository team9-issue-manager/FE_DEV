import React from 'react';
import './ElementCommentList.css';

export type Comment = {
    issueNum: number;
    commentNum: number;
    content: string;
    accountId: string;
    date: string;
};

type ElementCommentListProps = {
    comment: Comment;
}

const ElementCommentList: React.FC<ElementCommentListProps> =  ({ comment }) => {
    return (
        <div>
            <div className='containerElementCommentList'>
                <span className='cUserId'>{comment.accountId}</span>
                <span>:</span>
                <span className='cContent'>{comment.content}</span>
                <span className='cDate'>{comment.date}</span>
            </div>
            <div className='line'></div>
        </div>
    )
}

export default ElementCommentList;