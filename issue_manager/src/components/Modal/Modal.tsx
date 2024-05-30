import Modal from 'react-modal';
import React, { useState } from 'react';
import '../Modal/Modal.css'

const ModalPopup: React.FC=() => {
    //백엔드에 넘길 정보들
    // const[title,setTitle]= useState<string>('');
    // const[content,setContent]=useState<string>('');
    // const [accountId,setAccountId]=useState<string>('');
    // const[projectNum,setProjectNum]=useState<string>('');
    // const[tag,setTag]=useState<string>('');
    // //모달창 초기상태
    const[isOpen,setIsOpen]=useState(false);
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
    const openModal=() => {
        setIsOpen(true);
    };
    //모달창 닫는 버튼
    const closeModal=()=>{
        setIsOpen(false);
    };
    return (
        <div className='ModalButton'>
            <button onClick={openModal}>create issue</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} className='ModalContent'>
                <button onClick={closeModal}>close issue</button>
            </Modal>
        </div>
    );
};

export default ModalPopup;
