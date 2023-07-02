import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, specify the method, etc.
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

  console.log('Sending request:', {
    url,
    method,
    payload,
    options,
  });

  try {
    const res = await fetch(url, options);
    const data = await res.json(); // Retrieve the response data

    console.log('Received response:', {
      url,
      method,
      response: res,
      data, // Log the response data
    });

    // if res.ok is false then something went wrong
    if (res.ok) {
      return data; // Return the response data
    } else if (res.status === 400) {
      throw new Error('Bad Request: Invalid input');
    } else if (res.status === 401) {
      throw new Error('Unauthorized: Access token is missing or invalid');
    } else if (res.status === 404) {
      throw new Error('Not Found: Resource not found');
    } else {
      throw new Error('An error occurred');
    }
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}
