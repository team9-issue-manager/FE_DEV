import './IssueListElement.css';

const IssueListElement = () => {
    return (
        <div>
            <button className='containerIssueListElement'>
                <span>Project Title</span>
                <span>User_id</span>
                <span>Status</span>
                <span>Title</span>
                <span className='left'>Date: 2024/05/30</span>
            </button>
            <div className='line'></div>
        </div>
    );
}

export default IssueListElement;