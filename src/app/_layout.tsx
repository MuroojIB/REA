import { Tabs } from 'expo-router';
import { RequestsProvider } from '../features/requests/hooks/useRequests';

export default function RootLayout() {
  return (
    <RequestsProvider>
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen
          name="attendance/log"
          options={{
            title: 'Attendance Log',
            tabBarLabel: 'Log',
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
          }}
        />

        <Tabs.Screen
          name="requests/index"
          options={{
            title: 'My Requests',
            tabBarLabel: 'Requests',
          }}
        />

        <Tabs.Screen
          name="requests/new"
          options={{
            title: 'New Request',
            href: null, 
          }}
        />
      </Tabs>
    </RequestsProvider>
  );
}