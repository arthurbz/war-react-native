import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DiceHistory from '../components/DiceHistory';
import DiceRoller from '../components/DiceRoller';

function MainScreen() {
    const [attackCurrentNumber, setAttackCurrentNumber] = useState(rollDice())
    const [defenseCurrentNumber, setDefenseCurrentNumber] = useState(rollDice())
    const [whoPlays, setWhoPlays] = useState("attack")
    const [winner, setWinner] = useState("")
    const [attackHistory, setAttackHistory] = useState([])
    const [defenseHistory, setDefenseHistory] = useState([])
    const attackArmy = 3
    const defenseArmy = 3

    useEffect(() => {
    }, [attackCurrentNumber, defenseCurrentNumber])

    useEffect(() => {
        if (whoPlays == "finish") {
            setWinner(getWinner())

            setTimeout(() => {
                setAttackHistory([])
                setDefenseHistory([])
                setWinner("")
                setWhoPlays("attack")
            }, 3000)
        }
    }, [whoPlays])

    function getWinner() {
        const copyOfAttackHistory = attackHistory.copyWithin(0, attackHistory.length)
        const copyOfDefenseHistory = defenseHistory.copyWithin(0, defenseHistory.length)
        copyOfAttackHistory.sort().reverse()
        copyOfDefenseHistory.sort().reverse()

        let attackPoints = 0
        let defensePoints = 0

        for (let i = 0; i < defenseArmy; i++)
            if (copyOfAttackHistory[i] > copyOfDefenseHistory[i])
                attackPoints++
            else
                defensePoints++

        return attackPoints > defensePoints ? "attack" : "defense" 
    }

    function rollDice(): number {
        return Math.ceil(Math.random() * 6)
    }

    function rollDiceAttack() {
        const number = rollDice()
        setAttackCurrentNumber(number)

        if (attackHistory.length < attackArmy)
            attackHistory.push(number)

        if (attackHistory.length == attackArmy)
            setWhoPlays("defense")
    }

    function rollDiceDefense() {
        const number = rollDice()
        setDefenseCurrentNumber(number)

        if (defenseHistory.length < defenseArmy)
            defenseHistory.push(number)

        if (defenseHistory.length == defenseArmy)
            setWhoPlays("finish")
    }

    return (
        <View style={{
            backgroundColor: '#fff',
            alignItems: 'center',
        }}>
            <View style={styles.row}>
                <View style={styles.container} pointerEvents={whoPlays == "attack" ? "auto" : "none"}>
                    <Text style={styles.title}>ATTACK</Text>
                    <DiceHistory history={attackHistory} />
                    <DiceRoller
                        currentNumber={attackCurrentNumber}
                        onPress={whoPlays == "attack" ? rollDiceAttack : undefined}
                    />
                </View>

                <View style={styles.container} pointerEvents={whoPlays == "defense" ? "auto" : "none"}>
                    <Text style={styles.title}>DEFENSE</Text>
                    <DiceHistory history={defenseHistory} />
                    <DiceRoller
                        currentNumber={defenseCurrentNumber}
                        onPress={whoPlays == "defense" ? rollDiceDefense : undefined}
                    />
                </View>
            </View>
            <Text>{winner}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    greyScale: {
        backgroundColor: "grey"
    },
    container: {
        backgroundColor: '#fff',
        alignItems: "center",
        height: 500,
        justifyContent: "space-around",
        width: "50%"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    }
});

export default MainScreen 
