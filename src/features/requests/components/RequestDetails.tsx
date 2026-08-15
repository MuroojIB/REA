import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExcuseRequest } from "../types";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface RequestDetailsProps {
    request: ExcuseRequest;
}

export const RequestDetails = ({ request }: RequestDetailsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.divider} />
            
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Time Range</Text>
                    <Text style={styles.value}>{request.timeRange || "--:-- --"}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>{request.date}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Reason</Text>
                <Text style={styles.value}>{request.reason}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: "#e8eaed",
        marginVertical: spacing.md,
    },
    row: {
        flexDirection: "row",
        marginBottom: spacing.md,
    },
    column: {
        flex: 1,
    },
    section: {
        marginBottom: spacing.xs,
    },
    label: {
        fontSize: typography.sizes.xs,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    value: {
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
        lineHeight: 22,
    },
});