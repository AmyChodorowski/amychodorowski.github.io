import * as tools from './sudoku_tools.js';

var animateConstraint = true;

/* Start and Stop functions */

export function startSimple(){
	
	// Disbable and enable buttons
	document.getElementById("buttonConstraintSimple").disabled = true
	document.getElementById("buttonConstraintRestart").disabled = false
	tools.disableAllButtonType(true)
	
	// Prepare variables
	var grid = getConstraintGrid()
	var commands = []

	// Solve sudoku
	solveSimple(grid)
	
}

export function restart(){

	// Stop animation
	animateConstraint = false
	
	// Reset the sudoku
	var type = document.getElementById("textSudokuType").value
	tools.populateGrid($(document.getElementById("sudokuConstraint")), type)
	
	// Disbable and enable buttons
	document.getElementById("buttonConstraintSimple").disabled = false
	document.getElementById("buttonConstraintRestart").disabled = true
	if (tools.checkRunningSolutions()){
		tools.disableAllButtonType(true)
	} else{
		tools.disableAllButtonType(false)
	}
}

/* Simple functions */

function getConstraintGrid() {
	
	var grid = tools.getGrid("sudokuConstraint")
	return grid
}

function populateConstraintCell(index, value) {
	
	tools.populateCell("sudokuConstraint", index, value)
}

/* Solving functions */

function solveSimple(grid){

	// Determine unsolved
	var unsolved = tools.findUnsolved("sudokuConstraint")
	var unsolved_before = unsolved.length
	var unsolved_after = null 
	var colour = null
	
	
	// While unsolved is non-zero and solutions are being found
	while (unsolved.length > 0 && unsolved_before != unsolved_after) {
		
		// One iteration
		unsolved_before = unsolved.length
		colour = getRandomColor()
		unsolved = checkUnsolvedSolutionsSimple(grid, unsolved, colour)
		unsolved_after = unsolved.length
	}
	var end = 0
}

function checkUnsolvedSolutionsSimple(grid, unsolved, colour) {
	
	var still_unsolved = []
	
	var index, coor, values, i, j, cell
	for (index=0; index< unsolved.length; index++){
		coor = unsolved[index]
		i = coor[0]
		j = coor[1]
		
		values = tools.possibleValues(grid, i, j)
		
		if (values.length == 1){
			// Solution found
			grid[i][j] = values[0]
			
			// Draw on 
			drawCell(i, j, values[0], colour)

		} else {
			// Remains unsolved
			still_unsolved.push(coor)
		}
	}
	
	return still_unsolved
}



/* Drawing functions */


// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawCell(i, j, v, c) {
	var cell
	cell = tools.getCell("sudokuConstraint", i*9 + j)
	cell.textContent = v
	cell.style.color = c
	cell.style.fontWeight = "bold"
	cell.style.border="solid thin black"
}

