import * as tools from './sudoku_tools.js';

var animateRecursive = true;

/* Start and Stop functions */

export function start(){
	
	document.getElementById("buttonRecursiveStart").disabled = true
	document.getElementById("buttonRecursiveRestart").disabled = false
	
	var grid = getRecursiveGrid()
	var commands = []

	solve(grid, commands)
	
	animateRecursive = true
	if (commands.length > 0) {
		drawRecursiveSolution(commands)
	}	
}

export function restart(){

	animateRecursive = false
	tools.populateGrid($(document.getElementById("recursiveSudoku")))
	
	document.getElementById("buttonRecursiveStart").disabled = false
	document.getElementById("buttonRecursiveRestart").disabled = true
}

/* Simple functions */

function getRecursiveGrid() {
	
	var grid = tools.getGrid("recursiveSudoku")
	return grid
}

function populateRecursiveCell(index, value) {
	
	tools.populateCell("recursiveSudoku", index, value)
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
	// document.getElementById("debug_output").value = "Found a solution"
}

/* Drawing functions */

function drawRecursiveSolution(commands){
	var total = findLastCommand(commands)
	let sleeptime = 1
	function* clock()
	{
		let com = 0
		while( com <= total && animateRecursive)
		{
			com++
			populateRecursiveCell(commands[com-1][0], commands[com-1][1]); // actually, just do stuff you wanna do.
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
		if (tools.getCell("recursiveSudoku", i).textContent == '') {
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
