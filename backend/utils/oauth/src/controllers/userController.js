// backend/api/controllers/usersController.js
const keycloakService = require('../services/keycloakService');

exports.login = async (req, res) => {
  try {
    const {username, password, grant_type } = req.body;
    const response = await keycloakService.login(username, password, grant_type);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const user = req.body;
    const response = await keycloakService.createUser(access_token, user);
    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const response = await keycloakService.getAllUsers(access_token);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { id } = req.params;
    const response = await keycloakService.getUserById(access_token, id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { id } = req.params;
    const user = req.body;
    const response = await keycloakService.updateUser(access_token, id, user);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { id } = req.params;
    const { password } = req.body;
    const response = await keycloakService.updateUserPassword(access_token, id, password);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { id } = req.params;
    await keycloakService.deleteUser(access_token, id);
    return res.status(204).send();
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};