import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../Modal/Modal.css';

interface ModalPopupProps {
    isOpen: boolean;
    closeModal: () => void;
    userId: string;
    userRole: string;
}

interface Project {
    projectNum: number;
    title: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ isOpen, closeModal, userId }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [priority, setPriority] = useState<number>(3); // 기본 우선순위를 Major(3)로 설정

    useEffect(() => {
        fetch('http://localhost:8080/project/list')
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

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(parseInt(e.target.value, 10));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedProject) {
            fetch('http://localhost:8080/issue/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    accountId: userId,
                    projectNum: selectedProject.projectNum,
                    tag,
                    priority,
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        console.log('이슈 생성 성공:');
                        setMessage('이슈 생성 성공');
                        closeModal();
                    } else {
                        console.error('이슈 생성 실패:');
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
                    <select value={priority} onChange={handlePriorityChange}>
                        <option value={1}>Blocker</option>
                        <option value={2}>Critical</option>
                        <option value={3}>Major</option>
                        <option value={4}>Minor</option>
                        <option value={5}>Trivial</option>
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
