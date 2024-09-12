const keycloakService = require('../services/keycloakService');

exports.login = async (req, res) => {
  try {
    const { client_id, username, password } = req.body;
    const result = await keycloakService.login(client_id, username, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await keycloakService.createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await keycloakService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await keycloakService.getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await keycloakService.updateUser(id, userData);
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await keycloakService.updatePassword(id, password);
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await keycloakService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};