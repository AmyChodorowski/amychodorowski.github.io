function createSudokuTable() {
    var htmlText = '';
    for (var row = 1; row <= 9; row++) {
        htmlText += '<tr>';
        for (var column = 1; column <= 9; column++) {
            htmlText += '<td class="sudokuCell" id="cell_' + row + '_' + column + '">&nbsp;</td>';
        }
        htmlText += '</tr>';
    }
    $('#sudokuTable').html(htmlText);
}
var inputNumber = 1;
function clicked() {
    cellId = this.id;
    if ($('#' + cellId).text() == inputNumber) {
        $('#' + cellId).text('&nbsp;');
    } else {
        $('#' + cellId).text(inputNumber);
    }
}



function selectNumber() {
    inputNumber = this.innerText;
    $('.numberSelector').removeClass('selectedNumber');
    $(this).addClass('selectedNumber');
}

$('.sudokuCell').on('click', clicked);
$('.numberSelector').on('click', selectNumber);