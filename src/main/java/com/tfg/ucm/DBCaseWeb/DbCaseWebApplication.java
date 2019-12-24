package com.tfg.ucm.DBCaseWeb;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class DbCaseWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(DbCaseWebApplication.class, args);
	}
	
	@RequestMapping(value="/inicio", method=RequestMethod.GET)
	public ModelAndView inicio(Model model, Principal principal) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("inicio");
		model.addAttribute("perfil", principal);
		return mav;
	}

}
