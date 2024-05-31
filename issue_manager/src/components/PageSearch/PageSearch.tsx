import React, { useState } from 'react';
import './PageSearch.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import { Issue } from '../IssueListElement/IssueListElement'

import { GoSearch } from "react-icons/go";
import { IoFilter } from "react-icons/io5";

const PageSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [issues, setIssues] = useState<Issue[]>([ // 이슈 내용 정보
        {
            "issueNum": 1,
            "title": "Fix login bug",
            "content": "Fix the login issue",
            "devId": "dev1",
            "projectId": 1,
            "projectTitle": "Hello",
            "state": 1,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 3,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "Hi",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 4,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "Hi",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 5,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "Hi",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 6,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "Hi",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        }
    ]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('search') as HTMLInputElement;
        const searchQuery = input.value;
        fetchIssues(searchQuery);
    };

    const fetchIssues = (searchQuery: string) => {
        fetch('http://localhost:8080/issueFind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchQuery }),
        })
        .then(response => response.json())
        .then(data => setIssues(data))
        .catch(error => console.error('Error fetching issues:', error));
    };

    return (
        <div>
            <div className='topBanner'>
                <span className='bannerName'>Issues</span>
            </div>
            <div className='pageBody'>
                <form onSubmit={handleSearchSubmit}>
                    <div className='searchBox'>
                        <GoSearch />
                        <input
                            type='text'
                            placeholder='Search'
                            name='search' />
                    </div>
                </form>
                <button className='filterButton'>
                    <IoFilter />
                    <span className='buttonLabel'>Filter</span>
                </button>
                <div className='divider'></div>
                <DisplayIssueList issues={issues} />
            </div>
        </div >
    );
}

export default PageSearch;