package Group7.OAuth.adapter.controllers;

import Group7.OAuth.adapter.provider.AuthProvider;
import Group7.OAuth.application.dtos.RoleDTO;
import Group7.OAuth.application.usecase.AddRoleToUserUC;
import Group7.OAuth.application.usecase.DeleteUserGroupUC;
import Group7.OAuth.application.usecase.GetRolesUC;
import Group7.OAuth.application.usecase.GetUserGroupsUC;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/roles")
public class RolesController {
    private final AuthProvider authProvider;
    private final GetRolesUC getRolesUC;
    private final GetUserGroupsUC getUserGroupsUC;
    private final AddRoleToUserUC addRoleToUserUC;
    private final DeleteUserGroupUC deleteUserGroupUC;

    @GetMapping
    public ResponseEntity<Collection<RoleDTO>> getRoles() {
        String token = authProvider.getAuthenticatedUserToken();
        return ResponseEntity.ok(getRolesUC.run(token));
    }

    @PostMapping(path = "/{role}/users/{userId}")
    public ResponseEntity<Void> addRoleToUser(@PathVariable UUID role, @PathVariable UUID userId) {
        String token = authProvider.getAuthenticatedUserToken();
        addRoleToUserUC.run(token, userId, role);
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
    public ResponseEntity<Collection<RoleDTO>> getUserGroups(@PathVariable UUID id){
        String token = authProvider.getAuthenticatedUserToken();
        return ResponseEntity.ok(getUserGroupsUC.run(token, id));
    }

}
