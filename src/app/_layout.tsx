import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
    JetBrainsMono_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_600SemiBold,
    JetBrainsMono_800ExtraBold
} from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded, fontError] = useFonts({
        JetBrainsMonoRegular: require('../assets/fonts/JetBrainsMonoRegular.ttf'),
        JetBrainsMonoSemiBold: require('../assets/fonts/JetBrainsMonoSemiBold.ttf'),
        JetBrainsMonoBold: require('../assets/fonts/JetBrainsMonoBold.ttf'),
        JetBrainsMonoExtraBold: require('../assets/fonts/JetBrainsMonoExtraBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return <ActivityIndicator />;
    }

    return <Slot />;
}
