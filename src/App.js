import "./styles/_font.css";
import "./App.css";
import "./styles/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import { routerlist } from "./router";
import { useState } from "react";

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
              {routerlist.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
