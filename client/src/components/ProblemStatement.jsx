import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
`;

function ProblemStatement({ problem }) {
    return (
        <Container>
            <Typography sx={{ marginLeft: "0.5rem" }}>
                Title: {problem?.title}
            </Typography>
            <Typography sx={{ marginLeft: "0.5rem" }}>
                Description : {problem?.description}
            </Typography>
            {problem?.testCases?.map((ele, i) => {
                return <TestCase key={i} testCase={ele} index={i} />;
            })}
        </Container>
    );
}

// function TestCase({ testCase, index }) {
//     return (
//         <div>
//             <h3>Test Case {index + 1}</h3>
//             <h4>Inputs</h4>
//             {testCase?.inputs.map((ele) => (
//                 <p key={ele.id}>{ele.input}</p>
//             ))}
//             <h4>Expected Output</h4>
//             <p>{testCase?.output}</p>
//         </div>
//     );
// }

function TestCase({ testCase, index }) {
    return (
        <Card sx={{ minWidth: 275, backgroundColor: "" }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Test Case {index + 1}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Inputs :{" "}
                    {testCase?.inputs.map((ele) => ele.input).join(", ")}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Output : {testCase?.output}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProblemStatement;
