import React, { useState, useEffect } from 'react';

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


