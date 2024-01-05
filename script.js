const squares = document.querySelectorAll(".square");
const textWin = document.querySelector(".text-win");
const playerTurn = document.querySelector(".player-turn");
let player = true;
let win = "";

const clearTable = () => {
  squares.forEach((sq) => {
    if (sq.classList.contains("row")) sq.classList.remove("row");
    if (sq.classList.contains("up")) sq.classList.remove("up");
    if (sq.classList.contains("diagonal")) sq.classList.remove("diagonal");
    if (sq.classList.contains("diagonal-2")) sq.classList.remove("diagonal-2");
    sq.textContent = "";
  });
  player = true;
  win = "";
  textWin.textContent = "";
  playerTurn.innerHTML = "<span class='color-1'>Player 1</span> Turn";
  squaresFunction();
  document.querySelector(".play").remove();
};

document.querySelector(".play").addEventListener("click", () => {
  clearTable();
});

const winText = (win) => {
  textWin.innerHTML = `${win} winned ! <button class="play-again">Play Again</button>`;
  squares.forEach((sq) => {
    sq.removeEventListener("click", clickSquare);
  });
  playerTurn.textContent = "";
  const playAgain = document.querySelector(".play-again");
  playAgain.addEventListener("click", (e) => {
    clearTable();
  });
};
const matches = [
  ["1", "2", "3", "row"],
  ["4", "5", "6", "row"],
  ["7", "8", "9", "row"],
  ["1", "4", "7", "up"],
  ["2", "5", "8", "up"],
  ["3", "6", "9", "up"],
  ["1", "5", "9", "diagonal"],
  ["3", "5", "7", "diagonal-2"],
];

const checkDraw = () => {
  let draw = true;
  squares.forEach((sq) => {
    if (sq.textContent == "") {
      draw = false;
      return;
    }
  });
  if (draw) {
    textWin.innerHTML = `DRAW ! <button class="play-again">Play Again</button>`;
    squares.forEach((sq) => {
      sq.removeEventListener("click", clickSquare);
    });
    playerTurn.textContent = "";
    const playAgain = document.querySelector(".play-again");
    playAgain.addEventListener("click", (e) => {
      clearTable();
    });
  }
};

const checkWin = () => {
  matches.forEach((match) => {
    let sq1 = document.querySelector(".sq-" + match[0]).textContent;
    let sq2 = document.querySelector(".sq-" + match[1]).textContent;
    let sq3 = document.querySelector(".sq-" + match[2]).textContent;

    if (sq1 == sq2 && sq2 == sq3 && sq1 != "") {
      if (sq1 == "X") {
        winText("Player 1");
      } else {
        winText("Player 2");
      }
      document.querySelector(".sq-" + match[0]).classList.add(match[3]);
      document.querySelector(".sq-" + match[1]).classList.add(match[3]);
      document.querySelector(".sq-" + match[2]).classList.add(match[3]);
    }
  });
};

const squaresFunction = () => {
  squares.forEach((sq) => {
    sq.addEventListener("click", clickSquare);
  });
};

function clickSquare(e) {
  if(e.target.textContent == "") {
    if (player) {
      e.target.textContent = "X";
      player = false;
      playerTurn.innerHTML = "<span class='color-2'>Player 2</span> Turn";
    } else {
      e.target.textContent = "O";
      player = true;
      playerTurn.innerHTML = "<span class='color-1'>Player 1</span> Turn";
    }
    checkWin();
    checkDraw();
  }
}
