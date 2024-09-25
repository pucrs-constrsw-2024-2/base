"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const KEYCLOAK_URL = `${process.env.KEYCLOAK_EXTERNAL_HOST}:${process.env.KEYCLOAK_EXTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const router = (0, express_1.Router)();
console.log(KEYCLOAK_URL);
let users = [];
let nextId = 1;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Token de autenticação é obrigatório." });
    }
    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }
    const postData = {
        email: email,
        enabled: true,
        credentials: [
            {
                type: "password",
                value: senha,
                temporary: false,
            },
        ],
    };
    try {
        // Fazendo a requisição para criar o usuário no Keycloak
        const response = yield (0, node_fetch_1.default)(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: JSON.stringify(postData),
        });
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(`Erro na criação do usuário: ${errorData.message || response.statusText}`);
        }
        const responseData = yield response.json();
        res.status(201).json({
            id: responseData.id,
            email: email,
        });
    }
    catch (error) {
        console.error("Erro ao criar o usuário no Keycloak:", error);
        res.status(500).json({ message: "Erro ao criar o usuário." });
    }
}));
router.get("/", (req, res) => {
    return res.json(users);
});
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.json(user);
});
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { email, senha } = req.body;
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    if (email)
        users[userIndex].email = email;
    if (senha)
        users[userIndex].senha = senha;
    return res.json(users[userIndex]);
});
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    users.splice(userIndex, 1);
    return res.status(204).send(); // 204 No Content
});
router.patch("/:id/senha", (req, res) => {
    const id = parseInt(req.params.id);
    const { senha } = req.body;
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    if (!senha) {
        return res.status(400).json({ message: "Senha é obrigatória." });
    }
    users[userIndex].senha = senha;
    return res.json({ message: "Senha atualizada com sucesso." });
});
exports.default = router;
