import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

function Panel({ language, setLanguage, handleProblemSubmit, problemId }) {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Select
                    sx={{ height: "30px", borderRadius: "15px" }}
                    displayEmpty
                    renderValue={(value) => (value ? value : "Select Language")}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <MenuItem value="javascript">javaScript</MenuItem>
                    <MenuItem value="cplusplus">cplusplus</MenuItem>
                    <MenuItem value="python">python</MenuItem>
                    <MenuItem value="rust">rust</MenuItem>
                </Select>
            </div>
            <div>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: "15px" }}
                    onClick={handleProblemSubmit}
                >
                    Submit
                </Button>
            </div>
            <div>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: "15px" }}
                    onClick={() =>
                        navigate(`/problems/${problemId}/submissions`)
                    }
                >
                    Submissions
                </Button>
            </div>
        </>
    );
}

export default Panel;
