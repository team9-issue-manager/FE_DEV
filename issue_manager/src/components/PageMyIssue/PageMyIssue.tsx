import './PageMyIssue.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'

const PageMyIssue = () => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>My Issues</span>
                <button>
                    <span>Created</span>
                </button>
                <button>
                    <span>Assigned</span>
                </button>
                <button>
                    <span>Subscribed</span>
                </button>
            </div>
            <DisplayIssueList />
        </div>
    );
}

export default PageMyIssue;