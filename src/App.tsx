import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Init from "./Components/Init";
import io from "socket.io-client";

const socket = io("http://localhost:3003");

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/init" element={<Init socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
