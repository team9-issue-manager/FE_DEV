import './DisplayIssueList.css';
import IssueListElement, { Issue } from '../IssueListElement/IssueListElement.tsx'

type DisplayIssueListProps = {
    issues: Issue[];
}

const DisplayIssueList: React.FC<DisplayIssueListProps>  = ({ issues }) => {
    return (
        <div className='containerIssueList'>
            {issues.length > 0 ? (
                issues.map(issue => (
                    <IssueListElement key={issue.issueNum} issue={issue} />
                ))
            ) : (
                <div>No issues found</div>
            )}
        </div>
    )
}

export default DisplayIssueList;