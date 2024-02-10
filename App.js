import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
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
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { getMenus } from "./api";
import { database } from "./model";

export default function App() {
  const getMenuDatas = async () => {
    console.log("PEGANDO MENUS");
    const response = await getMenus();
    const res = await database.get("locals").query();
    res.map(async (item) => {
      await database.write(async () => {
        await item.destroyPermanently();
      });
    });

    response.data.map(async (item) => {
      console.log(item.name);
      const newPost = await database.write(async () => {
        await database.get("locals").create((local) => {
          local.id = item.id;
          local.name = item.name;
          local.localId = item.local_id;
          local.languageId = item.language_id;
        });
      });
    });
  };

  useEffect(() => {
    getMenuDatas();
  }, []);

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="ItineraryDetail" component={ItineraryDetail} />
          <Stack.Screen name="CreateItinerary" component={CreateItinerary} />
          <Stack.Screen name="Itinerary" component={Itinerary} />
          <Stack.Screen name="Visiteds" component={Visiteds} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
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
