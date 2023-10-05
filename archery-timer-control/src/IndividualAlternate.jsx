import React, { useState } from "react";
import {
    Button,
    Select,
    NumberInput,
    NumberInputField,
    VStack,
    Radio,
    RadioGroup,
    Text,
    Input,
    Container,
    HStack,
    Heading,
} from "@chakra-ui/react";
import { socket } from "./socket";

export default function IndividualAlternate() {
    function updateData() {
        console.log(data);
        socket.emit("updateDataIndividual", data);
    }

    function startLeft() {
        socket.emit("startLeft");
    }

    function startRight() {
        socket.emit("startRight");
    }

    function stop() {
        socket.emit("stop");
    }

    function startBreak() {
        socket.emit("startBreak");
    }

    function skipLeft() {
        socket.emit("skipLeft");
    }

    function skipRight() {
        socket.emit("skipRight");
    }

    const [data, setData] = useState({
        name_left: "",
        name_right: "",
        club_left: "",
        club_right: "",
        score: {
            left: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            },
            right: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            },
        },
        point_left: 0,
        point_right: 0,
    });

    return (
        <VStack spacing={4}>
            <Heading>Individual Alternate</Heading>
            <VStack spacing={4} w="100%">
                <HStack w="100%" spacing={4}>
                    <Input
                        placeholder="Left name"
                        value={data.name_left}
                        onChange={(e) =>
                            setData({ ...data, name_left: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Right name"
                        value={data.name_right}
                        onChange={(e) =>
                            setData({ ...data, name_right: e.target.value })
                        }
                    />
                </HStack>
                <HStack w="50%" spacing={4}>
                    <Input
                        placeholder="Left club"
                        value={data.club_left}
                        onChange={(e) =>
                            setData({ ...data, club_left: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Right club"
                        value={data.club_right}
                        onChange={(e) =>
                            setData({ ...data, club_right: e.target.value })
                        }
                    />
                </HStack>
            </VStack>
            <HStack spacing={4}>
                <VStack spacing={4}>
                    <Text>Left points</Text>
                    <NumberInput
                        value={data.score.left[1]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 1: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="1" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.left[2]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 2: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="2" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.left[3]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 3: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="3" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.left[4]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 4: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="4" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.left[5]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 5: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="5" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.left[6]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    left: { ...data.score.left, 6: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="6" />
                    </NumberInput>
                </VStack>
                <VStack spacing={4}>
                    <Text>Right points</Text>
                    <NumberInput
                        value={data.score.right[1]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 1: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="1" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.right[2]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 2: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="2" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.right[3]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 3: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="3" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.right[4]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 4: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="4" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.right[5]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 5: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="5" />
                    </NumberInput>
                    <NumberInput
                        value={data.score.right[6]}
                        onChange={(value) =>
                            setData({
                                ...data,
                                score: {
                                    ...data.score,
                                    right: { ...data.score.right, 6: value },
                                },
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="6" />
                    </NumberInput>
                </VStack>
            </HStack>
            <HStack spacing={4}>
                <VStack spacing={4}>
                    <Text>Left Set Points</Text>
                    <NumberInput
                        value={data.point_left}
                        onChange={(value) =>
                            setData({
                                ...data,
                                point_left: value,
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="Left Set Points" />
                    </NumberInput>
                </VStack>
                <VStack spacing={4}>
                    <Text>Right Set Points</Text>
                    <NumberInput
                        value={data.point_right}
                        onChange={(value) =>
                            setData({
                                ...data,
                                point_right: value,
                            })
                        }
                        min={0}
                    >
                        <NumberInputField placeholder="Right Set Points" />
                    </NumberInput>
                </VStack>
            </HStack>
            <Button onClick={updateData}>Update</Button>
            <HStack spacing={4}>
                <Button onClick={startBreak}>Start Break</Button>
                <Button onClick={startLeft}>Start Left</Button>
                <Button onClick={startRight}>Start Right</Button>
            </HStack>
            <HStack spacing={4}>
                <Button onClick={skipLeft}>Skip Left</Button>
                <Button onClick={skipRight}>Skip Right</Button>
            </HStack>
            <Button onClick={stop} colorScheme="red">
                Stop
            </Button>
        </VStack>
    );
}
