import { useSelector } from "react-redux";
import ProblemCard from "./ProblemCard";
import styled from "styled-components";

const Container = styled.div`
    /* display: flex; */
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
    /* gap: 2rem; */
    /* justify-content: center;  */
    .card {
        display: grid;
        grid-template-columns: 1fr;
        margin-top: 1rem;
    }
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

    if (problems.length === 0) {
        return <p> No problems added ... </p>;
    }
    return (
        <>
            {problems.length > 0 && (
                <Box>
                    <h2>List of problems</h2>
                    <Container>
                        {problems.map((ele) => (
                            <div key={ele._id} className="card">
                                <ProblemCard problem={ele} />
                            </div>
                        ))}
                    </Container>
                </Box>
            )}
        </>
    );
}

export default Problems;
