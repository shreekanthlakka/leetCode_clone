import { Divider } from "@mui/material";
import Hero from "./Hero";
import PopularProblems from "./PopularProblems";
import { io } from "socket.io-client";
import { useEffect } from "react";

function Dashboard() {
    useEffect(() => {
        const socket = io("https://leetcode.dev/ws");
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
