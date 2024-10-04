import { useSelector } from "react-redux";
import ProblemCard from "./ProblemCard";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    gap: 1rem;
    align-items: center;
    justify-content: center;
    .card {
        display: grid;
        grid-template-columns: 1fr;
        margin: 1rem;
    }
`;

function PopularProblems() {
    const problems = useSelector((state) => state.problem.problems);
    return (
        <Container>
            <h3
                style={{
                    fontSize: "2rem",
                    color: "#333",
                    textAlign: "center",
                    margin: "1rem",
                }}
            >
                Popular problems
            </h3>
            {problems.map((ele) => (
                <div key={ele._id} className="card">
                    <ProblemCard problem={ele} />
                </div>
            ))}
        </Container>
    );
}

export default PopularProblems;
