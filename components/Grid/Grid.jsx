import { useEffect, useState } from "react";
import { View, Vibration } from "react-native";

import Tile from "./Tile/Tile";

export default function Grid({
  width,
  height,
  minesAmount,
  gameStatus,
  setGameStatus,
  score,
  setScore,
}) {
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
    const maxX = height - 1;
    const maxY = width - 1;

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
   * Place a certain amount of mines in a 2D array
   * @param {number} width Width of the grid.
   * @param {number} height Height of the grid.
   * @param {number} mines Number of mines to place.
   * @return {boolean[]} Array of size width*height filled with boolean values indicating the presence of mines
   */
  function generateMinesArray(width, height, mines) {
    const minesArray = Array(height).fill(false);
    console.log("init", minesArray);
    //Creates an array filled with false
    let minesCount = 0;
    let iterations = 0;
    while (minesCount < mines && iterations < 100) {
      //while we did not place every mine
      const i = Math.floor(Math.random() * width * height);
      //choose a random row and random column
      if (!minesArray[i]) {
        //check if there isn't already a mine
        minesArray[i] = true;
        //place a mine
        minesCount++;
      }
      iterations++;
    }
    return minesArray;
  }

  /**
   * Generate new grid of tiles
   * 1) Place the mines in a grid
   * 2) Creates a grid called newTiles
   * 3) Calculates the values i.e the number of mines surrounding each tile
   */
  function generateNewGrid() {
    const minesArray = generateMinesArray(width, height, minesAmount);
    console.log(minesArray);

    const newGrid = [];
    for (let i = 0; i < height; i++) {
      // loop over the lines
      const newLine = [];
      for (let j = 0; j < width; j++) {
        // loop over the column
        const tile = {
          x: i,
          y: j,
          isMine: minesArray[i * width + j],
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
    for (let i = 0; i < height; i++) {
      // loop over the lines
      for (let j = 0; j < width; j++) {
        // loop over the columns
        const tile = newGrid[i][j];
        let value = 0;
        if (!tile.isMine) {
          const neighbors = getNeighbors(tile, newGrid);
          //get all neighbooring tiles
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
   * Check winning condition i.e all tiles without a mine have been revealed
   * Toggle win if so
   */
  function checkWin() {
    if (score === width * height - minesAmount) {
      revealGrid();
      setTimeout(() => {
        setGameStatus("won");
      }, 1000);
    }
  }

  /**
   * Run checkWin each time the score has increased
   */
  useEffect(() => {
    // console.log("score", score);
    // console.log("score to win", width * height - minesAmount);
    checkWin();
  }, [score]);

  /**
   * Check if the tile that has been pressed was a bomb or not
   * Toggle loss if so
   */
  function checkLoss(tile) {
    if (tile.isMine) {
      //if we click on a mine, we lose
      revealGrid();
      setTimeout(() => {
        setGameStatus("lost");
      }, 1000);
    }
  }

  /**
   * Reveal hidden tiles neighboring a tile with value 0
   */
  function revealTiles(tile) {
    if (tile.isHidden && !tile.hasBeenFlagged) {
      checkLoss(tile);
    } else {
      const tilesToReveal = [tile];

      /**
       * Nested not-so-pretty recursive function that gets all the tiles to reveal
       * @param {object} tile Tile from which we get the neighbors.
       * @return {list} List of all tiles to reveal.
       */
      // eslint-disable-next-line no-inner-declarations
      function getTilesToReveal(tile) {
        const neighbors = getNeighbors(tile, tilesArray);
        // Get neighbors to potentially propagate the reveal

        neighbors.forEach((neighbor) => {
          if (neighbor.isHidden && (tile.value === 0 || neighbor.value === 0)) {
            //if the center tile has no mines around it or if the selected neighbor ampty,
            if (!tilesToReveal.includes(neighbor)) {
              // check if the neighbor is not already in the list,
              tilesToReveal.push(neighbor);
              // add it to the list of tiles to reveal
              getTilesToReveal(neighbor);
              //and check its own neighbors
            }
          }
        });
      }

      getTilesToReveal(tile);
      //get list of all tiles to reveal
      tilesToReveal.forEach((tile) => {
        //for each tile to reveal
        changeTileValue(tile, { isHidden: false });
        //reveal it
      });

      setScore((score) => score + tilesToReveal.length);
      //Add 1 to the counter of revealed tiles
    }
  }

  /**
   * Reveal the entire grid, and remove the flags
   */
  function revealGrid() {
    for (let i = 0; i < height; i++) {
      // loop over the lines
      for (let j = 0; j < width; j++) {
        // loop over the columns
        const tile = tilesArray[i][j];
        if (tile.hasBeenFlagged) {
          //remove flags if present
          changeTileValue(tile, { hasBeenFlagged: false, isHidden: false });
        } else if (tile.isHidden) {
          //else if the tile is hidden, reveal it
          changeTileValue(tile, { isHidden: false });
        }
      }
    }
  }

  /**
   * Flag or unflag the current tile
   */
  function flagTile(tile) {
    if (tile.isHidden) {
      Vibration.vibrate(50);
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
              {...tile}
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
