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
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
/**
 * @swagger
 * /:
 *   post:
 *     summary: Obter token de acesso
 *     description: Recupera um token de acesso do Keycloak utilizando nome de usuário e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       201:
 *         description: Token de acesso criado com sucesso.
 *       400:
 *         description: Erro na estrutura da chamada.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro ao obter token.
 */
dotenv.config();
const KEYCLOAK_URL = `${process.env.KEYCLOAK_EXTERNAL_HOST}:${process.env.KEYCLOAK_EXTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
const clientId = process.env.KEYCLOAK_CLIENT_ID;
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Usuário e senha são obrigatórios." });
    }
    if (!clientId || !clientSecret) {
        return res
            .status(500)
            .json({ message: "Credenciais do cliente não configuradas." });
    }
    try {
        const response = yield axios_1.default.post(`http://${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`, new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password,
            grant_type: "password",
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.status(201).json(response.data);
    }
    catch (error) {
        console.error("Erro ao obter token do Keycloak:", error);
        if (error.response && error.response.status === 401) {
            return res
                .status(401)
                .json({ message: "Usuário ou senha inválidos." });
        }
        if (error.response && error.response.status === 400) {
            return res
                .status(400)
                .json({ message: "Erro na estrutura da chamada." });
        }
        return res.status(500).json({ message: "Erro ao obter token." });
    }
}));
exports.default = router;
