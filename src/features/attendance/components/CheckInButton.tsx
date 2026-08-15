import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface CheckInButtonProps {
    isDisabled?: boolean;
    onPress?: () => void;
    label?: string;
    attendanceState?: "not-checked-in" | "checked-in" | "checked-out";
}

export const CheckInButton = ({
    isDisabled = true,
    onPress,
    label = "Check In",
    attendanceState = "not-checked-in",
}: CheckInButtonProps) => {

    const getButtonStyle = () => {
        if (isDisabled && attendanceState !== "checked-out") return styles.disabledButton;
        if (attendanceState === "checked-out") return styles.disabledButton;
        if (attendanceState === "checked-in") return styles.checkedInButton; 
        return styles.activeButton; 
    };

    const getTextColor = () => {
        if (isDisabled || attendanceState === "checked-out") return styles.disabledText.color;
        if (attendanceState === "checked-in") return styles.checkedInText.color;
        return styles.activeText.color;
    };

    const getIconName = () => {
        if (attendanceState === "checked-in") return "logout"; 
        if (attendanceState === "checked-out") return "check-decagram";
        return "fingerprint";
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, getButtonStyle()]}
                disabled={isDisabled || attendanceState === "checked-out"}
                onPress={onPress}
            >
                <MaterialCommunityIcons 
                    name={getIconName()} 
                    size={57} 
                    color={getTextColor()} 
                    style={styles.icon}
                />
                
                <Text style={[styles.buttonText, { color: getTextColor() }]}>
                    {label}
                </Text>
            </TouchableOpacity>

            <Text style={styles.footerHint}>
                {attendanceState === "checked-out"
                    ? "See you tomorrow!\nYou have completed today's attendance"
                    : "Check-in is available only when you are inside the company zone"}
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
    icon: {
        marginBottom: spacing.sm,
    },
    disabledButton: {
        backgroundColor: colors.surface,
        borderWidth: 8,
        borderColor: colors.border,
    },
    activeButton: {
        backgroundColor: "#184740",
        borderWidth: 8,
        borderColor: "#d0dcdc",
    },
    checkedInButton: {
        backgroundColor: "#fe7353",
        borderWidth: 8,
        borderColor: "#FFE2DA",
    },
    checkedInText: {
        color: "#FFFFFF",
        fontWeight: typography.weights.bold as any,
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