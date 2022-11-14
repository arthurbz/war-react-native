import { useEffect, useState, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, Text } from 'react-native';
import DiceHistory from '../components/DiceHistory';
import DiceRoller from '../components/DiceRoller';

const animationDuration = 900

function MainScreen() {
    const [attackCurrentNumber, setAttackCurrentNumber] = useState(rollDice())
    const [defenseCurrentNumber, setDefenseCurrentNumber] = useState(rollDice())
    const [whoPlays, setWhoPlays] = useState("attack")
    const [winner, setWinner] = useState("")
    const [attackHistory, setAttackHistory] = useState([])
    const [defenseHistory, setDefenseHistory] = useState([])
    const [attackPoints, setAttackPoints] = useState(0)
    const [defensePoints, setDefensePoints] = useState(0)
    const [animate, setAnimate] = useState(false)
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
        //Make a copy so it does not change the state
        const copyOfAttackHistory = [...attackHistory]
        const copyOfDefenseHistory = [...defenseHistory]
        copyOfAttackHistory.sort().reverse()
        copyOfDefenseHistory.sort().reverse()

        let attackPoints = 0
        let defensePoints = 0

        for (let i = 0; i < defenseArmy; i++)
            if (copyOfAttackHistory[i] > copyOfDefenseHistory[i])
                attackPoints++
            else
                defensePoints++

        setAttackPoints(attackPoints)
        setDefensePoints(defensePoints)
        return attackPoints > defensePoints ? "attack" : "defense"
    }

    function rollDice(): number {
        return Math.ceil(Math.random() * 6)
    }

    function rollDiceAttack() {
        setAnimate(true)
        setTimeout(() => {
            const number = rollDice()
            setAttackCurrentNumber(number)

            if (attackHistory.length < attackArmy)
                attackHistory.push(number)

            if (attackHistory.length == attackArmy)
                setWhoPlays("defense")
            setAnimate(false)
        }, animationDuration)
    }

    function rollDiceDefense() {
        setAnimate(true)
        setTimeout(() => {
            const number = rollDice()
            setDefenseCurrentNumber(number)

            if (defenseHistory.length < defenseArmy)
                defenseHistory.push(number)

            if (defenseHistory.length == defenseArmy)
                setWhoPlays("finish")

            setAnimate(false)
        }, animationDuration)
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
                    <Text>Troops Lost: {defensePoints}</Text>
                    {animate && whoPlays == "attack"
                        ? <Roll>
                            <DiceRoller

                                currentNumber={attackCurrentNumber}
                                onPress={rollDiceAttack}
                            />
                        </Roll>
                        : <DiceRoller
                            currentNumber={attackCurrentNumber}
                            onPress={rollDiceAttack}
                        />
                    }
                </View>

                <View style={styles.container} pointerEvents={whoPlays == "defense" ? "auto" : "none"}>
                    <Text style={styles.title}>DEFENSE</Text>
                    <DiceHistory history={defenseHistory} />
                    <Text>Troops Lost: {attackPoints}</Text>
                    {animate && whoPlays == "defense"
                        ? <Roll>
                            <DiceRoller
                                currentNumber={defenseCurrentNumber}
                                onPress={rollDiceDefense}
                            />
                        </Roll>
                        : <DiceRoller
                            currentNumber={defenseCurrentNumber}
                            onPress={rollDiceDefense}
                        />
                    }
                </View>
            </View>
            <Text style={styles.winner}>{winner.toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    winner: {
        fontSize: 42,
        color: "green",
        fontWeight: "bold"
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

const Roll = (props) => {
    const roll = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(
            roll,
            {
                toValue: 3,
                duration: animationDuration,
                useNativeDriver: true
            }
        ).start()
    }, [roll])

    const spin = roll.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })

    return (
        <Animated.View
            style={{
                ...props.style,
                transform: [
                    { rotateX: spin }
                ]
            }}
        >
            {props.children}
        </Animated.View>
    );
}


export default MainScreen 
