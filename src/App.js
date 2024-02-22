import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlist from "./Playlist";
import NowPlaying from "./NowPlaying";
import "./App.css";

const App = () => {
  const audioRef = useRef(new Audio());

  const [audioFiles, setAudioFiles] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("audioFiles"));
    if (storedFiles) {
      setAudioFiles(storedFiles);
      setCurrentPlaying(storedFiles[0]);
    }

    const audioElement = audioRef.current;
    const handleEnded = () => {
      const nextIndex =
        (audioFiles.indexOf(currentPlaying) + 1) % audioFiles.length;
      setCurrentPlaying(audioFiles[nextIndex]);
    };

    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioFiles, currentPlaying]);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const audioURL = event.target.result;
      setAudioFiles([
        ...audioFiles,
        {
          id: Date.now(),
          name: file.name,
          url: audioURL,
        },
      ]);
      setCurrentPlaying(audioFiles[audioFiles.length - 1]);
    };
    reader.readAsDataURL(file);
  };

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  const handleSeek = (position) => {
    const audioElement = audioRef.current;
    audioElement.currentTime = position;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Audio Player</h1>
              <button
                onClick={() => document.getElementById("fileInput").click()}
              >
                Upload Audio
              </button>
              <input
                type="file"
                id="fileInput"
                accept=".mp3"
                onChange={(e) => handleUpload(e.target.files[0])}
                hidden
              />
              <Playlist
                audioFiles={audioFiles}
                setCurrentPlaying={setCurrentPlaying}
              />
              {currentPlaying && (
                <NowPlaying
                  audioRef={audioRef}
                  currentPlaying={currentPlaying}
                  handlePlayPause={handlePlayPause}
                  handleSeek={handleSeek}
                />
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
