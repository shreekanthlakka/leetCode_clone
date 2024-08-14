import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CommantCard from "./CommantCard";
import { useMemo } from "react";

function ListComments() {
    const { problemId } = useParams();

    const totalComments = useSelector((state) => state.comment.comments);

    const comments = useMemo(() => {
        totalComments.filter(
            (ele) => ele.problemId?._id === problemId && ele.replayTo === null
        );
    }, [problemId]);
    return (
        <div>
            {comments?.map((comment) => (
                <CommantCard key={comment._id} comment={comment} />
            ))}
        </div>
    );
}

export default ListComments;
