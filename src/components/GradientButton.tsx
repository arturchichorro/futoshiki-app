import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { View, Pressable, Text, TextStyle, ViewStyle, GestureResponderEvent } from 'react-native';

interface GradientButtonProps {
    children: ReactNode;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const GradientText: React.FC<GradientButtonProps> = ({
    children,
    textStyle,
    containerStyle,

}) => {
    return (
        <LinearGradient
            colors={['#FF883B', '#FF5C21']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={containerStyle}>
            <Text style={textStyle}>{children}</Text>
        </LinearGradient>
    );
};

export default GradientText;
