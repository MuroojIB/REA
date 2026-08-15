import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RequestsProvider } from '../features/requests/hooks/useRequests';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <RequestsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 0.5,
            borderTopColor: colors.border,
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 8,
          },
        }}
      >
                <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={focused ? 20 : 22}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            ),
          }}
        />
        
        <Tabs.Screen
          name="attendance/log"
          options={{
            title: 'Attendance Log',
            tabBarLabel: 'Log',
            tabBarIcon: ({ focused, color }) => (
              <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
                <Ionicons
                  name={focused ? 'time' : 'time-outline'}
                  size={focused ? 20 : 22}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="requests/index"
          options={{
            title: 'My Requests',
            tabBarLabel: 'Requests',
            tabBarIcon: ({ focused, color }) => (
              <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
                <Ionicons
                  name={focused ? 'document-text' : 'document-text-outline'}
                  size={focused ? 20 : 22}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="requests/new"
          options={{
            title: 'New Request',
            href: null,
            headerShown: true,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.primary,
            headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            headerShadowVisible: false,
          }}
        />
      </Tabs>
    </RequestsProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
    marginBottom: 1,
  },
  activeIconContainer: {
    backgroundColor: colors.primary,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
    marginBottom: 1,
  },
});