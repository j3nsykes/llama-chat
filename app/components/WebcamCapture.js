import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactjs-popup/dist/index.css";

const WebcamCapture = ({ children, uploadManager, onCompleteUpload }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [open, setOpen] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const reject = useCallback(() => {
    setImgSrc(null);
  });

  const imgSrcToFile = async (src) => {
    const response = await fetch(src);
    const blob = await response.blob();
    return new File([blob], "screenshot.jpg", { type: "image/jpeg" });
  };

  const upload = async (e) => {
    e.preventDefault();
    if (!imgSrc) {
      return;
    }
    const file = await imgSrcToFile(imgSrc);
    const uploaded = await uploadManager.upload({ data: file });
    setOpen(false);
    onCompleteUpload(uploaded);
  };

  return (
    <>
      {children({
        onClick: (e) => {
          e.preventDefault();
          setOpen(true);
        },
      })}
      <Popup
        modal
        nested
        open={open}
        onClose={() => {
          setOpen(false);
          setImgSrc(null);
        }}
      >
        {(close) => (
          <div className="webcam-container">
            {imgSrc ? (
              <>
                <img src={imgSrc}></img>
                <button
                  className="p-3 border-gray-600 border-2 inline-flex hover:bg-gray-300 rounded-md mr-3"
                  onClick={reject}
                >
                  Reject
                </button>
                <button
                  className="p-3 border-gray-600 border-2 inline-flex hover:bg-gray-300 rounded-md mr-3"
                  onClick={upload}
                >
                  Upload
                </button>
              </>
            ) : (
              <>
                <Webcam
                  height={600}
                  width={600}
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                />
                <button
                  className="p-3 border-gray-600 border-2 inline-flex hover:bg-gray-300 rounded-md mr-3"
                  onClick={capture}
                >
                  Capture
                </button>
              </>
            )}
          </div>
        )}
      </Popup>
    </>
  );
};

export default WebcamCapture;
