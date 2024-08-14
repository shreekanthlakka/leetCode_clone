import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ListReplies from "./ListReplies";

function ShowReplies({ commentId }) {
    const { problemId } = useParams();
    const replies = useSelector((state) =>
        state.comment.comments.filter(
            (ele) =>
                ele.problemId?._id === problemId && ele.replayTo === commentId
        )
    );
    return (
        <>
            {replies.map((ele) => (
                <ListReplies key={ele._id} replay={ele} commentId={commentId} />
            ))}
        </>
    );
}

export default ShowReplies;
