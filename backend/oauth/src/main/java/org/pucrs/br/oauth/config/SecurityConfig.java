package org.pucrs.br.oauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;
import java.util.Map;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {

    private static final String REALM_ACCESS_CLAIM = "realm_access";
    private static final String ROLES_CLAIM = "roles";

    private static final String[] ENDPOINTS_WITHOUT_AUTH = {
            "/v1/auth/**",
            "/health",
            "/swagger-ui/**",
            "/api-docs/**"
    };

    private static final String[] ENDPOINTS_ADMIN_ONLY = {
            "/v1/users/**"
    };


    @Bean
    @Primary
    public SecurityFilterChain resourceServerFilterChain(AuthenticationConverter authenticationConverter,
                                                         HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth
                        .requestMatchers(ENDPOINTS_WITHOUT_AUTH).permitAll()
                        .requestMatchers(ENDPOINTS_ADMIN_ONLY).hasAuthority("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(sessionConfigurer -> sessionConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(resourceServer -> resourceServer.jwt(jwtResourceServer -> jwtResourceServer.jwtAuthenticationConverter(authenticationConverter)))
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public AuthoritiesConverter authoritiesConverter() {
        return jwt -> {
            var realmAccess = (Map<String, Object>) jwt.getClaims().getOrDefault(REALM_ACCESS_CLAIM, Map.of());
            var roles = (List<String>) realmAccess.getOrDefault(ROLES_CLAIM, List.of());

            return roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .toList();
        };
    }

    @Bean
    public AuthenticationConverter authenticationConverter(AuthoritiesConverter authoritiesConverter) {
        return jwt -> new JwtAuthenticationToken(jwt, authoritiesConverter.convert(jwt),
                jwt.getClaimAsString(StandardClaimNames.PREFERRED_USERNAME));
    }
}