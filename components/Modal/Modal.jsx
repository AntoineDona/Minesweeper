import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Modal,
  Dimensions,
  Text,
  Pressable,
} from "react-native";

import styles from "./Style";

export default function ModalMenu({
  gameStatus,
  setGameStatus,
  modalVisible,
  setModalVisible,
  setScore,
  setTimer,
  setStopTimer,
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
    close();
    setGameStatus("playing");
    setScore(0);
    setTimer(0);
    setStopTimer(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 300);
  }

  const slideUpAnimation = useRef(new Animated.Value(0)).current;

  const slideUp = slideUpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height - 100, 0],
  });

  const fadeAnimation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const background = fadeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,.7)"],
    extrapolate: "clamp",
  });

  const pulseAnimation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const pulse = pulseAnimation.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 1.1, 1],
    extrapolate: "clamp",
  });

  function open() {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideUpAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }

  function close() {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideUpAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.linear),
      useNativeDriver: true,
    }).start();
    pulseAnimation.setValue(0);
  }

  useEffect(() => {
    if (modalVisible) {
      open();
    }
  }, [modalVisible]);

  return (
    <Modal transparent visible={modalVisible}>
      <Animated.View
        style={[
          styles.centeredView,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.modalView,
            backgroundStyle,
            { transform: [{ translateY: slideUp }, { scale: pulse }] },
          ]}
        >
          <Text style={styles.modalTitle}>{title}</Text>
          <Pressable onPress={retry} style={styles.button}>
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
