import { useState, useEffect } from "react";
import styles from "./App.module.css";
import useTimer from "easytimer-react-hook";
import { socket } from "../../socket";

import buzzer from "../../assets/buzzer.wav";
import useKeypress from "react-use-keypress";

export default function App() {
    const [timer, isTargetAchieved] = useTimer({
        updateWhenTargetAchieved: true,
    });
    const [breakTime, setBreakTime] = useState(0);
    const [shootTime, setShootTime] = useState(0);
    const [shootOrBreak, setShootOrBreak] = useState("break");
    const [stopAfter, setStopAfter] = useState(false);
    const [isKeyPress, setIsKeyPress] = useState();
    const [archerSequence, setArcherSequence] = useState(["AB", "AB"]); //AB,CD,CD,AB
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStop, setIsStop] = useState(false);

    function nextArcher() {
        console.log(`current index is ${currentIndex}`);
        setCurrentIndex((currentIndex + 1) % archerSequence.length);
    }

    function checkEnds() {
        if (currentIndex == archerSequence.length - 1) {
            timer.stop();
            setIsStop(true);
            playThreeBuzzer();
        }
    }

    function playThreeBuzzer() {
        const audio = new Audio(buzzer);
        //play this audio three times
        setTimeout(() => {
            audio.play();
        }, 50);
        setTimeout(() => {
            audio.play();
        }, 2000);
        setTimeout(() => {
            audio.play();
        }, 4000);
    }

    function playBuzzer() {
        const audio = new Audio(buzzer);
        audio.play();
    }

    function playTwoBuzzer() {
        const audio = new Audio(buzzer);
        setTimeout(() => {
            audio.play();
        }, 50);
        setTimeout(() => {
            audio.play();
        }, 2000);
    }

    useEffect(() => {
        socket.on("modeUpdate", (mode) => {
            setStopAfter(false);
            timer.stop();
            console.log(mode);
            setShootOrBreak("break");
            setBreakTime(mode.all_modes[mode.current_mode].config.break);
            setShootTime(mode.all_modes[mode.current_mode].config.shoot);
            setArcherSequence(
                mode.all_modes[mode.current_mode].config.sequence
            );
            setIsStop(false);
            playTwoBuzzer();
            timer.start({
                startValues: {
                    seconds: mode.all_modes[mode.current_mode].config.break,
                },
                target: { seconds: 0 },
                countdown: true,
                updateWhenTargetAchieved: true,
            });
        });
        socket.on("stopAfter", (data) => {
            console.log("after this set will stop timer");
            setStopAfter(true);
        });
        socket.on("stopNow", () => {
            console.log("stop now");
            stopNow();
        });
    }, []);

    useEffect(() => {
        const skipListener = () => {
            console.log("skip");
            timer.stop();
            if (shootOrBreak === "shoot") {
                setShootOrBreak("break");
            } else if (shootOrBreak === "break") {
                setShootOrBreak("shoot");
            }
            setTimerShootAndBreak(breakTime, shootTime);
        };

        // attach listener
        socket.on("skip", skipListener);

        // Cleanup function to be run when component unmounts
        return () => {
            // detach listener
            socket.off("skip", skipListener);
        };
    }, [shootOrBreak, breakTime, shootTime]);

    useEffect(() => {
        if (isTargetAchieved) {
            if (stopAfter) {
                console.log("stop after");
                timer.stop();
                setStopAfter(false);
                //Maybe change the sound
            } else {
                console.log("target achieved");
                timer.stop();
                setTimerShootAndBreak(breakTime, shootTime);
            }
        }
    }, [isTargetAchieved]);

    function stopNow() {
        timer.stop();
        setIsStop(true);
        playThreeBuzzer();
    }

    useKeypress(" ", () => {
        timer.stop();
        setTimerShootAndBreak(breakTime, shootTime);
    });

    function setTimerShootAndBreak(breakTime, shootTime) {
        console.log(shootOrBreak);
        if (shootOrBreak === "shoot") {
            nextArcher();
            setShootOrBreak("break");
            playTwoBuzzer();
            timer.start({
                startValues: {
                    seconds: breakTime,
                },
                target: { seconds: 0 },
                countdown: true,
                updateWhenTargetAchieved: true,
            });
            checkEnds();
        } else if (shootOrBreak === "break") {
            setShootOrBreak("shoot");
            nextArcher();
            playBuzzer();
            console.log(archerSequence[currentIndex]);
            timer.start({
                startValues: {
                    seconds: shootTime,
                },
                target: { seconds: 0 },
                countdown: true,
                updateWhenTargetAchieved: true,
            });
            checkEnds();
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div
                    style={{
                        left: 354,
                        top: 177,
                        position: "absolute",
                        color: "white",
                        fontSize: 600,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        wordWrap: "break-word",
                    }}
                >
                    {isStop
                        ? "ST"
                        : !isTargetAchieved
                        ? timer.getTimeValues().seconds +
                          timer.getTimeValues().minutes * 60
                        : null}
                </div>

                {shootOrBreak === "shoot" ? (
                    <div className={styles.green}></div>
                ) : (
                    <div className={styles.red}></div>
                )}

                <div
                    style={{
                        left: 1506,
                        top: 606,
                        position: "absolute",
                        color: "white",
                        fontSize: 250,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        wordWrap: "break-word",
                    }}
                >
                    {isStop ? archerSequence[3] : archerSequence[currentIndex]}
                </div>
            </div>
        </>
    );
}
