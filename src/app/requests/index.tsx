import { View, Text, StyleSheet } from 'react-native';

export default function MyRequestsScreen() {
    return (
    <View style={styles.container}>
        <Text>My Requests Screen</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});