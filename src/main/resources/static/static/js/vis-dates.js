var nodes = new vis.DataSet([]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 8, color:{color:'red'}},
    {from: 1, to: 3, color:'rgb(20,24,200)'},
    {from: 1, to: 2, color:{color:'rgba(30,30,30,0.2)', highlight:'blue'}},
    {from: 2, to: 4, color:{inherit:'to'}},
    {from: 2, to: 5, color:{inherit:'from'}},
    {from: 5, to: 6, color:{inherit:'both'}},
    {from: 6, to: 7, color:{color:'#ff0000', opacity:0.3}},
    {from: 6, to: 8, color:{opacity:0.3}},
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
    }
  };
  var network = new vis.Network(container, data, options);
  
  function addEntity(nombre, weakEntity){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: nombre, strong: weakEntity, shape: 'box', color:'#ffcc45', scale:20, widthConstraint:150, heightConstraint:25});
  }
  
  function addRelation(nombre){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: nombre, shape: 'diamond', color:'#ff554b', scale:20, widthConstraint:150, heightConstraint:150});
  }
  
  function addIsA(){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: 'IsA', shape: 'triangleDown', color:'#ff554b', scale:20, widthConstraint:150, heightConstraint:150});
  }
  
  function addAttribute(){
	  var id_node = nodes.length;
	  nodes.add({id: id_node++, label: 'node\none', shape: 'ellipse', color:'#4de4fc', scale:20, widthConstraint:150, heightConstraint:150});
  }
  
  function returnNodes(){
	  return nodes;
  }
  function limpiar(){
	  $( "#formInsert input" ).each(function() {
	    $( this ).val( "" );
	  });
  }
  // Metodo que otiene el nodo seleccionado con boton derecho
  network.on('oncontext', function(params) {
	  poscSelect = params.pointer.DOM;
	  if(typeof network.getNodeAt(poscSelect) !== 'undefined'){
		  nodo = network.getNodeAt(poscSelect);
		  console.log('Seleccionado ', nodo);
	  }
	  params.event.preventDefault();
	});