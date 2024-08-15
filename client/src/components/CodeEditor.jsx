import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div``;
const Language = Object.freeze({
    cplusplus: "cpp",
    javascript: "javascript",
    rust: "rust",
    python: "python",
});

function CodeEditor({ language, typedCode, setTypedCode }) {
    const code = useSelector((state) => state.problem.boilerPlateCode);

    const handleEditorDidMount = (editor) => {
        editor.setScrollTop(editor.getTopForLineNumber(1));
        editor.getAction("editor.action.formatDocument").run();
    };

    useEffect(() => {
        if (code && language) setTypedCode(code[language]);
    }, [code, language]);

    return (
        <Container>
            <Editor
                height="50vh"
                theme="vs-dark"
                value={typedCode}
                onChange={(value) => setTypedCode(value)}
                language={Language[language]}
                options={{
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                }}
                onMount={handleEditorDidMount}
            />
        </Container>
    );
}

export default CodeEditor;
