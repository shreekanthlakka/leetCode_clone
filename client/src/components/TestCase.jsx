import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

function TestCase({ testCase, index }) {
    const [searchParams] = useSearchParams();
    const submissionId = searchParams.get("submissionId");
    const currentSubmission = useSelector((state) =>
        state.submission.submissions?.find((ele) => ele._id === submissionId)
    );

    return (
        <Container>
            <Card sx={{ minWidth: 100, minHeight: 100, maxWidth: 300 }}>
                <CardContent>
                    <Typography>
                        <strong>TestCase</strong> : {index + 1}
                    </Typography>
                    <Typography sx={{ fontSize: "small" }}>
                        <strong>Inputs</strong> :{" "}
                        {testCase.inputs.map((ele) => ele.input).join(", ")}
                    </Typography>
                    {currentSubmission?.testCaseResults.length === 0 && (
                        <Typography>
                            Status :
                            {currentSubmission?.testCaseResults.length === 0
                                ? "Pending"
                                : currentSubmission?.testCaseResults[index]
                                      .status}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default TestCase;
