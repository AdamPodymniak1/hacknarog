const BASE_URL = 'http://localhost:8000';

export const customInstance = async (url, options) => {
  const token = localStorage.getItem('access_token');
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw errorData; 
  }

  if (response.status === 204) return {};

  return response.json();
};