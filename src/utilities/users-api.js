import  sendRequest  from './send-request';
import { getToken } from './users-service';
const BASE_URL = '/api/users';


export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}


export async function updateUser(userData) {
  const token = getToken();

  if (!token) {
    throw new Error('No token found. User is not authenticated.');
  }

  const response = await fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error updating user: ${errorMessage}`);
  }

  const updatedUser = await response.json();
  return updatedUser;
}