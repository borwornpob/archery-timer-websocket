import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App/App.jsx";
import Left from "./routes/Left/Left.jsx";
import Right from "./routes/Right/Right.jsx";
import LeftCompound from "./routes/Left/LeftCompound.jsx";
import RightCompound from "./routes/Right/RightCompound.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/left" element={<Left />} />
                <Route path="/right" element={<Right />} />
                <Route path="/leftCompound" element={<LeftCompound />} />
                <Route path="/rightCompound" element={<RightCompound />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
