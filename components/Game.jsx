import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Grid from "./Grid/Grid";
import ModalMenu from "./Modal/Modal";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

export default function Game() {
  const [gameStatus, setGameStatus] = useState("playing");
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0); // The score is defined as the number of discovered tiles
  const [gameParams, setGameParams] = useState({
    width: 7,
    height: 10,
    minesAmount: 10,
  });

  const [fontsLoaded] = useFonts({
    "Land-Mine": require("../assets/fonts/LANDMINE.ttf"),
  });

  const text = styles.text;
  let textStyle;
  if (fontsLoaded) {
    const fontStyle = StyleSheet.create({ font: { fontFamily: "Land-Mine" } });
    textStyle = StyleSheet.compose([text, fontStyle.font]);
  } else {
    textStyle = styles.text;
  }

  useEffect(() => {
    if (gameStatus !== "playing") {
      setModalVisible(true);
    }
  }, [gameStatus]);

  return (
    <View>
      <Text style={textStyle}>MINESWEEPER</Text>
      <Grid
        {...gameParams}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        score={score}
        setScore={setScore}
      />
      <ScoreBoard
        score={score}
        gameParams={gameParams}
        gameStatus={gameStatus}
        test={score}
      />
      <ModalMenu
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        score={score}
        setScore={setScore}
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
