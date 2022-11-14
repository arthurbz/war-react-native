import { Image, View } from 'react-native';
const dice1 = require(`../assets/dice1.png`)
const dice2 = require(`../assets/dice2.png`)
const dice3 = require(`../assets/dice3.png`)
const dice4 = require(`../assets/dice4.png`)
const dice5 = require(`../assets/dice5.png`)
const dice6 = require(`../assets/dice6.png`)

function Dice({ number, width, height }: { number: number, width: number, height: number }) {
    const source = getDiceImage(number)

    return (
        <View>
            <Image
                style={{ width, height }}
                source={source}
            />
        </View>
    );
}

function getDiceImage(number: number) {
    if (number == 1)
        return dice1 

    if (number == 2)
        return dice2 

    if (number == 3)
        return dice3 

    if (number == 4)
        return dice4

    if (number == 5)
        return dice5 

    if (number == 6)
        return dice6 
}

export default Dice
