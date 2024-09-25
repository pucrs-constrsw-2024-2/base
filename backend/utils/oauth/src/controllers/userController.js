// backend/api/controllers/usersController.js
const keycloakService = require('../services/keycloakService');

exports.health = async (req, res) => {
  try {
    return res.status(200).json('OK');
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.login = async (req, res) => {
  try {
    const {username, password } = req.body;
    const response = await keycloakService.login(username, password);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.createUser = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const user = req.body;

    // Verifica campos obrigatórios
    const requiredFields = ['username', 'firstName', 'lastName', 'credentials'];
    for (const field of requiredFields) {
      if (!user[field]) {
        return res.status(400).json({ message: `Field ${field} is required` });
      }
    }

    // Verifica se o campo credentials tem a senha
    if (!user.credentials[0] || !user.credentials[0].value) {
      return res.status(400).json({ message: "Password is required in credentials" });
    }

    // Validação do e-mail
    const emailRegex = /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/;
    if (!emailRegex.test(user.username)) {
      return res.status(400).json({ message: "Invalid email address format" });
    }

    // email = username
    user.email = user.username;
    user.enabled = true;
    user.credentials.type = 'password';
    user.credentials.temporary = false;

    // chama o keycloak
    const response = await keycloakService.createUser(access_token, user);

    // pega o ID do usuário
    const userId = response.headers.location.split('/').pop();

    // Corpo da resposta
    const createdUser = {
      id: userId,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: true
    };

    return res.status(201).json(createdUser);

  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        return res.status(401).json({ message: "Invalid access token" });
      } else if (statusCode === 403) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
      } else if (statusCode === 409) {
        return res.status(409).json({ message: "Username already exists" });
      } else {
        return res.status(statusCode).json(error.response.data);
      }
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const response = await keycloakService.getAllUsers(access_token);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const response = await keycloakService.getUserById(access_token, id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
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
    const access_token = req.headers.authorization.split(' ')[1];
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
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    await keycloakService.deleteUser(access_token, id);
    return res.status(204).send();
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};