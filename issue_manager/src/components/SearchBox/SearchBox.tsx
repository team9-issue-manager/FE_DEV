import './SearchBox.css';

import { GoSearch } from "react-icons/go";

const SearchBox = () => {
    return (
        <div className='searchBox'>
            <GoSearch />
            <span>Search</span>
        </div>
    )
}

export default SearchBox;