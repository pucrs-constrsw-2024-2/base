// backend/api/controllers/usersController.js
const keycloakService = require('../services/keycloakService');
const emailRegex = /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/;

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
    if (!username || !password) {
      return handleError(
        { response: { status: 400 } },
        res,
        "OAuthAPI",
        "Username and password are required."
      );
    }
    const response = await keycloakService.login(username, password);
    return res.status(200).json(response.data);
  } catch (error) {
      let customDescription;

      if (error.response?.status === 401) {
        customDescription = "Invalid username or password";
      } else if (error.response?.status === 400) {
        customDescription = "Bad request. Check the request body or headers.";
      }

      return handleError(error, res, "OAuthAPI", customDescription);
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
        return handleError(
          { response: { status: 400 } },
          res,
          "OAuthAPI",
          `Field ${field} is required.`
        );
      }
    }

    // Verifica se o campo credentials tem a senha
    if (!user.credentials[0] || !user.credentials[0].value) {
      return handleError(
        { response: { status: 400 } },
        res,
        "OAuthAPI",
        "Password is required in credentials."
      );
    }

    // Validação do e-mail
    if (!emailRegex.test(user.username)) {
      return handleError(
        { response: { status: 400 } },
        res,
        "OAuthAPI",
        "Invalid email address format."
      );
    }

    // email = username
    user.email = user.username;
    user.enabled = true;
    user.credentials.type = 'password';
    user.credentials.temporary = false;

    // chama o Keycloak
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
    let customDescription;

    if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions.";
    } else if (error.response?.status === 409) {
      customDescription = "Username already exists.";
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const response = await keycloakService.getAllUsers(access_token);
    return res.status(200).json(response.data);
  } catch (error) {
    let customDescription;

    if (error.response?.status === 400) {
      customDescription = "Bad request. Check the request structure (headers, body, etc.).";
    } else if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions to access this endpoint or object.";
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const response = await keycloakService.getUserById(access_token, id);
    return res.status(200).json(response.data);
  } catch (error) {
    let customDescription;

    if (error.response?.status === 400) {
      customDescription = "Bad request. Check the request structure (headers, body, etc.).";
    } else if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions to access this endpoint or object.";
    } else if (error.response?.status === 404) {
      customDescription = `User with ID ${req.params.id} not found.`;
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const user = req.body;

    if(user.email) {
      if (!emailRegex.test(user.email)) {
        return handleError(
          { response: { status: 400 } }, // Simula erro 400
          res,
          "OAuthAPI",
          "Invalid email address format."
        );
      }
      user.username = user.email;
    }
    else if (user.username) {
      if (!emailRegex.test(user.username)) {
        return handleError(
          { response: { status: 400 } }, // Simula erro 400
          res,
          "OAuthAPI",
          "Invalid email address format."
        );
      }
      user.email = user.username;
    }
    const response = await keycloakService.updateUser(access_token, id, user);
    return res.status(200).json(response.data);
  } catch (error) {
    let customDescription;

    if (error.response?.status === 400) {
      customDescription = "Bad request. Check the request structure (headers, body, etc.).";
    } else if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions to access this endpoint or object.";
    } else if (error.response?.status === 404) {
      customDescription = `User with ID ${id} not found.`;
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return handleError(
        { response: { status: 400 } },
        res,
        "OAuthAPI",
        "Password is required."
      );
    }

    const response = await keycloakService.updateUserPassword(access_token, id, password);
    return res.status(200).json(response.data);
  } catch (error) {
    let customDescription;

    if (error.response?.status === 400) {
      customDescription = "Bad request. Check the request structure (headers, body, etc.).";
    } else if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions to access this endpoint or object.";
    } else if (error.response?.status === 404) {
      customDescription = `User with ID ${id} not found.`;
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const user = {
      enabled: false
    };
    await keycloakService.deleteUser(access_token, id, user);
    return res.status(204).send();
  } catch (error) {
    let customDescription;

    if (error.response?.status === 400) {
      customDescription = "Bad request. Check the request structure (headers, body, etc.).";
    } else if (error.response?.status === 401) {
      customDescription = "Invalid access token.";
    } else if (error.response?.status === 403) {
      customDescription = "Forbidden: insufficient permissions to access this endpoint or object.";
    } else if (error.response?.status === 404) {
      customDescription = `User with ID ${id} not found.`;
    }

    return handleError(error, res, "OAuthAPI", customDescription);
  }
};

function handleError(error, res, errorSource, customDescription) {
  const errorCode = error.response?.status || 500;

  const errorStack = error.stack ? error.stack.split("\n").map(line => line.trim()) : [];

  const errorResponse = {
    error_code: `OA-${errorCode}`,
    error_description: customDescription || "An unexpected error occurred.",
    error_source: errorSource,
    error_stack: errorStack
  };

  return res.status(errorCode).json(errorResponse);
}
