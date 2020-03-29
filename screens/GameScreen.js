import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const Direction = {
    LOWER: 'lower',
    GREATER: 'greater'
};

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = direction => {
        if (
            (direction === Direction.LOWER && currentGuess < props.userChoice) ||
            (direction === Direction.GREATER && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{style: 'cancel', text: 'Sorry!'}]
            );
            return;
        }
        if (direction === Direction.LOWER) {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, Direction.LOWER)} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, Direction.GREATER)} />
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
