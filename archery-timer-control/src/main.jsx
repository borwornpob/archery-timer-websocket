import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import IndividualAlternate from "./IndividualAlternate.jsx";
import IndividualAlternateCompound from "./IndividualAlternateCompound.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route
                        path="/individual-alternate"
                        element={<IndividualAlternate />}
                    />
                    <Route
                        path="/individual-alternate-compound"
                        element={<IndividualAlternateCompound />}
                    />
                </Routes>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
);
