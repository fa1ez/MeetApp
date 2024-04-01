import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faDesktop,
  faPhone,
  faRecordVinyl,
  faClapperboard,
  faXmark,
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
  const [isRecording, setIsRecording] = useState(false);
  const [screenSharingEnabled, setScreenSharingEnabled] = useState(false);
  const [globalSession, setGlobalSession] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

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

  function initializeSession() {
    if (typeof window.OT !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const session = window.OT.initSession(apiKey, sessionId);
          setGlobalSession(session);
          session.on("streamCreated", function (event) {
            // Check if the stream is a screen sharing stream
            if (event.stream.videoType === "camera") {
              // Subscribe to the screen sharing stream
              const sub = session.subscribe(
                event.stream,
                "subscriber",
                {
                  insertMode: "append",
                  width: "100%",
                  height: "100%",
                },
                handleError
              );
              setSubscriber(sub); // Set subscriber state
            }
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

  let screenPublisher = null;
  let screenSubscriber = null; // Variable to hold screen subscriber

  const toggleScreenSharing = () => {
    if (screenSharingEnabled) {
      // If screen sharing is enabled, stop sharing the screen
      if (screenPublisher) {
        screenPublisher.destroy();
        screenPublisher = null;
        setScreenSharingEnabled(false);
        // Remove the screen publisher's video element from the container
        const screenVideoElement = document.getElementById("screen");
        if (screenVideoElement) {
          screenVideoElement.remove();
        }
      }
    } else {
      // If screen sharing is not enabled, request permission to share the screen
      navigator.mediaDevices
        .getDisplayMedia({ video: true }) // This prompts the user to select a screen to share
        .then((stream) => {
          // Initialize screen publisher
          screenPublisher = window.OT.initPublisher(
            "screen",
            {
              videoSource: "screen",
              insertMode: "append",
              width: "100%",
              height: "100%",
              stream: stream,
            },
            (error) => {
              if (error) {
                console.error("Error initializing screen publisher:", error);
                return;
              }
              // Append the screen publisher's video element to the specified container
              const screenVideoElement = document.createElement("video");
              screenVideoElement.id = "screen";
              screenVideoElement.srcObject = stream;
              screenVideoElement.autoplay = true;
              const screenContainer = document.getElementById("videos");
              if (screenContainer) {
                screenContainer.appendChild(screenVideoElement);
              }
              // Publish the screen share publisher to the session
              globalSession.publish(screenPublisher, handleError);
              setScreenSharingEnabled(true);
            }
          );
        })
        .catch((error) => {
          console.error("Error accessing screen sharing:", error);
        });
    }
  };

  const startRecording = () => {
    //start recording here
    setIsRecording(!isRecording);

    //recording code here
    const url = isRecording
      ? "https://api.opentok.com/v2/project/<PROJECT_ID>/archive"
      : "https://your-endpoint.com/startRecording";
    const method = isRecording ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // Add any necessary headers here
      },
      body: JSON.stringify({
        apiKey: apiKey,
        sessionId: sessionId,
        // Include other necessary data here
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!isRecording) {
          console.log("Recording started, data:", data);
        } else {
          console.log("Recording stopped, URL:", data.url);
        }
        setIsRecording(!isRecording);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <div id="videos-2">
          <div className="w-[80vw] h-[40vh] lg:w-[65vw] lg:h-[80vh] bg-slate-700">
            {screenSharingEnabled ? (
              <div
                id="screenContainer"
                className="w-[80vw] h-[40vh] lg:w-[65vw] lg:h-[80vh] bg-slate-700"
              ></div>
            ) : (
              <div
                id="subscriber"
                className="w-[80vw] h-[40vh] lg:w-[65vw] lg:h-[80vh] bg-slate-700"
              ></div>
            )}
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
          <button className="callbutton" onClick={startRecording}>
            <FontAwesomeIcon
              icon={isRecording ? faXmark : faClapperboard}
              className="icon"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Session;
