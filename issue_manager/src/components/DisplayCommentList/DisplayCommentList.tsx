import './DisplayCommentList.css'
import ElementCommentList, { Comment } from '../ElementCommentList/ElementCommentList.tsx'

const DisplayCommentList = () => {
    return (
        <div className='containerCommentList'>
            <ElementCommentList />
            <ElementCommentList />
            <ElementCommentList />
            <ElementCommentList />
            <ElementCommentList />
        </div>
    )
}

export default DisplayCommentList;