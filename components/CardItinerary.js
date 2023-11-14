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

export default function CardItinerary({ name, id, image, description }) {
  return (
    <>
      <View style={styles.textContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={{ marginLeft: 12, width: "70%" }}>
          <Text
            numberOfLines={4}
            style={{ color: "black", fontSize: 18, fontWeight: 700 }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={4}
            style={{ color: "#A67C00", fontSize: 14, fontWeight: 400 }}
          >
            {description}
          </Text>
        </View>
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
    height: 130,
    width: "40%",
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
