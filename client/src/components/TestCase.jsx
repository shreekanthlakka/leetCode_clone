import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";

const Container = styled.div`
    .circle {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .passed {
        color: green;
    }
    .failed {
        color: red;
    }
`;

function TestCase({ testCase, index }) {
    const [searchParams] = useSearchParams();
    const submissionId = searchParams.get("submissionId");
    const testCaseResults = useSelector(
        (state) =>
            state.submission.submissions?.find(
                (ele) => ele._id === submissionId
            )?.testCaseResults
    );

    return (
        <Container>
            <Card sx={{ minWidth: 100, minHeight: 100 }}>
                <CardContent>
                    <Typography>
                        <strong>TestCase</strong> : {index + 1}
                    </Typography>
                    <Typography sx={{ fontSize: "small" }}>
                        <strong>Inputs</strong> :{" "}
                        {testCase.inputs.map((ele) => ele.input).join(", ")}
                    </Typography>
                    {testCaseResults?.length === 0 && (
                        <Box
                            className="circle"
                            sx={{
                                display: "flex",
                                gap: 4,
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <CircularProgress variant="plain" size="sm" />
                        </Box>
                    )}
                    {testCaseResults?.length > 0 && (
                        <Typography sx={{ fontSize: "small" }}>
                            Status :
                            <strong
                                className={`${
                                    testCaseResults[index].status === "PASSED"
                                        ? "passed"
                                        : "failed"
                                }`}
                            >
                                {testCaseResults[index].status}
                            </strong>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default TestCase;
