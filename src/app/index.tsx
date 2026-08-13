import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AttendanceStatus } from "../features/attendance/components/AttendanceStatus";
import { AttendanceCard } from "../features/attendance/components/AttendanceCard";
import { CheckInButton } from "../features/attendance/components/CheckInButton";

export default function HomeScreen() {
    return (
        <View style={styles.container}>

            <AttendanceStatus />

            <AttendanceCard distance={350} isInside={false} />

            <CheckInButton isDisabled={true} onPress={() => console.log("Checked In!")} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: spacing.lg, 
        backgroundColor: colors.background 
    },
});