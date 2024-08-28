import React, { useEffect, useRef } from "react";
import backgroundVideo from "../assets/car-background-video.mp4";
const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // This sets the playback speed to half the normal speed
    }
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          filter: "blur(5px)",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
