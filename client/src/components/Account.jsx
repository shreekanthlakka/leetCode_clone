import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 1rem;
`;

function Account() {
    const navigate = useNavigate();
    return (
        <Container>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button>Account</Button>
                <Button>Settings</Button>
                <Button onClick={() => navigate("/account/pro")}>
                    Pro Plan
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default Account;
