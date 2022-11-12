import { View, Text } from 'react-native';
import Dice from './Dice';

function DiceHistory({ history }: { history: number[] }) {
    return (
        <View>
            <Text>History</Text>
            <View style={{ flexDirection: "row" }}>
                {history.map((number, index) => {
                    return (
                        <View key={index} style={{ margin: 3 }}>
                            <Dice number={number} height={40} width={40}></Dice>
                        </View>
                    )
                })}
            </View>
        </View>
    );
}

export default DiceHistory
