import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CommantCard from "./CommantCard";

function ListComments() {
    const { problemId } = useParams();
    const comments = useSelector((state) =>
        state.comment.comments.filter((ele) => ele.problemId._id === problemId)
    );
    return (
        <div>
            {comments.map((comment) => (
                <CommantCard key={comment._id} comment={comment} />
            ))}
        </div>
    );
}

export default ListComments;
