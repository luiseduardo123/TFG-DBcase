var nodes = new vis.DataSet([]);
var nodoSelected;
  // create an array with edges

  var edges = new vis.DataSet([
/*    {from: 1, to: 8, color:{color:'red'}},
    {from: 1, to: 3, color:'rgb(20,24,200)'},
    {from: 1, to: 2, color:{color:'rgba(30,30,30,0.2)', highlight:'blue'}},
    {from: 2, to: 4, color:{inherit:'to'}},
    {from: 2, to: 5, color:{inherit:'from'}},
    {from: 5, to: 6, color:{inherit:'both'}},
    {from: 6, to: 7, color:{color:'#ff0000', opacity:0.3}},
    {from: 6, to: 8, color:{opacity:0.3}},*/
  ]);

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
		  $("#modalAddItem").unbind('show.bs.modal');//quitar evento linea 137, tenemos que cambiar para que se elimine el evento siempre que se cierre el modal
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
	  }
  }
  
  function addRelation(nombre, action, idSelected){
	  var id_node = nodes.length;
	  var data_element = {label: nombre, shape: 'diamond', color:'#ff554b', scale:20};
	  if(action == "edit"){
		  data_element.id = parseInt(idSelected);
		  nodes.update(data_element);
		  $("#modalAddItem").unbind('show.bs.modal');//quitar evento linea 137, tenemos que cambiar para que se elimine el evento siempre que se cierre el modal
	  }else{
		  data_element.id = id_node++;
		  nodes.add(data_element);
	  }
  }
  
  function addIsA(){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: 'IsA', shape: 'triangleDown', color:'#ff554b', scale:20});
  }//revisar la creacion de entidades con nombre unico, no debe de crear con nombre unico!!!!
  
  function addAttribute(name, idEntity, pk, comp, notNll, uniq, multi, dom, sz){
	  var id_node = nodes.length;
	  var word_pk = name;
	  if(pk)
		word_pk = '*'+name+' (PK)*';
	  nodes.add({id: id_node++, label: word_pk, dataAttribute:{primaryKey: pk, composite: comp, notNull: notNll, unique: uniq, multivalued: multi, domain: dom, size: sz}, shape: 'ellipse', color:'#4de4fc', scale:20, widthConstraint:80, heightConstraint:25});
	  edges.add({from: idEntity, to: id_node-1, color:{color:'blue'}});
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
  
  function fillEditRelation(idNodo){
	  idNodo = parseInt(idNodo);
	  $('#modalAddItem').on('show.bs.modal', function(){
		  jQuery("#recipient-name").val(nodes.get(idNodo).label);
		  $('#titleModal').html($('#textEditRelation').text());
	  });
  }
  
  function fillEditEntity(idNodo){
	  idNodo = parseInt(idNodo);
	  $('#modalAddItem').on('show.bs.modal', function(){
		  jQuery("#recipient-name").val(nodes.get(idNodo).label);
		  $('#titleModal').html($('#textEditEntity').text());
		  $("#weak-entity").prop("checked",nodes.get(idNodo).strong);
	  });
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
  