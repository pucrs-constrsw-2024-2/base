package org.pucrs.br.oauth.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping("")
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Verificação de saúde do serviço")
    public void healthCheck() {
    }
}