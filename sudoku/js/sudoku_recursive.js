function removeCell(index) {
	
	var cell = getCell(index)
	cell.textContent = ''
}

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
	document.getElementById("debug_output").value = grid
}

function doSuduko(){
	
	grid = getGrid()
	solve(grid)
	
}

function possible(i, j, n){
	
	// Check rows
	
	
	// Check columns
	
	
	// Check box
	
	return True
	
}

function solve(grid){
	var i, j, v
	
	var i, j;
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if (grid[i][j] !== '') {
				index = i*9 + j
				for (v = 1; v < 10; v++) {
					if (possible(i, j, v)) {
						grid[i][j] = v
						populateCell(index,v)
							
						solve()
							
						grid[i][j] = ''
						removeCell(index,v)
					}
				return
				}
			}
		}
	var stop
	}
}
