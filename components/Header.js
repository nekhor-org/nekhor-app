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
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getMenus } from "../api";

export default function Header({ title, image, id, navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [menus, setMenus] = React.useState([]);

  const getMenuData = async () => {
    const response = await getMenus();
    setMenus(response.data);
  };
  React.useEffect(() => {
    getMenuData();
  }, []);

  const openMenu = () => {
    console.log(menus);
    const options = menus.map((item) => item.name);

    showActionSheetWithOptions(
      {
        options,
        title: "Menu",
        titleTextStyle: { color: "black", fontSize: 24, fontWeight: 700 },
      },
      (selectedIndex) => {
        console.log(menus[selectedIndex]);
        navigation.push("Posts", {
          id: menus[selectedIndex].local_id,
          name: menus[selectedIndex].name,
        });
        console.log(menus[selectedIndex]);
      }
    );
  };

  const openSettings = () => {
    const options = ["English", "Mandarin"];

    showActionSheetWithOptions(
      {
        options,
        message: "Setting the language",
        title: "Configuration",
        titleTextStyle: { color: "black", fontSize: 24, fontWeight: 700 },
      },
      (selectedIndex) => {
        console.log(selectedIndex);
      }
    );
  };

  return (
    <View style={styles.containerHeader}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={openMenu}>
          <Image source={require("../assets/menu.png")} style={styles.menu} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openSettings}>
          <Image source={require("../assets/config.png")} style={styles.menu} />
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
