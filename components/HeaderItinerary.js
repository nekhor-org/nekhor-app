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
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");

export default function HeaderItinerary({ name }) {
  return (
    <View style={styles.containerHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 32 }}>{name}</Text>
        <TouchableOpacity
          style={{
            color: "#A67C00",
            fontSize: 14,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => console.log(`VER TODOS`)}
        >
          <>
            <Text
              style={{
                color: "#A67C00",
                fontSize: 14,
                fontWeight: 700,
                justifyContent: "flex-end",
              }}
            >
              Add
            </Text>
            <Image source={require(`../assets/plus.svg`)} style={styles.menu} />
          </>
        </TouchableOpacity>
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
    width: "100%",
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
