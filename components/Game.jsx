import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Grid from "./Grid/Grid";
import ModalMenu from "./Modal/Modal";

export default function Game() {
  const [gameStatus, setGameStatus] = useState("playing");
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0); // The score is defined as the number of discovered tiles
  const [timer, setTimer] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [gameParams, setGameParams] = useState({
    width: 7,
    height: 10,
    minesAmount: 15,
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
      setModalVisible();
    }
  }, [gameStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!stopTimer) {
        setTimer((t) => t + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [stopTimer]);

  return (
    <View>
      <Text style={textStyle}>MINESWEEPER</Text>
      <Grid
        {...gameParams}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        score={score}
        setScore={setScore}
        setStopTimer={setStopTimer}
      />
      <View style={styles.scoreBox}>
        <Text style={styles.score}>Time: {timer}</Text>
        <Text style={styles.score}>
          Score: {score.toString().padStart(2, "0")} /&nbsp;
          {gameParams.width * gameParams.height - gameParams.minesAmount}
        </Text>
      </View>
      <ModalMenu
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        score={score}
        setScore={setScore}
        setTimer={setTimer}
        setStopTimer={setStopTimer}
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
  scoreBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1A5E63",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    fontSize: 20,
    color: "white",
  },
});
