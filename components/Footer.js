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
const { width } = Dimensions.get("screen");

export default function Footer({ active = "explore" }) {
  return (
    <View style={styles.containerHeader}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.00)", "#fff"]}
        style={styles.gradient}
      ></LinearGradient>
      <View
        style={active == "explore" ? styles.menuItemActive : styles.menuItem}
      >
        <Image
          source={require(`../assets/${
            active == "explore" ? "explore_active.svg" : "explore.svg"
          }`)}
          style={styles.menu}
        />
      </View>
      <View style={active == "heart" ? styles.menuItemActive : styles.menuItem}>
        <Image
          source={require(`../assets/${
            active == "heart" ? "heart_active.svg" : "heart.svg"
          }`)}
          style={styles.menu}
        />
      </View>
      <View style={active == "map" ? styles.menuItemActive : styles.menuItem}>
        <Image
          source={require(`../assets/${
            active == "map" ? "map_active.svg" : "map.svg"
          }`)}
          style={styles.menu}
        />
      </View>
      <View
        style={active == "location" ? styles.menuItemActive : styles.menuItem}
      >
        <Image
          source={require(`../assets/${
            active == "location" ? "location_active.svg" : "location.svg"
          }`)}
          style={styles.menu}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    padding: 16,
    width: "100%",
    position: "fixed",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  menuItem: {
    width: 85,
    zIndex: 10,
    height: 85,
    backgroundColor: "#fff",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },

  menuItemActive: {
    width: 85,
    zIndex: 10,
    height: 85,
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

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
});
