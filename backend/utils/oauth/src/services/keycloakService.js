const axios = require('axios');

const keycloakBaseUrl = `http://${process.env.KEYCLOAK_INTERNAL_HOST}:${process.env.KEYCLOAK_INTERNAL_PORT}/auth/realms/${process.env.KEYCLOAK_REALM}`;

exports.login = async (clientId, username, password) => {
  const response = await axios.post(`${keycloakBaseUrl}/protocol/openid-connect/token`, 
    new URLSearchParams({
      client_id: clientId,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'password',
      username,
      password
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
  return response.data;
};

exports.createUser = async (userData) => {
  const response = await axios.post(`${keycloakBaseUrl}/users`, userData, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
  return response.data;
};

exports.getAllUsers = async () => {
  const response = await axios.get(`${keycloakBaseUrl}/users`, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
  return response.data;
};

exports.getUser = async (id) => {
  const response = await axios.get(`${keycloakBaseUrl}/users/${id}`, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
  return response.data;
};

exports.updateUser = async (id, userData) => {
  await axios.put(`${keycloakBaseUrl}/users/${id}`, userData, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
};

exports.updatePassword = async (id, password) => {
  await axios.put(`${keycloakBaseUrl}/users/${id}/reset-password`, { value: password }, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
};

exports.deleteUser = async (id) => {
  await axios.delete(`${keycloakBaseUrl}/users/${id}`, {
    headers: { 'Authorization': `Bearer ${await getAdminToken()}` }
  });
};

async function getAdminToken() {
  const response = await axios.post(`${keycloakBaseUrl}/protocol/openid-connect/token`,
    new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
  return response.data.access_token;
}