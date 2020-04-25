class Domains {
	
  constructor() {
	this.types = new Array();
	this.types.push({id:"bit",value:"BIT"});
	this.types.push({id:"blob",value:"BLOB"});
	this.types.push({id:"char",value:"CHAR"});
	this.types.push({id:"date",value:"DATE"});
	this.types.push({id:"datetime",value:"DATETIME"});
	this.types.push({id:"decimal",value:"DECIMAL"});
	this.types.push({id:"float",value:"FLOAT"});
	this.types.push({id:"integer",value:"INTEGER"});
	this.types.push({id:"text",value:"TEXT"});
	this.types.push({id:"time",value:"TIME"});
	this.types.push({id:"varchar",value:"VARCHAR"});
  }
  
  getTypesDomains()   {
	return this.types;
  }
  
  setTypesDomains(idNew, valueNew, typeNew, valueSeparate)   {
	  this.types.push({id:idNew, value:valueNew, type:typeNew, valueSeparate:valueSeparate});
  }
}