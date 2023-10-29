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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <CodeMirror
                value={codeValue}
                onChange={(value) => setCodeValue(value)}
                extensions={[javascript()]}
                height="250px"
                theme="light"
                lineNumbers={false}
            />

            {/* <button className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-md px-5 py-3 ml-2.5" onClick={runCode}>Run</button> */}
            <div className="w-1/2 p-4">

                <div className="container mt-4">
                    <iframe
                        className="container p-4"
                        style={{ width: '800px', height: '600px', maxWidth: '800px', maxHeight: '600px' }}
                        ref={previewFrameRef}
                        title="Preview">
                    </iframe>

                </div>
            </div>
        </div>
    );
}

export default CodeEditor;