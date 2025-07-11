import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import FavoritosScreen from "../screens/Favorites"; 
import PerfilScreen from "../screens/Profile";       

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Início") {
              iconSource = require("../assets/home.png");
            } else if (route.name === "Favoritos") {
              iconSource = require("../assets/heart.png");
            } else if (route.name === "Perfil") {
              iconSource = require("../assets/profile-user.png");
            }

            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#1e92bf" : "#12486d",
                }}
              />
            );
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#1e92bf",
          tabBarInactiveTintColor: "#12486d",
          headerShown: false,
        })}
    >
      <Tab.Screen name="Início" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen}  options={{ headerShown: true }}/>
      <Tab.Screen name="Perfil" component={PerfilScreen}  options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}