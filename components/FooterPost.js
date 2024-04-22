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

export default function FooterPost({ changeMap, share, hasMap }) {
  return (
    <View style={styles.containerHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 16,
          width: "100%",
        }}
      >
        {hasMap && (
          <TouchableOpacity
            onPress={changeMap}
            style={{
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              padding: 16,
              backgroundColor: "#A67C00",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>View in map</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={share}
          style={{
            width: 150,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            padding: 16,
            borderWidth: 2,
            color: "#A67C00",
            borderColor: "#A67C00",
          }}
        >
          <Text style={{ fontSize: 18, color: "#A67C00" }}>Share</Text>
        </TouchableOpacity>
      </View>
      {/* <LinearGradient
        colors={["rgba(0, 0, 0, 0.00)", "#fff"]}
        style={styles.gradient}
      ></LinearGradient> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    padding: 16,
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // containerHeader: {
  //   flex: 1,
  //   padding: 8,
  //   position: "absolute",
  //   bottom: 0,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
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
