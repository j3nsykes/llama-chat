import React, { useState, useEffect } from 'react';


const sampleText = `Let's use the P5JS library to draw the circle. Here's the code:
  \`\`\`javascript
  let x, y;
  let radius;
  function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  radius = 100;
  }
  function draw() {
  background(255);
  noStroke();
  fill(0);
  ellipse(x, y, radius, radius);
  }
  \`\`\`
  This code will create a canvas of 400x400 pixels...`;

function CodeExtractor(props) {
    const [extractedCode, setExtractedCode] = useState('');

    useEffect(() => {
        function extractJavaScriptCode(inputText) {
            const regex = /```javascript([\s\S]*?)```/;
            const match = inputText.match(regex);

            if (match && match[1]) {
                setExtractedCode(match[1].trim());
                { console.log('extracted'); }
            } else {
                setExtractedCode('No JavaScript code found in the provided text.');
                { console.log('No JavaScript code found in the provided text.'); }
            }
        }

        extractJavaScriptCode(props.text);
        { console.log(props.text); }
    }, [props.text]);

    return (
        <CodeEditor code={extractedCode} />

    );
}

export default CodeExtractor;

// Usage example:
<CodeExtractor text={sampleText} />
