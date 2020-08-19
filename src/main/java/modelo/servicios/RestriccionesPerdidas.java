package modelo.servicios;

import java.util.ArrayList;

import vista.lenguaje.Lenguaje;

@SuppressWarnings("serial")
public class RestriccionesPerdidas extends ArrayList<restriccionPerdida>{
	
	@Override
	public String toString() {
		String total="";
		String candidata="";
		String tabla="";
		for(restriccionPerdida r : this) {
			switch(r.getTipo()) {
			case restriccionPerdida.TOTAL:total += r;break;
			case restriccionPerdida.CANDIDATA:candidata += r;break;
			case restriccionPerdida.TABLA:tabla += r;break;
			default:break;
			}
		}
		String res = "";
		// res += (candidata!="")?"<h3>"+Lenguaje.text(Lenguaje.CANDIDATE_KEYS)+"</h3>"+candidata:"";
		// res += (total!="")?"<h3>"+Lenguaje.text(Lenguaje.CARDINALITY)+"</h3>"+total:"";
		// res += (tabla!="")?"<h3>"+Lenguaje.text(Lenguaje.TABLE_CONSTR)+"</h3>"+tabla:"";
		res += (candidata!="")?"<h5>Candidate Keys</h5>"+candidata:"";
		res += (total!="")?"<h5>Cardinality</h5>"+total:"";
		res += (tabla!="")?"<h5>Table Constrains</h5>"+tabla:"";
		return res;
	}
	
}
