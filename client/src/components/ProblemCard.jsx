import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProblem } from "../actions/problemActions";
import { lightBlue } from "@mui/material/colors";

function ProblemCard({ problem }) {
    const dispatch = useDispatch();
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
                <Link to={`/problems/${problem._id}`}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                            dispatch(setSelectedProblem(problem._id))
                        }
                    >
                        Solve
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default ProblemCard;
