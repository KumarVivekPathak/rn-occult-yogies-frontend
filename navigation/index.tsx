import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../src/components/Header";
import { RootStackParamList } from "./types";
type IconName = keyof typeof Ionicons.glyphMap;

import Profile from "../src/screens/Profile";
import SignIn from "../src/screens/SignIn";
import { useAuth } from "../src/context/AuthContext";
import NameNumerology from "../src/screens/NameNumerology";
import NameNumerologyReport from "../src/screens/NameNumerologyReport";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName = "home";

          if (route.name === "NameFixing") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "magenta",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="NameNumerology"
        component={NameNumerology}
        options={{
          title: "Name Numerology",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "magenta",
          },
          headerTintColor: "#fff", // optional: white text/icon color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "magenta",
          },
          headerTintColor: "#fff", // optional: white text/icon color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const token = useAuth();
  return (
    <Stack.Navigator
    // initialRouteName={token ? "Tabs" : "SignIn"}
    initialRouteName="SignIn"
      screenOptions={{
        // header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NameNumerologyReport"
        component={NameNumerologyReport}
        options={{
          title: "Name Numerology Report",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "magenta",
          },
          headerTintColor: "#fff", // optional: white text/icon color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
