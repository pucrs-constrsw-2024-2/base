package Group7.OAuth.adapter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Configuration
public class SecurityConfig {

    private static final String REALM_ACCESS_CLAIM = "realm_access";
    private static final String ROLES_CLAIM = "roles";

    private static final String[] ENDPOINTS_WITHOUT_AUTH = {
            "/login/**",
            "/health",
            "/swagger-ui/**",
            "/v3/api-docs/**"
    };

    private static final String[] ENDPOINTS_ADMIN_ONLY = {
            "/users/**"
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizerHml() {
        return (web) -> web.ignoring()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/swagger-ui/**"),
                        AntPathRequestMatcher.antMatcher("/v3/api-docs/**"),
                        AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/health"),
                        AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/auth/login"),
                        AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/auth/refresh-token"));
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(
                Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(AuthenticationConverter authenticationConverter,
                                                   HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth
                        .requestMatchers(ENDPOINTS_WITHOUT_AUTH).permitAll()
                        .requestMatchers(ENDPOINTS_ADMIN_ONLY).hasAuthority("ADMIN")
                        .anyRequest().authenticated())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sessionConfigurer -> sessionConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(resourceServer -> resourceServer.jwt(jwtResourceServer ->
                        jwtResourceServer.jwtAuthenticationConverter(authenticationConverter)))
                .build();
    }

    @Bean
    @SuppressWarnings("unchecked")
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