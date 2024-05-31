import './PageSearch.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import SearchBox from '../SearchBox/SearchBox.tsx'

import { IoFilter } from "react-icons/io5";

const PageSearch = () => {
    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>Issues</span>
            </div>
            <div className='pageBody'>
                <div className='containerSearchBox'>
                    <SearchBox />
                </div>
                <button className='filterButton'>
                    <IoFilter />
                    <span className='buttonLabel'>Filter</span>
                </button>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <DisplayIssueList />
            </div>
        </div>
    );
}

export default PageSearch;