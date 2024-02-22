import React from "react";
import AudioFile from "./AudioFile";

import "./App.css";

const Playlist = ({ audioFiles, setCurrentPlaying }) => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {audioFiles.map((audioFile) => (
          <AudioFile
            key={audioFile.id}
            audioFile={audioFile}
            setCurrentPlaying={setCurrentPlaying}
          />
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
