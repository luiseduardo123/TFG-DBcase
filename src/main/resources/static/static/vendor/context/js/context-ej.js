$(document).ready(function(){
	var dataSelect;
	context.init({preventDoubleContext: false});
	
	var box = [
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#renameEntity").text()+" Entidad", href: '#', action: function(e){
			$( "[functioninsert='addEntity']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditEntity(idSele);
		}},
		{text: $("#renameEntity").text()+" Relacion", href: '#', action: function(e){
			$( "[functioninsert='addRelation']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditRelation(idSele);
		}},
		{text: $("#renameEntity").text()+" Atributo", href: '#', action: function(e){
			$( "[functioninsert='addAtribute']").click();
			$( "#typeAction").val("edit");
			idSele = $("#idSelected").val();
			fillEditAtributte(idSele);
		}},
		{text: $("#removeEntity").text(), href: '#', action: function(e){
			network.selectNodes([getNodeSelected()]);
			network.deleteSelected();
		}},
		{text: $("#constraints").text(), href: '#', action: function(e){
			$( "[functioninsert='addConstrainst']").click();
			idSele = $("#idSelected").val();
			if(!existConstraints(idSele)){
				fillEditConstraints(idSele);
			}
		}},
		{text: $("#tableUnique").text(), href: '#', action: function(e){
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}},
	];
	
	context.attach('#diagram', box);
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