import Modal from 'react-modal';
import React, { useState } from 'react';
import '../Modal/Modal.css'

const ModalPopup: React.FC<{ isOpen: boolean; closeModal: () => void; }> = ({ isOpen, closeModal }) => {
    //백엔드에 넘길 정보들
    // const[title,setTitle]= useState<string>('');
    // const[content,setContent]=useState<string>('');
    // const [accountId,setAccountId]=useState<string>('');
    // const[projectNum,setProjectNum]=useState<string>('');
    // const[tag,setTag]=useState<string>('');
    // //백엔드에 정보 전송
    // fetch('http://localhost:8080/issue/add', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         issue_title: title,ㅔ
    //         issue_content: content,
    //         writer_id: accountId,
    //         project_number: projectNum,
    //         tag: tag,
    //     }),
    // })
    // .then(response => response.json())
    // .then(result => console.log('결과: ', result));
    //모달창 여는 버튼
    const handleCloseModal = () => {
        closeModal();
    };
    return (
        <div className='ModalButton'>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => {}} // 빈 함수로 설정하여 외부 클릭 시 닫히지 않도록 함
                overlayClassName="ModalOverlay"
                className='ModalContent'
            >
                <button onClick={handleCloseModal}>close issue</button>
            </Modal>
        </div>
    );
};

export default ModalPopup;
