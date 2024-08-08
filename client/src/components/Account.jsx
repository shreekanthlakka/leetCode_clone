import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AccountDetails from "./AccountDetails";
import AccProblemDetails from "./AccProblemDetails";
import Pro from "./Pro";

const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .box {
        margin-top: 4rem;
    }
`;

const Box = styled.div`
    width: 100%;
    max-width: 650px;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: width 0.1s ease-in-out;
    position: fixed;

    ${(props) =>
        props.active === "account" &&
        `
        width: 70%;  
    `}
    ${(props) =>
        props.active === "pro" &&
        `
        width: 90%;  
    `}
    ${(props) =>
        props.active === "solved" &&
        `
        width: 70%;  
    `}
`;

function Account() {
    const navigate = useNavigate();
    const [accOpen, setAccOpen] = useState(true);
    const [solProblems, setSolvedProblems] = useState(false);
    const [pro, setPro] = useState(false);
    return (
        <Container>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                    onClick={() => {
                        setAccOpen(true);
                        setSolvedProblems(false);
                        setPro(false);
                    }}
                >
                    Account
                </Button>
                <Button
                    onClick={() => {
                        setAccOpen(false);
                        setSolvedProblems(true);
                        setPro(false);
                    }}
                >
                    Solved Problems
                </Button>
                <Button
                    onClick={() => {
                        setPro(true);
                        setAccOpen(false);
                        setSolvedProblems(false);
                    }}
                >
                    Pro Plan
                </Button>
            </ButtonGroup>
            <Box
                className="box"
                active={
                    accOpen
                        ? "account"
                        : solProblems
                        ? "solved"
                        : pro
                        ? "pro"
                        : ""
                }
            >
                {accOpen && <AccountDetails />}
                {solProblems && <AccProblemDetails />}
                {pro && <Pro />}
            </Box>
        </Container>
    );
}

export default Account;
