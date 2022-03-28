import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter } from "./pages/counter/Counter";
import { Hooktest } from "./pages/hooklab/Hooktest";
import { VideoIndex } from "./pages/video/VideoIndex";
import { VideoShow } from "./pages/video/VideoShow";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { TrackIpIndex } from "./pages/trackip/TrackIpIndex";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Counter />} />
      <Route path="/hook-test" element={<Hooktest />} />
      <Route path="/videos" element={<VideoIndex />} />
      <Route path="/videos/:videoId" element={<VideoShow />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/ip" element={<TrackIpIndex />} />
    </Routes>
  );
}

export default App;
