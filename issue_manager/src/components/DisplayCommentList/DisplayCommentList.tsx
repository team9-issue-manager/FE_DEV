import React from 'react';
import './DisplayCommentList.css'
import ElementCommentList, { Comment } from '../ElementCommentList/ElementCommentList.tsx'

type DisplayCommentListProps = {
    comments: Comment[];
}

const DisplayCommentList: React.FC<DisplayCommentListProps> = ({ comments }) => {
    return (
        <div className='containerCommentList'>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <ElementCommentList
                        key={comment.commentNum}
                        comment={comment} />
                ))
            ) : (
                <div>No comments found</div>
            )}
        </div>
    )
}

export default DisplayCommentList;