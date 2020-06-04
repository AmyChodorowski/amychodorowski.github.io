import * as tools from './sudoku_tools.js';

var animateRecursive = true;

/* Start and Stop functions */

export function start(){
	
	// Disbable and enable buttons
	document.getElementById("buttonRecursiveStart").disabled = true
	document.getElementById("buttonRecursiveRestart").disabled = false
	tools.disableAllButtonType(true)
	
	// Prepare variables
	var grid = getRecursiveGrid()
	var commands = []

	// Solve sudoku
	solve(grid, commands)
	
	// Animate solution
	animateRecursive = true
	if (commands.length > 0) {
		drawRecursiveSolution(commands)
	}	
}

export function restart(){

	// Stop animation
	animateRecursive = false
	
	// Reset the sudoku
	var type = document.getElementById("textSudokuType").value
	tools.populateGrid($(document.getElementById("sudokuRecursive")), type)
	
	// Disbable and enable buttons
	document.getElementById("buttonRecursiveStart").disabled = false
	document.getElementById("buttonRecursiveRestart").disabled = true
	if (tools.checkRunningSolutions()){
		tools.disableAllButtonType(true)
	} else{
		tools.disableAllButtonType(false)
	}
	
}

/* Simple functions */

function getRecursiveGrid() {
	
	var grid = tools.getGrid("sudokuRecursive")
	return grid
}

function populateRecursiveCell(index, value) {
	
	tools.populateCell("sudokuRecursive", index, value)
}

/* Solving functions */

var solve = function(grid, commands){

	var i, j, v, index;
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if (grid[i][j] == "") {
				index = i*9 + j
				for (v = 1; v < 10; v++) {
					if (tools.possible(i, j, v, grid)) {
						grid[i][j] = v
						
						var c = [index, v]
						commands.push(c)

						solve(grid, commands)
							
						grid[i][j] = ''

						var c = [index, '']
						commands.push(c)
					}
				}
				return;
			}
		}
	}
	// Found a solution
}

/* Drawing functions */

function drawRecursiveSolution(commands){
	var total = findLastCommand(commands)
	let sleeptime = 0.1
	function* clock()
	{
		let com = 0
		while( com <= total && animateRecursive)
		{
			com++
			populateRecursiveCell(commands[com-1][0], commands[com-1][1]); 
			setTimeout(
				()=>
				{
					clk.next()
				}
				, sleeptime
			)
			yield
		}
	}

	let clk = clock()
	clk.next()	
}

function findLastIndex(){
	var i
	for (i = 80; i >= 0; i--) {
		if (tools.getCell("sudokuRecursive", i).textContent == '') {
			return i
		}
	}
}

function findLastCommand(commands){
	var i_last = findLastIndex()
	var total = commands.length
	
	var i_command = 0
	while (i_command < total) {
		i_command++
		if (commands[i_command][0] == i_last) {
			break
		}
	}
	
	// document.getElementById("debug_output").value = commands[i_command]
	return i_command
	
}
