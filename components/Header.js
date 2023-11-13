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
const { width } = Dimensions.get("screen");

export default function Header({ title, image, id }) {
  return (
    <View style={styles.containerHeader}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <View style={styles.menuContainer}>
        <Image source={require("../assets/menu.png")} style={styles.menu} />
        <Image source={require("../assets/config.png")} style={styles.menu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  image: {
    height: 50,
    width: 206,
    objectFit: "cover",
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
