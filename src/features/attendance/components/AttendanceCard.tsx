import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface AttendanceCardProps {
    distance?: number;
    isInside?: boolean;
}

export const AttendanceCard = ({ distance = 350, isInside = false }: AttendanceCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.locationRow}>
                <View style={[styles.iconContainer, isInside ? styles.allowedBg : styles.restrictedBg]}>
                    <Ionicons 
                        name={isInside ? "location-outline" : "location-sharp"} 
                        size={24} 
                        color={isInside ? colors.primary : "#5f6368"} 
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Location Status</Text>
                    <Text style={styles.description}>
                        {isInside 
                            ? "You are within the allowed zone\nYou can check in" 
                            : `You are ${distance}m away from the facility\nApproach zone to unlock check-in`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 1,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: spacing.sm + 2,
        borderRadius: 50,
        marginRight: spacing.md,
    },
    allowedBg: {
        backgroundColor: '#e6f4ea',
    },
    restrictedBg: {
        backgroundColor: '#f1f3f4',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    description: {
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
        lineHeight: 18,
        paddingTop: spacing.xs,
    },
});