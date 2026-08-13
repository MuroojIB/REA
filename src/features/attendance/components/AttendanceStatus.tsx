import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface AttendanceStatusProps {
    attendanceState?: "not-checked-in" | "checked-in" | "checked-out";
    checkInTime?: string;
    checkOutTime?: string;
}

export const AttendanceStatus = ({ 
    attendanceState = "not-checked-in", 
    checkInTime = "", 
    checkOutTime = "" 
}: AttendanceStatusProps) => {
    
    const getStatusDetails = () => {
        switch (attendanceState) {
            case "checked-in":
                return { text: `Checked in at ${checkInTime}`, dotColor: "#34a853" };
            case "checked-out":
                return { text: `Checked out at ${checkOutTime}`, dotColor: "#ea4335" };
            default:
                return { text: "Not checked in", dotColor: "#9aa0a6" };
        }
    };

    const statusInfo = getStatusDetails();

    return (
        <View style={styles.timeContainer}>
            <Text style={styles.dateText}>THU, AUG 13, 2026</Text>
            
            <View style={styles.timeRow}>
                <Text style={styles.timeDisplay}>12:41</Text>
                <Text style={styles.amPm}> AM</Text>
            </View>
            
            <View style={styles.statusBadge}>
                <View style={[styles.dot, { backgroundColor: statusInfo.dotColor }]} />
                <Text style={styles.statusBadgeText}>{statusInfo.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderRadius: spacing.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    dateText: {
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
        fontWeight: typography.weights.bold as any,
        letterSpacing: 1.5,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: spacing.sm,
    },
    timeDisplay: {
        fontSize: 48,
        fontWeight: typography.weights.bold as any,
        color: "#003333", 
    },
    amPm: {
        fontSize: typography.sizes.lg,
        color: colors.text.secondary,
        marginLeft: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: spacing.xl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: spacing.sm,
    },
    statusBadgeText: {
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
        fontWeight: typography.weights.medium as any,
    },
});