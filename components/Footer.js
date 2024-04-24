import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");

export default function Footer({ active = "explore", navigation }) {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerMenu}>
        <TouchableOpacity
          onPress={() => navigation.replace("Home")}
          style={active == "explore" ? styles.menuItemActive : styles.menuItem}
        >
          <Image
            source={
              active == "explore"
                ? require(`../assets/explore_active.png`)
                : require(`../assets/explore.png`)
            }
            style={styles.menu}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Favorites")}
          style={active == "heart" ? styles.menuItemActive : styles.menuItem}
        >
          <Image
            source={
              active == "heart"
                ? require(`../assets/heart_active.png`)
                : require(`../assets/heart.png`)
            }
            style={styles.menu}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Visiteds")}
          style={active == "map" ? styles.menuItemActive : styles.menuItem}
        >
          <Image
            source={
              active == "map"
                ? require(`../assets/map_active_1.png`)
                : require(`../assets/map_1.png`)
            }
            style={styles.menuMap}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Itinerary")}
          style={active == "location" ? styles.menuItemActive : styles.menuItem}
        >
          <Image
            source={
              active == "location"
                ? require(`../assets/itinerary1_active.png`)
                : require(`../assets/itinerary1.png`)
            }
            style={styles.menu}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Map")}
          style={active == "map" ? styles.menuItemActive : styles.menuItem}
        >
          <Image
            source={
              active == "map"
                ? require(`../assets/location_active.png`)
                : require(`../assets/location.png`)
            }
            style={styles.menu}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.00)", "#fff"]}
        style={styles.gradient}
      ></LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    padding: 8,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerMenu: {
    flex: 1,
    padding: 16,
    width: 100,
    position: "relative",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  gradient: {
    height: "150%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  menuItem: {
    width: 60,
    zIndex: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },

  menuItemActive: {
    width: 60,
    zIndex: 10,
    height: 60,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A67C00",
  },
  menu: {
    height: 32,
    width: 32,
    marginHorizontal: 4,
    objectFit: "cover",
  },
  menuMap: {
    height: 32,
    width: 24,
    marginHorizontal: 4,
    objectFit: "cover",
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
});
