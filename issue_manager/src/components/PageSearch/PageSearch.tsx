import './PageSearch.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import SearchBox from '../SearchBox/SearchBox.tsx'

const PageSearch = () => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>Issues</span>
            </div>
            <div className='containerSearchBox'>
                <SearchBox />
            </div>
            <DisplayIssueList />
        </div>
    );
}

export default PageSearch;