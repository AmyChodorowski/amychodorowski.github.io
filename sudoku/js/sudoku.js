import { populateGrid } from './sudoku_tools.js';

$(document).ready(function () {
    
    // Populate grids with data.
    $('table[class^="sudoku"]').each(function (index, grid) {
        populateGrid($(grid));
    });
	
});
