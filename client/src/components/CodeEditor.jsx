import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CodeEditor({ language, typedCode, setTypedCode }) {
    const code = useSelector((state) => state.problem.boilerPlateCode);

    const handleEditorDidMount = (editor, monaco) => {
        editor.setScrollTop(editor.getTopForLineNumber(10));
        editor.getAction("editor.action.formatDocument").run();
    };

    useEffect(() => {
        if (code && language) setTypedCode(code[language]);
    }, [code, language]);

    return (
        <div>
            <Editor
                height="90vh"
                theme="vs-dark"
                value={typedCode}
                onChange={(value) => setTypedCode(value)}
                language={language}
                options={{
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                }}
                onMount={handleEditorDidMount}
            />
        </div>
    );
}

export default CodeEditor;
