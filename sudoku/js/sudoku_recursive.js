function removeCell(index) {
	
	var cell = returnCell(index)
	cell.textContent = ''
}



function populateCell(index, value) {
	
	var cell = returnCell(index)
	cell.textContent = value
	cell.style.color = "green"
	cell.style.fontWeight = "normal"
}

function returnCell(index) {
	
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
	
	var data = []
	
	var i;
	for (i = 0; i < 81; i++) {
	  var cell = returnCell(i)
	  data.push(cell.textContent)
	}
	document.getElementById("debug_output").value = data
}