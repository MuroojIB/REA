import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRequests } from "../../features/requests/hooks/useRequests";
import { ExcuseRequest, RequestType } from "../../features/requests/types";
import { spacing } from "@/theme/spacing";

export default function NewRequestScreen() {
    const router = useRouter();
    const { addRequest } = useRequests();

    const [type, setType] = useState<RequestType>("late-arrival");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [reason, setReason] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getTitleByType = (reqType: RequestType) => {
        switch (reqType) {
            case "late-arrival": return "Late Arrival";
            case "early-leave": return "Early Leave";
            case "full-day": return "Time off during the day";
            default: return "Excuse Request";
        }
    };

    // دالة موحدة للأيقونات لضمان التطابق التام مع القائمة الخارجية (RequestCard)
    const getIconByType = (reqType: RequestType) => {
        switch (reqType) {
            case "late-arrival": return "time-outline";
            case "early-leave": return "exit-outline";
            case "full-day": return "calendar-outline";
            default: return "document-text-outline";
        }
    };

    // يسمح بالأرقام والشرطة فقط (لصيغة YYYY-MM-DD)
    const handleDateChange = (text: string) => {
        const filtered = text.replace(/[^0-9-]/g, "");
        setDate(filtered);
        if (error) setError(null);
    };

    // يسمح بالأرقام والنقطتين فقط (لصيغة HH:MM)
    const handleStartTimeChange = (text: string) => {
        const filtered = text.replace(/[^0-9:]/g, "");
        setStartTime(filtered);
    };

    const handleEndTimeChange = (text: string) => {
        const filtered = text.replace(/[^0-9:]/g, "");
        setEndTime(filtered);
    };

    const handleSubmit = () => {
        if (!date.trim() || !reason.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        setError(null);
        setIsSubmitting(true);

        setTimeout(() => {
            const newRequest: ExcuseRequest = {
                id: Date.now().toString(),
                type,
                title: getTitleByType(type),
                date,
                timeRange: startTime && endTime ? `${startTime} - ${endTime}` : undefined,
                reason,
                status: "pending",
                createdAt: new Date().toISOString(),
            };

            addRequest(newRequest);
            setIsSubmitting(false);

            // تفريغ الحقول بعد الإرسال
            setDate("");
            setStartTime("");
            setEndTime("");
            setReason("");
            setType("late-arrival");

            router.push("/requests");
        }, 600);
    };

    return (
        <>
            <Tabs.Screen
                options={{
                    title: "New Excuse Request",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f4f7f8" },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/requests")}
                            style={{ marginLeft: 16, padding: 4 }}
                        >
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.description}>
                        Please provide the details for your excuse request below
                    </Text>

                    {/* 1. Request Type مع التصميم المميز والأيقونات الموحدة */}
                    <Text style={styles.label}>Request Type</Text>
                    <View style={styles.radioGroup}>
                        {[
                            { key: "late-arrival", label: "Late Arrival" },
                            { key: "early-leave", label: "Early Leave" },
                            { key: "full-day", label: "Time off during the day" },
                        ].map((item) => {
                            const isSelected = type === item.key;
                            const iconName = getIconByType(item.key as RequestType);
                            return (
                                <TouchableOpacity
                                    key={item.key}
                                    style={[styles.radioOption, isSelected && styles.radioOptionSelected]}
                                    onPress={() => setType(item.key as RequestType)}
                                >
                                    <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                                        <Ionicons
                                            name={iconName as any}
                                            size={18}
                                            color={isSelected ? "#ffffff" : "#043c35"}
                                        />
                                    </View>
                                    <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>
                                        {item.label}
                                    </Text>
                                    <Ionicons
                                        name={isSelected ? "radio-button-on" : "radio-button-off"}
                                        size={20}
                                        color={isSelected ? "#043c35" : "#666"}
                                        style={{ marginLeft: "auto" }}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* 2. Date (أرقام وشرطة فقط عبر فلترة النص + لوحة المفاتيح الرقمية) */}
                    <Text style={styles.label}>Date</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor="#999"
                            keyboardType="numbers-and-punctuation"
                            value={date}
                            onChangeText={handleDateChange}
                            maxLength={10}
                        />
                    </View>

                    {/* 3. Start & End Time (أرقام ونقطتين فقط عبر فلترة النص) */}
                    <View style={styles.row}>
                        <View style={styles.halfColumn}>
                            <Text style={styles.label}>Start Time</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="time-outline" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="08:00"
                                    placeholderTextColor="#999"
                                    keyboardType="numbers-and-punctuation"
                                    value={startTime}
                                    onChangeText={handleStartTimeChange}
                                    maxLength={5}
                                />
                            </View>
                        </View>

                        <View style={styles.halfColumn}>
                            <Text style={styles.label}>End Time</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="time-outline" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="17:00"
                                    placeholderTextColor="#999"
                                    keyboardType="numbers-and-punctuation"
                                    value={endTime}
                                    onChangeText={handleEndTimeChange}
                                    maxLength={5}
                                />
                            </View>
                        </View>
                    </View>

                    {/* 4. Reason */}
                    <Text style={styles.label}>Reason</Text>
                    <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Please provide details for your request..."
                            placeholderTextColor="#999"
                            value={reason}
                            onChangeText={(text) => {
                                setReason(text);
                                if (error) setError(null);
                            }}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Error Message */}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    {/* 5. Buttons */}
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Text style={styles.submitButtonText}>Submit Request</Text>
                                <Ionicons name="send-outline" size={18} color="#fff" style={{ marginLeft: 8 }} />
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => router.push("/requests")}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f7f8",
    },
    scrollContent: {
        padding: spacing.lg,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    description: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        marginTop: 12,
    },
    radioGroup: {
        marginBottom: 10,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#fafafa",
    },
    radioOptionSelected: {
        borderColor: "#043c35",
        backgroundColor: "#f0f7f6",
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: "#e2eeeb",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    iconBoxSelected: {
        backgroundColor: "#043c35",
    },
    radioText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    radioTextSelected: {
        color: "#043c35",
        fontWeight: "bold",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        backgroundColor: "#fafafa",
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfColumn: {
        width: "48%",
    },
    textAreaWrapper: {
        paddingHorizontal: 0,
        paddingLeft: 12,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    errorText: {
        color: "#c5221f",
        fontSize: 13,
        marginTop: 5,
    },
    submitButton: {
        flexDirection: "row",
        backgroundColor: "#043c35",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    cancelButtonText: {
        color: "#555",
        fontSize: 16,
        fontWeight: "bold",
    },
});