import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { startCreateComment } from "../actions/commentAction";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import ListComments from "./ListComments";

const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Comments() {
    const [comment, setComment] = useState("");
    const { problemId } = useParams();
    const dispatch = useDispatch();
    function handelAddComment() {
        if (comment.trim() === "") return;
        const commentObj = {
            comment,
        };
        dispatch(
            startCreateComment(problemId, commentObj, () => {
                toast.success("comment added");
                setComment("");
            })
        );
    }

    return (
        <Container>
            <h2>Comments</h2>
            <TextField
                label="Type comment here ..."
                multiline
                rows={3}
                sx={{ width: "90%" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                variant="contained"
                size="small"
                sx={{ width: "40%", margin: "1rem 0rem" }}
                onClick={handelAddComment}
            >
                Add Comment
            </Button>

            <ListComments />
        </Container>
    );
}

export default Comments;
