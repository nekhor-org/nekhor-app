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
import {
  deleteCountriesDb,
  deleteHomesDb,
  deleteItinerariesDb,
  deleteLanguagesDb,
  deleteMenusDb,
  deletePostDb,
  getLanguagesDb,
  getMenusDb,
} from "../utils";
import withObservables from "@nozbe/with-observables";
import { database } from "../model";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Header({ title, image, id, navigation, setIsLoading }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [menus, setMenus] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);

  const getMenuData = async () => {
    const res = await getMenusDb();
    console.log(res);
    setMenus(res);
  };

  const getLanguageData = async () => {
    const res = await getLanguagesDb();
    if (res && res[0]) {
      setLanguages(JSON.parse(res[0].content));
    }
  };
  React.useEffect(() => {
    getMenuData();
    getLanguageData();
  }, [database]);

  const openMenu = () => {
    let options = menus.map((item) => item.name);

    const newArray = ["Reload data", ...options];
    showActionSheetWithOptions(
      {
        options: newArray,
        title: "Menu",
        titleTextStyle: { color: "black", fontSize: 24, fontWeight: 700 },
      },
      async (selectedIndex) => {
        console.log(selectedIndex);
        if (selectedIndex == 0) {
          setIsLoading(true);
          await deleteMenusDb();
          await deleteHomesDb();
          await deleteItinerariesDb();
          await deleteLanguagesDb();
          await deleteCountriesDb();
          await deletePostDb();
          setIsLoading(false);
          navigation.push("Splash");
        } else {
          navigation.push("Posts", {
            id: menus[selectedIndex].localId,
            name: `${menus[selectedIndex].name}`,
          });
        }
      }
    );
  };

  const openSettings = () => {
    const options = languages.map((item) => item.name);

    showActionSheetWithOptions(
      {
        options,
        message: "Setting the language",
        title: "Configuration",
        titleTextStyle: { color: "black", fontSize: 24, fontWeight: 700 },
      },
      async (selectedIndex) => {
        await AsyncStorage.setItem(
          "languageId",
          JSON.stringify(languages[selectedIndex])
        );
        navigation.replace("Home");
      }
    );
  };

  return (
    <View style={styles.containerHeader}>
      <Image source={require("../assets/logo_1.png")} style={styles.image} />
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={openMenu}>
          <Image source={require("../assets/menu_1.png")} style={styles.menu} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openSettings}>
          <Image
            source={require("../assets/config_1.png")}
            style={styles.menu}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const enhance = withObservables(["locals"], ({ locals }) => ({
//   locals, // shortcut syntax for `comment: comment.observe()`
// }));

export default Header;

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
