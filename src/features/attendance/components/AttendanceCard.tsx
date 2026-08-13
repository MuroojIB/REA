import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface AttendanceCardProps {
    distance?: number;
    status?: string; // أضفنا حالة الموقع للتحكم بالمحتوى
    errorMessage?: string; // رسالة الخطأ لو وجدت
}

export const AttendanceCard = ({ distance = 350, status = 'outside', errorMessage }: AttendanceCardProps) => {
    const isInside = status === 'inside';
    const hasError = status === 'unavailable' || status === 'permission-denied';

    // تحديد محتوى النص والأيقونة بناءً على الحالة
    const getCardContent = () => {
        if (hasError) {
            return {
                title: "Location Unavailable",
                desc: errorMessage || "Unable to get your location. Please check GPS settings.",
                icon: "alert-circle-outline" as const,
                bgStyle: styles.restrictedBg,
                iconColor: "#ea4335"
            };
        }
        if (isInside) {
            return {
                title: "Location Status",
                desc: "You are within the allowed zone\nYou can check in",
                icon: "location-outline" as const,
                bgStyle: styles.allowedBg,
                iconColor: colors.primary
            };
        }
        return {
            title: "Location Status",
            desc: `You are ${distance}m away from the facility\nApproach zone to unlock check-in`,
            icon: "location-sharp" as const,
            bgStyle: styles.restrictedBg,
            iconColor: "#5f6368"
        };
    };

    const content = getCardContent();

    return (
        <View style={styles.card}>
            <View style={styles.locationRow}>
                <View style={[styles.iconContainer, content.bgStyle]}>
                    <Ionicons 
                        name={content.icon} 
                        size={24} 
                        color={content.iconColor} 
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{content.title}</Text>
                    <Text style={styles.description}>{content.desc}</Text>
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