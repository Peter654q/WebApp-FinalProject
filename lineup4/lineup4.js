// Connect Four
var matrix;
var player1 = 1;
var win_flag = 0;
var blank_num = 42;

function initMatrix(){
    // Initialize the matrix with a two-dimensional array,
    // with 6 rows and 7 columns, setting all values to 0.
    this.matrix = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
}

function OverArrow(MyImage) {
	MyImage.src = "arrowP.png";
}

function OutArrow(MyImage) {
	MyImage.src = "arrow.png";
}

function OverReset(MyImage) {
	MyImage.src = "resetP.png";
}

function OutReset(MyImage) {
	MyImage.src = "reset.png";
}

function getDropPosition(matrix, columnPosition){
    // This method returns the position of row
    // Find the blank cell from row 5 to 0.
    // If there is no blank cell in that column return -1.
    for(var i = 5; i >= 0; i --){
        if(matrix[i][columnPosition]===0)
            return i;
    }
    return -1;
}

function blank_numCountDown(blank_num){
  return blank_num - 1;
}

function setDropValue(matrix, rowPosition, columnPosition, player1,blank_num){
    // This method returns a matrix with values,
    // if it is player1 then fill 1 , else fill 2
    if (player1===1)
      matrix[rowPosition][columnPosition] = 1;
    else
      matrix[rowPosition][columnPosition] = 2;

    this.blank_num = blank_numCountDown(blank_num);

    return matrix;
}

function checkRow(matrix){
    // set 4 [i,j] values to a functionault cell position say -1 in a list.
    // [[-1,-1][-1,-1][-1,-1][-1,-1]]
    // For each row, check if any 4 consecutive similar values are there,
    // if so return the positions as a list [[row1, col1],[row2, col2],[row3, col3],[row4, col4]].
    var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    while(row >= 0){
        var col = 0;
        while(col <= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row][col + 1] == val && matrix[row][col + 2] == val && matrix[row][col + 3] == val){
                    winPositions = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
                    return 1;
                }
            }
            col = col + 1;
        }
        row = row - 1;
    }
    return 0;
}

function checkColumn(matrix){
    // Similarly, set 4 [i,j] functionault values in a list, for each column,
    // check for any 4 consecutive cells with same values and then return
    // their positions in the list.
    var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var col = 0;
    while(col <= 6){
        var row = 5;
        while(row >= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col] == val && matrix[row - 2][col] == val && matrix[row - 3][col] == val){
                    winPositions = [[row, col], [row - 1, col], [row - 2, col], [row - 3, col]];
                    return 1;
                }
            }
            row = row - 1;
        }
        col = col + 1;
    }
    return 0;
}

function checkLeftToRight(matrix){
    // Similarly, set 4 [i,j] functionault values in a list.
    // Starting from left corner for each diagonal going right up check for 4 consecutive cells
    // with same values and return their positions.
    var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    while(row >= 3){
        var col = 0;
        while(col <= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col + 1] == val && matrix[row - 2][col + 2] == val && matrix[row - 3][col + 3] == val){
                    winPositions = [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]];
                    return 1;
                }
            }
            col = col + 1;
        }
        row = row - 1;
    }
    return 0;
}

function checkRightToLeft(matrix){
    // Similarly, set 4 [i,j] functionault values in a list.
    // Starting from right corner for each diagonal going left up check for 4 consecutive cells
    // with same values and return their positions.
    var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    var col = 6;
    while(row >= 3){
        while(col >= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col - 1] == val && matrix[row - 2][col - 2] == val && matrix[row - 3][col - 3] == val){
                    winPositions = [[row, col], [row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3]];
                    return 1;
                }
            }
            col = col - 1;
        }
        col = 6;
        row = row - 1;
    }
    return 0;
}

function checkWin(matrix){
	if (checkRow(matrix)==1||checkColumn(matrix)==1||checkLeftToRight(matrix)==1||checkRightToLeft(matrix)==1)
		return true;
	else
		return false;
}



function takeTurns()
{
	if(this.player1 == 1){
		this.player1 = 0;
		document.getElementById('turn').innerHTML = 'player2\'s turn';
		return "Player2";
	}
  else{
	  this.player1 = 1;
	  document.getElementById('turn').innerHTML = 'player1\'s turn';
	  return "Player1";
  }
}

function setOutput(columnNum){
  var str = "empty", pos = getDropPosition(matrix, columnNum);
  if (pos!= -1){
    setDropValue(matrix, pos, columnNum, player1, blank_num);
    str = str+pos+columnNum;
    if(checkWin(matrix)){
      win_flag = 1;
      if(player1!=1){
        document.getElementById("result").innerHTML = "Player2 wins the game!!";
        //alert("Player2 wins the game!!");
      }
      else
      {
        document.getElementById("result").innerHTML = "Player1 wins the game!!";
        //alert("Player1 wins the game!!");
      }
    }
    if (blank_num==0){
       document.getElementById("result").innerHTML = "Tie!!";
       //alert("Tie!!");
    }
  }
  document.images[str].src = takeTurns() + ".png";
}

//on Column Button click
function onC0click()
{
	if(!win_flag){
		setOutput(0);
    return true;
  }
  return false;
}

function onC1click()
{
  if(!win_flag){
		setOutput(1);
    return true;
  }
  return false;
}

function onC2click()
{
  if(!win_flag){
		setOutput(2);
    return true;
  }
  return false;
}

function onC3click()
{
  if(!win_flag){
		setOutput(3);
    return true;
  }
  return false;
}

function onC4click()
{
  if(!win_flag){
		setOutput(4);
    return true;
  }
  return false;
}

function onC5click()
{
  if(!win_flag){
		setOutput(5);
    return true;
  }
  return false;
}

function onC6click()
{
  if(!win_flag){
		setOutput(6);
    return true;
  }
  return false;
}

function resetP1(p1)
{
  p1 = 1;
  return p1;
}

function resetBnum(bnum)
{
  bnum = 42;
  return bnum;
}

function resetWF(wf)
{
  wf = 0;
  return wf;
}

function onResetClick()
{
	initMatrix();
  var p1,bnum,wf;
  this.player1 = resetP1(p1);
  this.blank_num = resetBnum(bnum);
  this.win_flag = resetWF(wf);
	document.getElementById('turn').innerHTML = 'player1\'s turn';
	var str;
	for(var i=0;i<=5;i++){
		for(var j=0;j<=6;j++){
			str = "empty"+i+j;
			document.images[str].src = "empty.png";
		}
	}
	document.getElementById('result').innerHTML = '';
}

initMatrix();

module.exports.getDropPosition = getDropPosition;
module.exports.setDropValue = setDropValue;
module.exports.checkRow = checkRow;
module.exports.checkColumn = checkColumn;
module.exports.checkRightToLeft = checkRightToLeft;
module.exports.checkLeftToRight = checkLeftToRight;
module.exports.checkWin = checkWin;
module.exports.blank_numCountDown = blank_numCountDown;
module.exports.resetP1 = resetP1;
module.exports.resetBnum = resetBnum;
module.exports.resetWF = resetWF;
