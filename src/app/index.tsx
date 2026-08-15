import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AttendanceStatus } from "../features/attendance/components/AttendanceStatus";
import { AttendanceCard } from "../features/attendance/components/AttendanceCard";
import { CheckInButton } from "../features/attendance/components/CheckInButton";
import { useLocation } from "../features/location/hooks/useLocation";

const OFFICIAL_START_HOUR = 9;
const OFFICIAL_START_MINUTE = 0;

export default function HomeScreen() {
  const { distance, status: locationStatus, errorMessage } = useLocation();

  const [attendanceState, setAttendanceState] = useState<
    "not-checked-in" | "checked-in" | "checked-out"
  >("not-checked-in");

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isLate, setIsLate] = useState(false);

  const checkIfLate = (date: Date) => {
    const officialStart = new Date(date);
    officialStart.setHours(OFFICIAL_START_HOUR, OFFICIAL_START_MINUTE, 0, 0);
    return date.getTime() > officialStart.getTime();
  };

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
      const checkInMoment = new Date();
      setCheckInDate(checkInMoment);
      setIsLate(checkIfLate(checkInMoment));
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

  const formatWorkedHours = (checkIn: Date, checkOut: Date) => {
    const diffMs = checkOut.getTime() - checkIn.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const workedHours =
    checkInDate && checkOutDate
      ? formatWorkedHours(checkInDate, checkOutDate)
      : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👋</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingSub}>GOOD MORNING</Text>
            <Text style={styles.userName}>Murooj</Text>
          </View>
        </View>

        <AttendanceStatus
          attendanceState={attendanceState}
          currentDate={now}
          checkInTime={checkInDate ? formatTime(checkInDate) : ""}
          checkOutTime={checkOutDate ? formatTime(checkOutDate) : ""}
          isLate={isLate}
          workedHours={workedHours}
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
          isLate={isLate}
          onPress={handleAttendanceAction}
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
    paddingTop: spacing.xs,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E2ECE9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  headerTextContainer: {
    marginLeft: spacing.md,
  },
  greetingSub: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 0.8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 1,
  },
});