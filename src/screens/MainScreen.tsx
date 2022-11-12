import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DiceHistory from '../components/DiceHistory';
import DiceRoller from '../components/DiceRoller';

function MainScreen() {
    const [attackCurrentNumber, setAttackCurrentNumber] = useState(rollDice())
    const [defenseCurrentNumber, setDefenseCurrentNumber] = useState(rollDice())
    const [attackHistory] = useState([])
    const [defenseHistory] = useState([])

    useEffect(() => {
    }, [attackCurrentNumber, defenseCurrentNumber])

    function rollDice(): number {
        return Math.ceil(Math.random() * 6)
    }

    function rollDiceAttack() {
        const number = rollDice()
        setAttackCurrentNumber(number)

        if (attackHistory.length == 3)
            attackHistory.splice(0, 1)

        attackHistory.push(number)
    }

    function rollDiceDenfese() {
        const number = rollDice()
        setDefenseCurrentNumber(number)

        if (defenseHistory.length == 3)
            defenseHistory.splice(0, 1)

        defenseHistory.push(number)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        }}>
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.title}>ATTACK</Text>
                    <DiceHistory history={attackHistory} />
                    <DiceRoller currentNumber={attackCurrentNumber} onPress={rollDiceAttack} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>DEFENSE</Text>
                    <DiceHistory history={defenseHistory} />
                    <DiceRoller currentNumber={defenseCurrentNumber} onPress={rollDiceDenfese} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "row",
    },
    greyScale: {
        backgroundColor: "grey"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "50%"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    }
});

export default MainScreen 
