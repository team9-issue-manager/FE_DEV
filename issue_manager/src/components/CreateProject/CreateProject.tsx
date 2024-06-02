import React, { useState } from 'react';
import './CreateProject.css'

const CreateProject: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [plId, setPlId] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handlePlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <input 
                        type="text" 
                        id="plId" 
                        value={plId} 
                        onChange={handlePlChange} 
                        required 
                    />
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
