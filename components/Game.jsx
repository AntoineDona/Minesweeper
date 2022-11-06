import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Grid from "./Grid/Grid";
import ModalMenu from "./Modal";

export default function Game() {
  const [gameStatus, setGameStatus] = useState("playing");
  const [modalVisible, setModalVisible] = useState(false);
  const [gridParams, setGridParams] = useState({
    width: 7,
    height: 12,
    mineProba: 0.2,
  });

  const [fontsLoaded] = useFonts({
    "Land-Mine": require("../assets/fonts/LANDMINE.ttf"),
  });

  const text = styles.text;
  let textStyle;
  if (fontsLoaded) {
    const fontStyle = StyleSheet.create({ font: { FontFamily: "Land-Mine" } });
    textStyle = StyleSheet.compose([text, fontStyle.font]);
  } else {
    textStyle = styles.text;
  }

  useEffect(() => {
    if (gameStatus !== "playing") {
      setModalVisible();
    }
  }, [gameStatus]);

  return (
    <View>
      <Text style={textStyle}>MINESWEEPER</Text>
      <Grid
        gridParams={gridParams}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
      <ModalMenu
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "#1A5E63",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});
