package org.pucrs.br.oauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
class SecurityConfig {

    private static final String REALM_ACCESS_CLAIM = "realm_access";
    private static final String ROLES_CLAIM = "roles";

    private static final String[] ENDPOINTS_WITHOUT_AUTH = {
            "/v1/auth/**",
            "/v1/health",
            "/swagger-ui/**",
            "/api-docs/**"
    };

    private static final String[] ENDPOINTS_ADMIN_ONLY = {
            "/v1/users/**"
    };


    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> {
                    auth.requestMatchers(ENDPOINTS_WITHOUT_AUTH).permitAll()
                            .requestMatchers(ENDPOINTS_ADMIN_ONLY).hasAuthority("ADMIN")
                            .anyRequest().authenticated();
                })
                .oauth2Login(Customizer.withDefaults())
                .oauth2ResourceServer(config -> config.jwt(Customizer.withDefaults()))
                .build();
    }

    @Bean
    public AuthoritiesConverter realmRolesAuthoritiesConverter() {
        return claims -> {
            var realmAccess = Optional.ofNullable((Map<String, Object>) claims.get(REALM_ACCESS_CLAIM));
            var roles = realmAccess.flatMap(map -> Optional.ofNullable((List<String>) map.get(ROLES_CLAIM)));

            return roles.stream().flatMap(Collection::stream)
                    .map(SimpleGrantedAuthority::new)
                    .map(GrantedAuthority.class::cast)
                    .toList();
        };
    }

    @Bean
    public GrantedAuthoritiesMapper authenticationConverter(
            Converter<Map<String, Object>, Collection<GrantedAuthority>> authoritiesConverter) {
        return (authorities) -> authorities.stream()
                .filter(authority -> authority instanceof OidcUserAuthority)
                .map(OidcUserAuthority.class::cast)
                .map(OidcUserAuthority::getIdToken)
                .map(OidcIdToken::getClaims)
                .map(authoritiesConverter::convert)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }
}