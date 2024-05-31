import { useState } from 'react';
import './PageMyIssue.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import PageIssueDetailed from '../PageIssueDetailed/PageIssueDetailed';
import { Issue } from '../IssueListElement/IssueListElement'

import { IoFilter } from "react-icons/io5";

const PageMyIssue = () => {
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [issues, setIssues] = useState<Issue[]>([
        {
            "issueNum": 1,
            "title": "Fix login bug",
            "content": "Fix the login issue",
            "devId": "dev1",
            "projectId": 1,
            "projectTitle": "AAAAA",
            "state": 1,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 3,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "BBB",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 4,
            "title": "Signup page redesign",
            "content": "Redesign the login page",
            "devId": "dev2",
            "projectId": 1,
            "projectTitle": "CCCC",
            "state": 2,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 5,
            "title": "Fix search bug",
            "content": "Redesign the login page",
            "devId": "dev5",
            "projectId": 1,
            "projectTitle": "HH",
            "state": 1,
            "date": "2023-05-25T12:34:56.789Z"
        },
        {
            "issueNum": 6,
            "title": "Login page redesign",
            "content": "Redesign the login page",
            "devId": "dev3",
            "projectId": 1,
            "projectTitle": "RRRR",
            "state": 0,
            "date": "2023-05-25T12:34:56.789Z"
        }
    ]);

    // const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const form = e.target as HTMLFormElement;
    //     const input = form.elements.namedItem('search') as HTMLInputElement;
    //     const searchQuery = input.value;
    //     fetchIssues(searchQuery);
    // };

    const fetchIssues = (searchQuery: string) => {
        fetch('http://localhost:8080/issue/find', {
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

    const handleIssueClick = (issue: Issue) => {
        setSelectedIssue(issue);
    }

    const handleBackToList = () => {
        setSelectedIssue(null);
    }

    return (
        <div>
            {selectedIssue ? (
                <PageIssueDetailed issue={selectedIssue} onBack={handleBackToList} />
            ) : (<div>
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
                <div className='pageBody'>
                    <button className='filterButton'>
                        <IoFilter />
                        <span>Filter</span>
                    </button>
                    <div className='containerIssueListElement'>
                        <span className='projectTitle'>Project</span>
                        <span className='devId'>User ID</span>
                        <span className='state'>State</span>
                        <span className='title'>Issue Title</span>
                        <span className='date'>Date</span>
                    </div>
                    <div className='divider'></div>
                    <DisplayIssueList issues={issues} onIssueClick={handleIssueClick} />
                </div>
            </div>
            )
            }
        </div>
    );
}


export default PageMyIssue;