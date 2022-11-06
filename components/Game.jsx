import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Grid from "./Grid/Grid";
import ModalMenu from "./Modal";

export default function Game() {
  const [gameStatus, setGameStatus] = useState("playing");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (gameStatus !== "playing") {
      setModalVisible();
    }
  }, [gameStatus]);

  return (
    <View>
      <Text style={styles.text}>Minesweeper</Text>
      <Grid setGameStatus={setGameStatus} />
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
    color: "black",
    fontSize: 50,
    textAlign: "center",
    marginBottom: 20,
  },
});
