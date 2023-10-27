import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactjs-popup/dist/index.css";

const WebcamCapture = ({ children }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const [open, setOpen] = useState(false);

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
              <img src={imgSrc}></img>
            ) : (
              <>
                <Webcam height={600} width={600} ref={webcamRef} />
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
