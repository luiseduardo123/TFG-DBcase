package com.tfg.ucm.DBCaseWeb;

import java.awt.geom.Point2D;
import java.io.IOException;
import java.lang.reflect.Type;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.*;
import org.json.simple.parser.JSONParser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import controlador.Controlador;
import controlador.TC;
import modelo.servicios.GeneradorEsquema; 
import modelo.transfers.Edge;
import modelo.transfers.Generic;
import modelo.transfers.Node;
import modelo.transfers.TipoDominio;
import modelo.transfers.TransferAtributo;
import modelo.transfers.TransferEntidad;
import modelo.transfers.TransferRelacion;

@SpringBootApplication
@RestController
public class GoogleserviceApplication {
	//test
   public static void main(String[] args) {
      SpringApplication.run(GoogleserviceApplication.class, args);
   }
   @RequestMapping(value = "/user")
   public Principal user(Principal principal) {
      return principal;
   }

   @GetMapping("/lang")
   public RedirectView redirectCookieLanguage(RedirectAttributes attributes, HttpServletResponse response,@RequestParam String lang) {
	   Cookie cookie = new Cookie("language", lang);
       response.addCookie(cookie);
       attributes.addAttribute("idioma", lang);
       return new RedirectView("inicio");
   }

   @GetMapping("/theme")
   public RedirectView redirectCookieTheme(RedirectAttributes attributes, HttpServletResponse response,@RequestParam String theme) {
	   Cookie cookie = new Cookie("theme", theme);
       response.addCookie(cookie);
       return new RedirectView("inicio");
   }

   @GetMapping("/")
   public RedirectView redirectCookie(Principal principal, RedirectAttributes attributes, @CookieValue(name = "language", defaultValue = "es") String lang) {
	   if(principal != null) { 
		   attributes.addAttribute("idioma", lang);
		   return new RedirectView("inicio");
	   }else {
		   return new RedirectView("index");
	   }
		   
   }
   
   @RequestMapping(value = "/index")
   public ModelAndView login(Model model, Principal principal) {
	   ModelAndView mav = new ModelAndView();
	   if(principal != null) {   
		   mav.setViewName("inicio");
		   model.addAttribute("perfil", principal);
	   }
		else
		   mav.setViewName("index");
		return mav;
   }
   
   @RequestMapping(value="/inicio", method=RequestMethod.GET)
	public ModelAndView inicio(Model model ,Principal principal, @CookieValue(name = "language", defaultValue = "es") String lang, @CookieValue(name = "theme", defaultValue = "dark") String theme) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("inicio");
		model.addAttribute("perfil", principal);
		model.addAttribute("theme", theme);
		model.addAttribute("language", lang);
		return mav;
	}
   
   	@RequestMapping(value = "/generateData", method = RequestMethod.POST)
	public String generateData(@RequestBody Generic r, HttpServletRequest req, HttpServletResponse resp) {
		
		Gson gson = new Gson(); 
		//Node model = gson.fromJson(r.getData1(),Node.class);
		
		Type tipoNode = new TypeToken<List<Node>>(){}.getType();  
		Type tipoEdge = new TypeToken<List<Edge>>(){}.getType(); 
		
		List<Node> nodes = gson.fromJson(r.getData1(), tipoNode); 
		List<Edge> edges = gson.fromJson(r.getData2(), tipoEdge);
		
		Controlador c = null;
		try {
			c = new Controlador("debug");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// TRANSFER ENTIDAD A
			// Generamos el transfer que mandaremos al controlador
			TransferEntidad te = new TransferEntidad();
			te.setPosicion(new Point2D.Float(0, (float) 1.0));
			te.setNombre("A");
			te.setDebil(false);
			te.setListaAtributos(new Vector());
			te.setListaClavesPrimarias(new Vector());
			te.setListaRestricciones(new Vector());
			te.setListaUniques(new Vector());
			//Mandamos mensaje + datos al controlador
			c.mensajeDesde_GUI(TC.GUIInsertarEntidad_Click_BotonInsertar, te);
		// TRANSFER ENTIDAD A
		 
			
		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_A
			TransferAtributo ta = new TransferAtributo(c);
			ta.setNombre("PK_A");
			String tamano = "";
			double x = te.getPosicion().getX();
			double y = te.getPosicion().getY();
			ta.setPosicion(new Point2D.Double(x,y));
			ta.setListaComponentes(new Vector()); 
			ta.setClavePrimaria(true);  
			ta.setCompuesto(false); 
			// Si esta seleccionado la opcion multivalorado
			ta.setMultivalorado(false); 
			//Unique y Notnull
			ta.setNotnull(false);
			//ponemos unique a false, ya que en caso de ser Unique se hace la llamada abajo.
			ta.setUnique(false); 
			TipoDominio dominio;
			String dom;  
			dom=(TipoDominio.VARCHAR).toString();
			ta.setDominio(dom); 
			ta.setListaRestricciones(new Vector()); 
			// Mandamos la entidad, el nuevo atributo y si hay tamano tambien
			Vector<Object> v = new Vector<Object>();
			v.add(te);
			v.add(ta);
			if (!tamano.isEmpty()) v.add(tamano);
			c.mensajeDesde_GUI(TC.GUIAnadirAtributoEntidad_Click_BotonAnadir, v);
			if (true){
				Vector<Object> v1= new Vector<Object>();
				TransferAtributo clon_atributo2 = ta.clonar();
				clon_atributo2.setClavePrimaria(false);
				v1.add(clon_atributo2);
			    v1.add(te);
				c.mensajeDesde_PanelDiseno(TC.PanelDiseno_Click_EditarClavePrimariaAtributo,v1);
			}  
		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_A
			 
		// TRANSFER ENTIDAD B
			// Generamos el transfer que mandaremos al controlador
			TransferEntidad teB = new TransferEntidad();
			teB.setPosicion(new Point2D.Float(0, (float) 1.0));
			teB.setNombre("B");
			teB.setDebil(false);
			teB.setListaAtributos(new Vector());
			teB.setListaClavesPrimarias(new Vector());
			teB.setListaRestricciones(new Vector());
			teB.setListaUniques(new Vector());
			//Mandamos mensaje + datos al controlador
			c.mensajeDesde_GUI(TC.GUIInsertarEntidad_Click_BotonInsertar, teB);
		// TRANSFER ENTIDAD B ==/
		 
		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_B
			TransferAtributo tab = new TransferAtributo(c);
			tab.setNombre("PK_B");
			String tamanoB = "";
			double xB = teB.getPosicion().getX();
			double yB = teB.getPosicion().getY();
			tab.setPosicion(new Point2D.Double(xB,yB));
			tab.setListaComponentes(new Vector()); 
			tab.setClavePrimaria(true);  
			tab.setCompuesto(false); 
			// Si esta seleccionado la opcion multivalorado
			tab.setMultivalorado(false); 
			//Unique y Notnull
			tab.setNotnull(false);
			//ponemos unique a false, ya que en caso de ser Unique se hace la llamada abajo.
			tab.setUnique(false); 
		//	TipoDominio dominio;
			//String dom;  
			dom=(TipoDominio.VARCHAR).toString();
			tab.setDominio(dom); 
			tab.setListaRestricciones(new Vector()); 
			// Mandamos la entidad, el nuevo atributo y si hay tamano tambien
			Vector<Object> vb = new Vector<Object>();
			vb.add(teB);
			vb.add(tab);
			if (!tamanoB.isEmpty()) vb.add(tamanoB);
			c.mensajeDesde_GUI(TC.GUIAnadirAtributoEntidad_Click_BotonAnadir, vb);
			if (true){
				Vector<Object> v1= new Vector<Object>();
				TransferAtributo clon_atributo2 = tab.clonar();
				clon_atributo2.setClavePrimaria(false);
				v1.add(clon_atributo2);
			    v1.add(teB);
				c.mensajeDesde_PanelDiseno(TC.PanelDiseno_Click_EditarClavePrimariaAtributo,v1);
			}  
		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_B ==/
			
			
		// TRANSFER RELATION A_B
			TransferRelacion tRelation = new TransferRelacion();
			tRelation.setNombre("A_B");
			tRelation.setTipo("Normal");
			tRelation.setRol(null);
			tRelation.setListaEntidadesYAridades(new Vector());
			tRelation.setListaAtributos(new Vector());
			tRelation.setListaRestricciones(new Vector());
			tRelation.setListaUniques(new Vector());
			tRelation.setPosicion(new Point2D.Float(0, (float) 1.0)); 
			tRelation.setVolumen(0);
			tRelation.setFrecuencia(0);
			tRelation.setOffsetAttr(0);
			c.mensajeDesde_GUI(TC.GUIInsertarRelacion_Click_BotonInsertar, tRelation);
			
		// TRANSFER RELATION A_B ==//
			
		// ASIGNAR A ENTIDAD UNA RELACION A
			Vector<Object> vData= new Vector<Object>();
			TransferEntidad clon_entidad = teB.clonar(); // transfer entidad B 
			TransferRelacion clon_rel= tRelation.clonar(); 

			vData.add(tRelation);
			vData.add(clon_entidad);
			vData.add("0");
			vData.add("n");
			vData.add("rol1");
			
			c.mensajeDesde_GUI(TC.GUIAnadirEntidadARelacion_ClickBotonAnadir, vData);
			
		// ASIGNAR A ENTIDAD UNA RELACION ==//	
			
		// ASIGNAR A ENTIDAD UNA RELACION A
			Vector<Object> vData2= new Vector<Object>();
			TransferEntidad clon_entidad2 = te.clonar(); // transfer enidad A 
			TransferRelacion clon_rel2= tRelation.clonar(); 

			vData2.add(tRelation);
			vData2.add(clon_entidad2);
			vData2.add("0");
			vData2.add("n");
			vData2.add("rol2");
			
			c.mensajeDesde_GUI(TC.GUIAnadirEntidadARelacion_ClickBotonAnadir, vData2);
			
		// ASIGNAR A ENTIDAD UNA RELACION ==//	
		GeneradorEsquema testGen = new GeneradorEsquema();
		testGen.setControlador(c);
		String respuesta = testGen.generaModeloRelacional_v3();
		System.err.println(respuesta);
		return respuesta;
	} 

//	@RequestMapping(value = "/generateData", method = RequestMethod.POST)
//	public ModelAndView generateData(@RequestBody Generic r, HttpServletRequest req, HttpServletResponse resp) {
//		
//		Gson gson = new Gson(); 
//		//Node model = gson.fromJson(r.getData1(),Node.class);
//		
//		Type tipoNode = new TypeToken<List<Node>>(){}.getType();  
//		Type tipoEdge = new TypeToken<List<Edge>>(){}.getType(); 
//		
//		List<Node> nodes = gson.fromJson(r.getData1(), tipoNode); 
//		List<Edge> edges = gson.fromJson(r.getData2(), tipoEdge);
//		
// 		Controlador c = null;
//		try {
//			c = new Controlador("debug");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		// TRANSFER ENTIDAD A
//			// Generamos el transfer que mandaremos al controlador
//			TransferEntidad te = new TransferEntidad();
//			te.setPosicion(new Point2D.Float(0, (float) 1.0));
//			te.setNombre("A");
//			te.setDebil(false);
//			te.setListaAtributos(new Vector());
//			te.setListaClavesPrimarias(new Vector());
//			te.setListaRestricciones(new Vector());
//			te.setListaUniques(new Vector());
//			//Mandamos mensaje + datos al controlador
//			c.mensajeDesde_GUI(TC.GUIInsertarEntidad_Click_BotonInsertar, te);
//		// TRANSFER ENTIDAD A
//		 
// 			
//		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_A
//			TransferAtributo ta = new TransferAtributo(c);
//			ta.setNombre("PK_A");
//			String tamano = "";
//			double x = te.getPosicion().getX();
//			double y = te.getPosicion().getY();
//			ta.setPosicion(new Point2D.Double(x,y));
//			ta.setListaComponentes(new Vector()); 
//			ta.setClavePrimaria(true);  
//			ta.setCompuesto(false); 
//			// Si esta seleccionado la opcion multivalorado
//			ta.setMultivalorado(false); 
//			//Unique y Notnull
//			ta.setNotnull(false);
//			//ponemos unique a false, ya que en caso de ser Unique se hace la llamada abajo.
//			ta.setUnique(false); 
//			TipoDominio dominio;
//			String dom;  
//			dom=(TipoDominio.VARCHAR).toString();
//			ta.setDominio(dom); 
//			ta.setListaRestricciones(new Vector()); 
//			// Mandamos la entidad, el nuevo atributo y si hay tamano tambien
//			Vector<Object> v = new Vector<Object>();
//			v.add(te);
//			v.add(ta);
//			if (!tamano.isEmpty()) v.add(tamano);
//			c.mensajeDesde_GUI(TC.GUIAnadirAtributoEntidad_Click_BotonAnadir, v);
//			if (true){
//				Vector<Object> v1= new Vector<Object>();
//				TransferAtributo clon_atributo2 = ta.clonar();
//				clon_atributo2.setClavePrimaria(false);
//				v1.add(clon_atributo2);
//			    v1.add(te);
//				c.mensajeDesde_PanelDiseno(TC.PanelDiseno_Click_EditarClavePrimariaAtributo,v1);
//			}  
//		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_A
//			 
//		// TRANSFER ENTIDAD B
//			// Generamos el transfer que mandaremos al controlador
//			TransferEntidad teB = new TransferEntidad();
//			teB.setPosicion(new Point2D.Float(0, (float) 1.0));
//			teB.setNombre("B");
//			teB.setDebil(false);
//			teB.setListaAtributos(new Vector());
//			teB.setListaClavesPrimarias(new Vector());
//			teB.setListaRestricciones(new Vector());
//			teB.setListaUniques(new Vector());
//			//Mandamos mensaje + datos al controlador
//			c.mensajeDesde_GUI(TC.GUIInsertarEntidad_Click_BotonInsertar, teB);
//		// TRANSFER ENTIDAD B ==/
//		 
//		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_B
//			TransferAtributo tab = new TransferAtributo(c);
//			tab.setNombre("PK_B");
//			String tamanoB = "";
//			double xB = teB.getPosicion().getX();
//			double yB = teB.getPosicion().getY();
//			tab.setPosicion(new Point2D.Double(xB,yB));
//			tab.setListaComponentes(new Vector()); 
//			tab.setClavePrimaria(true);  
//			tab.setCompuesto(false); 
//			// Si esta seleccionado la opcion multivalorado
//			tab.setMultivalorado(false); 
//			//Unique y Notnull
//			tab.setNotnull(false);
//			//ponemos unique a false, ya que en caso de ser Unique se hace la llamada abajo.
//			tab.setUnique(false); 
//		//	TipoDominio dominio;
//			//String dom;  
//			dom=(TipoDominio.VARCHAR).toString();
//			tab.setDominio(dom); 
//			tab.setListaRestricciones(new Vector()); 
//			// Mandamos la entidad, el nuevo atributo y si hay tamano tambien
//			Vector<Object> vb = new Vector<Object>();
//			vb.add(teB);
//			vb.add(tab);
//			if (!tamanoB.isEmpty()) vb.add(tamanoB);
//			c.mensajeDesde_GUI(TC.GUIAnadirAtributoEntidad_Click_BotonAnadir, vb);
//			if (true){
//				Vector<Object> v1= new Vector<Object>();
//				TransferAtributo clon_atributo2 = tab.clonar();
//				clon_atributo2.setClavePrimaria(false);
//				v1.add(clon_atributo2);
//			    v1.add(teB);
//				c.mensajeDesde_PanelDiseno(TC.PanelDiseno_Click_EditarClavePrimariaAtributo,v1);
//			}  
//		//TRANSFER ATRIBUTO (CLAVE PRIMARIA) PK_B ==/
//			
//			
//		// TRANSFER RELATION A_B
//			TransferRelacion tRelation = new TransferRelacion();
//			tRelation.setNombre("A_B");
//			tRelation.setTipo("Normal");
//			tRelation.setRol(null);
//			tRelation.setListaEntidadesYAridades(new Vector());
//			tRelation.setListaAtributos(new Vector());
//			tRelation.setListaRestricciones(new Vector());
//			tRelation.setListaUniques(new Vector());
//			tRelation.setPosicion(new Point2D.Float(0, (float) 1.0)); 
//			tRelation.setVolumen(0);
//			tRelation.setFrecuencia(0);
//			tRelation.setOffsetAttr(0);
//			c.mensajeDesde_GUI(TC.GUIInsertarRelacion_Click_BotonInsertar, tRelation);
//			
//		// TRANSFER RELATION A_B ==//
//			
//		// ASIGNAR A ENTIDAD UNA RELACION A
//			Vector<Object> vData= new Vector<Object>();
//			TransferEntidad clon_entidad = teB.clonar(); // transfer entidad B 
//			TransferRelacion clon_rel= tRelation.clonar(); 
//
//			vData.add(tRelation);
//			vData.add(clon_entidad);
//			vData.add("0");
//			vData.add("n");
//			vData.add("rol1");
//			
//			c.mensajeDesde_GUI(TC.GUIAnadirEntidadARelacion_ClickBotonAnadir, vData);
//			
//		// ASIGNAR A ENTIDAD UNA RELACION ==//	
//			
//		// ASIGNAR A ENTIDAD UNA RELACION A
//			Vector<Object> vData2= new Vector<Object>();
//			TransferEntidad clon_entidad2 = te.clonar(); // transfer enidad A 
//			TransferRelacion clon_rel2= tRelation.clonar(); 
//
//			vData2.add(tRelation);
//			vData2.add(clon_entidad2);
//			vData2.add("0");
//			vData2.add("n");
//			vData2.add("rol2");
//			
//			c.mensajeDesde_GUI(TC.GUIAnadirEntidadARelacion_ClickBotonAnadir, vData2);
//			
//		// ASIGNAR A ENTIDAD UNA RELACION ==//	
//		GeneradorEsquema testGen = new GeneradorEsquema();
//		testGen.setControlador(c);
//		String respuesta = testGen.generaModeloRelacional_v3();
//		System.err.println(respuesta);
//		return new ModelAndView();
//	}
	
   @GetMapping("/logout")
   public RedirectView redirectWithUsingRedirectView(RedirectAttributes attributes) {
       return new RedirectView("/");
   }
}