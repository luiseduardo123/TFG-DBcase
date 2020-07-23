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
			$( "[functioninsert='createDomain']").click();
		}},
		//entity
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#textEditEntity").text(), href: '#', action: function(e){
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
			$( "[functioninsert='addUniqueKey']").click();
			idSele = $("#idSelected").val();
			if(!existDataTableUnique(idSele)){
				fillEditTableUnique(idSele);//
			}
			$('#insertModal').prop('disabled', false);
		}},	
		// relation
		{text: $("#textAddEntitytoRelation").text(), href: '#', action: function(e){
			$( "[functioninsert='addEntitytoRelation']").click();
			$('#insertModal').prop('disabled', false);
		}},
		{text: $("#textRemoveEntitytoRelation").text(), href: '#', action: function(e){
			$( "[functioninsert='removeEntitytoRelation']").click();
			$('#insertModal').prop('disabled', false);
			$('#insertModal').text($("#textRemove").text());
		}},
		{text: $("#textEditCardOrRol").text(), href: '#', action: function(e){
			$( "[functioninsert='addEntitytoRelation']").click();
			$('#insertModal').prop('disabled', false);
			$('#titleModal').html($('#textEditCardOrRol').text());
		}},
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#textEditRelation").text(), href: '#', action: function(e){
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
			$( "[functioninsert='addUniqueKey']").click();
			idSele = $("#idSelected").val();
			if(!existDataTableUnique(idSele)){
				fillEditTableUnique(idSele);//
			}
			$('#insertModal').prop('disabled', false);
		}},	
		// atributos
		{text: $("#renameEntity").text()+" Atributo", href: '#', action: function(e){
			$( "[functioninsert='addAtribute']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditAtributte(idSele);
		}},
		{text: $("#textAddSubAtributte").text(), href: '#', action: function(e){
			$( "[functioninsert='addSubAtribute']").click();
		}},
		//IsA
		{text: $("#textAddParentEntity").text(), href: '#', action: function(e){
			$( "[functioninsert='addEntityParent']").click();
			$('#insertModal').prop('disabled', false);
		}},
		{text: $("#textRemoveParentEntity").text(), href: '#', action: function(e){
			$( "[functioninsert='removeParentIsA']").click();
		}},
		{text: $("#textAddChildEntity").text(), href: '#', action: function(e){
			$( "[functioninsert='addEntityChild']").click();
			$('#insertModal').prop('disabled', false);
		}},
		{text: $("#textRemoveChildEntity").text(), href: '#', action: function(e){
			$( "[functioninsert='removeChildEntity']").click();
			$('#insertModal').prop('disabled', false);
		}},
		{text: $("#removeEntity").text(), href: '#', action: function(e){
			deleteNodeSelected(getNodeSelected());
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