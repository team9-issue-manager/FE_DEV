import './SearchBox.css';

import { GoSearch } from "react-icons/go";

const SearchBox = () => {
    return (
        <div className='searchBox'>
            <GoSearch />
            <input type='text' placeholder='Search' />
        </div>
    )
}

export default SearchBox;