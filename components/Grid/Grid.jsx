import { useState } from "react";
import { View } from "react-native";

import Tile from "./Tile";

export default function Grid() {
  const [tiles, setTiles] = useState([[]]); // 2D Array containing the tiles
  const gridParams = {
    width: 7,
    height: 12,
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
        const isMine = Math.random() < gridParams.mineProba;
        const tile = {
          x: i,
          y: j,
          isMine,
          isHidden: true,
          value: isMine ? 0 : 1,
        };
        newLine.push(tile);
      }
      newTiles.push(newLine);
    }
    setTiles(newTiles);
  }

  /**
   * Reveal hidden tiles on click
   */
  function handleClick(tile) {
    if (tile.isHidden) {
      const newTiles = [...tiles];
      newTiles[tile.x][tile.y].isHidden = false;
      setTiles(newTiles);
    }
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
              value={tile.value}
              isMine={tile.isMine}
              isHidden={tile.isHidden}
              handleClick={() => {
                handleClick(tile);
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
