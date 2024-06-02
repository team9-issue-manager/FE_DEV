import React, { useState, useEffect } from 'react';

interface User {
    id: string;
    role: string;
}

const CreateProject: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [plId, setPlId] = useState<string>('');
    const [plList, setPlList] = useState<User[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/user/findByRole/pl')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPlList(data.accounts);
                } else {
                    setMessage('PL을 가져오는 데 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('Error fetching PL users:', error);
                setMessage('서버 오류 발생');
            });
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handlePlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlId(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:8080/project/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, plId }),
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log('프로젝트 생성 성공:', result.project);
                    setMessage('프로젝트 생성 성공');
                    // 프로젝트 생성 성공 후 추가 작업을 여기에 작성할 수 있습니다.
                } else {
                    console.error('프로젝트 생성 실패:');
                    setMessage('프로젝트 생성 실패');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage('서버 오류 발생');
            });
    };

    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Project Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={handleTitleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="plId">Assign PL:</label>
                    <select id="plId" value={plId} onChange={handlePlChange} required>
                        <option value="">Select PL</option>
                        {plList.map(pl => (
                            <option key={pl.id} value={pl.id}>{pl.id}</option>
                        ))}
                    </select>
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
