import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import isMobilePhone from "validator/lib/isMobilePhone";
import toast from "react-hot-toast";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .editbuttons {
        margin: 1.5rem;
        display: flex;
        justify-content: space-between;
    }
`;

function AccountDetails() {
    const { userAccount, uploadProfilePic, isLoading, updateProfile } =
        useAuth();
    const [profilepic, setProfilePic] = useState();
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const errors = {};
    const [serverErrors, setServerErrors] = useState({});
    const [clientErrors, setClientErrors] = useState({});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleAddProfilePic() {
        if (!profilepic) return;
        if (!name) return;
        if (!phonenumber) return;

        const res = await uploadProfilePic(profilepic);
        console.log(res);
    }

    function runValidations() {
        if (name.trim().length === 0) {
            errors.name = "name is requited";
        }
        if (phonenumber.trim().length === 0) {
            errors.phonenumber = "phone number is required";
        } else if (!isMobilePhone(phonenumber, ["en-IN"])) {
            errors.phonenumber = "provide the valid number";
        }
        if (!profilepic) {
            errors.profilepic = "Profile pic is required";
        }
    }

    async function handleEditProfile() {
        let res;
        try {
            runValidations();
            if (Object.keys(errors) === 0) {
                const updatedObj = {
                    username: name,
                    phonenumber,
                    profilepic,
                };
                res = await updateProfile(updatedObj);
                if (res?.success) {
                    console.log("RESPONSE ===>", res);
                    toast.success(res.message);
                }
            } else {
                setClientErrors(errors);
            }
        } catch (error) {
            setServerErrors(res.errors);
        } finally {
            setTimeout(() => {
                setClientErrors({});
                setServerErrors({});
            }, 10000);
        }
    }

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Field</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Value</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow align="center">
                        <TableCell> Name</TableCell>
                        <TableCell>{userAccount.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{userAccount.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>phone number</TableCell>
                        <TableCell>
                            {userAccount?.phonenumber
                                ? userAccount.phonenumber
                                : "-"}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Profile Pic</TableCell>
                        <TableCell>
                            {userAccount.profilepic?.url ? (
                                <img
                                    src={userAccount.profilepic?.url}
                                    alt={userAccount.username}
                                    style={{
                                        height: "60px",
                                        width: "60px",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                "-"
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button
                variant="contained"
                sx={{ margin: "1rem 0rem", width: "90%" }}
                onClick={handleOpen}
            >
                Edit profile
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        label="name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {clientErrors.name && <p>{clientErrors.name}</p>}
                    <TextField
                        label="phonenumber"
                        variant="standard"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    {clientErrors.phonenumber && (
                        <p>{clientErrors.phonenumber}</p>
                    )}
                    <TextField
                        label="Standard"
                        variant="standard"
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        name="profilepic"
                    />
                    {clientErrors.profilepic && (
                        <p>{clientErrors.profilepic}</p>
                    )}
                    <div className="editbuttons">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            onClick={handleEditProfile}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress /> : "update"}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Container>
    );
}

export default AccountDetails;
