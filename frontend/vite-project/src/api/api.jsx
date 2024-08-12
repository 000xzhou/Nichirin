// test cera admin token
// const tokenCera =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y…Tc5fQ.Pf21dWa7U_v5WGc2kYa0BGB3qxZ-z10WxvtMoeE0gUI";
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Helper function to set up the request headers
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    // if (includeAuth) {
    //   headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    //   headers.Authorization = `Bearer ${tokenCera}`;
    // }

    return headers;
  }

  // Generic GET method
  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
      credentials: "include",
    });
    return this.handleResponse(response);
  }

  // Generic POST method
  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Generic PUT method
  async put(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Generic DELETE method
  async delete(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
      credentials: "include",
    });
    return this.handleResponse(response);
  }

  // Handle the API response
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    return response.json();
  }
}

export default ApiService;
