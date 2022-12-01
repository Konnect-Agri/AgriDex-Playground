import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import io from "socket.io-client";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Track from "./pages/Track";
import TrackDetails from "./pages/TrackDetails";
import Banks from "./pages/Banks";
import LoanForm from "./pages/LoanForm";
import LoanDetails from "./pages/LoanDetails";
import Search from "./pages/Search";
import  { Toaster } from 'react-hot-toast';
/*------------- END OF IMPORTS ------------- */

const socket = io("http://localhost:3003");

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home socket={socket} />} />
          <Route path="/search" element={<Search socket={socket} />} />
          <Route path="/banks" element={<Banks socket={socket} />} />
          <Route path="/track" element={<Track socket={socket} />} />
          <Route path="/loanForm" element={<LoanForm socket={socket} />} />
          <Route
            path="/loanDetails"
            element={<LoanDetails socket={socket} />}
          />
          <Route
            path="/track/:orderId"
            element={<TrackDetails socket={socket} />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
