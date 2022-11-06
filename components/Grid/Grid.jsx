import { useEffect, useState } from "react";
import { View } from "react-native";

import Tile from "./Tile/Tile";

export default function Grid({ gridParams, gameStatus, setGameStatus }) {
  const [tilesArray, setTilesArray] = useState([[]]); // 2D Array containing the tiles
  /**
   * Get the neighbors of a tile
   * @param {object} centerTile Tile from which we get the neighbors.
   * @param {array[]} grid Grid from which we get the neighbors.
   * @return {list} List of all the neighbors.
   */
  function getNeighbors(centerTile, grid) {
    const x = centerTile.x;
    const y = centerTile.y;
    const maxX = gridParams.height - 1;
    const maxY = gridParams.width - 1;

    const neighbors = [];

    if (x > 0 && y > 0) {
      neighbors.push(grid[x - 1][y - 1]); //add top left tile
    }
    if (y > 0) {
      neighbors.push(grid[x][y - 1]); //add top mid tile
    }
    if (x < maxX && y > 0) {
      neighbors.push(grid[x + 1][y - 1]); //add top right tile
    }
    if (x > 0) {
      neighbors.push(grid[x - 1][y]); //add mid left tile
    }
    if (x < maxX) {
      neighbors.push(grid[x + 1][y]); //add mid right tile
    }
    if (x > 0 && y < maxY) {
      neighbors.push(grid[x - 1][y + 1]); //add bottom left tile
    }
    if (y < maxY) {
      neighbors.push(grid[x][y + 1]); //add bottom mid tile
    }
    if (x < maxX && y < maxY) {
      neighbors.push(grid[x + 1][y + 1]); //add bottom right tile
    }

    return neighbors;
  }

  /**
   * Generate new grid of tiles
   * 1) Creates a grid called newTiles and places mines
   * 2) Calculates the values i.e the number of mines surrounding each tile
   */
  function generateNewGrid() {
    const newGrid = [];
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
          hasBeenFlagged: false,
          value: -1,
        };
        newLine.push(tile);
      }
      newGrid.push(newLine);
    }
    // Now that we know where all the mines are,
    //we can get the value of each tile, i.e the number of bombs around it
    for (let i = 0; i < gridParams.height; i++) {
      // loop over the lines
      for (let j = 0; j < gridParams.width; j++) {
        // loop over the columns
        const tile = newGrid[i][j];
        let value = 0;
        if (!tile.isMine) {
          const neighbors = getNeighbors(tile, newGrid);
          //get all neighbooring tiless
          //count the mines around the tile
          neighbors.forEach((neighbor) => {
            if (neighbor.isMine) {
              value++;
            }
          });
          newGrid[tile.x][tile.y] = { ...tile, value };
          //change the corresponding tile value in newGrid
        }
        // else it's a mine and we keep the value -1
      }
    }
    // Finally we "save" this new grid
    setTilesArray(newGrid);
  }

  useEffect(() => {
    if (gameStatus === "playing") {
      generateNewGrid();
    }
  }, [gameStatus]);

  /**
   * Change the inner state of a particular tile.
   * @param {object} tile Tile to change.
   * @param {object} valuesToChange Object containing all the key/value pairs to change.
   * @return {number} The result of adding num1 and num2.
   */
  function changeTileValue(tile, valuesToChange) {
    const newTiles = [...tilesArray];
    newTiles[tile.x][tile.y] = { ...tile, ...valuesToChange };
    setTilesArray(newTiles);
  }

  /**
   * Reveal hidden tiles neighboring a tile with value 0
   */
  function revealTiles(tile) {
    if (tile.isHidden && !tile.hasBeenFlagged) {
      changeTileValue(tile, { isHidden: false });
      if (tile.isMine) {
        //if we click on a mine, we lose
        setGameStatus("lost");
      }
      const neighbors = getNeighbors(tile, tilesArray);
      // Get neighbors to potentially propagate the reveal
      neighbors.forEach((neighbor) => {
        if (neighbor.value === 0) {
          revealTiles(neighbor);
          //if a neighbor is empty, we reveal it
        } else if (tile.value === 0) {
          revealTiles(neighbor);
          //else if the current tile has no mines around it, we reveal all its neighbors
        }
      });
    }
  }

  /**
   * Flag or unflag the current tile
   */
  function flagTile(tile) {
    if (tile.isHidden) {
      changeTileValue(tile, { hasBeenFlagged: !tile.hasBeenFlagged });
    }
  }

  return (
    <View>
      {tilesArray.map((row, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          {row.map((tile) => (
            <Tile
              key={(tile.x, tile.y)}
              x={tile.x}
              y={tile.y}
              value={tile.value}
              isMine={tile.isMine}
              isHidden={tile.isHidden}
              hasBeenFlagged={tile.hasBeenFlagged}
              handleShortPress={() => {
                revealTiles(tile);
              }}
              handleLongPress={() => {
                flagTile(tile);
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
