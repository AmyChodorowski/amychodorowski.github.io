function populateCell(index, value) {
	
	var cell = getCell(index)
	cell.textContent = value
	cell.style.color = "green"
	cell.style.fontWeight = "normal"
}

function getCell(index) {
	
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

function findLastIndex(){
	var i
	for (i = 80; i >= 0; i--) {
		if (getCell(i).textContent == '') {
			// document.getElementById("debug_output").value = i
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

function drawSolution(commands){
	var total = findLastCommand(commands)
	let sleeptime = 1
	function* clock()
	{
		let com = 0
		while( com <= total )
		{
			com++
			populateCell(commands[com-1][0], commands[com-1][1]); // actually, just do stuff you wanna do.
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

function getGrid() {
	
	var grid = []
	
	var i, j;
	for (i = 0; i < 9; i++) {
		grid[i] = [];
		for (j = 0; j < 9; j++) {
			var cell = getCell(i*9 + j)
			grid[i][j] = cell.textContent
		}
	}
	// document.getElementById("debug_output").value = grid
	return grid
}

function disableButton(){
	var input = document.querySelector('[id="buttonRecursive"]');
	input.setAttribute('disabled', true);
}

function doSuduko(){
	
	document.getElementById("buttonRecursive").disabled = true
	
	var grid = getGrid()
	var commands = []

	
	solveSuduko(grid, commands)
	
	if (commands.length > 0) {
		drawSolution(commands)
	}	
}

function checkPossible(i, j, n){
	
	var grid = getGrid()
	possible(i, j, n, grid)
	
}

function possible(i, j, n, grid){
	
	// Check rows
	for (jj = 0; jj < 9; jj++) {
		if (grid[i][jj] == n) {
			// document.getElementById("debug_output").value = "NO - in the row"
			return false
		}
	}
	
	
	// Check columns
	for (ii = 0; ii < 9; ii++) {
		if (grid[ii][j] == n) {
			// document.getElementById("debug_output").value = "NO - in the column"
			return false
		}
	}
	
	
	// Check box
	var i0 = Math.floor(i/3) * 3
	var j0 = Math.floor(j/3) * 3
	
	for (ii = 0; ii < 3; ii++) {
		for (jj = 0; jj < 3; jj++) {
			if (grid[i0+ii][j0+jj] == n) {
				// document.getElementById("debug_output").value = "NO - in the box"
				return false
			}
		}
	}
	// document.getElementById("debug_output").value = "Possible"
	return true
	
}

var solveSuduko = function(grid, commands){

	var i, j, v, index;
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if (grid[i][j] == "") {
				index = i*9 + j
				for (v = 1; v < 10; v++) {
					if (possible(i, j, v, grid)) {
						grid[i][j] = v
						
						// populateCell(index,v)
						var c = [index, v]
						commands.push(c)

						solveSuduko(grid, commands)
							
						grid[i][j] = ''
						
						// populateCell(index,'')
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