import { useState } from "react";
import { View } from "react-native";

import Tile from "./Tile";

export default function Grid() {
  const [tiles, setTiles] = useState([[]]); // 2D Array containing the tiles
  const gridParams = {
    width: 10,
    height: 5,
    mineProba: 0.2,
  };

  useState(() => {
    generateNewGrid();
  }, []);

  /**
   * Generate new grid tiles
   */
  function generateNewGrid() {
    const newTiles = [];
    for (let i = 0; i < gridParams.height; i++) {
      // loop over the lines
      const newLine = [];
      for (let j = 0; j < gridParams.width; j++) {
        // loop over the columns
        const tile = {
          x: i,
          y: j,
          isMine: Math.random() < gridParams.mineProba,
        };
        console.log(tile);
        newLine.push(tile);
      }
      newTiles.push(newLine);
    }
    setTiles(newTiles);
  }

  return (
    <View>
      {tiles.map((row, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          {row.map((tile) => (
            <Tile
              key={(tile.x, tile.y)}
              x={tile.x}
              y={tile.y}
              isMine={tile.isMine}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
