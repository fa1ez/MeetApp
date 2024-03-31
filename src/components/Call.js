import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faDesktop,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

var apiKey = "47059854";
var sessionId =
  "2_MX40NzA1OTg1NH5-MTcxMTcwMzMyNDQ1NH5tUW50NjJkNHpqWit0WUo2UmMrbXR4cmZ-fn4";
var token =
  "T1==cGFydG5lcl9pZD00NzA1OTg1NCZzaWc9MWVlY2YwZDI4OWQ0NzYzYzk4YWM5MzJhYTU2NGViMjg0ZTM2YjdmYjpzZXNzaW9uX2lkPTJfTVg0ME56QTFPVGcxTkg1LU1UY3hNVGN3TXpNeU5EUTFOSDV0VVc1ME5qSmtOSHBxV2l0MFdVbzJVbU1yYlhSNGNtWi1mbjQmY3JlYXRlX3RpbWU9MTcxMTcwMzM3MyZub25jZT0wLjI0Mzc2OTIxNzczOTQ1MjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTcxNDI5NTM3MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function Session() {
  const [otLoaded, setOtLoaded] = useState(false);
  const [publisher, setPublisher] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [screenSharingEnabled, setScreenSharingEnabled] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.opentok.com/v2/js/opentok.min.js";
    script.async = true;
    script.onload = () => {
      console.log("OpenTok library loaded.");
      setOtLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (otLoaded) {
      initializeSession();
    }
  }, [otLoaded]);

  var globalSession;

  function initializeSession() {
    if (typeof window.OT !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const session = window.OT.initSession(apiKey, sessionId);
          globalSession = session;
          session.on("streamCreated", function (event) {
            session.subscribe(
              event.stream,
              "subscriber",
              {
                insertMode: "append",
                width: "100%",
                height: "100%",
              },
              handleError
            );
          });

          const pub = window.OT.initPublisher(
            "publisher",
            {
              insertMode: "append",
              width: "100%",
              height: "100%",
              stream: stream,
            },
            handleError
          );

          setPublisher(pub);

          session.connect(token, function (error) {
            if (error) {
              handleError(error);
            } else {
              session.publish(pub, handleError);
            }
          });
        })
        .catch((error) => {
          console.error("Error accessing camera and microphone:", error);
        });
    } else {
      console.error("OT object is not defined");
    }
  }

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
    if (publisher) {
      publisher.publishVideo(cameraEnabled);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (publisher) {
      publisher.publishAudio(audioEnabled);
    }
  };

  const toggleScreenSharing = () => {
    const newScreenSharingEnabled = !screenSharingEnabled; // Toggle the state
  
    if (publisher) {
      if (newScreenSharingEnabled) {
        // Start screen sharing
        navigator.mediaDevices.getDisplayMedia({ video: true }) // Request screen sharing stream
          .then((stream) => {
            publisher.replaceTrack(stream.getVideoTracks()[0]); // Replace camera track with screen sharing track
          })
          .catch((error) => {
            console.error('Error accessing screen sharing:', error);
          });
      } else {
        // Stop screen sharing and resume camera video
        navigator.mediaDevices.getUserMedia({ video: true }) // Request camera video stream
          .then((stream) => {
            publisher.replaceTrack(stream.getVideoTracks()[0]); // Replace screen sharing track with camera track
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
          });
      }
    }
  
    setScreenSharingEnabled(newScreenSharingEnabled); // Update the state
  };
  

  const disconnectCall = () => {
    if (publisher) {
      publisher.destroy(); // Destroy the publisher
    }
    if (globalSession) {
      globalSession.disconnect(); // Disconnect from the session
    }
  };

  return (
    <>
      <div className="relative w-full flex justify-center items-center lg:items-start lg:flex-row flex-col gap-2">
        <div id="videos-2" >
          <div className=" w-[80vw] h-[40vh] lg:w-[65vw] lg:h-[80vh] bg-slate-700 ">
          <div id="subscriber" className="w-[80vw] h-[40vh] lg:w-[65vw] lg:h-[80vh] bg-slate-700"></div>
          </div>
        </div>
        <div id="videos">
          <div
            id="publisher"
            className="w-[80vw] h-[40vh] lg:w-[50vh] lg:h-[40vh]"
            // style={{ paddingLeft: "100px" }}
          ></div>
        </div>
      </div>

      <div className="mt-3">
        <div className="callbuttons-container items-end h-full">
          <button className="callbutton" onClick={toggleCamera}>
            <FontAwesomeIcon
              icon={cameraEnabled ? faVideoSlash : faVideo}
              className="icon"
            />
          </button>
          <button className="callbutton" onClick={toggleAudio}>
            <FontAwesomeIcon
              icon={audioEnabled ? faMicrophoneSlash : faMicrophone}
              className="icon"
            />
          </button>
          <button className="callbutton" onClick={toggleScreenSharing}>
            <FontAwesomeIcon icon={faDesktop} className="icon" />
          </button>
          <button className="callbutton" onClick={disconnectCall}>
            <FontAwesomeIcon icon={faPhone} className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Session;
