package Group7.OAuth.adapter.controllers;

import Group7.OAuth.application.dtos.GroupDTO;
import Group7.OAuth.application.usecase.AddUserGroupUC;
import Group7.OAuth.application.usecase.DeleteUserGroupUC;
import Group7.OAuth.application.usecase.GetGroupsUC;
import Group7.OAuth.application.usecase.GetUserGroupsUC;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/groups")
public class GroupsController {

    private final GetGroupsUC getGroupsUC;
    private final GetUserGroupsUC getUserGroupsUC;
    private final AddUserGroupUC addUserGroupUC;
    private final DeleteUserGroupUC deleteUserGroupUC;

    @GetMapping
    @Operation(summary = "Recuperação dos dados de todos os grupos cadastrados")
    public ResponseEntity<Collection<GroupDTO>> getGroups(@AuthenticationPrincipal Jwt jwt) {
        String token = jwt.getTokenValue();
        return ResponseEntity.ok(getGroupsUC.run(token));
    }

    @PutMapping(path = "/users/{id}")
    @Operation(summary = "Adição do usuário em um grupo")
    public ResponseEntity<Void> addUserGroup(@PathVariable UUID id, @RequestBody String group,
                                             @AuthenticationPrincipal Jwt jwt){
        addUserGroupUC.run(jwt.getTokenValue(), id, group);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/users/{id}")
    @Operation(summary = "Exclusão do usuário em um grupo")
    public ResponseEntity<Void> deleteUserGroup(@PathVariable UUID id, @RequestBody String group,
                                                @AuthenticationPrincipal Jwt jwt){
        deleteUserGroupUC.run(jwt.getTokenValue(), id, group);
        return ResponseEntity.ok().build();
    }

    //get user groups
    @GetMapping(path = "/users/{id}")
    @Operation(summary = "Recuperação dos grupos aos quais o usuário pertence")
    public ResponseEntity<Collection<GroupDTO>> getUserGroups(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt){
        return ResponseEntity.ok(getUserGroupsUC.run(jwt.getTokenValue(), id));
    }

}
