import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
    a {
        text-decoration: none;
    }
`;

function Logo() {
    return (
        <Container>
            <Link to="/dashboard">
                <h2 style={{ color: "white" }}>CodersArena</h2>
            </Link>
        </Container>
    );
}

export default Logo;
