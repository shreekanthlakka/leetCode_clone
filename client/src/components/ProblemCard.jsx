import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedProblem,
    startDeleteProblem,
} from "../actions/problemActions";
import { lightBlue } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProblemCard({ problem }) {
    const dispatch = useDispatch();
    const { userAccount } = useAuth();
    const { userId } = problem;
    const isOwner = userAccount._id === userId;
    const navigate = useNavigate();
    const isDeleting = useSelector((state) => state.problem.status.isDeleting);

    function handleDeleteProblem() {
        dispatch(
            startDeleteProblem(problem._id, () => {
                toast.success("Problem Deleted Sucessfully");
            })
        );
    }

    return (
        <Card
            sx={{
                minWidth: 275,
                maxHeight: 275,
                backgroundColor: lightBlue - 100,
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                >
                    Title : {problem.title}
                </Typography>
                <Typography variant="body2">
                    Description : {problem.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        dispatch(setSelectedProblem(problem._id));
                        navigate(`/problems/${problem._id}`);
                    }}
                >
                    Solve
                </Button>
                {isOwner && (
                    <Button onClick={handleDeleteProblem} disabled={isDeleting}>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default ProblemCard;
