import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface CheckInButtonProps {
    isDisabled?: boolean;
    onPress?: () => void;
    label?: string; 
}

export const CheckInButton = ({ 
    isDisabled = true, 
    onPress, 
    label = "Check In" 
}: CheckInButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isDisabled ? styles.disabledButton : styles.activeButton
                ]}
                disabled={isDisabled}
                onPress={onPress}
            >
                <Text style={[
                    styles.buttonText,
                    isDisabled ? styles.disabledText : styles.activeText
                ]}>
                    {label}
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.footerHint}>
                Check-in is available only when you are inside the company zone
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: spacing.xl,
        flex: 1,
    },
    button: {
        width: 220,
        height: 220,
        borderRadius: 110,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: spacing.xl,
    },
    disabledButton: {
        backgroundColor: colors.surface,
        borderWidth: 8,
        borderColor: colors.border,
    },
    activeButton: {
        backgroundColor: colors.primary,
        borderWidth: 8,
        borderColor: colors.border,
    },
    buttonText: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.medium as any,
    },
    disabledText: {
        color: '#9aa0a6',
    },
    activeText: {
        color: colors.surface,
        fontWeight: typography.weights.bold as any,
    },
    footerHint: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
        textAlign: 'center',
        paddingHorizontal: spacing.lg,
        lineHeight: 20,
        fontWeight: typography.weights.medium as any,
    }
});