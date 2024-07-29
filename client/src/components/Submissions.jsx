import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetAllSubmissions } from "../actions/submissionActions";
import styled from "styled-components";
import { Button } from "@mui/material";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    .red {
        color: red;
    }
    .green {
        color: green;
    }
    & h2 {
        margin-top: 2rem;
    }
`;

function Submissions() {
    const { problemId } = useParams();
    const submissions = useSelector((state) =>
        state.submission.submissions.filter(
            (ele) => ele.problemId === problemId
        )
    );
    const currentProblem = useSelector((state) =>
        state.problem.problems.find((ele) => ele._id === problemId)
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(startGetAllSubmissions(problemId));
    }, []);
    const overAllTestResults = submissions?.map((ele) => {
        return ele.testCaseResults?.every((ele) => ele.status === "PASSED")
            ? "PASSED"
            : "FAILED";
    });
    100;
    return (
        <Container>
            <h2>Problem name : {currentProblem?.title}</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Submissions</TableCell>
                        <TableCell align="center">Language</TableCell>
                        {submissions[0]?.inputs?.map((ele, i) => (
                            <React.Fragment key={i}>
                                <TableCell key={i} align="center">
                                    <strong>testcase : {i + 1}</strong>
                                    <br />
                                    {ele.map((ele) => ele.input).join(", ")}
                                </TableCell>
                            </React.Fragment>
                        ))}
                        <TableCell align="right">overall submission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions.map((row, i) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell align="center">
                                {row.language[0]}
                            </TableCell>
                            {row.testCaseResults.map((ele) => (
                                <TableCell align="center" key={ele._id}>
                                    {ele.status}
                                </TableCell>
                            ))}
                            <TableCell
                                align="right"
                                className={
                                    overAllTestResults[i] === "PASSED"
                                        ? "green"
                                        : "red"
                                }
                            >
                                {overAllTestResults[i]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                sx={{ width: "100%", margin: "2rem 0rem" }}
                variant="contained"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </Container>
    );
}

export default Submissions;
