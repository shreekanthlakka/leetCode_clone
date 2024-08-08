import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styled from "styled-components";
import { URI } from "../services/userService";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    /* justify-content: center; */
    gap: 2rem;
    overflow-y: auto;
`;

function Pro() {
    const { userAccount } = useAuth();

    async function handleCheckoutSession() {
        try {
            const res = await fetch(`${URI}/payments/create-checkout-session`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log("Res ==> ", data);
            if (data.url) {
                window.location.href = data.url;
            }
            console.log("no url found");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container>
                <Card size="lg" variant="outlined" sx={{ minWidth: "250px" }}>
                    <Chip size="sm" variant="outlined" color="neutral">
                        BASIC
                    </Chip>
                    <Typography level="h2">Free Plan</Typography>
                    <Divider inset="none" />
                    <List
                        size="sm"
                        sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}
                    >
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Virtual Credit Cards
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Financial Analytics
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Checking Account
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            API Integration
                        </ListItem>
                    </List>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: "auto" }}>
                            0 INR{" "}
                            <Typography fontSize="sm" textColor="text.tertiary">
                                / month
                            </Typography>
                        </Typography>
                    </CardActions>
                </Card>
                <Card size="lg" variant="outlined">
                    <Chip size="sm" variant="outlined" color="neutral">
                        PRO
                    </Chip>
                    <Typography level="h2">Professional</Typography>
                    <Divider inset="none" />
                    <List
                        size="sm"
                        sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}
                    >
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Virtual Credit Cards
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Financial Analytics
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Checking Account
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            API Integration
                        </ListItem>
                    </List>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: "auto" }}>
                            1000 INR{" "}
                            <Typography fontSize="sm" textColor="text.tertiary">
                                / month
                            </Typography>
                        </Typography>
                        <Button
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                            onClick={handleCheckoutSession}
                            disabled={userAccount.plan === "Pro"}
                        >
                            {userAccount.plan === "free"
                                ? "Start now"
                                : "Pro Member"}
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
}

export default Pro;
