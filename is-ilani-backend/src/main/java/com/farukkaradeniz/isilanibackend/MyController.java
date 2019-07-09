package com.farukkaradeniz.isilanibackend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class MyController {
    private static Logger log = LoggerFactory.getLogger(MyController.class);


    @GetMapping(value = "/page")
    @PreAuthorize(value = "hasAnyAuthority('ROLE_ADMIN')")
    public String getPage(){
        log.info("Getting UsernamePasswordAuthenticationToken from SecurityContextHolder");
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        log.info("Getting principal from UsernamePasswordAuthenticationToken");
        LdapUserDetailsImpl principal = (LdapUserDetailsImpl) authentication.getPrincipal();

        log.info("authentication: " + authentication);
        log.info("principal: " + principal);

        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        authorities.forEach(c -> log.info(c.getAuthority()));

        return "Spring Security + Spring LDAP Authentication Configuration Example";
    }

    @GetMapping(value = "/test")
    public String testPage(Model model) {
        return "this is a test response";
    }

    @GetMapping(value = "/")
    public String home() {

        return "Home";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "giris page";
    }

    @GetMapping(value = "/usr")
    @PreAuthorize(value = "hasAuthority('ROLE_USER')")
    public String usr() {

        return "usr page";
    }

    @PostMapping(value = "/login")
    public String postLogin() {
        return "post login";
    }
}
