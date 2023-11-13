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

export default function CardHome({ title, image, id }) {
  return (
    <View style={styles.containerCard}>
      <Image source={{ uri: image }} style={styles.image} />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.00)", "#000"]}
        style={styles.gradient}
      ></LinearGradient>
      <View style={styles.absoluteContainer}>
        <Text style={{ color: "white", fontSize: 14, fontWeight: 700 }}>
          {title}
        </Text>
      </View>
    </View>
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
    width: 120,
    position: "absolute",
    bottom: 0,
  },
  image: {
    height: 150,
    width: 120,
    borderRadius: 8,
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
});
