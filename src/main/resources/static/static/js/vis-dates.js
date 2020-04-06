var nodes = new vis.DataSet([]);
var nodoSelected;
  // create an array with edges

  var edges = new vis.DataSet([]);

  // create a network
  var container = document.getElementById('diagram');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
		  height: '100%',
		  width: '100%',
    nodes: {
      shape: 'circle',
      font: {
          multi: 'md',
      }
    }
  };
  var network = new vis.Network(container, data, options);
  
  function addEntity(nombre, weakEntity,action, idSelected){
	  var id_node = nodes.length;
	  var data_element = {label: nombre, strong: weakEntity, shape: 'box', color:'#ffcc45', scale:20, widthConstraint:150, heightConstraint:25};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
	  }
  }

  function addConstrainst(values, idSelected, action){
	  var valuesFilter = [];
	  for(var i=0;i<values.length;i++){
		  valuesFilter.push(values[i].value);
	  }
	  var data_element = {constraints: valuesFilter};
	  data_element.id = parseInt(idSelected);
	  nodes.update(data_element);
  }
  
  
  function addRelation(nombre, action, idSelected){
	  var id_node = nodes.length;
	  var data_element = {label: nombre, shape: 'diamond', color:'#ff554b', scale:20};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
	  }
  }
  
  function addIsA(){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: 'IsA', shape: 'triangleDown', color:'#ff554b', scale:20});
  }
  
  function addAttribute(name, action, idSelected, idEntity, pk, comp, notNll, uniq, multi, dom, sz){
	  var id_node = nodes.length;
	  var word_pk = name;
	  if(pk){
		  word_pk = '*'+name+' (PK)*';
	  }else{
		  word_pk = name;
	  }
	  
	  var data_element = {label: word_pk, dataAttribute:{primaryKey: pk, composite: comp, notNull: notNll, unique: uniq, multivalued: multi, domain: dom, size: sz}, shape: 'ellipse', color:'#4de4fc', scale:20, widthConstraint:80, heightConstraint:25};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
		  edges.add({from: idEntity, to: id_node-1, color:{color:'blue'}});
	  }
  }
  
  function getAllNodes(){
	  return nodes;
  }
  
  function clean(){
	  $( "#formInsert input" ).each(function() {
	    $( this ).val( "" );
	  });
  }
  
  function existElementName(oneNodeName, typeElement){
	  var exist = false;
	  var i = 0;
	  var allNodes;
	  if(typeElement=="addAttribute"){
		  id_atribute = jQuery('#element').val();
		  id_atribute = parseInt(id_atribute);
		  allNodes = network.getConnectedNodes(id_atribute); 
		  if(oneNodeName == ""){
			  exist = true;
		  }else{
			  
			  while(i<allNodes.length && !exist){
				  if(nodes.get(allNodes[i]).shape != "box"){
					  if(nodes.get(allNodes[i]).label == oneNodeName){
						  exist = true;
					  }
				  }
				  i++
			  }  
		  }
	  }else{
		  allNodes = nodes.getIds({
		  filter: function (item) {
			  return (item.shape == "box" || item.shape == "diamond" || item.shape == "triangleDown");
		  	}
		  });
		  
		  if(oneNodeName == ""){
			  exist = true;
		  }else{
			  
			  while(i<allNodes.length && !exist){
				  if(nodes.get(allNodes[i]).label == oneNodeName){
					  exist = true;
				  }
				  i++
			  }  
		  }
	  }
	  return exist;
  }
  
  function fillEditConstraints(idNodo){
	  idNodo = parseInt(idNodo);
	  valuesConstraints = nodes.get(idNodo).constraints;
	  for(var i=0;i<valuesConstraints.length;i++){
		  if(i!=0){
			  $("#inputList").append('<input type="text" name="listText[]" class="form-control" id="list'+i+'" value="'+valuesConstraints[i]+'">');
		  }else{
			  $("#list0").val(valuesConstraints[i]);
		  }
	  }
  }
  
  function fillEditRelation(idNodo){
	  idNodo = parseInt(idNodo);  
	  jQuery("#recipient-name").val(nodes.get(idNodo).label);
	  $('#titleModal').html($('#textEditRelation').text());
	  $('#insertModal').prop('disabled', false);
  }
  
  function fillEditEntity(idNodo){
	  idNodo = parseInt(idNodo);
	  jQuery("#recipient-name").val(nodes.get(idNodo).label);
	  $('#titleModal').html($('#textEditEntity').text());
	  $("#weak-entity").prop("checked",nodes.get(idNodo).strong);
	  $('#insertModal').prop('disabled', false);
  }
  
  function fillEditAtributte(idNodo){
	  idNodo = parseInt(idNodo);
	  jQuery("#recipient-name").val(nodes.get(idNodo).label);
	  jQuery("#domain").val(nodes.get(idNodo).dataAttribute.domain);
	  jQuery("#size").val(nodes.get(idNodo).dataAttribute.size);
	  $('#titleModal').html($('#textEditAttribute').text());
	  $("#composite").prop("checked",nodes.get(idNodo).dataAttribute.composite);
	  $("#multivalued").prop("checked",nodes.get(idNodo).dataAttribute.multivalued);
	  $("#notNull").prop("checked",nodes.get(idNodo).dataAttribute.notNull);
	  $("#primaryKey").prop("checked",nodes.get(idNodo).dataAttribute.primaryKey);
	  $("#unique").prop("checked",nodes.get(idNodo).dataAttribute.unique);
	  $('#insertModal').prop('disabled', false);
	  $("label[for='element']" ).hide();
	  $("#element" ).hide();
  }
  
  // Metodo que obtiene el nodo seleccionado con boton derecho y lo almacena en nodoSelect
  network.on('oncontext', function(params) {
	  poscSelect = params.pointer.DOM;
	  if(typeof network.getNodeAt(poscSelect) !== 'undefined'){
		  nodoSelected = network.getNodeAt(poscSelect);
	  }else{
		  nodoSelected = null;
	  }
	  
	  params.event.preventDefault();
	});
  
  function getNodeSelected(){
	  return nodoSelected;
  }
 
  function setNodeSelected(value){
	  nodoSelected = value;
  }
  
  function existConstraints(idSelected){
	  idSelected = parseInt(idSelected);
	  return (nodes.get(idSelected).constraints === undefined)
  }
  