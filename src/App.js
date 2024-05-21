import "./styles/_font.css";
import "./App.css";
import "./styles/style.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import { routerlist } from "./router";
import { useState } from "react";
import MemoContents from "./components/MemoContents";

function App() {
  const [state, setState] = useState(true);
  return (
    <Router>
      <div className="body-wrapper">
        <div className="nav-bar" style={{ minWidth: state ? "250px" : "80px" }}>
          <NavBar setState={setState} />
        </div>
        <div className="contents-wrapper">
          <div className="main">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {routerlist.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="/memo/:memoId" element={<MemoContents />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
