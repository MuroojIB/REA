import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExcuseRequest } from "../types";
import { RequestStatus } from "../../requests/components/RequestStatus";
import { RequestDetails } from "../../requests/components/RequestDetails";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";

interface RequestCardProps {
    request: ExcuseRequest;
    isExpanded?: boolean;
    onPress?: () => void;
}

export const RequestCard = ({ request, isExpanded = false, onPress }: RequestCardProps) => {
    const getIconName = (type: ExcuseRequest["type"]) => {
        switch (type) {
            case "late-arrival": return "time-outline";
            case "early-leave": return "exit-outline";
            case "full-day": return "calendar-outline";
            default: return "document-text-outline";
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.topSection}>
                <View style={styles.iconContainer}>
                    <Ionicons name={getIconName(request.type)} size={24} color="#111" />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{request.title}</Text>
                    <Text style={styles.subText}>
                        {request.date}
                        {!isExpanded && request.timeRange ? `\n${request.timeRange}` : ""}
                    </Text>
                </View>

                <View style={styles.rightSection}>
                    <RequestStatus status={request.status} />
                    {!isExpanded && (
                        <Ionicons name="chevron-forward" size={20} color="#9aa0a6" style={styles.arrow} />
                    )}
                </View>
            </View>

            {isExpanded && <RequestDetails request={request} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    topSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#f4f5f7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.bold as any,
        color: colors.text.primary,
        marginBottom: 4,
    },
    subText: {
        fontSize: typography.sizes.xs,
        color: colors.text.secondary,
        lineHeight: 18,
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrow: {
        marginLeft: 8,
    },
});