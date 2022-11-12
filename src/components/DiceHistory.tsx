import { StyleSheet, View, Text } from 'react-native';
import Dice from './Dice';

function DiceHistory({ history }: { history: number[] }) {
    return (
        <View>
            <Text style={styles.text}>History</Text>
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

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default DiceHistory
