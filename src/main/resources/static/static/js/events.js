function groupByArray(xs) {
	  var resultado = xs.reduce(function(rv, x) {
	    (rv[x.name] = rv[x.name] || []).push(x.value);
	    return rv;
	  }, {});
	  
	  return Object.values(resultado);
	}

function editList(){
	
	$("#addListUnique").click(function(){
		var nodo = allAttributeOfEntity(parseInt($("#idSelected").val()));
		var nextValue = parseInt($("#totalInputs").val())+1;
  		var dataType = {
				temp_nodes: nodo,
				temp_unique: nextValue,
				temp_value: ""
			};
  		$("#totalInputs").val(nextValue);
		$("#inputList").append($('#templateSelectTableUnique').tmpl(dataType));
		$('.select-multiple').select2();
	});

	 $(document).on( 'click', '.removeList', function(){
		 $("#uniqueField"+$(this).val()).remove();
	 } );
	 
	 $("#addListSelectConst").click(function(){
			var nextValue = parseInt($("#totalInputs").val())+1;
	  		var dataType = {
					temp_unique: nextValue,
					temp_value: ""
				};
	  		$("#totalInputs").val(nextValue);
			$("#inputList").append($('#templateSelectAddConstrainst').tmpl(dataType));
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