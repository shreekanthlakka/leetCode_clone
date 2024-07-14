import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    resetSelectedProblem,
    startGetBoilerPlateCode,
} from "../actions/problemActions";
import styled from "styled-components";
import CodeEditor from "./CodeEditor";
import ProblemStatement from "./ProblemStatement";
import Panel from "./Panel";

const Box = styled.div`
    width: 100%;
    .mainpanel {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 95%;
        height: 40px;
        border-radius: 20px;
        margin: 10px;
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    width: 100%;
    height: 80vh;
    grid-gap: 5px;
    padding: 0;
    box-sizing: border-box;
    .leftpanel {
        background-color: #eceae9;
    }
    .rightpanel {
        background-color: #eceae9;
    }
`;

function Problem() {
    const dispatch = useDispatch();
    const { problemId } = useParams();
    const selectedProblem = useSelector((state) =>
        state.problem.problems.find((ele) => ele._id === problemId)
    );
    const [language, setLanguage] = useState("js");
    const [typedCode, setTypedCode] = useState("");

    function handleProblemSubmit() {
        console.log("Code :: ==>", language, "<== :: ==>", typedCode);
    }

    useEffect(() => {
        if (!problemId) return;
        dispatch(startGetBoilerPlateCode(problemId, () => {}));

        return () => {
            dispatch(resetSelectedProblem());
        };
    }, [problemId]);
    return (
        <Box>
            <div className="mainpanel">
                <Panel
                    language={language}
                    setLanguage={setLanguage}
                    handleProblemSubmit={handleProblemSubmit}
                />
            </div>
            <Container>
                <div className="leftpanel">
                    <ProblemStatement problem={selectedProblem} />
                </div>
                <div className="rightpanel">
                    <CodeEditor
                        language={language}
                        typedCode={typedCode}
                        setTypedCode={setTypedCode}
                    />
                </div>
            </Container>
        </Box>
    );
}

export default Problem;
