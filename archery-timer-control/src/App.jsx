// Control.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "./socket";
import {
    Button,
    Select,
    NumberInput,
    NumberInputField,
    VStack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";

const archer_sequence = {
    AB: ["AB", "AB"],
    "AB CD": ["AB", "AB", "CD", "CD"],
    "CD AB": ["CD", "CD", "AB", "AB"],
};

function Control() {
    const [mode, setMode] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [shootTime, setShootTime] = useState("");
    const [start, setStart] = useState("");
    const [modeObject, setModeObject] = useState({});
    const [selectedKey, setSelectedKey] = useState(null);
    const sequence = selectedKey ? archer_sequence[selectedKey] : null;

    useEffect(() => {
        socket.emit("getMode");
        socket.on("modeUpdate", (data) => {
            setModeObject(data);
            setMode(data.current_mode);
            setBreakTime(data.all_modes[data.current_mode].config.break);
            setShootTime(data.all_modes[data.current_mode].config.shoot);
            setSelectedKey(data.all_modes[data.current_mode].config.sequence);
            setStart(data.all_modes[data.current_mode].config.start);
        });
    }, []);

    const updateModeAndConfig = () => {
        socket.emit("updateModeAndConfig", {
            mode: mode,
            config: {
                break: breakTime,
                shoot: shootTime,
                sequence,
                start,
            },
        });
    };

    const stopTimer = () => {
        socket.emit("stopAfter", true);
    };

    const stopNow = () => {
        socket.emit("stopNow", true);
    };

    const skip = () => {
        socket.emit("skip", true);
    };

    useEffect(() => {
        if (mode != "") {
            if (modeObject != {}) {
                console.log(`mode: ${mode}`);
                if (modeObject.all_modes[mode]) {
                    setBreakTime(modeObject.all_modes[mode].config.break);
                    setShootTime(modeObject.all_modes[mode].config.shoot);
                    setSelectedKey(modeObject.all_modes[mode].config.sequence);
                    setStart(modeObject.all_modes[mode].config.start);
                }
            } else {
            }
        }
    }, [mode]);

    return (
        <VStack spacing={4}>
            <Select
                placeholder="Select mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
            >
                <option value="individual_qualification">
                    Individual Qualification
                </option>
                <option value="team_qualification">Team Qualification</option>
                <option value="individual_final">Individual Final</option>
                <option value="team_final">Team Final</option>
            </Select>
            <NumberInput
                value={breakTime}
                onChange={(value) => setBreakTime(value)}
                min={0}
            >
                <NumberInputField placeholder="Break time" />
            </NumberInput>
            <NumberInput
                value={shootTime}
                onChange={(value) => setShootTime(value)}
                min={0}
            >
                <NumberInputField placeholder="Shoot time" />
            </NumberInput>
            {mode === "individual_qualification" && (
                <Select
                    placeholder="Select sequence"
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                >
                    {Object.keys(archer_sequence).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </Select>
            )}

            {(mode === "individual_alternate" || mode === "team_alternate") && (
                <RadioGroup onChange={setStart} value={start}>
                    <Radio value="left">Start Left</Radio>
                    <Radio value="right">Start Right</Radio>
                </RadioGroup>
            )}
            <Button onClick={updateModeAndConfig}>Update</Button>
            <Button onClick={stopTimer}>Stop Timer After Current Timer</Button>
            <Button onClick={stopNow} colorScheme="red">
                Stop Timer Now
            </Button>
            <Button onClick={skip} colorScheme="green">
                Skip
            </Button>
        </VStack>
    );
}

export default Control;
