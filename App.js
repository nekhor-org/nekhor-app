import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import Visiteds from "./views/Visiteds";
import Itinerary from "./views/Itinerary";
import Posts from "./views/Posts";
import PostDetail from "./views/PostDetail";
import ItineraryDetail from "./views/ItineraryDetail";
import CreateItinerary from "./views/CreateItinerary";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CreateItinerary" component={CreateItinerary} />
        <Stack.Screen name="ItineraryDetail" component={ItineraryDetail} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Itinerary" component={Itinerary} />
        <Stack.Screen name="Visiteds" component={Visiteds} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
