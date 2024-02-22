import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const AudioFile = ({ audioFile, setCurrentPlaying }) => {
  return (
    <li key={audioFile.id}>
      <Link to="#" onClick={() => setCurrentPlaying(audioFile)}>
        {audioFile.name}
      </Link>
    </li>
  );
};

export default AudioFile;
