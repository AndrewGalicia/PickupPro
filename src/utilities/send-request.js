import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, specifiy the method, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    options.headers ||= {};
    // Older approach
    // options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // if res.ok is false then something went wrong
  if (res.ok) {
    return res.json();
  } else if (res.status === 400) {
    throw new Error('Bad Request: Invalid input');
  } else if (res.status === 401) {
    throw new Error('Unauthorized: Access token is missing or invalid');
  } else if (res.status === 404) {
    throw new Error('Not Found: Resource not found');
  } else {
    throw new Error('An error occurred');
  }
}  