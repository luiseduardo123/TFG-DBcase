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