/* Populate sudukos */

export function populateGrid(grid) {
	
	var data = [
        5, 3, 0, 0, 7, 0, 0, 0, 0, // 0x0
        6, 0, 0, 1, 9, 5, 0, 0, 0, // 0x1
        0, 9, 8, 0, 0, 0, 0, 6, 0, // 0x2
        8, 0, 0, 0, 6, 0, 0, 0, 3, // 1x0
        4, 0, 0, 8, 0, 3, 0, 0, 1, // 1x1
        7, 0, 0, 0, 2, 0, 0, 0, 6, // 1x2
        0, 6, 0, 0, 0, 0, 2, 8, 0, // 2x0
        0, 0, 0, 4, 1, 9, 0, 0, 5, // 2x1
        0, 0, 0, 0, 8, 0, 0, 7, 9  // 2x2
    ];
	
    grid.find('td').each(function (index, td) {
        $(td).text(data[index] || '');
    });
}


/* Functions to check if a move is possible */

export function possible(i, j, n, grid){
	
	var jj, ii
	
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

/* Gets a cell from the sudoku table by an index [0-80] */

export function getCell(name, index) {
	
	var table = document.getElementById(name);
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

export function populateCell(name, index, value) {
	
	var cell = getCell(name, index)
	cell.textContent = value
	cell.style.color = "green"
	cell.style.fontWeight = "normal"
}

/* Gets gets the values from the sudoku table and puts into a grid matrix */

export function getGrid(name) {
	
	var grid = []
	
	var i, j;
	for (i = 0; i < 9; i++) {
		grid[i] = [];
		for (j = 0; j < 9; j++) {
			var cell = getCell(name, i*9 + j)
			grid[i][j] = cell.textContent
		}
	}
	// document.getElementById("debug_output").value = grid
	return grid
}


