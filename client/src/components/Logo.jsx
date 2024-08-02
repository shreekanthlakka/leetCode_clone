import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
`;

function Logo() {
    return (
        <Container>
            <Link to="/dashboard">
                <h2>CoderArena</h2>
            </Link>
        </Container>
    );
}

export default Logo;
