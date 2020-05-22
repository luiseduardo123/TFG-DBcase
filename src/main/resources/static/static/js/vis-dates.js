var nodes = new vis.DataSet([]);
var nodoSelected;
var typeDomain = new Domains();
// create an array with edges
var edges = new vis.DataSet([]);
 
  // create a network
var container = document.getElementById('diagram');
var data = {
	nodes: nodes,
    edges: edges
};

var options = {
		  interaction:{
		    dragNodes:true,
		    dragView: true,
		    hideEdgesOnDrag: false,
		    hideEdgesOnZoom: false,
		    hideNodesOnDrag: false,
		    hover: false,
		    hoverConnectedEdges: true,
		    keyboard: {
		      enabled: false,
		      speed: {x: 10, y: 10, zoom: 0.02},
		      bindToWindow: true
		    },
		    multiselect: false,
		    navigationButtons: true,
		    selectable: true,
		    selectConnectedEdges: true,
		    tooltipDelay: 300,
		    zoomView: true
		  }
		};
  
var network = new vis.Network(container, data, options);
  
  function getIdElement(){
	  var dataIds = nodes.getIds();
	  if(dataIds.length==0)
		  var nextId = -1;
	  else
		  var nextId = dataIds[dataIds.length-1];
	  return ++nextId;
  }
  function addEntity(nombre, weakEntity,action, idSelected){
	  var id_node = getIdElement();
	  var data_element = {label: nombre, strong: weakEntity, shape: 'box', color:'#ffcc45', scale:20, widthConstraint:150, heightConstraint:25,physics:false};
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
		 if(values[i].value!="" && values[i].value!="${temp_value}")
			  valuesFilter.push(values[i].value);
	  }
	  var data_element = {constraints: valuesFilter};
	  data_element.id = parseInt(idSelected);
	  nodes.update(data_element);
  }
 
  function addTableUnique(values, idSelected, action){
	  var data_element = {tableUnique: JSON.stringify(values)};
	  data_element.id = parseInt(idSelected);
	  nodes.update(data_element);
  }
  
  function addRelation(nombre, action, idSelected){
	  var id_node = getIdElement();
	  var data_element = {label: nombre, shape: 'diamond', color:'#ff554b', scale:20, physics:false};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
	  }
  }
  
  function addIsA(){
	  var id_node = getIdElement();
	  nodes.add({id: id_node++, label: 'IsA', shape: 'triangleDown', color:'#ff554b', scale:20, physics:false});
  }
  
  function addAttribute(name, action, idSelected, idEntity, pk, comp, notNll, uniq, multi, dom, sz){
	  var id_node = getIdElement();
	  var word_pk = name;
	  if(pk){
		  var word = name;
		  word = word.replace(/./gi, "¯");
		  word_pk = name+'\n'+word;
	  }else{
		  word_pk = name;
		  if(!notNll){
			  word_pk +="*";
		  } 
	  }
	  
	  var data_element = {labelBackend:name, label: word_pk, dataAttribute:{primaryKey: pk, composite: comp, notNull: notNll, unique: uniq, multivalued: multi, domain: dom, size: sz}, shape: 'ellipse', color:'#4de4fc', scale:20, widthConstraint:80, heightConstraint:25,physics:false};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
		  edges.add({from: parseInt(idEntity), to: parseInt(id_node)-1, color:{color:'blue'}});
	  }
  }
  
  function addEntitytoRelation(idTo, cardinality, roleName, minCardinality, maxCardinality, action, idSelected){
	  var left;
	  var center;
	  var right;
	  var exist = false;
	  switch(cardinality){
	  	case 'max1':
	  		left = '1';
	  		right = '0';
	  	break;
	  	case 'maxN':
		  	left = 'N';
	  		right = '0';
	  	break;
	  	case 'minMax':
		  	left = maxCardinality;
	  		right = minCardinality;
	  	break;
	  	default:
	  }
	  if(roleName == "")
		  center = "  ";
	  else
		  center = roleName;
	  
	  var idEdge = existEdge(idSelected, idTo);
	  var data_element = {from: parseInt(idSelected), to: parseInt(idTo), label: center, labelFrom:right, labelTo:left};
	  if(idEdge != null){
		  data_element.id = idEdge;
		  edges.update(data_element);
	  }else{
		  edges.add(data_element);
	  }
  }
  
  function removeEntitytoRelation(idEdge, action, idSelected){
	  edges.remove(idEdge);
  }
  
  /* 
   * filter = array
   * if (filter = null) return allNodes 
   * else return nodes of type filter
   * */
  function getAllNodes(filter = null){
	  var data = [];
	  if(filter != null){
		  nodes.forEach(function(nod) {
			  if(filter.indexOf(nod.shape) != -1)
				  data.push(nod);				  
		  });
	  }else{
		  nodes.forEach(function(nod) {
			  data.push(nod);
		  });
	  }
	  return data;
  }
  
  function clean(){
	  $( "#formInsert input" ).each(function() {
	    $( this ).val( "" );
	  });
  }
  
  /*
   * Check if exist a edge between "idFrom" to "idTo" nodes
   * return "null" if it doesn't exist
   * return idEdge if it  exist
   * */
  function existEdge(idFrom, idTo){
	  var idEdgeExist = null;
	  var edgesFrom = network.getConnectedEdges(parseInt(idFrom));
	  var edgesTo = network.getConnectedEdges(parseInt(idTo));
	  edgesTo.forEach(function(idEdge) {
		  if(edgesFrom.indexOf(idEdge) != -1)
			  idEdgeExist = idEdge;		  
	  });
	  return idEdgeExist
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
	  console.log("const");
	  for(var i=0;i<valuesConstraints.length;i++){
		  if(i!=0){
			  	var nextValue = parseInt($("#totalInputs").val())+1;
		  		var dataType = {
						temp_unique: nextValue,
						temp_value: valuesConstraints[i]
					};
		  		$("#totalInputs").val(nextValue);
				$("#inputList").append($('#templateSelectAddConstrainst').tmpl(dataType));
				$('#insertModal').prop('disabled', false);
		  }else{
			  $("#list0").val(valuesConstraints[i]);
		  }
	  }
  }
  
  function fillEditTableUnique(idNodo){
	  idNodo = parseInt(idNodo);
	  valuesUnique = JSON.parse(nodes.get(idNodo).tableUnique);
	  var nodo = allAttributeOfEntity(parseInt($("#idSelected").val()));
	  for(var i=0;i<valuesUnique.length;i++){
		  if(i!=0){
				var nextValue = parseInt($("#totalInputs").val())+1;
		  		var dataType = {
						temp_nodes: nodo,
						temp_unique: nextValue,
						temp_value: ""
					};
		  		$("#totalInputs").val(nextValue);
				$("#inputList").append($('#templateSelectTableUnique').tmpl(dataType));	
		  }
		  for(var e=0;e<valuesUnique[i].length;e++){
				$("#listTextUnique"+i+" option[value='" + valuesUnique[i][e] + "']").prop("selected", true);
		  }
	  }
	  $('.select-multiple').select2();
	  $('#insertModal').prop('disabled', false);
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
	  var nameAttribute = nodes.get(idNodo).label;
	  var pk = nameAttribute.split("\n");
	  nameAttribute = pk[0].replace("*","");
	  jQuery("#recipient-name").val(nameAttribute);
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
 
  function existDataTableUnique(idSelected){
	  idSelected = parseInt(idSelected);
	  return (nodes.get(idSelected).tableUnique === undefined)
  }
  
  function existConstraints(idSelected){
	  idSelected = parseInt(idSelected);
	  return (nodes.get(idSelected).constraints === undefined)
  }
  
  function allEntitysToRelation(nodo_select){
	  var data = [];
	  nodos = network.getConnectedEdges(parseInt(nodo_select));
	  nodos.forEach(function(edg) {
		  	idNodo = edges.get(edg).to;
		  	roleName = edges.get(edg).label;
			  data.push({id:edg, label:nodes.get(idNodo).label, role:roleName});				  
	  });
	  return data;
  }

  function allAttributeOfEntity(nodo_select){
	  var data = [];
	  nodos = network.getConnectedEdges(parseInt(nodo_select));
	  nodos.forEach(function(edg) {
		  	idNodo = edges.get(edg).to;
		  	roleName = edges.get(edg).label;
		  	if(nodes.get(idNodo).shape == "ellipse")
		  		data.push({id:idNodo, label:nodes.get(idNodo).labelBackend});				  
	  });
	  return data;
  }
  
  /* domains**/
  
  function getAllTypesDomain(){
	  return typeDomain.getTypesDomains();
  }
  
  function addTypeDomain(nameType, type, values_separated, typeAction){
	  var id = nameType.replace(/ /g, "_");
	  typeDomain.setTypesDomains(id.toLowerCase(), nameType, type, values_separated);
  }
  
  function getTypeItem(idItem){
	  return nodes.get(parseInt(idItem)).shape;
  }