package Group7.OAuth.adapter.controllers;

import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import Group7.OAuth.application.usecase.ChangePasswordUC;
import Group7.OAuth.application.usecase.CreateUserUC;
import Group7.OAuth.application.usecase.DeleteUserUC;
import Group7.OAuth.application.usecase.GetUserUC;
import Group7.OAuth.application.usecase.GetUsersUC;
import Group7.OAuth.application.usecase.UpdateUserUC;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final CreateUserUC createUserUC;
    private final GetUserUC getUserUC;
    private final GetUsersUC getUsersUC;
    private final UpdateUserUC updateUserUC;
    private final ChangePasswordUC changePasswordUC;
    private final DeleteUserUC deleteUserUC;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserRequestDTO userRequestDTO,
                                              @AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = createUserUC.run(jwt.toString(), userRequestDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = getUserUC.run(jwt.getTokenValue(), id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<UserDTO>> getUsers(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(getUsersUC.run(jwt.getTokenValue()));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id, @RequestBody UserRequestDTO userRequestDTO,
                                              @AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = updateUserUC.run(jwt.getTokenValue(), id, userRequestDTO);
        return ResponseEntity.ok(userDTO);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Void> changeUserPassword(@PathVariable UUID id, @RequestBody String newPassword,
                                                   @AuthenticationPrincipal Jwt jwt) {
        changePasswordUC.run(jwt.getTokenValue(), id, newPassword);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        deleteUserUC.run(jwt.getTokenValue(), id);
        return ResponseEntity.noContent().build();
    }
}
