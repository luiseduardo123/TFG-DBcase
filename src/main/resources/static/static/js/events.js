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
	
	$('#modalAddItem').on('hidden.bs.modal', function () {
		$( "#modalAddItem" ).unbind( "shown.bs.modal");
	});
}

function eventsRemoveEntityToRelation(){
	
	$('#modalAddItem').on('hidden.bs.modal', function () {
		$( "#modalAddItem" ).unbind( "shown.bs.modal");
	});
}

/*
Verifica que el campo de restriccion no este vacio
*/
function eventsAddConstrainst(){
	$( "#list0" ).on( "blur keyup", function(){
		var nameValue = $( "#list0" ).val();
		if(nameValue == ""){
			$('#insertModal').prop('disabled', true);
		}else{
			$('#insertModal').prop('disabled', false);
		}
	});
}

function eventEventPrimaryKeyAttribute(){
	$("#primaryKey, #composite").change(function() {
		if(($("#primaryKey").prop('checked') && $("#composite").prop('checked')) || 
		   ($("#primaryKey").prop('checked') && !$("#composite").prop('checked'))){
			$("[for='notNull'],[for='unique'],[for='multivalued']").toggle(false);            			
		}
		if(!$("#primaryKey").prop('checked') && $("#composite").prop('checked')){
			$("[for='notNull'],[for='unique']").toggle(false);
			$("[for='multivalued']").toggle(true);
		}
		if(!$("#primaryKey").prop('checked') && !$("#composite").prop('checked')){
			$("[for='notNull'],[for='unique'],[for='multivalued']").toggle(true);  
		}						            		
	});
}

function eventSubAttribute(){
	$("#composite").change(function() {
		if($("#composite").prop('checked')){
			$("[for='notNull'],[for='unique']").toggle(false);
		}else{
			$("[for='notNull'],[for='unique']").toggle(true);  
		}					            		
	});
}

function eventAddEventRecipient(){
	$( "#recipient-name" ).on( "blur keyup", function(){
		  var nameValue = $( "#recipient-name" ).val();
		  var tipoAdd = $( "#tipoAdd" ).val();
		  if(!existElementName(nameValue, tipoAdd)){
		  $('#insertModal').prop('disabled', false);
		  $( "#recipient-name" ).removeClass("is-invalid");
		  }else{
			  $('#insertModal').prop('disabled', true);
			  $( "#recipient-name" ).addClass("is-invalid");
		  }
	});
}

(function ($) {
	
	// sidebar lateral desplegar
	$('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
	// Añadir la funcion a ejecutar en cada modal
	$('.closeSide').on('click', function() {
        $('#titleModal').html(this.getAttribute("alt"));
        $('#tipoAdd').val(this.getAttribute("functionInsert"));
    });
    // Ejecutar directamente addIsA
    $('#addIsA').on('click', function() {
    	addIsA();
    });
    
	// cambiar tamaño de diagramas
	$('.vis-zoomExtends').on('click', function () {
		 $('.changeSizeWidth').toggleClass('col-md-6');
        $('.changeSizeWidth').toggleClass('col-md-12');
        $('.changeSizeWidth').toggleClass('col-md-6-height');
        $('.changeSizeWidth').toggleClass('col-md-12-height');
        $('.changeSizeHeight').toggleClass('col-md-6-height');
        $('.changeSizeHeight').toggleClass('col-md-24-height');
    });
	
	$('.insertarDatos').on('click', function() {
		// Limpiar el modal cuando se cierra, se deshabilita el boton 
		$('#modalAddItem').on('hidden.bs.modal', function (event) {
			console.log("limpiar modal");
			$('#formModal').html("");
			$('#insertModal').prop('disabled', true);
			$("#formModalButton").show();
			$('#sidebar').removeClass('active');
			$("[for='notNull'],[for='unique'],[for='multivalued'],[for='composite']").show();
		});
	});
	
	
})(jQuery);