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
                "issueNum": 5,
                "title": `title matching ${searchQuery}`,
                "content": "안녕하세요. 반갑습니다.",
                "date": "2024-05-30T11:43:45.344+00:00",
                "state": 1,
                "accountId": "tester1",
                "devId": null,
                "projectNum": 1,
                "tag": null
            },
            body: JSON.stringify({ filter: "title", value: searchQuery }),
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
    // issue 검색 - 테스트용

    const handleIssueClick = (issue: Issue) => {
        setSelectedIssue(issue);
    }

    const handleBackToList = () => {
        setSelectedIssue(null);
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
                        <div className='containerElementIssueList'>
                            <span className='projectTitle'>Project</span>
                            <span className='userId'>User ID</span>
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