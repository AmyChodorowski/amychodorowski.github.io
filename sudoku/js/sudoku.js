$(document).ready(function () {
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

    // Populate grids with data.
    $('table[class^="recursiveSudoku"]').each(function (index, grid) {
        populateGrid($(grid), data);
    });
});

function populateGrid(grid, data) {
    grid.find('td').each(function (index, td) {
        $(td).text(data[index] || '');
    });
}