import './ElementCommentList.css';

export type Comment = {
    issueNum: number;
    content: string;
    date: string;
    commentId: number;
    accountId: string;
};

const ElementCommentList = () => {
    return (
        <div>
            <div className='line'></div>
            <div className='containerElementCommentList'>
                <span className='cUserId'>accountID</span>
                <span className='cContent'>content</span>
                <span className='cDate'>date</span>
            </div>
            <div className='line'></div>
        </div>
    )
}

export default ElementCommentList;