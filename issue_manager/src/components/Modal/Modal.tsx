import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../Modal/Modal.css';

interface ModalPopupProps {
    isOpen: boolean;
    closeModal: () => void;
    userId: string;
    userRole: string; // 프로젝트 번호를 props로 받습니다.
}

interface Project {
    projectNum: number;
    title: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ isOpen, closeModal, userId}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [message, setMessage] = useState<string | null>(null); // 서버 응답 메시지를 저장

    useEffect(() => {
        // 프로젝트 목록을 받아옴
        fetch('localhost:8080/project/list')
            .then(response => response.json())
            .then(data => setProjects(data.projects))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProjectNum = parseInt(e.target.value, 10);
        const project = projects.find(proj => proj.projectNum === selectedProjectNum);
        setSelectedProject(project || null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 선택한 프로젝트 번호를 확인하고 서버로 전송
        if (selectedProject) {
            fetch('localhost:8080/issue/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    accountId: userId,
                    projectNum: selectedProject.projectNum, // 선택한 프로젝트의 번호 사용
                    tag,
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.issueNum) {
                        console.log('이슈 생성 성공:', result);
                        setMessage('이슈 생성 성공');
                        closeModal();
                    } else {
                        console.error('이슈 생성 실패:', result.result);
                        setMessage(result.result || '이슈 생성 실패');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setMessage('서버 오류 발생');
                });
        } else {
            console.error('프로젝트를 선택해야 합니다.');
            setMessage('프로젝트를 선택해야 합니다.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName="ModalOverlay"
            className="ModalContent"
        >
            <div className="modal-header">
                <span className="user-id">User ID: {userId}</span>
                <button className="modal-close" onClick={closeModal}>close</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <select value={selectedProject ? selectedProject.projectNum : ''} onChange={handleProjectChange}>
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project.projectNum} value={project.projectNum}>{project.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Issue Title" 
                        value={title} 
                        onChange={handleTitleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        id="content" 
                        placeholder="Issue Content" 
                        value={content} 
                        onChange={handleContentChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="tag" 
                        placeholder="Tag" 
                        value={tag} 
                        onChange={handleTagChange} 
                    />
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </Modal>
    );
};

export default ModalPopup;
