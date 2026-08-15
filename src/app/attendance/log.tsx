import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_ATTENDANCE_RECORDS, AttendanceRecord } from "../../features/attendance/data/mockAttendance";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { Ionicons } from "@expo/vector-icons";

export default function AttendanceLogScreen() {
    const months = ["June", "July", "August"];
    const [currentMonthIndex, setCurrentMonthIndex] = useState(1);
    const activeMonthKey = months[currentMonthIndex];

    const filteredData = MOCK_ATTENDANCE_RECORDS.filter(
        (item) => item.monthKey === activeMonthKey
    );

    const handlePrevMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonthIndex < months.length - 1) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    };

    const getStatusStyle = (status: AttendanceRecord["status"]) => {
        switch (status) {
            case "Present":
                return { bg: colors.status.present, color: "#137333", text: "Present", iconColor: colors.primary, iconBg: "#edf8f8", badgeIcon: "checkmark-circle-outline"};
            case "Late":
                return { bg: colors.status.late, color: "#b06000", text: "Late", iconColor: colors.primary, iconBg: "#edf8f8", badgeIcon: "time-outline" };
            case "Absent":
                return { bg: colors.status.absent, color: "#c5221f", text: "Absent", iconColor: "#c5221f", iconBg: "#FFEBEE", badgeIcon: "close-circle-outline" };
            case "Excused":
                return { bg: colors.status.excused, color: "#5f6368", text: "Excused", iconColor: "#5f6368", iconBg: "#E7E8E8", badgeIcon: "information-circle-outline" };
            default:
                return { bg: colors.surface, color: colors.text.secondary, text: status, iconColor: colors.primary, iconBg: "#E6F0F0", badgeIcon: "help-circle-outline" };
        }
    };

    const renderItem = ({ item }: { item: AttendanceRecord }) => {
        const style = getStatusStyle(item.status);

        return (
            <View style={[
                styles.card, 
                item.status === 'Absent' && styles.absentCard,
                item.status === 'Excused' && styles.excusedCard
            ]}>
                <View style={styles.leftSection}>
                    <View style={[styles.iconContainer, { backgroundColor: style.iconBg }]}>
                        <Ionicons 
                            name={item.status === 'Absent' ? 'calendar-sharp' : item.status === 'Excused' ? 'medical-sharp' : 'calendar-outline'} 
                            size={22} 
                            color={style.iconColor} 
                        />
                    </View>
                    <View>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.timeText}>
                            {item.checkInTime === '-' ? 'No punch records' : `${item.checkInTime} - ${item.checkOutTime}`}
                        </Text>
                    </View>
                </View>
                
                <View style={[styles.badge, { backgroundColor: style.bg }]}>
                    <Ionicons name={style.badgeIcon as any} size={14} color={style.color} style={{ marginRight: 4 }} />
                    <Text style={[styles.badgeText, { color: style.color }]}>
                        {style.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                        <Text style={styles.pageTitle}>Attendance Log</Text>
                </View>

                <View style={styles.headerMonthContainer}>
                    <TouchableOpacity onPress={handlePrevMonth} disabled={currentMonthIndex === 0}>
                        <Ionicons name="chevron-back" size={18} color={currentMonthIndex === 0 ? colors.border : colors.text.primary} />
                    </TouchableOpacity>
                    
                    <Text style={styles.monthTitle}>
                        {filteredData[0]?.monthDisplay || `${activeMonthKey} 2023`}
                    </Text>

                    <TouchableOpacity onPress={handleNextMonth} disabled={currentMonthIndex === months.length - 1}>
                        <Ionicons name="chevron-forward" size={18} color={currentMonthIndex === months.length - 1 ? colors.border : colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: spacing.lg }}
                />
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
        paddingHorizontal: spacing.lg, 
        backgroundColor: colors.background 
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.xs,
        marginBottom: spacing.md,
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.primary,
        marginTop: 1,
    },
    headerMonthContainer: {
        backgroundColor: colors.surface,
        borderRadius: spacing.sm,
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    monthTitle: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.regular as any,
        color: colors.text.primary,
    },
    card: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: spacing.sm,
        marginBottom: spacing.sm,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 1,
    },
    absentCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#c5221f', 
    },
    excusedCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#999999'
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        marginRight: spacing.md,
    },
    date: { 
        fontSize: typography.sizes.sm, 
        fontWeight: typography.weights.bold as any,
        color: colors.text.secondary,
    },
    timeText: { 
        fontSize: typography.sizes.lg,
        color: colors.text.primary, 
        marginTop: 4,
    },
    badge: { 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm, 
        paddingVertical: spacing.xs, 
        borderRadius: typography.sizes.xxl || 20 
    },
    badgeText: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.regular as any,
    }
});