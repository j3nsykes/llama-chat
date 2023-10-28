import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactjs-popup/dist/index.css";

const WebcamCapture = ({ children, handleFileUpload }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // Convert data URL to file object and pass to handleFileUpload
    const imageBlob = dataURLtoBlob(imageSrc);
    const fileObject = new File([imageBlob], "screenshot.png", { type: "image/png" });
    handleFileUpload(fileObject);
  }, [webcamRef, handleFileUpload]);

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;  // Use let instead of const here
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }


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