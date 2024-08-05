import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AccountDetails from "./AccountDetails";
import AccProblemDetails from "./AccProblemDetails";

const Container = styled.div`
    margin-top: 1rem;
`;

function Account() {
    const navigate = useNavigate();
    const [accOpen, setAccOpen] = useState(true);
    const [solProblems, setSolvedProblems] = useState(false);
    return (
        <Container>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                    onClick={() => {
                        setAccOpen(true);
                        setSolvedProblems(false);
                    }}
                >
                    Account
                </Button>
                <Button
                    onClick={() => {
                        setAccOpen(false);
                        setSolvedProblems(true);
                    }}
                >
                    Solved Problems
                </Button>
                <Button onClick={() => navigate("/account/pro")}>
                    Pro Plan
                </Button>
            </ButtonGroup>
            <div>
                {accOpen && <AccountDetails />}
                {solProblems && <AccProblemDetails />}
            </div>
        </Container>
    );
}

export default Account;
