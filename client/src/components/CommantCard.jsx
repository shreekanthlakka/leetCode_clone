import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import { useDispatch, useSelector } from "react-redux";
import {
    startCreateComment,
    startDeleteComment,
} from "../actions/commentAction";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { like_dislikeCommentApi } from "../services/likesServices.js";
import { startLikesByProblemId } from "../actions/likeAction.js";
import ReplayComment from "./ReplayComment.jsx";
import CommentIcon from "@mui/icons-material/Comment";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShowReplies from "./ShowReplies.jsx";
import { Divider } from "@mui/material";

const Container = styled.div`
    margin: 1rem;
`;

const Actions = styled.div`
    display: flex;
    align-items: end;
    justify-content: end;
    .css-1knaqv7-MuiButtonBase-root-MuiButton-root {
        min-width: 0;
    }
    .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
        min-width: 0;
    }
`;

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function CommantCard({ comment }) {
    const commentId = comment._id;
    const { userAccount } = useAuth();
    const isOwner = comment.userId._id === userAccount._id;
    const likeStatus = useSelector((state) =>
        state.likes.likesByProblemId.find(
            (ele) =>
                ele.commentId === commentId && ele.userId === userAccount?._id
        )
    );
    // console.log("LIKES STATUS => ", likeStatus);
    const [like, setLike] = useState(() => (likeStatus?.liked ? true : false));
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { problemId } = useParams();
    const [replayToggle, setReplayToggle] = useState(false);
    const [replay, setReplay] = useState("");
    const [showReplies, setShowReplies] = useState(false);
    const totalLikes = useSelector(
        (state) =>
            state.likes.likesByProblemId.filter(
                (ele) => ele.commentId === commentId
            ).length
    );

    function handleCommentDelete() {
        if (!isOwner) return;
        dispatch(
            startDeleteComment(problemId, comment?._id, () => {
                toast.success("comment deleted");
            })
        );
    }

    async function handleClick() {
        try {
            const res = await like_dislikeCommentApi(
                problemId,
                commentId,
                toggle
            );
            // console.log("RESPONSE ==> ", res);
            if (res.success && res.data.liked) {
                setLike(true);
            }
            if (res.success && !res.data.liked) {
                setLike(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleToggel() {
        setToggle((prev) => !prev);
    }

    useEffect(() => {
        if (likeStatus?.liked) {
            setLike(true);
        }
        if (!likeStatus?.liked) {
            setLike(false);
        }
    }, [commentId, like, likeStatus]);

    useEffect(() => {
        dispatch(startLikesByProblemId(problemId, () => {}));
    }, [like]);

    function handleClickReplay() {
        if (!replay) return;
        const replayObj = {
            problemId,
            comment: replay,
            replayTo: comment._id,
        };
        dispatch(
            startCreateComment(problemId, replayObj, () => {
                setReplay("");
                setReplayToggle(false);
                toast.success("replied");
            })
        );
    }

    return (
        <Container>
            <Card sx={{ minWidth: 300, backgroundColor: "transparent" }}>
                <CardContent>
                    <Div>
                        <Typography
                            sx={{ fontSize: 15 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            @ {comment.userId.username}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {comment.createdAt
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("/")}
                        </Typography>
                    </Div>
                    <Divider />
                    <Typography variant="body2" sx={{ fontSize: "12" }}>
                        {comment.comment}
                    </Typography>
                </CardContent>
                <Actions>
                    <CardActions>
                        {isOwner && (
                            <>
                                <Button
                                    size="small"
                                    onClick={handleCommentDelete}
                                >
                                    <DeleteIcon fontSize="small" />
                                </Button>
                                <Button size="small">
                                    <EditIcon fontSize="small" />
                                </Button>
                            </>
                        )}
                        <Button
                            size="small"
                            onClick={() => {
                                handleToggel();
                                handleClick();
                            }}
                        >
                            {totalLikes}
                            {!like ? (
                                <FavoriteBorderIcon fontSize="small" />
                            ) : (
                                <FavoriteIcon fontSize="small" />
                            )}
                        </Button>
                        <Button
                            size="small"
                            onClick={() => setReplayToggle(true)}
                        >
                            <ReplyIcon fontSize="small" /> Replay
                        </Button>
                        <Button onClick={() => setShowReplies((e) => !e)}>
                            {!showReplies ? (
                                <CommentIcon size="small" />
                            ) : (
                                <CommentOutlinedIcon size="small" />
                            )}
                        </Button>
                    </CardActions>
                </Actions>
                <Divider />

                {replayToggle && (
                    <ReplayComment
                        replay={replay}
                        setReplay={setReplay}
                        setReplayToggle={setReplayToggle}
                        handleClickReplay={handleClickReplay}
                        comment={comment}
                    />
                )}
                {showReplies && <ShowReplies commentId={commentId} />}
            </Card>
        </Container>
    );
}

export default CommantCard;
