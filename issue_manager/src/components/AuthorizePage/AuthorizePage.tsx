import React, { useState, useEffect } from 'react';
import './AuthorizePage.css';

interface Request {
    requestNum: number;
    requestAccount: {
        id: string;
        role: string;
    };
}

const AuthorizePage: React.FC = () => {
    const [requestList, setRequestList] = useState<Request[]>([]);

    useEffect(() => {
        // 권한 요청 목록을 서버에서 가져오는 함수
        const fetchRequestList = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/list');
                const data = await response.json();
                if (data.success) {
                    setRequestList(data.requestList);
                } else {
                    console.error('Failed to fetch request list');
                }
            } catch (error) {
                console.error('Error fetching request list:', error);
            }
        };
    
        // 페이지가 로드될 때 권한 요청 목록을 가져옴
        fetchRequestList();
    }, []);
    
    const updateRequestList = (requestNum: number) => {
        setRequestList(requestList.filter(request => request.requestNum !== requestNum));
    };

    const handleAccept = async (userId: string, role: string, requestNum: number) => {
        try {
            const response = await fetch('http://localhost:8080/admin/updateUserRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    role: role,
                }),
            });
            const data = await response.json();
            if (data.success) {
                // 성공적으로 역할이 업데이트된 경우 목록에서 해당 요청을 제거합니다.
                updateRequestList(requestNum);
            } else {
                console.error('Failed to update role:', data.error);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleReject = async (userId: string, requestNum: number) => {
        try {
            const response = await fetch('http://localhost:8080/admin/updateUserRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    role: 'tester',
                }),
            });
            const data = await response.json();
            if (data.success) {
                // 성공적으로 역할이 업데이트된 경우 목록에서 해당 요청을 제거합니다.
                updateRequestList(requestNum);
            } else {
                console.error('Failed to update role:', data.error);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <div className='authorize-container'>
            <h1>Authorization Requests</h1>
            <div className='request-list'>
                {requestList.map((request, index) => (
                    <div key={index} className='request-item'>
                        <span>User ID: {request.requestAccount.id}</span>
                        <span>Requested Role: {request.requestAccount.role}</span>
                        <button onClick={() => handleAccept(request.requestAccount.id, request.requestAccount.role, request.requestNum)}>Accept</button>
                        <button onClick={() => handleReject(request.requestAccount.id, request.requestNum)}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorizePage;
