import './IssueListElement.css';

const IssueListElement = () => {
    return (
        <div>
            <button className='containerIssueListElement'>
                <span>project_title</span>
                <span>user_id</span>
                <span>status</span>
                <span>issue_title</span>
                <span className='left'>yyyy/mm/dd</span>
            </button>
            <div className='line'></div>
        </div>
    );
}

export default IssueListElement;