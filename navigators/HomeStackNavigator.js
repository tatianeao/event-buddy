import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import EventsScreen from "../screens/Events";
import EventDetailsScreen from "../screens/EventDetails";


const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Events" component={EventsScreen} options={{ headerTitle: "Eventos" }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{headerTitle: "Detalhe do Evento" }} />
    </Stack.Navigator>
  );
}
