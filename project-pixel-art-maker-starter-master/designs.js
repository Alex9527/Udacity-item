// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()


function makeGrid() {
	let	rowNUM = $('#inputHeight').val();
	let	columnNUM = $('#inputWeight').val();
	$('table').children().remove();
	
	for(let i = 0;i < rowNUM; i++) {
		$('table').append('<tr></tr>');
		}
	for (let j = 0; j < columnNUM; j++) {
		$('tr').append('<td></td>');
		}
	
	//上色
	$('td').on('click',function() {
	var color = $('#colorPicker').val();
	$(this).attr('bgcolor', color);
})
}




$('input[type="submit"]').on('click',function(evt){
	evt.preventDefault(); 
	makeGrid();
})











