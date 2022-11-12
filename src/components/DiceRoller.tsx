import { GestureResponderEvent, Pressable } from 'react-native';
import Dice from './Dice';

function DiceRoller({ currentNumber, onPress }: { currentNumber: number, onPress: (event: GestureResponderEvent) => void }) {
    return (
        <Pressable onPress={onPress}>
            <Dice number={currentNumber} width={120} height={120} />
        </Pressable>
    );
}

export default DiceRoller
