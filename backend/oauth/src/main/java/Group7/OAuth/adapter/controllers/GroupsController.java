package Group7.OAuth.adapter.controllers;

import Group7.OAuth.adapter.provider.AuthProvider;
import Group7.OAuth.application.dtos.GroupDTO;
import Group7.OAuth.application.usecase.AddUserGroupUC;
import Group7.OAuth.application.usecase.DeleteUserGroupUC;
import Group7.OAuth.application.usecase.GetGroupsUC;
import Group7.OAuth.application.usecase.GetUserGroupsUC;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/groups")
public class GroupsController {

    private final AuthProvider authProvider;
    private final GetGroupsUC getGroupsUC;
    private final GetUserGroupsUC getUserGroupsUC;
    private final AddUserGroupUC addUserGroupUC;
    private final DeleteUserGroupUC deleteUserGroupUC;

    @GetMapping
    public ResponseEntity<Collection<GroupDTO>> getGroups() {
        String token = authProvider.getAuthenticatedUserToken();
        return ResponseEntity.ok(getGroupsUC.run(token));
    }

    @PutMapping(path = "/users/{id}")
    public ResponseEntity<Void> addUserGroup(@PathVariable UUID id, @RequestBody String group){
        String token = authProvider.getAuthenticatedUserToken();
        addUserGroupUC.run(token, id, group);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<Void> deleteUserGroup(@PathVariable UUID id, @RequestBody String group){
        String token = authProvider.getAuthenticatedUserToken();
        deleteUserGroupUC.run(token, id, group);
        return ResponseEntity.ok().build();
    }

    //get user groups
    @GetMapping(path = "/users/{id}")
    public ResponseEntity<Collection<GroupDTO>> getUserGroups(@PathVariable UUID id){
        String token = authProvider.getAuthenticatedUserToken();
        return ResponseEntity.ok(getUserGroupsUC.run(token, id));
    }

}
