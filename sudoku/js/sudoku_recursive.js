import * as tools from './sudoku_tools.js';

var animateRecursive = true;


export function start(){
	
	document.getElementById("buttonRecursiveStart").disabled = true
	
	var grid = getRecursiveGrid()
	var commands = []

	solveRecursive(grid, commands)
	
	animateRecursive = true
	if (commands.length > 0) {
		drawRecursiveSolution(commands)
	}	
}

export function stop(){

	animateRecursive = false

}

function populateRecursiveCell(index, value) {
	
	var cell = getRecursiveCell(index)
	cell.textContent = value
	cell.style.color = "green"
	cell.style.fontWeight = "normal"
}

function getRecursiveCell(index) {
	
	var table = document.getElementById("recursiveSudoku");
	var value_1 = Math.floor(index/27)
    var tbody = table.getElementsByTagName("tbody")[value_1];
	
	var rows = tbody.getElementsByTagName("tr");
	var value_2 = Math.floor(index/9) - value_1*3
	var row = rows[value_2];
	
	var cells = row.getElementsByTagName("td")
	var value_3 = index%9
	var cell = cells[value_3]
	
	return cell
	
}

function findRecursiveLastIndex(){
	var i
	for (i = 80; i >= 0; i--) {
		if (getRecursiveCell(i).textContent == '') {
			// document.getElementById("debug_output").value = i
			return i
		}
	}
}

function findRecursiveLastCommand(commands){
	var i_last = findRecursiveLastIndex()
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

function drawRecursiveSolution(commands){
	var total = findRecursiveLastCommand(commands)
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

function getRecursiveGrid() {
	
	var grid = []
	
	var i, j;
	for (i = 0; i < 9; i++) {
		grid[i] = [];
		for (j = 0; j < 9; j++) {
			var cell = getRecursiveCell(i*9 + j)
			grid[i][j] = cell.textContent
		}
	}
	// document.getElementById("debug_output").value = grid
	return grid
}

var solveRecursive = function(grid, commands){

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

						solveRecursive(grid, commands)
							
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