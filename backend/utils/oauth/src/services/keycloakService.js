// backend/api/services/keycloakService.js
const axios = require('axios');
require('dotenv').config();

const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_INTERNAL_HOST + ':' + process.env.KEYCLOAK_INTERNAL_PORT;
const REALM = process.env.KEYCLOAK_REALM;
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;

exports.login = (username, password, grant_type) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/realms/${REALM}/protocol/openid-connect/token`;
  const data = new URLSearchParams({
    CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username,
    password,
    grant_type
  });

  return axios.post(url, data);
};

exports.createUser = (access_token, user) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users`;
  return axios.post(url, user, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

exports.getAllUsers = (access_token) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

exports.getUserById = (access_token, id) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

exports.updateUser = (access_token, id, user) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users/${id}`;
  return axios.put(url, user, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

exports.updateUserPassword = (access_token, id, password) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users/${id}/reset-password`;
  const data = {
    type: 'password',
    value: password,
    temporary: false
  };
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

exports.deleteUser = (access_token, id) => {
  const url = `${KEYCLOAK_BASE_URL}/auth/admin/realms/${REALM}/users/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};