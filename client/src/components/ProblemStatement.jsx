import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 10px;
`;

function ProblemStatement({ problem }) {
    return (
        <Container>
            <h1>{problem?.title}</h1>
            <p>
                {" "}
                <strong>Description</strong> : {problem?.description}
            </p>
            {problem?.testCases?.map((ele, i) => {
                return <TestCase key={i} testCase={ele} index={i} />;
            })}
        </Container>
    );
}

function TestCase({ testCase, index }) {
    return (
        <div>
            <h3>Test Case {index + 1}</h3>
            <h4>Inputs</h4>
            {testCase?.inputs.map((ele) => (
                <p key={ele.id}>{ele.input}</p>
            ))}
            <h4>Expected Output</h4>
            <p>{testCase?.output}</p>
        </div>
    );
}

export default ProblemStatement;
