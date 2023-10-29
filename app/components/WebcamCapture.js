import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactjs-popup/dist/index.css";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

// Add at the top of your file
const uploader = Uploader({
  apiKey: "public_kW15biSARCJN7FAz6rANdRg3pNkh",
});

const WebcamCapture = ({ children, handleFileUpload }) => {

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [open, setOpen] = useState(false);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImgSrc(imageSrc);

  // }, [webcamRef], [setImgSrc]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    if (imageSrc) {
      const fetchImage = async () => {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });

        if (typeof handleFileUpload === "function") {
          handleFileUpload(file);
        } else {
          console.error('handleFileUpload is not a function', handleFileUpload);
        }
      };
      fetchImage();
    }
  }, [webcamRef, setImgSrc, handleFileUpload]);




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
                <Webcam height={600} width={600}
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"

                />
              </>

            )}
          </div>
        )}
      </Popup>
    </>
  );
};

export default WebcamCapture;