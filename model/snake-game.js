function gameBoard(widthX, heightY, cellSize, gameBoardId) {
    this.widthX = widthX;
    this.heightY = heightY;
    this.headPosX = 0;
    this.headPosY = 0;
    this.snakeCells = [];
    this.cellSize = cellSize;
    this.gameBoardElement = document.getElementById(gameBoardId);
    this.gameBoardElement.style.background = "black";
    this.gameBoardElement.style.width = this.widthX * cellSize + "px";
    this.gameBoardElement.style.height = this.heightY * cellSize + "px";

    this.move = function(direction) {
        if (direction == 0) {
            this.headPosY -= 1;
        } else if (direction == 1) {
            this.headPosX += 1;
        } else if (direction == 2) {
            this.headPosY += 1;
        } else {
            this.headPosX -= 1;
        }
    }
}

function snakeCell(x, y, cellSize, gap, background) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.style.width = cellSize - 2 * gap + "px";
    this.element.style.height = cellSize - 2 * gap + "px";
    this.element.style.background = background;
    this.element.style.position = "absolute";
    this.element.style.top = this.y * cellSize + 1 + "px";
    this.element.style.left = this.x * cellSize + 1 + "px";
    document.getElementById("gameboard").appendChild(this.element);

    this.changeXY = function(x, y) {
        this.x = x;
        this.y = y;
        this.element.style.top = 1 + y * cellSize + 'px';
        this.element.style.left = 1 + x * cellSize + 'px';
    }

    //this.changeXY = function(x, y) {
    //    this.x = x;
    //    this.y = y;
    //}
}

console.log("we trsied");

var board = new gameBoard(20, 20, 20, "gameboard");

var direction = 1; // 0 up, 1 right, 2 down, 3 left
var snakeCells = [];

for (i = 0; i < 6; i++) {
    snakeCells[i] = new snakeCell(5 + i, 10, 20, 1, "white");
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 87) { // w
        direction = 0;
    } else if (event.keyCode == 68) { // d
        direction = 1;
    } else if (event.keyCode == 83) { // s
        direction = 2;
    } else if (event.keyCode == 65) { // a
        direction = 3;
    }
});

function startGame() {
    //var elem = document.getElementById("animate");
    var elem = snakeCells[snakeCells.length - 1];
    board.headPosX = elem.x;
    board.headPosY = elem.y;
    var id = setInterval(frame, 500);
    function frame() {

        // cases:   head is in empty space
        //          head collides with wall or itself
        //          head is on same cell as food

        snakeElem = snakeCells.shift();
        board.move(direction);
        snakeElem.changeXY(board.headPosX, board.headPosY);
        snakeCells.push(snakeElem);
    }
}

gameboard.addEventListener("click", startGame);