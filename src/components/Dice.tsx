import { Image, View } from 'react-native';

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
        return require(`../assets/dice1.png`)

    if (number == 2)
        return require(`../assets/dice2.png`)

    if (number == 3)
        return require(`../assets/dice3.png`)

    if (number == 4)
        return require(`../assets/dice4.png`)

    if (number == 5)
        return require(`../assets/dice5.png`)

    if (number == 6)
        return require(`../assets/dice6.png`)
}

export default Dice
