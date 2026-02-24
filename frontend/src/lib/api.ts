const API_URL = "http://localhost:3001";

export const api = {
  async get(path: string, token?: string) {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },

  async post(path: string, body: unknown, token?: string) {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },
};
