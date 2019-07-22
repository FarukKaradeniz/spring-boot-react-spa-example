package com.farukkaradeniz.isilanibackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private JDBCAuthenticationProvider jdbcAuthenticationProvider;
    @Autowired
    public ApplicationSecurityConfig(JDBCAuthenticationProvider jdbcAuthenticationProvider) {
        this.jdbcAuthenticationProvider = jdbcAuthenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/signup").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/usr").hasAuthority("ROLE_USER")
                .antMatchers("/admin").hasAuthority("ROLE_ADMIN")
                .antMatchers("/login").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
                .anyRequest()
                .authenticated()
                .and()
                .cors()
                .and()
                .httpBasic().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()
                .userDnPatterns("uid={0},ou=people")
                .groupSearchBase("ou=groups")
                .contextSource()
                .url("ldap://localhost:8389/dc=farukkaradeniz,dc=com")
                .and()
                .passwordCompare()
                .passwordEncoder(new LdapShaPasswordEncoder())
                .passwordAttribute("userPassword");
        auth.authenticationProvider(jdbcAuthenticationProvider).eraseCredentials(false);
    }

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        //config.setAllowCredentials(true); // you USUALLY want this
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
