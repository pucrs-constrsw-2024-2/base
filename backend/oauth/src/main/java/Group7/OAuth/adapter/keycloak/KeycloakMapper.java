package Group7.OAuth.adapter.keycloak;

import org.mapstruct.Mapper;

import Group7.OAuth.application.dtos.JwtTokenDTO;

@Mapper(componentModel = "spring")
public interface KeycloakMapper {
    JwtTokenDTO toTokenDTO(KeycloakToken keycloakToken);
}
