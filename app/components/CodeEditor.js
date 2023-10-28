import React, { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import 'codemirror/lib/codemirror.css';

function CodeEditor() {
    const previewFrameRef = useRef(null);
    const [codeValue, setCodeValue] = React.useState(`function setup() {
        createCanvas(400, 400);
    }

    function draw() {
        background(220);
        ellipse(width / 2, height / 2, 100, 100);
    }`);

    const runCode = () => {
        if (!previewFrameRef.current) return;

        const p5Code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    <script>
${codeValue}
    </script>
</head>
<body>
</body>
</html>`;

        previewFrameRef.current.srcdoc = p5Code;
    };

    useEffect(() => {
        runCode(); // Run the initial code
    }, [codeValue]);

    return (
        <div>
            <CodeMirror
                value={codeValue}
                onChange={(editor) => setCodeValue(editor.getValue())}
                options={{
                    mode: 'javascript',
                    theme: 'default',
                    lineNumbers: true,
                }}
            />
            <button id="run-button" onClick={runCode}>Run</button>
            <iframe id="preview-frame" ref={previewFrameRef} title="Preview"></iframe>
        </div>
    );
}

export default CodeEditor;
