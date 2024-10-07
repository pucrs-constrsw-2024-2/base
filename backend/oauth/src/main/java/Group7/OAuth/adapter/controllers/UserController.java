package Group7.OAuth.adapter.controllers;

import Group7.OAuth.adapter.provider.AuthProvider;
import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import Group7.OAuth.application.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final AuthProvider authProvider;
    private final CreateUserUC createUserUC;
    private final GetUserUC getUserUC;
    private final GetUsersUC getUsersUC;
    private final UpdateUserUC updateUserUC;
    private final ChangePasswordUC changePasswordUC;
    private final DeleteUserUC deleteUserUC;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        String token = authProvider.getAuthenticatedUserToken();
        UserDTO userDTO = createUserUC.run(token, userRequestDTO);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable UUID id){
        String token = authProvider.getAuthenticatedUserToken();
        UserDTO userDTO = getUserUC.run(token, id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<UserDTO>> getUsers() {

        String token = authProvider.getAuthenticatedUserToken();
        return ResponseEntity.ok(getUsersUC.run(token));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id, @RequestBody UserRequestDTO userRequestDTO){
        String token = authProvider.getAuthenticatedUserToken();
        UserDTO userDTO = updateUserUC.run(token, id, userRequestDTO);
        return ResponseEntity.ok(userDTO);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Void> changeUserPassword(@PathVariable UUID id, @RequestBody String newPassword){
        String token = authProvider.getAuthenticatedUserToken();
        changePasswordUC.run(token, id, newPassword);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id){
        String token = authProvider.getAuthenticatedUserToken();
        deleteUserUC.run(token, id);
        return ResponseEntity.noContent().build();
    }
}
