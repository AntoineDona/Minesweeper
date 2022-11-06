import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";

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

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, backgroundStyle]}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Pressable style={styles.button}>
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.7,
    maxHeight: 300,
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: "auto",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "lightgrey",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginTop: "auto",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalText: {
    textAlign: "center",
    color: "white",
  },
  winBackground: {
    backgroundColor: "#408F2B",
  },
  lossBackground: {
    backgroundColor: "#CE4760",
  },
});
