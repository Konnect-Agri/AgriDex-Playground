import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./Components/Home";
import Init from "./Components/Init";
import Track from "./Components/Track";
import Login from "./Components/Login";

import io from "socket.io-client";
import UpdateApplication from "./Components/UpdateApplication";

/*------------- END OF IMPORTS ------------- */

const socket = io("http://localhost:3003");

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/init" element={<Init socket={socket} />} />
          <Route path="/track" element={<Track socket={socket} />} />
          <Route
            path="/track/:orderId"
            element={<UpdateApplication socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
