function editList(){
	$("#addList").click(function(){
		let numList = $("#inputList").find('input.form-control').length;
		$("#inputList").append('<input type="text" name="listText[]" class="form-control" id="list'+numList+'">');
	});

	//	$('input[name=listText\\[\\]]').serializeArray();

	$("#removeList").click(function(){
		let numList = $("#inputList").find('input.form-control').length;
		if((numList-1)>0)
			$("#list"+(numList-1)).remove();
	});
}

function eventsEntityToRelation(){
	$( "input[name='cardinality']" ).click(function(){
		if($(this).attr('id') == 'minMax'){
			$("#minCardinality").prop("disabled", false);
			$("#maxCardinality").prop("disabled", false);
        }else{
        	$("#minCardinality").prop("disabled", true);
			$("#maxCardinality").prop("disabled", true);
        }
	});
	$('#modalAddItem').on('shown.bs.modal', function () {
		$('#insertModal').prop('disabled', false);
	});
	
	$('#modalAddItem').on('hidden.bs.modal', function () {
		$( "#modalAddItem" ).unbind( "shown.bs.modal");
	});
}

function eventsRemoveEntityToRelation(){
	$('#modalAddItem').on('shown.bs.modal', function () {
		$('#insertModal').prop('disabled', false);
	});
	
	$('#modalAddItem').on('hidden.bs.modal', function () {
		$( "#modalAddItem" ).unbind( "shown.bs.modal");
	});
}



(function ($) {
	
	
})(jQuery);