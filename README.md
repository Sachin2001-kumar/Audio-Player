# Audio-Player

Overview
This React app allows users to upload and play audio files with a built-in HTML audio player. It features a playlist view, a now playing view, and the ability to seamlessly transition to the next track upon completion. The app also remembers the last played audio file and resumes playback from the last position even after a page reload.

Features
Audio Upload: Users can easily upload audio files (e.g., mp3).
Playlist View: Displays a list of uploaded audio files.
Now Playing View: Highlights the currently playing audio file.
Continuous Playback: Automatically moves to the next track upon completion.
Persistent State: Remembers the last playing audio file and continues from the last position after a page reload.
Installation
Clone the repository: git clone <repository-url>
Navigate to the project directory: cd react-audio-player
Install dependencies: npm install
Usage
Start the development server: npm start
Open the app in your browser: http://localhost:3000
How to Upload Audio
Click the "Upload" button.
Select your desired audio file (e.g., mp3) from your local machine.
Playback
Click on any track in the playlist to start playback.
The app will automatically transition to the next track upon completion.
Persistent State
The app remembers the last playing audio file and resumes playback from the last position after a page reload.
Technologies Used
React
HTML5 Audio Player
Browser APIs
