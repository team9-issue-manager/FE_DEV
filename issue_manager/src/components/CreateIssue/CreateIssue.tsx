import './CreateIssue.css';

const CreateIssue = () => {
    return (
        <div className='containerCreateIssue'>
            <div className='newIssue'>
                <div className='writer'>
                    <span>User Name New Issue</span>
                </div>
                <div className='issueTitle'>
                    <span>Issue Title</span>
                </div>
                <div className='issueDescription'>
                    <span>Add Description...</span>
                </div>
                <div className='createIssueButtons'>
                    <button>
                        status
                    </button>
                    <button>
                        ---priority
                    </button>
                    <button>
                        assignee
                    </button>
                    <button>
                        tag
                    </button>
                    <button>
                        date
                    </button>
                    <button>
                        create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateIssue;