import React, { useRef, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export default function Meet() {
  const meetRef = useRef(null);
  const webcamRef = useRef(null);
  const [isLookingAtCamera, setIsLookingAtCamera] = useState(false);
  const [currentLoc, setCurrentLoc] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [lookDuration, setLookDuration] = useState(0);
  const id = "garv123-room";
  const [socket, setSocket] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [shopPopupTime, setShopPopupTime] = useState(0);
  const timerRef = useRef(null);
  const [popupMode, setPopupMode] = useState("Tab");

  useEffect(() => {
    const handleWindowFocus = () => {
      if (popupMode == "Tab") {

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setShopPopupTime(0);
        setShowPopup(false);
      }
    };

    const handleWindowBlur = () => {
      setPopupMode("Tab");
      if (shopPopupTime <= 0 && !timerRef.current) {
        setShopPopupTime(30);
        setShowPopup(true);

        timerRef.current = setInterval(() => {
          setShopPopupTime((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              setShowPopup(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [socket]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        setNotification({
          message:
            "Failed to load models. Please check the console for errors.",
          type: "error",
        });
      }
    };

    const detectFace = async () => {
      if (!modelsLoaded || !webcamRef.current || !webcamRef.current.video) {
        return;
      }

      const video = webcamRef.current.video;

      const result = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!result && shopPopupTime <= 0 && !timerRef.current) {
        setShopPopupTime(70);
        setPopupMode("Face");

        timerRef.current = setInterval(() => {
          setShopPopupTime((prev) => {
            if (prev <= 60 && !showPopup) {
              setShowPopup(true);
            }
            if (prev <= 1) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              setShowPopup(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (result && popupMode == "Face") {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setShopPopupTime(0);
        setShowPopup(false);
      }
    };

    loadModels().then(() => {
      const intervalId = setInterval(() => {
        if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
          detectFace();
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });
  }, [modelsLoaded, socket]);

  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
      "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  useEffect(() => {
    const roomID = id;
    const appID = 1842355862;
    const serverSecret = "f7994352e134f4ae2e8f4c3589316b37";
    const userID = "Candidate";

    const generateKitToken = async () => {
      const timestamp = Date.now();
      const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        userID
      );
      return kitToken;
    };

    const initializeZegoSDK = async () => {
      const kitToken = await generateKitToken();
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: meetRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
        turnOnMicrophoneWhenJoining: true,
      });
    };

    initializeZegoSDK();
  }, []);

  useEffect(() => {
    const socket = io('https://intelliskoolbackend.onrender.com');
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      socket.emit("connect-room", { roomID: id, userID: "Candidate" });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    if (shopPopupTime === 1) {
      window.location.href = "https://google.com";
    }
  }, [shopPopupTime])

  return (
    <div>
      <Webcam
        style={{ visibility: "hidden", position: "absolute" }}
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />
      {showPopup && (
        <div style={{ zIndex: '10000', position: 'absolute', top: '0px', left: '0px', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }} className="fixed w-72 z-50 animate-fade-in">
          <div className="bg-white z-[1000001] rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Are you still there?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We have detected that you have drifted away from this meet, to ensure fairness in attendance, we disconnect offenders who do not response in time.
            </p>
            <div className="flex flex-row gap-4 justify-between items-center">
              <button
                className="bg-blue-600 flex-grow text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setShowPopup(false);
                  setShopPopupTime(0);
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }}
              >
                Yes, Still There!
              </button>
              <div className="border-blue-600  border text-blue-600 px-4 py-2 rounded-full transition">
                {shopPopupTime}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
