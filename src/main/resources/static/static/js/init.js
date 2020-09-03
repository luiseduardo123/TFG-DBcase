var normalize = (function() {
	  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
	      mapping = {};
	 
	  for(var i = 0, j = from.length; i < j; i++ )
	      mapping[ from.charAt( i ) ] = to.charAt( i );
	 
	  return function( str ) {
	      var ret = [];
	      for( var i = 0, j = str.length; i < j; i++ ) {
	          var c = str.charAt( i );
	          if( mapping.hasOwnProperty( str.charAt( i ) ) )
	              ret.push( mapping[ c ] );
	          else
	              ret.push( c );
	      }      
	      return ret.join( '' );
	  }
	 
	})();

$(document).ready(function () {
			$('#modalAddItem').on('shown.bs.modal', function () {
				switch($("#tipoAdd").val()){
					case "addEntity":
					case "addRelation":
					case "addDomain":
					case "addAttribute":
					case "addSuperEntity":
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
			
			$('#btnHit').on('click', function () {
				$("#serverInput").val("localhost");
				$("#portInput").val("3306");
				$("#databaseInput").val("test");
				$("#usernameInput").val("root");
				$("#executeScriptSQL").addClass("disabled");	
			});
			
			$('#serverInput, #portInput, #databaseInput, #usernameInput, #passInput').on('change', function () {
				$("#executeScriptSQL").addClass("disabled");	
			});

			$('#executeScriptSQL').on('click', function () {

				var myObj = {}; 
				// tomamos la informacion de la conexión ingresada en el modal
				myObj["data1"] = $("#serverInput").val();
				myObj["data2"] = $("#portInput").val();
				myObj["data3"] = $("#databaseInput").val();
				myObj["data4"] = $("#usernameInput").val();
				myObj["data5"] = $("#passInput").val();
				myObj["data6"] = $("#selectLenguage").val();
				myObj["data7"] = $("#resultSPhysicalSchema").html();
				var json = JSON.stringify(myObj);

				$.ajax({
					type: 'POST',
					url: '/executeQueries',
					data: json,
					contentType: "application/json",
					success: function (data) {
						var dataResponse = JSON.parse(data);
						if(dataResponse.data2 == true){
							alert(dataResponse.data1);
							$("#executeScriptSQL").removeClass("disabled");
						}
						else{
							alert(dataResponse.data1);
							$("#executeScriptSQL").addClass("disabled");
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(xhr.responseText);
						console.log(thrownError);
					}

				});
			});

			$('#testConnection').on('click', function () {

				var myObj = {}; 
				
				// tomamos la informacion de la conexión ingresada en el modal
				myObj["data1"] = $("#serverInput").val();
				myObj["data2"] = $("#portInput").val();
				myObj["data3"] = $("#databaseInput").val();
				myObj["data4"] = $("#usernameInput").val();
				myObj["data5"] = $("#passInput").val();
				myObj["data6"] = $("#selectLenguage").val();
				var json = JSON.stringify(myObj);

				$.ajax({
					type: 'POST',
					url: '/checkConnection',
					data: json,
					contentType: "application/json",
					success: function (data) {
						var dataResponse = JSON.parse(data);
						if(dataResponse.data2 == true){
							alert(dataResponse.data1);
							$("#executeScriptSQL").removeClass("disabled");
						}
						else{
							alert(dataResponse.data1);
							$("#executeScriptSQL").addClass("disabled");
						}
							
						 
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(xhr.responseText);
						console.log(thrownError);
					}

				});
			});

			$('#executeScriptSQL').on('click', function () {
			
			});

       	 	$('#btnTest').on('click', function () {
         		  //var url = "<c:url value="/generateData"/>";
       		  	var f= 2;
				var myObj = {}; 
				 
				var auxNodesTotal = nodes.get();
				var resultNodes =[];
				var agregation = "";
				auxNodesTotal.forEach(function(item, index) {
					var auxItem= item;

					if(item.isWeak || item.isWeak == "active")
						auxItem.isWeak = true;
					else
						auxItem.isWeak = false;
					if(item.shape == "image"){
						agregation = item.label;
						auxItem = {
							heightConstraint: 25,
							id: item.id,
							isWeak: false,
							//label: (item.label).replace(/ /g,'_'),
							label: 'agregacion',
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
				var traduct = {};
				for(var i = 0;i<resultNodes.length;i++){
					var tempLabel = resultNodes[i].label;
					resultNodes[i].label = normalize(resultNodes[i].label);
					var nameLabel = resultNodes[i].label;
					traduct[nameLabel] = tempLabel;
				}
				var edgesData = edges.get();
				for(var i = 0;i<edgesData.length;i++){
					var tempLabel = edgesData[i].label;
					if(edgesData[i].label){
						edgesData[i].label = normalize(edgesData[i].label);
					}  
					var nameLabel = edgesData[i].label;
					traduct[nameLabel] = tempLabel;
					
					var tempName = edgesData[i].name;
					if(edgesData[i].name){
						edgesData[i].name = normalize(edgesData[i].name);
					}
					var nameName = edgesData[i].name;
					traduct[nameName] = tempName;
				} 
				var nodesSuper = nodes_super.get();
				for(var i = 0;i<nodesSuper.length;i++){
					var tempLabel = nodesSuper[i].label;
					nodesSuper[i].label = normalize(nodesSuper[i].label);
					var nameLabel = nodesSuper[i].label;
					traduct[nameLabel] = tempLabel;
				}
				
				var edgesSuperData = edges_super.get();
				for(var i = 0;i<edgesSuperData.length;i++){
					var tempLabel = edgesSuperData[i].label;
					if(edgesData[i].label){
						edgesSuperData[i].label = normalize(edgesSuperData[i].label);
					}
					var nameLabel = edgesSuperData[i].label;
					traduct[nameLabel] = tempLabel;
					
					var tempName = edgesSuperData[i].name;
					if(edgesData[i].name){
						edgesSuperData[i].name = normalize(edgesSuperData[i].name);
					}
					var nameName = edgesSuperData[i].name;
					traduct[nameName] = tempName;
				}
				myObj["data1"] = JSON.stringify(resultNodes); 
				myObj["data2"] = JSON.stringify(edgesData); 

				//tomamos la data de la entidad relacion de alto nivel
				myObj["data3"] = JSON.stringify(nodesSuper); 
				myObj["data4"] = JSON.stringify(edgesSuperData); 
				var json = JSON.stringify(myObj);

				$.ajax({
					type: 'POST',
					url: '/generateData',
					data: json,
					contentType: "application/json",
					success: function (data) {
						for (const prop in traduct) {
							//si existe un * en el regex le ponemos el caracter de escape
							var auxConst = prop;
							if(auxConst !== undefined && auxConst.indexOf("*") == auxConst.length-1)
								auxConst = auxConst.substr(0,auxConst.length-1) + "\\*";
								//auxConst = "test\\*";

							var re = new RegExp(auxConst,"g");
							data = data.replace(re, traduct[prop]);
						};
						data = data.replace(/\*\*/g, "*");
						data = data.replace(/agregacion/g, agregation);
						//data = data.replace(/\_/g, " ");
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
				var agregation = "";
				auxNodesTotal.forEach(function(item, index) {
					var auxItem= item;
					if(item.isWeak || item.isWeak == "active")
						auxItem.isWeak = true;
					else
						auxItem.isWeak = false;
					if(item.shape == "image"){
						agregation = item.label;
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
				
				var traduct = {};
				for(var i = 0;i<resultNodes.length;i++){
					var tempLabel = resultNodes[i].label;
					resultNodes[i].label = normalize(resultNodes[i].label);
					var nameLabel = resultNodes[i].label;
					traduct[nameLabel] = tempLabel;
				}
				var edgesData = edges.get();
				for(var i = 0;i<edgesData.length;i++){
					var tempLabel = edgesData[i].label;
					if(edgesData[i].label){
						edgesData[i].label = normalize(edgesData[i].label);
					}
					var nameLabel = edgesData[i].label;
					traduct[nameLabel] = tempLabel;
					
					var tempName = edgesData[i].name;
					if(edgesData[i].name){
						edgesData[i].name = normalize(edgesData[i].name);
					}
					var nameName = edgesData[i].name;
					traduct[nameName] = tempName;
				}
				
				var nodesSuper = nodes_super.get();
				for(var i = 0;i<nodesSuper.length;i++){
					var tempLabel = nodesSuper[i].label;
					nodesSuper[i].label = normalize(nodesSuper[i].label);
					var nameLabel = nodesSuper[i].label;
					traduct[nameLabel] = tempLabel;
				}
				
				var edgesSuperData = edges_super.get();
				for(var i = 0;i<edgesSuperData.length;i++){
					var tempLabel = edgesSuperData[i].label;
					if(edgesData[i].label){
						edgesSuperData[i].label = normalize(edgesSuperData[i].label);
					}
					var nameLabel = edgesSuperData[i].label;
					traduct[nameLabel] = tempLabel;
					
					var tempName = edgesSuperData[i].name;
					if(edgesData[i].name){
						edgesSuperData[i].name = normalize(edgesSuperData[i].name);
					}
					var nameName = edgesSuperData[i].name;
					traduct[nameName] = tempName;
				}
				
				myObj["data1"] = JSON.stringify(resultNodes); 
				myObj["data2"] = JSON.stringify(edgesData); 
				myObj["data3"] = JSON.stringify(nodesSuper); 
				myObj["data4"] = JSON.stringify(edgesSuperData); 
				myObj["data5"] = $("#selectLenguage option:selected").text();
				myObj["data6"] = $("#selectLenguage option:selected").index(); 

			 	var json = JSON.stringify(myObj);
			   
				$.ajax({
					type: 'POST',
					url: '/generateDataScriptSQL',
					data: json,
					contentType: "application/json",
					success: function (data) {
						for (const prop in traduct) {
							//si existe un * en el regex le ponemos el caracter de escape
							var auxConst = prop;
							if(auxConst !== undefined && auxConst.indexOf("*") == auxConst.length-1)
								auxConst = auxConst.substr(0,auxConst.length-1) + "\\*";
								//auxConst = "test\\*";

							var re = new RegExp(auxConst,"g");
							data = data.replace(re, traduct[prop]);
						};
						data = data.replace(/\*/g, "");
						data = data.replace(/agregacion/g, agregation);
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
      	          		addEntitytoRelation($('#element').val(), $('#element_role').val(), $('[name=cardinality]:checked').val(), $('#roleName').val(), $('#minCardinality').val(), $('#maxCardinality').val(), $('#typeAction').val(),$('#idSelected').val(), $("#minMax").prop('checked'));
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
	      	        case "addSuperEntity":
	      	        	addElementsWithRelationsToSuperEntity(parseInt($('#idSelected').val()), $('#recipient-name').val());
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
            		  nodoRoles = allEntitysToRelation(nodo_select, "box");
            		  console.log(nodoRoles);
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
              				temp_node_roles: nodoRoles,
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
            	  	case "addTextAgregation":
            	  		var dataType = {
          					temp_node_select: nodo_select
          			  };
          		  	  $('#formModal').html($('#templateAddSuperEntity').tmpl(dataType));
          		  	  eventAddEventRecipient();
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