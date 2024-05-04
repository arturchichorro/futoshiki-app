import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../components/GradientText';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Gradient
                colors={['#151B1D', '#070B15', '#151B1D']}
                locations={[0, 0.35, 0.85]}
                style={styles.backgroundGradient}
            />
            <GradientText style={styles.text}>FUTOSHIKI</GradientText>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    text: {
        fontSize: 50,
        fontFamily: 'JetBrainsMonoExtraBold',
    },
});
