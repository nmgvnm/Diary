import "./styles/_font.css";
import "./App.css";
import "./styles/style.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import { routerlist } from "./router";
import { useState } from "react";
import MemoContents from "./components/MemoContents";
import PrivateRoute from "./components/PrivateRoute";
import RegisterForm from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ModalProvider } from "./context/ModalContext";

function App() {
  const [state, setState] = useState(true);
  const token = localStorage.getItem("token");
  return (
    <Router>
      <ModalProvider>
        <div className="body-wrapper">
          <div className={`nav-bar ${token ? "" : "none"}`} style={{ minWidth: state ? "250px" : "80px" }}>
            <NavBar setState={setState} />
          </div>
          <div className="contents-wrapper">
            <div className="main">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  {routerlist.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                  <Route path="/memo/:memoId" element={<MemoContents />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
