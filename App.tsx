import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <MainScreen />
        </>
    );
}
