import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MediumCard from "@mui/joy/Card";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title {
        font-weight: 600;
    }
`;

function ProblemStatement({ problem }) {
    return (
        <Container>
            <div className="hero">
                <Typography sx={{ marginLeft: "0.5rem", fontSize: "2rem" }}>
                    <span className="title"> {problem?.title}</span>
                </Typography>
                <Typography>
                    <MediumCard>
                        description : {problem?.description}
                    </MediumCard>
                </Typography>
            </div>
            {problem?.testCases?.map((ele, i) => (
                <TestCase key={i} testCase={ele} index={i} />
            ))}
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
                    <MediumCard size="sm">
                        Inputs :{" "}
                        {testCase?.inputs.map((ele) => ele.input).join(", ")}
                    </MediumCard>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <MediumCard size="sm">
                        Output : {testCase?.output}
                    </MediumCard>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProblemStatement;
