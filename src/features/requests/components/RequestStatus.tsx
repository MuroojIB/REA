import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RequestStatus as RequestStatusType } from "../types";

interface RequestStatusProps {
    status: RequestStatusType;
}

export const RequestStatus = ({ status }: RequestStatusProps) => {
    const getStatusStyle = (s: RequestStatusType) => {
        switch (s) {
            case "approved":
                return { label: "Approved", bgColor: "#e6f4ea", textColor: "#137333" };
            case "rejected":
                return { label: "Rejected", bgColor: "#fce8e6", textColor: "#c5221f" };
            default:
                return { label: "Pending", bgColor: "#e8eaed", textColor: "#3c4043" };
        }
    };

    const style = getStatusStyle(status);

    return (
        <View style={[styles.badge, { backgroundColor: style.bgColor }]}>
            <Text style={[styles.badgeText, { color: style.textColor }]}>
                {style.label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
});