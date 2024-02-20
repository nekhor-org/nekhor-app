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

export default function ListItinerary({ name, id }) {
  return (
    <>
      <View style={styles.textContainer}>
        <Text style={{ color: "#A67C00", fontSize: 16, fontWeight: 700 }}>
          {name}
        </Text>
        <Image
          source={require(`../assets/arrow_left.png`)}
          style={styles.menu}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    position: "relative",
  },
  gradient: {
    height: "50%",
    width: "95.5%",
    position: "absolute",
    borderRadius: 8,
    bottom: 0,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 8,
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 10,
    padding: 16,
    right: 10,
    backgroundColor: "black",
    borderRadius: 9999,
  },

  menu: {
    height: 22,
    width: 22,
    marginHorizontal: 4,
    objectFit: "cover",
  },

  textContainer: {
    color: "#000",
    bottom: 0,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
