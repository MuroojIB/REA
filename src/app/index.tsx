import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AttendanceStatus } from "../features/attendance/components/AttendanceStatus";
import { AttendanceCard } from "../features/attendance/components/AttendanceCard";
import { CheckInButton } from "../features/attendance/components/CheckInButton";
import { useLocation } from "../features/location/hooks/useLocation";

// موعد الدوام الرسمي — نستخدمه لاحقًا لحساب التأخير
const OFFICIAL_START_HOUR = 9; // 9:00 AM

export default function HomeScreen() {
  const { distance, status: locationStatus, errorMessage } = useLocation();

const [attendanceState, setAttendanceState] = useState<
  "not-checked-in" | "checked-in" | "checked-out"
>("not-checked-in");

  // الوقت الحقيقي لضغطة check-in/out (Date object، مو نص)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  // الساعة الحية المعروضة أعلى الشاشة (تتحدث كل دقيقة)
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const isInside = locationStatus === "inside";

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleAttendanceAction = () => {
    if (!isInside) return;

    if (attendanceState === "not-checked-in") {
      setCheckInDate(new Date());
      setAttendanceState("checked-in");
    } else if (attendanceState === "checked-in") {
      Alert.alert(
        "Confirm Check-Out",
        "Are you sure you want to check out now?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Check Out",
            style: "destructive",
            onPress: () => {
              setCheckOutDate(new Date());
              setAttendanceState("checked-out");
            },
          },
        ]
      );
    }
  };

  const isButtonDisabled = !isInside || attendanceState === "checked-out";
  const buttonLabel =
      attendanceState === "checked-in" ? "Check Out" :
      attendanceState === "checked-out" ? "Completed" :
      "Check In";

  return (
    <View style={styles.container}>
      <AttendanceStatus
        attendanceState={attendanceState}
        currentDate={now}
        checkInTime={checkInDate ? formatTime(checkInDate) : ""}
        checkOutTime={checkOutDate ? formatTime(checkOutDate) : ""}
      />

      <AttendanceCard
        distance={distance || 0}
        status={locationStatus}
        errorMessage={errorMessage || undefined}
      />

      <CheckInButton
        label={buttonLabel}
        isDisabled={isButtonDisabled}
        attendanceState={attendanceState}
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