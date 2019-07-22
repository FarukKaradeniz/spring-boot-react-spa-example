package com.farukkaradeniz.isilanibackend;

import com.farukkaradeniz.isilanibackend.models.EmailPasswordModel;
import com.farukkaradeniz.isilanibackend.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class JDBCAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    CandidateService service;

    @Override
    public Authentication authenticate(Authentication auth)
            throws AuthenticationException {
        String email = auth.getName();
        String password = auth.getCredentials()
                .toString();

        if (service.candidateLogin(new EmailPasswordModel(email, password))) {
            return new UsernamePasswordAuthenticationToken
                    (email, password, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        } else {
            throw new
                    BadCredentialsException("External system authentication failed");
        }
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }
}
