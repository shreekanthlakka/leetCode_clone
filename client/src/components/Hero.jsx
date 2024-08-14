import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        gap: 20px;
    }
    button {
        margin: 1rem;
    }
`;

function Hero() {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="left">
                <h1>Welcome to CodersArena</h1>
                <p>
                    Get ready to test your coding skills and compete with the
                    best. Your journey to becoming a coding champion starts
                    here. Explore a wide range of challenges, track your
                    progress, and join exciting contests. Whether you are just
                    getting started or aiming to climb the leaderboard,
                    CodeArena is here to support you every step of the way.
                </p>
                <span>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/problems")}
                        sx={{
                            backgroundColor: "#9c9a9a",
                            fontWeight: "500",
                            transition: "ease-in",
                            "&:hover": {
                                backgroundColor: "#8a8989",
                                fontWeight: "700",
                            },
                        }}
                    >
                        Solve Problems
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/problems")}
                        sx={{
                            backgroundColor: "#9c9a9a",
                            fontWeight: "500",
                            transition: "ease-in",
                            "&:hover": {
                                backgroundColor: "#8a8989",
                                fontWeight: "700",
                            },
                        }}
                    >
                        Code To Gether
                    </Button>
                </span>
            </div>
            <div>
                <img src="heroImg.jpg" />
            </div>
        </Container>
    );
}

export default Hero;
