import { router } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../components/GradientText';
import GradientButton from '../components/GradientButton';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Gradient
                colors={['#151B1D', '#070B15', '#151B1D']}
                locations={[0, 0.35, 0.85]}
                style={styles.backgroundGradient}
            />

            <View style={styles.uiContainer}>
                <GradientText style={styles.titleText}>FUTOSHIKI</GradientText>
                <Pressable onPress={() => {
                    router.navigate('/game');
                }}>
                    <GradientButton
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                    >
                        New Game
                    </GradientButton>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    uiContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 65,
        fontFamily: 'JetBrainsMonoExtraBold',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(30),
        height: verticalScale(40),
        width: scale(150),
        bottom: verticalScale(100),
    },
    buttonText: {
        color: 'white',
        fontFamily: 'JetBrainsMonoBold',
        fontSize: 25,
    }
});
