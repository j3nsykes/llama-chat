import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import WebcamCapture from "./WebcamCapture";
import { UploadManager } from "@bytescale/sdk";
import CodeEditor from "./CodeEditor";

// Add at the top of your file
const uploadApiKey = "public_kW15biSARCJN7FAz6rANdRg3pNkh";

const uploader = Uploader({
  apiKey: uploadApiKey,
});
const uploadManager = new UploadManager({ apiKey: uploadApiKey });

const options = {
  apiKey: "public_kW15biSARCJN7FAz6rANdRg3pNkh",
  maxFileCount: 1,
  mimeTypes: [
    "image/jpeg",
    "image/png",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
  ],
  showFinishButton: false,
  preview: true,
  editor: {
    images: {
      preview: false,
      crop: false,
    },
  },
  styles: {
    colors: {
      active: "#1f2937",
      error: "#d23f4d",
      primary: "#4b5563",
    },
    fontFamilies: {
      base: "inter, -apple-system, blinkmacsystemfont, Segoe UI, helvetica, arial, sans-serif",
    },
    fontSizes: {
      base: 16,
    },
  },
};

const questions = [
  "What basic primitive shape do you see?",
  "What colour is the shape?",
  "How many shapes are there?",
];

const questionPrompts = [
  "Follow these instructions.What shape do you see? Choose from circle,square, rectangle, triangle, line. Answer only the shape name.",
  "What color is the shape?",
  "Follow the instructions. How many shapes are there? Answer only the number",
];

const ChatForm = ({ prompt, setPrompt, onSubmit, handleFileUpload }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(prompt);
    setPrompt("");
    event.target.rows = 1;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 bg-slate-100 border-t-2">
      <div className="container w-full mx-auto p-5 pb-8">
        <form className="w-full flex" onSubmit={handleSubmit}>
          <WebcamCapture
            uploadManager={uploadManager}
            onCompleteUpload={(file) => handleFileUpload(file)}
          >
            {({ onClick }) => (
              <button
                className="p-3 border-gray-600 border-2 inline-flex hover:bg-gray-300 rounded-md mr-3"
                onClick={onClick}
              >
                Webcam
              </button>
            )}
          </WebcamCapture>

          <UploadButton
            uploader={uploader}
            options={options}
            onComplete={(files) => handleFileUpload(files[0])}
          >
            {({ onClick }) => (
              <button
                className="p-3 border-gray-600 border-2 inline-flex hover:bg-gray-300 rounded-md mr-3"
                onClick={onClick}
              >
                Upload
              </button>
            )}
          </UploadButton>
          <select
            autoFocus
            className="flex-grow block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
            onChange={(e) =>
              setPrompt(questionPrompts[questions.indexOf(e.target.value)])
            }
            // onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <option value="disabled" >
              Pick a question
            </option>
            {questions.map((q, i) => (
              <option value={q} key={`option${i + 1}`}>
                {q}
              </option>
            ))}
          </select>
          <button
            className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
            type="submit"
          >
            Ask!
          </button>

          <button
            className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-md px-5 py-3 ml-2.5"
            onClick={() =>
              setPrompt(
                "Follow the instructions. Using the P5JS code language provide code to draw what you have identified.  Write code that is suitable for someone completely new to code. Always use function setup and function draw. Only use P5JS library functions. For example, if you see a circle use ellipse() if you see a square use rect()."
              )
            }
          >
            Code!
          </button>

          {/* <button className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-md px-5 py-3 ml-2.5" onClick={runCode}>Run</button> */}

          {/* free style */}

          <textarea
            autoComplete="off"
            autoFocus
            name="prompt"
            className="flex flex-col block w-2/3 ml-10 rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-8 ml-1"
            placeholder="Ask your own question!"
            required={true}
            value={prompt}
            rows={1}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
              const lineCount = e.target.value.split("\n").length;
              e.target.rows = lineCount > 10 ? 10 : lineCount;
            }}
          />
          <button
            className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
            type="submit"
          >
            Chat
          </button>
        </form>
      </div>
    </footer>
  );
};

export default ChatForm;
