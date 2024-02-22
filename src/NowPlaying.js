import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  return formattedTime;
};

const NowPlaying = ({
  audioRef,
  currentPlaying,
  handlePlayPause,
  handleSeek,
}) => {
  const playButtonRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (currentPlaying) {
      audioElement.src = currentPlaying.url;
      if (playButtonRef.current) {
        playButtonRef.current.disabled = false;
      }
    }
  }, [currentPlaying, audioRef]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [audioRef]);

  const handlePlayClick = () => {
    handlePlayPause();
    if (playButtonRef.current) {
      playButtonRef.current.disabled = true;
    }
  };

  const handlePauseClick = () => {
    handlePlayPause();
    if (playButtonRef.current) {
      playButtonRef.current.disabled = false;
    }
  };

  const handleSeekChange = (event) => {
    handleSeek(event.target.value);
    setCurrentTime(event.target.value);
  };

  return (
    <div className="now-playing">
      <h2>Now Playing</h2>
      {currentPlaying && (
        <div>
          <p>{currentPlaying.name}</p>
          <div>
            <button
              onClick={handlePlayClick}
              disabled={!audioRef.current.paused}
              ref={playButtonRef}
            >
              Play
            </button>
            <button
              onClick={handlePauseClick}
              disabled={audioRef.current.paused}
            >
              Pause
            </button>
          </div>
          <div>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={audioRef.current.duration}
              value={currentTime}
              onChange={handleSeekChange}
            />
            <span>{formatTime(audioRef.current.duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
