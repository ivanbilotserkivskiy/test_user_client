
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  return fetch(url, options)
    .then(response => {
      return response.json()
    })
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
  put: <T>(url: string, data: unknown) => request<T>(url, 'PUT', data),
};

