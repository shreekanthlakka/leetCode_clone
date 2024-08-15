import { Divider } from "@mui/material";
import Hero from "./Hero";
import PopularProblems from "./PopularProblems";
import { useEffect, useState } from "react";

function Dashboard() {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = new WebSocket("wss://leetcode-dev.store/ws");
        newSocket.onopen = () => {
            console.log("Connected to the server");
            newSocket.send("Hello Server!");
        };
        newSocket.onmessage = (event) => {
            console.log("Received message from server", event.data);
        };
        newSocket.onclose = () => {
            console.log("Disconnected from the server");
        };
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);
    return (
        <div>
            <Hero />
            <Divider />
            <PopularProblems />
        </div>
    );
}

export default Dashboard;
