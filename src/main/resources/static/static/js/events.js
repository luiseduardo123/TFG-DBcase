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
	
	$("#general-about").click(function() {
		$( "[functioninsert='addTextAbout']").click();
		$("#formModalButton").hide();
	});
	
	$(document).keydown(function(e) {
		if(e.which == 46){
			if(getNodesSelectedCount()!=0 && getNodesSelectedCount()>1){
				if(confirm($("#textDeleteNodes").text())){
					deleteNodeSelected();
				}
			}else{
				if(getNodesSelectedCount()==1){
					deleteNodeSelected();
				}
			}
		}
		if(e.which == 13){
			e.preventDefault();
			console.log("pepito");
			if(!$('#insertModal').prop('disabled')){
				$("#insertModal").click();
			}
		}
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
        $('.changeSizeWidth').toggleClass('col-md-10');
        $('.changeSizeWidthData').toggleClass('col-md-12');
        $('.changeSizeWidthData').toggleClass('col-md-4');
    });
	
	// cambiar distribución de la vista
	$('.change-aparience').on('click', function () {
		//alert($(this).attr("value")+" is");
		$('.change-aparience').removeClass("active");
		$(this).addClass("active");
		
		if($("#frame4").hasClass("float-left")){
			$("#frame1").show();
			$("#frame2").addClass("col-md-2");
			$("#frame2").removeClass("col-md-4");
			$("#frame3").addClass("col-md-4");
			$("#frame3").removeClass("col-md-8");
			$("#frame4").addClass("col-md-12");
			$("#frame5").addClass("col-md-12");
			$("#frame4").removeClass("col-md-6 float-left");
			$("#frame5").removeClass("col-md-6 float-left");
		}
		
		if($("#frame1").hasClass("col-md-10")){
			$(".vis-zoomExtends").click();
		}
		switch($(this).attr("value")){
			case "0":
				$("#frame1").hide();
				$("#frame2").removeClass("col-md-2");
				$("#frame2").addClass("col-md-4");
				$("#frame3").removeClass("col-md-4");
				$("#frame3").addClass("col-md-8");
				$("#frame4").removeClass("col-md-12");
				$("#frame5").removeClass("col-md-12");
				$("#frame4").addClass("col-md-6 float-left");
				$("#frame5").addClass("col-md-6 float-left");
				break;
			case "1":
				break;
			case "2":
				$(".vis-zoomExtends").click();
				break;
		}
    });
	
	// abrir modal add Domain
	$('#openCreateDomain').on('click', function () {
		$( "[functioninsert='createDomain']").click();
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
	
	$('.dropdown').on('show.bs.dropdown', function () {
		$("#sticky-top").removeClass("sticky-top");
	});

	$('.dropdown').on('hidden.bs.dropdown', function () {
		$("#sticky-top").addClass("sticky-top");
	});
	
	$("#general-new").on('click',function(){
		sessionStorage.setItem('codeSave', "");
		location.reload();
	});
	
	function simuleClick(){
		var event = new PointerEvent('pointerdown') ;
		document.getElementsByClassName("vis-zoomExtendsScreen")[0].dispatchEvent(event);
	}
	$("#general-print").on('click',function(){
		$.when(simuleClick()).then(function(){
			var dataUrl = document.getElementsByTagName("canvas")[0].toDataURL();
		    var windowContent = '<!DOCTYPE html>';
		    windowContent += '<html>'
		    windowContent += '<head><title>Print canvas</title></head>';
		    windowContent += '<body>'
		    windowContent += '<img src="' + dataUrl + '">';
		    windowContent += '</body>';
		    windowContent += '</html>';
		    var printWin = window.open('','','width=340,height=260');
		   // printWin.document.open();
		    printWin.document.write(windowContent);
		    printWin.document.close();
		    printWin.focus();
		    printWin.print();
		    printWin.close();
		});
	});
	
	printDomains();
	
})(jQuery);