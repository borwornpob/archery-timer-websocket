import React, { useState, useEffect } from "react";
import useTimer from "easytimer-react-hook";
import buzzer from "../../assets/buzzer.wav";
import useKeypress from "react-use-keypress";
const ENDPOINT = "http://localhost:8000";
import styles from "./LeftCompound.module.css";
import { socket } from "../../socket";

export default function LeftCompound() {
    const [individual, setIndividual] = useState();
    const [isBreakDone, setIsBreakDone] = useState(false);
    const [isShootDone, setIsShootDone] = useState(false);
    const [lightColor, setLightColor] = useState("red");
    const [startSide, setStartSide] = useState("left");

    useEffect(() => {
        socket.on("updateDataIndividual", (data) => {
            setIndividual(data);
        });
    }, []);

    const [timer, isTargetAchieved] = useTimer({
        updateWhenTargetAchieved: true,
    });

    useEffect(() => {
        // start the althernating timer
        socket.on("startLeft", () => {
            startShoot();
        });
        socket.on("stop", () => {
            setLightColor("red");
            timer.stop();
            setIsBreakDone(false);
            setIsShootDone(false);
        });
        socket.on("startBreak", () => {
            timer.stop();
            startBreak();
        });
        socket.on("skipLeft", () => {
            setLightColor("red");
            timer.stop();
            setIsBreakDone(false);
            setIsShootDone(false);
        });
        socket.on("skipRight", () => {
            startShoot();
        });
    }, []);

    function startBreak() {
        setLightColor("red");
        timer.stop();
        timer.start({
            startValues: {
                seconds: 10,
            },
            target: { seconds: 0 },
            countdown: true,
            updateWhenTargetAchieved: true,
        });
        setIsBreakDone(true);
    }

    function startShoot() {
        playBuzzer();
        setIsBreakDone(false);
        if (!isShootDone) {
            setLightColor("green");
            timer.stop();
            timer.start({
                startValues: {
                    seconds: 20,
                },
                target: { seconds: 0 },
                countdown: true,
                updateWhenTargetAchieved: true,
            });
            setIsShootDone(true);
        } else if (isShootDone) {
            //socket emit to start right timer and stop left timer
            setLightColor("red");
            socket.emit("startRight");
            timer.stop();
            setIsShootDone(false);
        }
    }

    useEffect(() => {
        if (isTargetAchieved) {
            if (!isBreakDone) {
                timer.stop();
                startShoot();
            }
        }
    }, [isTargetAchieved]);

    function playThreeBuzzer() {
        const audio = new Audio(buzzer);
        //play this audio three times
        setTimeout(() => {
            audio.play();
        }, 50);
        setTimeout(() => {
            audio.play();
            y;
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

    return (
        <div className="container">
            <div className={styles.background_timer}></div>
            <div
                className={`${styles.light} ${
                    lightColor === "red" ? styles.red : styles.green
                }`}
            ></div>
            <div className={styles.timer}>{timer.getTimeValues().seconds}</div>

            <div className={styles.name}>{individual?.name_left}</div>
            <div className={styles.club_container}></div>
            <div className={styles.club}>{individual?.club_left}</div>

            <div className={styles.score_1}>{individual?.score.left[1]}</div>
            <div className={styles.score_2}>{individual?.score.left[2]}</div>
            <div className={styles.score_3}>{individual?.score.left[3]}</div>
            <div className={styles.total_text}>TOTAL</div>
            <div className={styles.total_score}>
                {Number(individual?.total_left) +
                    Number(individual?.score.left[1]) +
                    Number(individual?.score.left[2]) +
                    Number(individual?.score.left[3])}
            </div>
            <div className={styles.set_text}>Set points</div>
            <div className={styles.set_score}>{individual?.point_left}</div>
        </div>
    );
}
