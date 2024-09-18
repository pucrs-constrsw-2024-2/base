package Group7.OAuth.adapter.controllers;


import Group7.OAuth.application.dtos.GroupDTO;
import Group7.OAuth.application.usecase.AddUserGroupUC;
import Group7.OAuth.application.usecase.DeleteUserGroupUC;
import Group7.OAuth.application.usecase.GetGroupsUC;
import Group7.OAuth.application.usecase.GetUserGroupsUC;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Collection<GroupDTO>> getGroups(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(getGroupsUC.run(authorizationHeader));
    }

    @PutMapping(path = "/users/{id}")
    public ResponseEntity<Void> addUserGroup(@PathVariable UUID id, @RequestBody String group, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        addUserGroupUC.run(token, id, group);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<Void> deleteUserGroup(@PathVariable UUID id, @RequestBody String group, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        deleteUserGroupUC.run(token, id, group);
        return ResponseEntity.ok().build();
    }

    //get user groups
    @GetMapping(path = "/users/{id}")
    public ResponseEntity<Collection<GroupDTO>> getUserGroups(@PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return ResponseEntity.ok(getUserGroupsUC.run(token, id));
    }

}
