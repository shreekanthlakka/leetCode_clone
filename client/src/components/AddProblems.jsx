import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoAddCircle } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import { green, red } from "@mui/material/colors";
import styled from "styled-components";

const Container = styled.form`
    max-width: 600px;
    margin: 2rem;
    & button {
        margin-right: 2rem;
    }
`;

const AddProblems = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [testCases, setTestCases] = useState([
        {
            id: Math.random(),
            inputs: [{ id: Math.random(), input: "" }],
            output: "",
        },
    ]);

    function handleSubmit(e) {
        e.preventDefault();
        const outputObj = {
            title,
            description,
            testCases,
        };
        console.log(outputObj);
    }

    function handleInputChange(testCaseId, inputId, value) {
        setTestCases((prev) =>
            prev.map((testCase) =>
                testCase.id === testCaseId
                    ? {
                          ...testCase,
                          inputs: testCase.inputs.map((input) =>
                              input.id === inputId
                                  ? { ...input, input: value }
                                  : input
                          ),
                      }
                    : testCase
            )
        );
    }

    function handleOutputChange(testCaseId, value) {
        setTestCases((prev) =>
            prev.map((testCase) =>
                testCase.id === testCaseId
                    ? { ...testCase, output: value }
                    : testCase
            )
        );
    }

    function handleAddInput(testCaseId) {
        setTestCases((prev) =>
            prev.map((testCase) =>
                testCase.id === testCaseId
                    ? {
                          ...testCase,
                          inputs: [
                              ...testCase.inputs,
                              { id: Math.random(), input: "" },
                          ],
                      }
                    : testCase
            )
        );
    }

    function handleRemoveInput(testCaseId, inputId) {
        setTestCases((prev) =>
            prev.map((testCase) =>
                testCase.id === testCaseId
                    ? {
                          ...testCase,
                          inputs: testCase.inputs.filter(
                              (input) => input.id !== inputId
                          ),
                      }
                    : testCase
            )
        );
    }

    function addTestCase() {
        setTestCases((prev) => [
            ...prev,
            {
                id: Math.random(),
                inputs: [{ id: Math.random(), input: "" }],
                output: "",
            },
        ]);
    }

    return (
        <Container onSubmit={handleSubmit}>
            <h2>Add Problems to CoderArena</h2>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                rows={4}
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            {testCases.map((testCase, i) => (
                <Box key={testCase.id} mt={2}>
                    <h3>Test Case {i + 1}</h3>
                    {testCase.inputs.map((input) => (
                        <Box
                            key={input.id}
                            display="flex"
                            alignItems="center"
                            mb={1}
                        >
                            <TextField
                                label={`type variableName=value`}
                                variant="outlined"
                                value={input.input}
                                onChange={(e) =>
                                    handleInputChange(
                                        testCase.id,
                                        input.id,
                                        e.target.value
                                    )
                                }
                                fullWidth
                                margin="normal"
                            />
                            <IconButton
                                onClick={() => handleAddInput(testCase.id)}
                            >
                                <IoAddCircle style={{ color: green[500] }} />
                            </IconButton>
                            {testCase.inputs.length > 1 && (
                                <IconButton
                                    onClick={() =>
                                        handleRemoveInput(testCase.id, input.id)
                                    }
                                >
                                    <FaCircleXmark
                                        style={{ color: red[500] }}
                                    />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <TextField
                        label={`type result=value`}
                        variant="outlined"
                        value={testCase.output}
                        onChange={(e) =>
                            handleOutputChange(testCase.id, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                    />
                </Box>
            ))}

            <Button variant="contained" onClick={addTestCase}>
                Add Test Case
            </Button>
            <Button variant="contained" type="submit">
                Submit Problem
            </Button>
        </Container>
    );
};

export default AddProblems;
