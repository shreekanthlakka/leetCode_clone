import Card from "@mui/joy/Card";
import { Divider, Typography } from "@mui/material";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 1rem;
`;

function ListReplies({ replay, comment }) {
    return (
        <Card
            size="sm"
            sx={{
                marginLeft: "1rem",
                backgroundColor: "inherit",
                border: "none",
            }}
        >
            {/* @ {`${comment.userId.username}`} */}
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
            <span style={{ marginLeft: "1rem" }}>{replay.comment}</span>
        </Card>
    );
}

export default ListReplies;
