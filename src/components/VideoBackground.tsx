import React, { useEffect, useRef } from "react";
import backgroundVideo from "../assets/background-video.mp4";

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setSlowPlaybackRate = () => {
        video.playbackRate = 0.5; // 10% of normal speed
      };

      // Set initial playback rate
      setSlowPlaybackRate();

      // Ensure playback rate is maintained
      video.addEventListener("ratechange", setSlowPlaybackRate);

      // Optional: log when playback rate changes
      const logRateChange = () => {
        console.log("Playback rate changed to:", video.playbackRate);
      };
      video.addEventListener("ratechange", logRateChange);

      // Cleanup function
      return () => {
        video.removeEventListener("ratechange", setSlowPlaybackRate);
        video.removeEventListener("ratechange", logRateChange);
      };
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
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
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
