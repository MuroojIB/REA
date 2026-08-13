import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceLogScreen() {
    return (
    <View style={styles.container}>
        <Text>Attendance Log Screen</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});