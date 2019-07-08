package com.farukkaradeniz.isilanibackend;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping(value = "/logout-success")
    public String getLogoutPage(Model model){
        return "logout";
    }

    @GetMapping(value = "/test")
    public String testPage(Model model) {
        return "this is a test response";
    }

    @GetMapping(value = "/")
    public String home() {
        return "home";
    }


    @GetMapping(value = "/giris")
    public String login() {
        return "giris page";
    }
}
