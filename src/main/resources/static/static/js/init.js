$(document).ready(function () {
			$('#modalAddItem').on('shown.bs.modal', function () {
				switch($("#tipoAdd").val()){
					case "addEntity":
					case "addRelation":
					case "addDomain":
					case "addAttribute":
						$("#recipient-name").focus();
					break;
					case "addConstrainst":
						$("#list0").focus();
					break;
				}
			});
			
			$('#modalAddItem').on('hide.bs.modal', function () {
				switch($("#tipoAdd").val()){
					case "addEntity":
					case "addRelation":
					case "addDomain":
					case "addAttribute":
						$("#recipient-name").unbind("focus");
					break;
					case "addConstrainst":
						$("#list0").unbind("focus");
					break;
				}
				
			});
			
       	 	$('#btnTest').on('click', function () {
       		  //var url = "<c:url value="/generateData"/>";
       		  	var f= 2;
				var myObj = {}; 
				 
				var auxNodesTotal = nodes.get();
				var resultNodes =[];

				auxNodesTotal.forEach(function(item, index) {
					var auxItem= item;
					if(item.shape == "image"){
						auxItem = {
							heightConstraint: 25,
							id: item.id,
							isWeak: false,
							label: (item.label).replace(/ /g,'_'),
							physics: false,
							scale: 10,
							shape: "box",
							super_entity: false,
							widthConstraint:'',
							maximum: 200,
							minimum: 100,
							x: item.x,
							y: item.y,
						};
					}
					resultNodes.push(auxItem);
				});

				// tomamos la informacion de las entidades externas a la agregación
				myObj["data1"] = JSON.stringify(resultNodes); 
				myObj["data2"] = JSON.stringify(edges.get()); 

				//tomamos la data de la entidad relacion de alto nivel
				myObj["data3"] = JSON.stringify(nodes_super.get()); 
				myObj["data4"] = JSON.stringify(edges_super.get()); 
				var json = JSON.stringify(myObj);

				$.ajax({
					type: 'POST',
					url: '/generateData',
					data: json,
					contentType: "application/json",
					success: function (data) {
						$("#testResult").html(data);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(xhr.responseText);
						console.log(thrownError);
					}

				});
			});
			
			$('#btnTestScriptSQL').on('click', function () {
				//var url = "<c:url value="/generateData"/>";
				var f= 2;
				var myObj = {}; 

				var auxNodesTotal = nodes.get();
				var resultNodes =[];

				auxNodesTotal.forEach(function(item, index) {
					var auxItem= item;
					if(item.shape == "image"){
						auxItem = {
							heightConstraint: 25,
							id: item.id,
							isWeak: false,
							label: (item.label).replace(/ /g,'_'),
							physics: false,
							scale: 10,
							shape: "box",
							super_entity: false,
							widthConstraint:'',
							maximum: 200,
							minimum: 100,
							x: item.x,
							y: item.y,
						};
					}
					resultNodes.push(auxItem);
				});

				myObj["data1"] = JSON.stringify(resultNodes); 
				myObj["data2"] = JSON.stringify(edges.get()); 
				myObj["data3"] = JSON.stringify(nodes_super.get()); 
				myObj["data4"] = JSON.stringify(edges_super.get()); 
				myObj["data5"] = $("#selectLenguage option:selected").text();
				myObj["data6"] = $("#selectLenguage option:selected").index(); 

			 	var json = JSON.stringify(myObj);
			   
				$.ajax({
					type: 'POST',
					url: '/generateDataScriptSQL',
					data: json,
					contentType: "application/json",
					success: function (data) {
						$("#resultSPhysicalSchema").html(data);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(xhr.responseText);
						console.log(thrownError);
					}

				});
		   });
       	 	 
       	  $('#insertModal').on('click', function() {
           	switch($('#tipoAdd').val()) {
               	case "addConstrainst":
               		addConstrainst($('input[name=listText\\[\\]]').serializeArray(),$('#idSelected').val(), $('#typeAction').val());
      	          	    break;
      	          	case "addEntity":
      	          		addEntity($('#recipient-name').val(), $('#weak-entity').prop('checked'),$('#typeAction').val(),$('#idSelected').val(), $("#element").val(), $("#relationEntity").val());
      	          	    break;
      	          	case "addRelation":
      	          		addRelation($('#recipient-name').val(),$('#typeAction').val(),$('#idSelected').val());
      	          	    break;
      	          	case "addAttribute":
      	          		addAttribute($('#recipient-name').val(),$('#typeAction').val(),$('#idSelected').val(), $('#element').val(), $('#primaryKey').prop('checked'), $('#composite').prop('checked'), $('#notNull').prop('checked'), $('#unique').prop('checked'), $('#multivalued').prop('checked'), $('#domain').val(), $('#size').val());
      	            	break;
      	          	case "addEntitytoRelation":
      	          		addEntitytoRelation($('#element').val(), $('[name=cardinality]:checked').val(), $('#roleName').val(), $('#minCardinality').val(), $('#maxCardinality').val(), $('#typeAction').val(),$('#idSelected').val());
      	            	break;
      	          	case "addEntityParent":
      	          		addEntityParent($('#element').val(), $('#typeAction').val(), $('#idSelected').val());
      	            	break;
      	          	case "removeEntitytoRelation":
      	          		removeEntitytoRelation($('#element').val(), $('#typeAction').val(),$('#idSelected').val());
      	            	break;
      	          	case "addEntityChild":
      	          		addEntityChild($('#element').val(), $('#typeAction').val(), $('#idSelected').val());
      	            	break;
      	          	case "addDomain":
      	          		addTypeDomain($('#recipient-name').val(), $('#types').val(), $('#values_separated').val(), $('#typeAction').val());
      	            	break;
      	          	case "addTableUnique":
      	          		addTableUnique(groupByArray($('#formInsert').serializeArray()),$('#idSelected').val(), $('#typeAction').val());
      	            	break;
	      	        case "removeChildEntity":
      	        		removeEntitytoRelation($('#element').val(), $('#typeAction').val(),$('#idSelected').val());
    	            	break;	
	      	        case "addSubAtribute":
	      	        	addSubAttribute($('#recipient-name').val(),$('#typeAction').val(),$('#idSelected').val(), $('#element').val(), $('#composite').prop('checked'), $('#notNull').prop('checked'), $('#unique').prop('checked'), $('#multivalued').prop('checked'), $('#domain').val(), $('#size').val());
		            	break;
      	          	case "addIsA":
      	            	break;
      	          	  default:
      	          	}
           });
   
            $('.insertarDatos').on('click', function() {
            	var insert = ""
            	var nodo_select = getNodeSelected();
            	switch($(this).attr("functionInsert")) {
            	  case "addConstrainst":
            		  var dataType = {
            			  temp_node_select: nodo_select
            			};
            		  $('#formModal').html($('#templateAddConstrainst').tmpl(dataType));
            		  editList();
            		  eventsAddConstrainst();
            	    break;
            	  case "addEntity":
            		  nodo = getAllNodes(["box"]);
            		  var dataType = {
            				temp_node_select: nodo_select,
            				temp_ent_length: nodo.length,
            				temp_nodes: nodo
            			};
            		  $('#formModal').html($('#templateAddEntity').tmpl(dataType));
            		  eventAddEventRecipient();
            		  eventAddEntity();
            	    break;
            	  case "addRelation":
            		  var dataType = {
          					temp_node_select: nodo_select
          			  };
          		  	  $('#formModal').html($('#templateAddRelation').tmpl(dataType));
          		  	  eventAddEventRecipient();
            	    break;
            	  case "addAtribute":
            		  nodo = getAllNodes(["box","diamond"]);
            		  types = getAllTypesDomain();
            		  if(nodo_select != null){
	            		  var dataType = {
	            				temp_node_length: nodo.length,
	            				temp_nodes: nodo,
	            				temp_types: types,
	           					temp_node_select: nodo_select,
	           					temp_type_item: getTypeItem(nodo_select)
	           			  };
            		  }else{
            			  var dataType = {
  	            				temp_node_length: nodo.length,
  	            				temp_nodes: nodo,
  	            				temp_types: types,
  	           					temp_node_select: nodo_select
  	           			  };
            		  }
            		  
            		  $('#formModal').html($('#templateAddAtribute').tmpl(dataType));
            		  eventAddEventRecipient();
            		  eventEventPrimaryKeyAttribute();
              	    break;
            	  case "addSubAtribute":
            		  nodo = getAllNodes(["box","diamond"]);
            		  types = getAllTypesDomain();
            		  if(nodo_select != null){
	            		  var dataType = {
	            				temp_types: types,
	           					temp_node_select: nodo_select
	           			  };
            		  }else{
            			  var dataType = {
  	            				temp_types: types,
  	           					temp_node_select: nodo_select
  	           			  };
            		  }
            		  
            		  $('#formModal').html($('#templateAddSubAtribute').tmpl(dataType));
            		  eventAddEventRecipient();
            		  eventSubAttribute();
              	    break;
            	  case "addEntitytoRelation":
            		  nodo = getAllNodes(["box", "image"]);
            		  var childs = allEntityOfRelation(nodo_select);
	        		  var selection = -1;
	        		  for(var i=0;i<nodo.length;i++){
	        			  if(!inArray1(nodo[i].id, childs)){
	        				  selection = nodo[i].id;
	        			  }
	        		  }
	        		  
            		  var dataType = {
              				temp_node_length: nodo.length,
              				temp_nodes: nodo,
             				temp_node_select: nodo_select,
             				temp_option_selection: selection
             			  };
              		  
              		  $('#formModal').html($('#templateAddEntitytoRelation').tmpl(dataType));
              		  eventsEntityToRelation();
              	    break;
            	  case "addEntityParent":
            		  nodo = getAllNodes(["box"]);
            		  var valueExistParent = existParent(nodo_select);
            		  var numIdParent = -1;
            		  var childs = getChildData(nodo_select);
	        		  nodo = nodo.filter(function(elem) {
	        			  return !inArray(elem.id, childs);
	        		  });
            		  var dataType = {
            				temp_exist_parent: valueExistParent,
              				temp_node_length: nodo.length,
              				temp_nodes: nodo,
             				temp_node_select: nodo_select
            		  };
              		  
              		  $('#formModal').html($('#templateAddEntityParent').tmpl(dataType));
              	    break;
            	  case "removeChildEntity":
            		  nodo = getChildData(nodo_select);
            		  var dataType = {
              				temp_node_length: nodo.length,
              				temp_nodes: nodo,
             				temp_node_select: nodo_select
             			  };
              		  
              		  $('#formModal').html($('#templateRemoveChildEntity').tmpl(dataType));
              	    break;
            	  case "addEntityChild":
            		  nodo = getAllNodes(["box"]);
            		  var valueExistParent = existParent(nodo_select);
            		  var numIdParent = -1;
            		  var childs = getChildData(nodo_select);
	        		  nodo = nodo.filter(function(elem) {
	        			  return !inArray(elem.id, childs);
	        		  });
            		  if(valueExistParent)
            			  numIdParent = getParentId(nodo_select);
            		  var dataType = {
            				temp_exist_parent: valueExistParent,
            				temp_numIdParent: numIdParent,
              				temp_node_length: nodo.length,
              				temp_nodes: nodo,
             				temp_node_select: nodo_select
             			};
              		  
              		  $('#formModal').html($('#templateAddEntityChild').tmpl(dataType));
              	    break;
            	  case "removeEntitytoRelation":
            		  nodo = allEntitysToRelation(nodo_select, "box");
            		  var dataType = {
                				temp_node_length: nodo.length,
                				temp_nodes: nodo,
               					temp_node_select: nodo_select
               			  };
                	  $('#formModal').html($('#templateRemoveEntitytoRelation').tmpl(dataType));
                	  eventsRemoveEntityToRelation();
              	    break;
            	  case "createDomain":
            		  	types = getAllTypesDomain();
            		  	var dataType = {
            				  	temp_types: types,
	           				  	temp_node_select: nodo_select
             			};
 
              	  	  $('#formModal').html($('#templateCreateDomain').tmpl(dataType));
              	  	  eventAddEventRecipient();
              	    break;
            	  	case "addUniqueKey":
            	  		nodo = allAttributeOfEntity(nodo_select);
            	  		var dataType = {
           	  				temp_node_length: nodo.length,
               				temp_nodes: nodo,
              				temp_node_select: nodo_select
             			};
            	  		$('#formModal').html($('#templateAddUniqueKey').tmpl(dataType));
            	  		$('.select-multiple').select2();
            	  		editList();
            	    break;
            	  	case "downloadFile":
            	  		var dataType = {
              					temp_node_select: nodo_select
              			  };
              		  	  $('#formModal').html($('#templateDownloadFile').tmpl(dataType));
            	    break;
            	  	case "loadFile":
            	  		var dataType = {
          					temp_node_select: nodo_select
          			  };
          		  	  $('#formModal').html($('#templateAddLoadFile').tmpl(dataType));
      	    		break;
            	  	case "addTextAbout":
            	  		var dataType = {
          					temp_node_select: nodo_select
          			  };
          		  	  $('#formModal').html($('#templateAbout').tmpl(dataType));
      	    		break;
            	  	case "deleteSuperEntity":
            	  		var dataType = {
          					temp_node_select: nodo_select
          			  };
          		  	  $('#formModal').html($('#templateSuperEntity').tmpl(dataType));
          		  	  eventAddSuperEntity();
      	    		break;
            	  	case "removeParentIsA":
            	  		if(existParent(nodo_select))
	            	  		removeParentIsA(nodo_select);
      	    		break;
            	  default:
            	}
            	setNodeSelected(null);
            });
        });