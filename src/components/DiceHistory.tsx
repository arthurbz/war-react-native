import { View } from 'react-native';
import Dice from './Dice';

function DiceHistory({ history }: { history: number[] }) {
    return (
        <View>
            {history.map((number, index) => {
                return <Dice key={index} number={number} height={50} width={50}></Dice>
            })}
        </View>
    );
}

export default DiceHistory
