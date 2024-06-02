import React, { useState } from 'react';
import './PageSearch.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import PageIssueDetailed from '../PageIssueDetailed/PageIssueDetailed';
import { Issue } from '../ElementIssueList/ElementIssueList.tsx'
import { GoSearch } from "react-icons/go";

type PageSearchProps = {
    id: string;
    role: string;
}

const PageSearch: React.FC<PageSearchProps> = ({ id, role }) => {
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [filter, setFilter] = useState('priority');

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('search') as HTMLInputElement;
        const searchQuery = input.value;
        fetchIssues(searchQuery);
    };

    // issue 검색 - 서버용
    const fetchIssues = (searchQuery: string) => {
        fetch('http://localhost:8080/issue/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filter: filter, value: searchQuery }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setIssues(data.issues as Issue[]);
                } else {
                    setIssues([]);
                }
            })
            .catch(error => console.error('Error fetching issues:', error));
    };

    const handleIssueClick = (issue: Issue) => {
        setSelectedIssue(issue);
    }

    const handleBackToList = () => {
        setSelectedIssue(null);
    }

    // issue 전체 - 서버용
    const handleBrowseAll = () => {
        fetch('http://localhost:8080/issue/list')
            .then(response => response.json())
            .then(data => {
                setIssues(data.issues as Issue[]);
            })
            .catch(error => console.error('Error fetching issues:', error));
    }

    return (
        <div>
            {selectedIssue ? (
                <PageIssueDetailed issue={selectedIssue} onBack={handleBackToList} id={id} role={role} />
            ) : (
                <div>
                    <div className='topBanner'>
                        <span className='bannerName'>Issues</span>
                    </div>
                    <div className='pageBody'>
                        <div className='search'>
                            <button className='browseAll' onClick={handleBrowseAll}>
                                Browse All
                            </button>
                            <form className='containerSearchBox' onSubmit={handleSearchSubmit}>
                                <div className='radioGroup'>
                                    <span className='searchBy'>Search By: </span>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='priority'
                                            checked={filter === 'priority'}
                                            onChange={handleRadioChange}
                                        />
                                        Priority
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='state'
                                            checked={filter === 'state'}
                                            onChange={handleRadioChange}
                                        />
                                        State
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='title'
                                            checked={filter === 'title'}
                                            onChange={handleRadioChange}
                                        />
                                        Title
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='writer'
                                            checked={filter === 'writer'}
                                            onChange={handleRadioChange}
                                        />
                                        Reporter
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='devId'
                                            checked={filter === 'devId'}
                                            onChange={handleRadioChange}
                                        />
                                        Assignee
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='filter'
                                            value='tag'
                                            checked={filter === 'tag'}
                                            onChange={handleRadioChange}
                                        />
                                        Tag
                                    </label>
                                </div>
                                <div className='searchBox'>
                                    <GoSearch />
                                    <input
                                        type='text'
                                        placeholder='Search'
                                        name='search' />
                                </div>
                            </form>
                        </div>
                        <div className='containerElementIssueList'>
                            <span className='priority'>Priority</span>
                            <span className='state'>State</span>
                            <span className='project'>Project</span>
                            <span className='title'>Issue Title</span>
                            <span className='userId'>Reporter</span>
                            <span className='date'>Reported Date</span>
                        </div>
                        <div className='divider'></div>
                        <DisplayIssueList issues={issues} onIssueClick={handleIssueClick} />
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default PageSearch;