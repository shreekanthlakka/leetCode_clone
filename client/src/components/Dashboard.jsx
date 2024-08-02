import { useEffect, useState } from "react";

function Dashboard() {
    return <div>Dashboard</div>;
}

export default Dashboard;

// function Dashboard() {
//     const [socket, setSocket] = useState(null);
//     useEffect(() => {
//         const socket = new WebSocket("ws://localhost:8080");
//         socket.onopen = () => {
//             setSocket(socket);
//             console.log("connected");
//         };
//         socket.onmessage = (e) => {
//             console.log(e.data);
//         };
//         return () => {
//             socket.close();
//         };
//     }, []);
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <button>Submit</button>
//             {socket ? "connected" : " Socket not connected"}
//         </div>
//     );
// }

// export default Dashboard;
