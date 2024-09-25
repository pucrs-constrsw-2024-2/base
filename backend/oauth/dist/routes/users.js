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
dotenv.config();
const KEYCLOAK_URL = `${process.env.KEYCLOAK_EXTERNAL_HOST}:${process.env.KEYCLOAK_EXTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const router = (0, express_1.Router)();
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
console.log('KEYCLOAK_URL:', KEYCLOAK_URL);
/**
 * @swagger
 * /:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário no Keycloak com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Email e senha são obrigatórios ou email inválido.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       409:
 *         description: Username já existente.
 *       500:
 *         description: Erro ao criar o usuário.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
    }
    try {
        const response = yield axios_1.default.post(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`, {
            email: email,
            enabled: true,
            credentials: [
                {
                    type: 'password',
                    value: senha,
                    temporary: false
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${authHeader}`
            }
        });
        res.status(201).json({
            id: response.data.id,
            email: email
        });
    }
    catch (error) {
        console.error('Erro ao criar o usuário no Keycloak:', error);
        if (error.response && error.response.status === 409) {
            return res.status(409).json({ message: 'Username já existente.' });
        }
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint.' });
        }
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
}));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Listar usuários
 *     description: Lista todos os usuários do Keycloak. Aceita o parâmetro query "enabled" para filtrar usuários.
 *     parameters:
 *       - in: query
 *         name: enabled
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       400:
 *         description: O valor de "enabled" deve ser true ou false.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao listar usuários.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const { enabled } = req.query;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    if (enabled !== undefined && enabled !== 'true' && enabled !== 'false') {
        return res.status(400).json({ message: 'O valor de "enabled" deve ser true ou false.' });
    }
    try {
        let url = `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`;
        if (enabled !== undefined) {
            url += `?enabled=${enabled}`;
        }
        const response = yield axios_1.default.get(url, {
            headers: {
                Authorization: `${authHeader}`,
            },
        });
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Erro ao listar usuários no Keycloak:', error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
        }
        res.status(500).json({ message: 'Erro ao listar usuários.' });
    }
}));
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obter um usuário
 *     description: Recupera um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       404:
 *         description: Usuário não encontrado.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao obter usuário.
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    if (!id) {
        return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
    }
    try {
        const response = yield axios_1.default.get(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${authHeader.split(' ')[1]}`,
            },
        });
        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Erro ao obter usuário no Keycloak:', error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
        }
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(500).json({ message: 'Erro ao obter usuário.' });
    }
}));
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     description: Atualiza as informações de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "newpassword"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       400:
 *         description: Email e senha são obrigatórios.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar usuário.
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { email, senha } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    try {
        yield axios_1.default.put(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`, {
            email: email,
            credentials: [
                {
                    type: 'password',
                    value: senha,
                    temporary: false
                }
            ]
        }, {
            headers: {
                Authorization: `${authHeader}`,
            },
        });
        return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário no Keycloak:', error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
}));
/**
 * @swagger
 * /{id}/reset-password:
 *   patch:
 *     summary: Atualizar senha de um usuário
 *     description: Atualiza a senha de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário cuja senha será atualizada.
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário.
 *                 example: "novaSenhaSegura"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório ou inválido.
 *       400:
 *         description: Senha é obrigatória.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar a senha.
 */
router.patch('/:id/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { senha } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória.' });
    }
    try {
        yield axios_1.default.put(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}/reset-password`, {
            type: 'password',
            value: senha,
            temporary: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authHeader.split(' ')[1]}`,
            },
        });
        return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao atualizar senha no Keycloak:', error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
        }
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar a senha.' });
    }
}));
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     description: Exclui um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       404:
 *         description: Usuário não encontrado.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao excluir usuário.
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
    }
    try {
        yield axios_1.default.delete(`http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`, {
            headers: {
                Authorization: `${authHeader}`,
            },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao excluir usuário no Keycloak:', error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ message: 'Access token inválido.' });
        }
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
        }
        res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
}));
exports.default = router;
