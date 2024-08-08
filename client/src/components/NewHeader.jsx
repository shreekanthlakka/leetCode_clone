import { useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export const NewHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userAccount, isLoading, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = userAccount.role === "admin";

    async function handleLogout() {
        const res = await logout();
        if (res.success) {
            toast.success("LoggedOut sucessfully");
            navigate("/login");
        } else if (!res.success && res.statusCode === 401) {
            toast.error("Invalid Credentials");
            navigate("/login");
        }
    }

    return (
        <nav>
            <Link to="/" className="title">
                CodersArena
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/account">Account</NavLink>
                </li>
                <li>
                    <NavLink to="/problems">Problems</NavLink>
                </li>
                {isAdmin && (
                    <li>
                        <NavLink to="/addproblems">AddProblems</NavLink>
                    </li>
                )}

                <li>
                    {Object.keys(userAccount).length > 0 && (
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                            disabled={isLoading}
                            sx={{ marginRight: "1rem" }}
                        >
                            {isLoading ? "LoggingOut" : "Logout"}
                        </Button>
                    )}
                </li>
            </ul>
        </nav>
    );
};
