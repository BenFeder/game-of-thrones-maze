// Your Code Here!
const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

let gameMaze = document.getElementById("gameMaze");

map[9][0] = " ";
map[9][1] = "S";
createMaze();

function createMaze() {
  // Iterate through each row in map array
  gameMaze.innerHTML = "";
  for (rows of map) {
    // make each row a section (div) for the maze
    let mazeRow = document.createElement("div");
    mazeRow.className = "row";
    gameMaze.append(mazeRow);
    // Turn each cell into a piece of the maze...
    for (let cell = 0; cell < rows.length; cell++) {
      if (rows[cell] == "W") {
        // ...as a wall
        let mazeWall = document.createElement("div");
        mazeWall.className = "wall";
        mazeRow.append(mazeWall);
      } else if (rows[cell] == " ") {
        // ...as pathway for player to move
        let mazePath = document.createElement("div");
        mazePath.className = "path";
        mazeRow.append(mazePath);
      } else if (rows[cell] == "S") {
        // ...as starting position, the player piece
        let playerPiece = document.createElement("div");
        playerPiece.className = "player";
        mazeRow.append(playerPiece);
      } else if (rows[cell] == "F") {
        // ...as finishing spot
        let finishSpot = document.createElement("div");
        finishSpot.className = "finish";
        mazeRow.append(finishSpot);
      }
    }
  }
}

document.addEventListener("keydown", movePiece);

function movePiece(event) {
  // update position of "S" in map array, so that the player piece div appends to the next cell over (up, down, left, or right)
  if (event.keyCode == 38) {
    moveUp();
  }
  // If player hits up arrow key
  function moveUp() {
    for (rows = 0; rows < map.length; rows++) {
      if (map[rows].indexOf("S") >= 0) {
        // If player piece exists in that row
        let indexPlayer = map[rows].indexOf("S"); // get index number of that player piece
        if (map[rows - 1][indexPlayer] != "W") {
          // If next cell up in previous array row isn't a wall
          let rowItemsTop = map[rows - 1].split("");
          rowItemsTop[indexPlayer] = "S";
          map[rows - 1] = rowItemsTop.join("");

          let rowItemsBottom = map[rows].split("");
          rowItemsBottom[indexPlayer] = " ";
          map[rows] = rowItemsBottom.join("");
          createMaze(); // move piece up
        }
      }
    }
  }

  if (event.keyCode == 40) {
    moveDown();
  }
  // If player hits down arrow key
  function moveDown() {
    for (rows = 0; rows < map.length; rows++) {
      if (map[rows].indexOf("S") >= 0) {
        // If player piece exists in that row
        let indexPlayer = map[rows].indexOf("S"); // get index number of that player piece
        if (map[rows + 1][indexPlayer] != "W") {
          // If next cell down in next array row isn't a wall
          let rowItemsTop = map[rows].split("");
          rowItemsTop[indexPlayer] = " ";
          map[rows] = rowItemsTop.join("");

          let rowItemsBottom = map[rows + 1].split("");
          rowItemsBottom[indexPlayer] = "S";
          map[rows + 1] = rowItemsBottom.join("");

          createMaze(); // move piece down
        }
      }
    }
  }

  if (event.keyCode == 37) {
    moveLeft();
  }
  // If player hits left arrow key

  function moveLeft() {
    for (rows = 0; rows < map.length; rows++) {
      if (map[rows].indexOf("S") >= 0) {
        // If player piece exists in that row
        let indexPlayer = map[rows].indexOf("S"); // get index number of that player piece
        if (
          map[rows][indexPlayer - 1] != "W" &&
          map[rows][indexPlayer - 1] >= 0
        ) {
          // If next cell to the left isn't a wall
          let rowItems = map[rows].split("");
          rowItems[indexPlayer - 1] = "S";
          rowItems[indexPlayer] = " ";
          map[rows] = rowItems.join("");
          createMaze();
        }
      }
    }
  }

  if (event.keyCode == 39) {
    moveRight();
  }
  // If player hits right arrow key

  function moveRight() {
    for (rows = 0; rows < map.length; rows++) {
      if (map[rows].indexOf("S") >= 0) {
        // If player piece exists in that row
        let indexPlayer = map[rows].indexOf("S"); // get index number of that player piece
        if (
          map[rows][indexPlayer + 1] != "W" && // If next cell to the right isn't a wall
          map[rows][indexPlayer + 1] != "F" && // If next cell over ISN'T the "Finish" cell
          map[rows][indexPlayer + 1] >= 0 // can't exit maze
        ) {
          let rowItems = map[rows].split("");
          rowItems[indexPlayer] = " ";
          rowItems[indexPlayer + 1] = "S";
          map[rows] = rowItems.join("");
          createMaze(); // move piece right
        } else if (
          map[rows][indexPlayer + 1] != "W" && // If next cell to the right isn't a wall
          map[rows][indexPlayer + 1] == "F" // If next cell over is "Finish" cell
        ) {
          let displayWin = document.getElementById("displayWin");
          displayWin.className = "displayWin";
          displayWin.innerText =
            "Congratulations! You won, and are now crowned king of the Seven Kingdoms.";
          document.body.append(displayWin);
          // winning condition met, display that the player won by moving player piece onto finish cell
          let rowItems = map[rows].split("");
          rowItems[indexPlayer] = " ";
          rowItems[indexPlayer + 1] = "S";
          map[rows] = rowItems.join("");
          createMaze();
        }
      }
    }
  }
}