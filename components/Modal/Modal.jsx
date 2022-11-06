import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

import styles from "./Style";

export default function ModalMenu({
  gameStatus,
  setGameStatus,
  modalVisible,
  setModalVisible,
}) {
  let title;
  let buttonText;
  let backgroundStyle;

  if (gameStatus === "won") {
    title = "You Won !";
    buttonText = "New game";
    backgroundStyle = styles.winBackground;
  } else {
    title = "You lost...";
    buttonText = "Try again !";
    backgroundStyle = styles.lossBackground;
  }

  function retry() {
    setGameStatus("playing");
    setModalVisible(false);
  }

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, backgroundStyle]}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Pressable onPress={retry} style={styles.button}>
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
