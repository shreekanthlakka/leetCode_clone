import MediumCard from "@mui/joy/Card";
import { Button, Container, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function ReplayComment({
    replay,
    setReplay,
    setReplayToggle,
    handleClickReplay,
    comment,
}) {
    return (
        <Container
            sx={{
                marginLeft: "1.5rem",
                background: "transparent",
            }}
        >
            <MediumCard sx={{ marginLeft: "1rem" }}>
                <TextField
                    label={`Replay to ${comment?.userId.username}`}
                    variant="standard"
                    value={replay}
                    onChange={(e) => setReplay(e.target.value)}
                    size="small"
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                    }}
                >
                    <Button onClick={() => setReplayToggle(false)} size="small">
                        <CancelIcon size="small" />
                    </Button>
                    <Button onClick={handleClickReplay} size="small">
                        <CheckCircleIcon size="small" />
                    </Button>
                </div>
            </MediumCard>
        </Container>
    );
}

export default ReplayComment;
