import React, { useState } from 'react';
import './PageSearch.css';
import DisplayIssueList from '../DisplayIssueList/DisplayIssueList.tsx'
import PageIssueDetailed from '../PageIssueDetailed/PageIssueDetailed';
import { Issue } from '../ElementIssueList/ElementIssueList.tsx'
import { GoSearch } from "react-icons/go";
import { IoFilter } from "react-icons/io5";

type PageSearchProps = {
    id: string;
    role: string;
}

const PageSearch: React.FC<PageSearchProps> = ({ id, role }) => {
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('search') as HTMLInputElement;
        const searchQuery = input.value;
        fetchIssues(searchQuery);
    };

    // issue 검색 - 서버용
    // const fetchIssues = (searchQuery: string) => {
    //     fetch('http://localhost:8080/issue/find', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ filter: "title", value: searchQuery }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 setIssues(data.issues as Issue[]);
    //             } else {
    //                 setIssues([]);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching issues:', error));
    // };
    // issue 검색 - 서버용

    // issue 검색 - 테스트용
    const fetchIssues = (searchQuery: string) => {
        const testIssues = [
            {
                "issueNum": 1,
                "title": `title matching ${searchQuery}`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:43:45.344+00:00",
                "state": 0,
                "accountId": "tester1",
                "devId": null,
                "projectNum": 1,
                "tag": null
            },
            {
                "issueNum": 2,
                "title": `title matching ${searchQuery}`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:43:45.344+00:00",
                "state": 2,
                "accountId": "tester1",
                "devId": "dev1",
                "projectNum": 1,
                "tag": null
            },
            {
                "issueNum": 3,
                "title": `title matching ${searchQuery}`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:51:38.414+00:00",
                "state": 4,
                "accountId": "tester1",
                "devId": "dev1",
                "projectNum": 1,
                "tag": null
            }
        ];
        
        setIssues(testIssues);
    };
    // issue 검색 - 테스트용

    const handleIssueClick = (issue: Issue) => {
        setSelectedIssue(issue);
    }

    const handleBackToList = () => {
        setSelectedIssue(null);
    }

    // issue 전체 - 서버용
    // const handleBrowseAll = () => {
    //     fetch('http://localhost:8080/issue/list')
    //         .then(response => response.json())
    //         .then(data => {
    //             setIssues(data.issues as Issue[]);
    //         })
    //         .catch(error => console.error('Error fetching issues:', error));
    // }
    // issue 전체 - 서버용


    // issue 전체 - 테스트용
    const handleBrowseAll = () => {
        const testIssues = [
            {
                "issueNum": 1,
                "title": `Login Error`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:43:45.344+00:00",
                "state": 0,
                "accountId": "tester1",
                "devId": null,
                "projectNum": 1,
                "tag": null
            },
            {
                "issueNum": 2,
                "title": `Signup Unavailable`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:43:45.344+00:00",
                "state": 3,
                "accountId": "tester1",
                "devId": "dev1",
                "projectNum": 1,
                "tag": null
            },
            {
                "issueNum": 3,
                "title": `Minor Error Regarding Font Size`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:51:38.414+00:00",
                "state": 4,
                "accountId": "tester1",
                "devId": "dev1",
                "projectNum": 1,
                "tag": null
            }
        ];

        setIssues(testIssues)
    }
    // issue 전체 - 테스트용

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
                                <div className='searchBox'>
                                    <GoSearch />
                                    <input
                                        type='text'
                                        placeholder='Search'
                                        name='search' />
                                </div>
                            </form>
                        </div>
                        <button className='filterButton'>
                            <IoFilter />
                            <span className='buttonLabel'>Filter</span>
                        </button>
                        <div className='containerElementIssueList'>
                            <span className='projectTitle'>Project</span>
                            <span className='userId'>Reporter</span>
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
        </div >
    );
}

export default PageSearch;