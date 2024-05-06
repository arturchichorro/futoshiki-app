import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps {
    children: ReactNode;
    style?: TextStyle;
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    style,
}) => {
    return (
        <MaskedView
            style={{ flex: 1, flexDirection: 'row', height: '100%' }}
            maskElement={
                <View
                    style={{
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={style}
                    >
                        {children}
                    </Text>
                </View>
            }
        >
            <LinearGradient
                colors={['#FF883B', '#FF5C21']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            />
        </MaskedView>
    );
};

export default GradientText;
