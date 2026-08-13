import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AttendanceStatus } from "../features/attendance/components/AttendanceStatus";
import { AttendanceCard } from "../features/attendance/components/AttendanceCard";
import { CheckInButton } from "../features/attendance/components/CheckInButton";
import { useLocation } from "../features/location/hooks/useLocation";

export default function HomeScreen() {
  const { distance, status: locationStatus, errorMessage } = useLocation();

  const [attendanceState, setAttendanceState] = useState<
    "not-checked-in" | "checked-in" | "checked-out"
  >("not-checked-in");

  // Mock times for check-in and check-out
  const [checkInTime, setCheckInTime] = useState<string>("09:02 AM");
  const [checkOutTime, setCheckOutTime] = useState<string>("05:11 PM");

  const isInside = locationStatus === "inside";

  const handleAttendanceAction = () => {
    if (!isInside) return;

    if (attendanceState === "not-checked-in") {
      setAttendanceState("checked-in");
      console.log("Checked In");
    } else if (attendanceState === "checked-in") {
      setAttendanceState("checked-out");
      console.log("Checked Out");
    }
  };

  const isButtonDisabled = !isInside || attendanceState === "checked-out";
  const buttonLabel =
    attendanceState === "checked-in" ? "Check Out" : "Check In";

  return (
    <View style={styles.container}>
      <AttendanceStatus
        attendanceState={attendanceState}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
      />

      <AttendanceCard
        distance={distance || 0}
        status={locationStatus}
        errorMessage={errorMessage || undefined}
      />

      <CheckInButton
        label={buttonLabel}
        isDisabled={isButtonDisabled}
        onPress={handleAttendanceAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});
