import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Panel({ language, setLanguage, handleProblemSubmit }) {
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
                    <MenuItem value="js">javaScript</MenuItem>
                    <MenuItem value="cpp">cplusplus</MenuItem>
                    <MenuItem value="rs">rust</MenuItem>
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
                >
                    Submissions
                </Button>
            </div>
        </>
    );
}

export default Panel;
