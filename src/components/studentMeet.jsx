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

  useEffect(() => {
    const handleWindowFocus = () => {
      if (socket) {
        socket.emit("back-in-tab");
      }
    };

    const handleWindowBlur = () => {
      if (socket) {
        socket.emit("out-of-tab");
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
        console.error("Failed to load models:", error);
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
        setShowPopup(true);
        setShopPopupTime(60);
    
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
      } else if (result) {
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
        } else {
          console.log("Webcam not ready yet");
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
    const socket = io(`http://localhost:8080`);
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

  return (
    <div>
      <Webcam
        style={{ visibility: "hidden", position: "absolute" }}
        audio={false}
        screenshotFormat="image/jpeg"
        onUserMedia={() => {
          console.log("Webcam ready");
        }}
        ref={webcamRef}
      />
      <div style={{ zIndex: '1000', position: 'absolute', bottom: '4px', right: '4px' }} className="fixed bottom-4 right-4 bg-white shadow-xl border border-gray-200 rounded-xl p-4 w-72 z-50 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Are you still there?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Auto closing in {shopPopupTime} seconds
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Yes, Still There!
        </button>
      </div>
    </div>
  );
}
