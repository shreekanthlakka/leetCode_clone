import Card from "@mui/joy/Card";
import { Divider } from "@mui/material";

function ListReplies({ replay, commentId }) {
    return (
        <Card size="sm">
            {`${commentId}`} @ {replay.comment}
        </Card>
    );
}

export default ListReplies;
