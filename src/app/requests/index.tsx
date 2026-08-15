import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RequestCard } from "../../features/requests/components/RequestCard";
import { useRequests } from "../../features/requests/hooks/useRequests";
import { RequestStatus } from "../../features/requests/types";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { EmptyState } from "../../components/EmptyState";
import { Ionicons } from "@expo/vector-icons";

export default function RequestsScreen() {
    const router = useRouter();
    const { requests } = useRequests();
    const [selectedFilter, setSelectedFilter] = useState<RequestStatus>("all");
    
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggleExpand = (id: string) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    const filteredRequests = requests.filter((req) => {
        if (selectedFilter === "all") return true;
        return req.status === selectedFilter;
    });

    const filterOptions: { label: string; value: RequestStatus }[] = [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
    ];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>📋</Text>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.greetingSub}>OVERVIEW</Text>
                        <Text style={styles.pageTitle}>My Requests</Text>
                    </View>
                </View>

                <View style={styles.filterWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                        {filterOptions.map((option) => {
                            const isSelected = selectedFilter === option.value;
                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[styles.chip, isSelected && styles.activeChip]}
                                    onPress={() => setSelectedFilter(option.value)}
                                >
                                    <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredRequests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <RequestCard 
                            request={item} 
                            isExpanded={expandedId === item.id}
                            onPress={() => handleToggleExpand(item.id)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <EmptyState
                            icon="document-text-outline"
                            title="No Requests Found"
                            description={
                                selectedFilter === "all"
                                    ? "You haven't submitted any excuse requests yet"
                                    : `There are no ${selectedFilter} requests available`
                            }
                        />
                    }
                />

                <TouchableOpacity style={styles.fab} onPress={() => router.push("/requests/new")}>
                    <Ionicons name="add" size={28} color={colors.surface} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: { 
        flex: 1, 
        paddingHorizontal: spacing.sm, 
        backgroundColor: colors.background 
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.md,
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#E2ECE9",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarEmoji: {
        fontSize: 22,
    },
    headerTextContainer: {
        marginLeft: spacing.md,
    },
    greetingSub: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.text.secondary,
        letterSpacing: 0.8,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.primary,
        marginTop: 1,
    },
    filterWrapper: {
        paddingVertical: spacing.md,
    },
    filterContainer: {
        paddingHorizontal: spacing.md,
        gap: spacing.xs + 2,
    },
    chip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs + 2,
        borderRadius: 20,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    activeChip: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
        fontWeight: typography.weights.medium as any,
    },
    activeChipText: {
        color: colors.surface,
        fontWeight: typography.weights.bold as any,
    },
    listContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: 80,
    },
    emptyText: {
        textAlign: "center",
        marginTop: spacing.xl,
        color: colors.text.secondary,
    },
    fab: {
        position: "absolute",
        right: spacing.lg,
        bottom: spacing.lg,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});