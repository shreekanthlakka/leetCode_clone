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
import ReplyIcon from "@mui/icons-material/Reply";
import { useDispatch } from "react-redux";
import { startDeleteComment } from "../actions/commentAction";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { URI } from "../services/userService.js";
import { useState } from "react";
import { like_dislikeCommentApi } from "../services/likesServices.js";

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
    const { userAccount } = useAuth();
    const isOwner = comment.userId._id === userAccount._id;
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const dispatch = useDispatch();
    const { problemId } = useParams();

    function handleCommentDelete() {
        if (!isOwner) return;
        dispatch(
            startDeleteComment(problemId, comment._id, () => {
                toast.success("comment deleted");
            })
        );
    }

    async function handleClick(status) {
        try {
            const res = like_dislikeCommentApi(status, problemId, comment._id);
            if (res.success) {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
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
                            onClick={() => handleClick("liked")}
                        >
                            <ThumbUpOffAltIcon fontSize="small" />
                        </Button>
                        <Button
                            size="small"
                            onClick={() => handleClick("disliked")}
                        >
                            <ThumbDownOffAltIcon fontSize="small" />
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
