import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DiceHistory from '../components/DiceHistory';
import DiceRoller from '../components/DiceRoller';

function MainScreen() {
    const [currentNumber, setCurrentNumber] = useState(1)
    const [history, setHistory] = useState([])

    useEffect(() => {
    }, [currentNumber])

    function rollDice() {
        const number = Math.ceil(Math.random() * 6)
        setCurrentNumber(number)

        if (history.length == 3)
            history.splice(0, 1)
        history.push(number)

        console.log("Current Number: ", currentNumber)
    }

    return (
        <View style={styles.container}>
            <DiceHistory history={history}/>
            <DiceRoller currentNumber={currentNumber} onPress={rollDice} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MainScreen 
