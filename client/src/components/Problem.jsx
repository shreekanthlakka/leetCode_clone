import { useEffect, useRef, useState } from "react";
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
import {
    startAddSubmission,
    startGetSubmissionStatus,
} from "../actions/submissionActions";
import toast from "react-hot-toast";
import TestCase from "./TestCase";
import { useSearchParams } from "react-router-dom";
import { startGetAllCommentsByProblemId } from "../actions/commentAction";
import Comments from "./Comments";

const TestCaseContainer = styled.div`
    height: 200px;
    /* overflow-x: auto; */
    overflow-x: scroll;
    padding-left: 2rem;
    /* overflow-y: scroll; */
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: start;
`;

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
    overflow-y: scroll;
    grid-gap: 5px;
    padding: 0;
    box-sizing: border-box;
    .leftpanel {
        /* background-color: #eceae9; */
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
    const [language, setLanguage] = useState("");
    const [typedCode, setTypedCode] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    // const [socket, setSocket] = useState();
    const [startPolling, setStartPolling] = useState(false);
    const interval = useRef("");
    const numberOfTestCases = useRef(0);
    // numberOfTestCases.current = selectedProblem?.testCases.length;

    async function handleProblemSubmit() {
        if (!typedCode) return;
        const obj = {
            language,
            typedCode,
            title: selectedProblem.title,
        };
        dispatch(
            startAddSubmission(obj, problemId, (id) => {
                toast.success("your problem has been submitted");
                setSearchParams({ submissionId: id });
                setStartPolling(true);
            })
        );
    }

    useEffect(() => {
        if (startPolling) {
            interval.current = setInterval(() => {
                dispatch(
                    startGetSubmissionStatus(
                        problemId,
                        searchParams.get("submissionId"),
                        (data) => {
                            numberOfTestCases.current++;
                            if (
                                data?.testCaseResults.length ===
                                selectedProblem?.testCases.length
                            ) {
                                setStartPolling(false);
                                clearInterval(interval.current);
                            }
                        }
                    )
                );
            }, 1000);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [startPolling]);

    useEffect(() => {
        if (!problemId) return;
        dispatch(startGetBoilerPlateCode(problemId, () => {}));

        // const newSocket = new WebSocket("wss://leetcode.dev:3000/ws");
        // newSocket.onopen = () => {
        //     console.log("socket connected");
        // };
        // newSocket.onmessage = (e) => {
        //     console.log("socket message", e.data);
        // };
        // setSocket(newSocket);

        return () => {
            dispatch(resetSelectedProblem());
            // newSocket.close();
        };
    }, [problemId]);

    useEffect(() => {
        dispatch(startGetAllCommentsByProblemId(problemId));
    }, []);
    return (
        <Box>
            <div className="mainpanel">
                <Panel
                    language={language}
                    setLanguage={setLanguage}
                    handleProblemSubmit={handleProblemSubmit}
                    problemId={problemId}
                />
            </div>
            <Container>
                <div className="leftpanel">
                    <ProblemStatement problem={selectedProblem} />
                    {/* <hr style={{}} /> */}
                    <Comments />
                </div>
                <div className="rightpanel">
                    <CodeEditor
                        language={language}
                        typedCode={typedCode}
                        setTypedCode={setTypedCode}
                    />
                    <TestCaseContainer>
                        {selectedProblem?.testCases.map((ele, i) => (
                            <TestCase key={ele._id} testCase={ele} index={i} />
                        ))}
                    </TestCaseContainer>
                </div>
            </Container>
        </Box>
    );
}

export default Problem;
