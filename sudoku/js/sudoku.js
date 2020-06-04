import { populateGrid } from './sudoku_tools.js';

// Populate grids with easy problem
$(document).ready(function () {
    $('table[class^="sudoku"]').each(function (index, grid) {
        populateGrid($(grid), "Easy");
    });
});

export function populateType(mouse){
	var type = mouse.currentTarget.value
	document.getElementById("textSudokuType").value = type
	
	// Populate grids with the choosen difficulty problem
	$(document).ready(function () {
		$('table[class^="sudoku"]').each(function (index, grid) {
			populateGrid($(grid), type);
		});
	});
}

