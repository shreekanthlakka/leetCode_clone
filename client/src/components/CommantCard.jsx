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
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteComment } from "../actions/commentAction";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { like_dislikeCommentApi } from "../services/likesServices.js";
import { startLikesByProblemId } from "../actions/likeAction.js";

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
    ); // const comments = useSelector((state) =>
    //     state.comment.comments.filter((ele) => ele.problemId._id === problemId)
    // );
    const [like, setLike] = useState(false);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { problemId } = useParams();

    const totalLikes = useSelector(
        (state) =>
            state.likes.likesByProblemId.filter(
                (ele) => ele.commentId === commentId
            ).length
    );

    console.log("total likes", totalLikes);

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
                !toggle
            );
            if (res.success && res.data.liked) {
                setLike(true);
            }
            if (res.success && !res.data.liked) {
                setLike(false);
            }
            console.log("like ==> ", like);
            console.log("res ==> ", res);
            // const likedObj = res.stats.likes.find(
            //     (ele) => ele.commentId === comment._id
            // );
            // const dislikeObj = res.stats.dislikes.find(
            //     (ele) => ele.commentId === comment._id
            // );
            // console.log("Response ==>", res);
            // if (likedObj?.liked) {
            //     setLike(true);
            //     setDislike(false);
            // }
            // if (dislikeObj?.disliked) {
            //     setLike(false);
            //     setDislike(true);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (likeStatus?.liked) {
            setLike(true);
        }
    }, []);

    useEffect(() => {
        dispatch(startLikesByProblemId(problemId));
    }, [like]);

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
                        {/* <Button
                            size="small"
                            onClick={() => handleClick("liked")}
                        >
                            {!like ? (
                                <ThumbUpOffAltIcon fontSize="small" />
                            ) : (
                                <ThumbUpAltIcon fontSize="small" />
                            )}
                        </Button>
                        <Button
                            size="small"
                            onClick={() => handleClick("disliked")}
                        >
                            {!dislike ? (
                                <ThumbDownOffAltIcon fontSize="small" />
                            ) : (
                                <ThumbDownIcon fontSize="snall" />
                            )}
                        </Button> */}
                        <Button
                            size="small"
                            onClick={() => {
                                // setToggle((e) => !e);
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
                        <Button size="small">
                            <ReplyIcon fontSize="small" /> Replay
                        </Button>
                    </CardActions>
                </Actions>
            </Card>
        </Container>
    );
}

export default CommantCard;
