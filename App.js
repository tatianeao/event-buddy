import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import RecoverPassScreen from "./screens/Recovery";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainTabsNavigator from "./navigators/MainTabsNavigator";
import EventDetailsScreen from "./screens/EventDetails";

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
          <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{headerTitle: "Detalhe do Evento" }} />
        </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Recover" component={RecoverPassScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
