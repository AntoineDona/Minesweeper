import { useEffect, useState } from "react";
import { Text } from "react-native";

import styles from "./Style";

export default function Timer({ gameStatus }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log("gameStatus Changed to", gameStatus);
    if (gameStatus === "playing") {
      setTimer(0);
    }
    const interval = setInterval(() => {
      if (gameStatus === "playing") {
        setTimer((t) => t + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStatus]);

  return <Text style={styles.score}>Time: {timer}</Text>;
}
