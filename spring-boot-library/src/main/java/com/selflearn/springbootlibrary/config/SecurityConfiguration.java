package com.selflearn.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable Cross Site Request Forgery
        // Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions
        // on a web application in which they’re currently authenticated
        http.csrf().disable();
        System.out.println("SecurityFilterChain");
        //protect endpoints st /api/<type>/secure
        http.authorizeHttpRequests( configurer ->
                configurer.antMatchers("/api/secure/**",
                                "/api/reviews/secure/**",
                                "/api/history/secure/**",
                                "/api/messages/secure/**",
                                "/api/admin/secure/**") // this step is filter what path we want to protect it.
                        .authenticated()) // this step is to specify how we want to protect it
            .oauth2ResourceServer()
            .jwt();
        // Add CORS to API endpoints
        http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
