import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Problems from "./components/Problems";
import AddProblems from "./components/AddProblems";
import Problem from "./components/Problem";
import Submissions from "./components/Submissions";
import Pro from "./components/Pro";
import Success from "./components/Success";
import { Cancel } from "@mui/icons-material";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="/dashboard" />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/account/pro" element={<Pro />} />
                        <Route path="/problems" element={<Problems />} />
                        <Route
                            path="/problems/:problemId"
                            element={<Problem />}
                        />
                        <Route path="/addproblems" element={<AddProblems />} />
                        <Route
                            path="/problems/:problemId/submissions"
                            element={<Submissions />}
                        />
                        <Route path="/success" element={<Success />} />
                        <Route path="/cancel" element={<Cancel />} />
                    </Route>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </>
    );
}

export default App;
