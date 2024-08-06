import { useSelector } from "react-redux";
import ProblemCard from "./ProblemCard";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    b
`;

const Box = styled.div`
    & h2 {
        margin: 2rem;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Problems() {
    const problems = useSelector((state) => state.problem.problems);
    console.log("problems =>", problems);

    return (
        <Box>
            <h2>List of problems</h2>
            <Container>
                {problems.map((ele) => (
                    <ProblemCard key={ele._id} problem={ele} />
                ))}
            </Container>
        </Box>
    );
}

export default Problems;
