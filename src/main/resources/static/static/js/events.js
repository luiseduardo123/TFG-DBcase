function groupByArray(xs) {
	  var resultado = xs.reduce(function(rv, x) {
	    (rv[x.name] = rv[x.name] || []).push(x.value);
	    return rv;
	  }, {});
	  
	  return Object.values(resultado);
	}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i].idChild == needle) return true;
    }
    return false;
}

function inArray1(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i].id == needle) return true;
    }
    return false;
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
	$("#element, #roleName").change(function(){
		var idF = $("#element").val();
		var idT = $("#idSelected").val();
		var idEdge = existEdge(idF, idT);
		if(idEdge){
			if($("#roleName").val() == ""){
				$("#insertModal").prop("disabled", true);
				if($("#textWarning").length == 0){
					$("#roleName").after("<span id='textWarning' class='text-warning'>"+$("#textNecesaryRol").text()+"</span>")
				}
			}else{
				$("#insertModal").prop("disabled", false);
			}
		}else{
			$("#insertModal").prop("disabled", false);
		}
	});
	
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

function updateTableElements(){
	$('#accordion').html("");
	var nodo = getAllNodes(["box"]);
	for(var i=0;i<nodo.length;i++){
		var dataType = {
			nameE: nodo[i].label,
			idE: nodo[i].id
		};
		$('#accordion').append($('#templateElementEntity').tmpl(dataType));
		$('#childs-attribute'+nodo[i].id).html("");
		var listAtributes = allAttributeOfEntity(nodo[i].id);
		for(var e=0;e<listAtributes.length;e++){
			$('#childs-attribute'+nodo[i].id).append('<p class="card-link small ml-0" href="#" aria-expanded="true"><img src="static/images/attribute-small.png" class="rounded"><span class="pl-1 text-'+$("#textTheme").text()+'">'+listAtributes[e].label+' : '+listAtributes[e].type+'('+listAtributes[e].size+')</span></p>');
		}
	}
	
	$('#accordion2').html("");
	var nodo = getAllNodes(["diamond", "triangleDown"]);
	for(var i=0;i<nodo.length;i++){
		var dataType = {
			nameE: nodo[i].label,
			idE: nodo[i].id,
			shape: nodo[i].shape
		};
		$('#accordion2').append($('#templateElementRelation').tmpl(dataType));
		$('#childs-attribute'+nodo[i].id).html("");
		var listAtributes = allEntitysToRelation(nodo[i].id, "box");
		for(var e=0;e<listAtributes.length;e++){
			var asoc = "";
			if(listAtributes[e].asoc.length<10)
				asoc = ": "+listAtributes[e].asoc;
			$('#childs-attribute'+nodo[i].id).append('<p class="card-link small ml-0" href="#" aria-expanded="true"><img src="static/images/entidad-small.png" class="rounded"><span class="pl-1 text-'+$("#textTheme").text()+'">'+listAtributes[e].label+''+asoc+'</span></p>');
		}
		
		var listAtributes = allAttributeOfEntity(nodo[i].id);
		for(var e=0;e<listAtributes.length;e++){
			$('#childs-attribute'+nodo[i].id).append('<p class="card-link small ml-0" href="#" aria-expanded="true"><img src="static/images/attribute-small.png" class="rounded"><span class="pl-1 text-'+$("#textTheme").text()+'">'+listAtributes[e].label+' : '+listAtributes[e].type+'('+listAtributes[e].size+')</span></p>');
		}
	}
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
			$("#frame2").addClass("border-left");
			$("#frame4").removeClass("h-100");
			$("#frame4").addClass("h-50");
			$("#frame5").removeClass("h-100");
			$("#frame5").addClass("h-50");
			$("#frame4").removeClass("border-right");
			$("#frame4").addClass("border-bottom");
			$("#frame5").removeClass("pl-2");
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
				$("#frame4").removeClass("h-50");
				$("#frame4").addClass("h-100");
				$("#frame5").removeClass("h-50");
				$("#frame5").addClass("h-100");
				$("#frame4").removeClass("border-bottom");
				$("#frame4").addClass("border-right");
				$("#frame2").removeClass("border-left");
				$("#frame5").addClass("pl-2");
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
			var c = document.getElementsByTagName("canvas")[0];
			var ctx = c.getContext("2d");
			var dataURL = ctx.canvas.toDataURL('image/png', 1.0);
			var doc = new jsPDF()
			doc.setFontSize(13)
			doc.text(10, 12, $('#nameText').text());
			doc.text(170, 12, "DBCASE Web");
			doc.addImage(dataURL, 'PNG', 15, 40, 180, 160)
			doc.save( $('#idText').text()+""+(new Date().getMilliseconds())+'.pdf');
		});
	});
	
	printDomains();
	
})(jQuery);