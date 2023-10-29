import React, { useCallback, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";


function CodeEditor({ code, setCode }) {
  const previewFrameRef = useRef(null);
  const defaultCode = `function setup() {
        createCanvas(400, 400);
    }

    function draw() {
        background(220);
        ellipse(width / 2, height / 2, 100, 100);
    }`;

  const currentCode = code || defaultCode;

  const runCode = useCallback(() => {
    if (!previewFrameRef.current) return;
    // if (!code) return;

    const p5Code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    <script>
${currentCode}
    </script>
</head>
<body>
</body>
</html>`;

    previewFrameRef.current.srcdoc = p5Code;
  }, [currentCode]);

  useEffect(() => {
    if (!currentCode) {
      return;
    }
    runCode(); // Run the initial code
  }, [currentCode, runCode]);

  return (

    <div className="flex-start flex-col gap-y-1 w-1/3 h-screen sticky top-0 z-99">

      <CodeMirror
        value={currentCode}
        onChange={(value) => setCode(value)}
        extensions={[javascript()]}
        height="300px"
        theme="light"
        fontSize="16pt"
        basicSetup={{
          fontSize: "20pt",
          foldGutter: false,
          lineNumbers: true,
          highlightActiveLineGutter: true
        }}
      />


      {/* <button className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-md px-5 py-3 ml-2.5" onClick={runCode}>Run</button> */}


      <div className="w-full mt-4">
        <iframe
          className="container"
          style={{
            width: "800px",
            height: "600px",
            maxWidth: "800px",
            maxHeight: "600px",
            marginleft: "-10px",
          }}
          ref={previewFrameRef}
          title="Preview"
        ></iframe>
      </div>
    </div>




  );
}

export default CodeEditor;
