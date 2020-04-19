package com.tfg.ucm.DBCaseWeb;

import java.security.Principal;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

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
   
   @GetMapping("/logout")
   public RedirectView redirectWithUsingRedirectView(RedirectAttributes attributes) {
       return new RedirectView("/");
   }
}