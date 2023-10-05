const availableModes = {
    individual_qualification: {
        mode: "individual_qualification",
        config: {
            break: 10,
            shoot: 90,
            sequence: 1,
            options: {
                isNextSequenceStop: false,
            },
        },
    },
    team_qualification: {
        mode: "team_qualification",
        config: {
            break: 10,
            shoot: 120,
            options: {
                isNextSequenceStop: false,
            },
        },
    },
    individual_final: {
        mode: "individual_final",
        config: {
            break: 10,
            shoot: 90,
            options: {
                isNextSequenceStop: false,
            },
        },
    },
    team_final: {
        mode: "team_final",
        config: {
            break: 10,
            shoot: 120,
            options: {
                isNextSequenceStop: false,
            },
        },
    },
};

let individual_alternate = {
    name_left: "Please enter name (left)",
    name_right: "Please enter name (right)",
    score: {
        left: [],
        right: [],
    },
    point_left: 0,
    point_right: 0,
};
// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
    },
});

let mode = {
    current_mode: "individual_qualification",
    all_modes: availableModes,
};

app.get("/currentMode", (req, res) => {
    res.json(mode);
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("getMode", () => {
        io.emit("modeUpdate", mode);
    });

    socket.on("stopAfter", (stopAfter) => {
        console.log("stopAfter");
        io.emit("stopAfter", stopAfter);
    });

    socket.on("updateModeAndConfig", (newMode) => {
        mode["current_mode"] = newMode.mode;
        mode["all_modes"][newMode.mode]["config"] = newMode.config;
        io.emit("modeUpdate", mode);
        io.emit("success", "Mode updated successfully");
    });

    socket.on("updateDataIndividual", (data) => {
        individual_alternate = data;
        console.log("updateDataIndividual");
        io.emit("updateDataIndividual", individual_alternate);
    });

    socket.on("startLeft", () => {
        io.emit("startLeft");
    });

    socket.on("startRight", () => {
        io.emit("startRight");
    });

    socket.on("skipLeft", () => {
        io.emit("skipLeft");
    });

    socket.on("skipRight", () => {
        io.emit("skipRight");
    });

    socket.on("startBreak", () => {
        io.emit("startBreak");
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("stop", () => {
        io.emit("stop");
    });

    socket.on("stopNow", () => {
        io.emit("stopNow");
    });

    socket.on("skip", () => {
        io.emit("skip");
    });
});

const port = 8000;
server.listen(port, () => console.log(`Listening on port ${port}`));
