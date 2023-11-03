export default function EmptyState({ setOpen, setPrompt }) {
  return (
    <div className="mt-12 pt-20 sm:mt-24 space-y-4 text-gray-600 text-base mx-8 sm:mx-4 leading-12">
      <div className="sm:text-2xl">
        <p>
          Learn how to breakdown P5JS code concepts with drawing and sculpting.
        </p>
      </div>
      <div className="pt-2 space-y-4 text-gray-600 text-base sm:text-lg">
        <p>Do a drawing, make a sculptural shape.</p>
        <p>Upload an image or capture your webcam.</p>
        <p>Ask me questions to help you code.</p>
        <p> Start with the questions provide and then freestyle by asking your own.</p>
      </div>

      <div className="pt-28 space-y-4 text-gray-600 text-base sm:text-xs">
        <p>
          Front-end Dev, Creative Code and concept developed by          <a
            className="text-xs underline underline-offset-1"
            href="https://j3nsykes.github.io/"
          >
            <span className="hidden sm:inline">Jen Sykes</span>
          </a>. React.js support Douglas Greenshields.
        </p>
        <p>App built with Replicate.
          <a
            className="text-xs underline underline-offset-1"
            href="https://github.com/replicate/chat"
          >
            <span className="hidden sm:inline">Cloned via GitHub</span>
          </a>
        </p>
      </div>
    </div>
  );
}
