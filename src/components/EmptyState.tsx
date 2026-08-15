import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
}

export const EmptyState = ({
    icon = "document-text-outline",
    title,
    description,
}: EmptyStateProps) => (
    <View style={styles.container}>
        <View style={styles.iconCircle}>
            <Ionicons name={icon} size={42} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 48,
        paddingHorizontal: 24,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#E2ECE9",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: "center",
        lineHeight: 20,
    },
});