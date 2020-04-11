$(document).ready(function(){
	var dataSelect;
	context.init({preventDoubleContext: false});
	
	var menu_options = [
		{text: $("#textaddNewEntity").text(), action: function(e){
			$( "[functioninsert='addEntity']").click();
		}},
		{text: $("#textaddNewRelation").text(), action: function(e){
			$( "[functioninsert='addRelation']").click();
		}},
		{text: $("#textaddNewRelationIsA").text(), action: function(e){
			$( "[functioninsert='addIsA']").click();
		}},
		{text: $("#textcreateDomain").text(), action: function(e){
			alert("crear Dominio");
		}},
		//entity
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#renameEntity").text()+" Entidad", href: '#', action: function(e){
			$( "[functioninsert='addEntity']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditEntity(idSele);
		}},
		{text: $("#constraints").text(), href: '#', action: function(e){
			$( "[functioninsert='addConstrainst']").click();
			idSele = $("#idSelected").val();
			if(!existConstraints(idSele)){
				fillEditConstraints(idSele);
			}
		}},
		{text: $("#tableUnique").text(), href: '#', action: function(e){
			alert("crear unique");
		}},	
		// relation
		{text: $("#textAddEntitytoRelation").text(), href: '#', action: function(e){
			alert("textAddEntitytoRelation");
		}},
		{text: $("#textRemoveEntitytoRelation").text(), href: '#', action: function(e){
			alert("textRemoveEntitytoRelation");
		}},
		{text: $("#textEditCardOrRol").text(), href: '#', action: function(e){
			alert("textEditCardOrRol");
		}},
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#renameEntity").text()+" Relacion", href: '#', action: function(e){
			$( "[functioninsert='addRelation']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditRelation(idSele);
		}},
		{text: $("#constraints").text(), href: '#', action: function(e){
			$( "[functioninsert='addConstrainst']").click();
			idSele = $("#idSelected").val();
			if(!existConstraints(idSele)){
				fillEditConstraints(idSele);
			}
		}},
		{text: $("#tableUnique").text(), href: '#', action: function(e){
			alert("crear unique");
		}},	
		// atributos
		{text: $("#renameEntity").text()+" Atributo", href: '#', action: function(e){
			$( "[functioninsert='addAtribute']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditAtributte(idSele);
		}},
		{text: $("#textAddSubAtributte").text(), href: '#', action: function(e){
			alert("textAddSubAtributte"); // solo si es compuesto
		}},
		//IsA
		{text: $("#textAddParentEntity").text(), href: '#', action: function(e){
			alert("textAddParentEntity"); // solo si es compuesto
		}},
		{text: $("#textRemoveParentEntity").text(), href: '#', action: function(e){
			alert("textRemoveParentEntity"); // solo si es compuesto
		}},
		{text: $("#textAddChildEntity").text(), href: '#', action: function(e){
			alert("textAddChildEntity"); // solo si es compuesto
		}},
		{text: $("#textRemoveChildEntity").text(), href: '#', action: function(e){
			alert("textRemoveChildEntity"); // solo si es compuesto
		}},
		{text: $("#removeEntity").text(), href: '#', action: function(e){
			network.selectNodes([getNodeSelected()]);
			network.deleteSelected();
		}}
	];
	
	context.attach('#diagram', menu_options);
	context.settings({compress: true});
	
	$(document).on('mouseover', '.me-codesta', function(){
		$('.finale h1:first').css({opacity:0});
		$('.finale h1:last').css({opacity:1});
	});
	
	$(document).on('mouseout', '.me-codesta', function(){
		$('.finale h1:last').css({opacity:0});
		$('.finale h1:first').css({opacity:1});
	});
	
});