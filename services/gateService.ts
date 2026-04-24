// services/gateService.ts
export interface Gate {
  id: string;
  gate_name: string;
  location: string;
  description: string;
  created_at?: string;
}

const API_BASE_URL = "http://localhost:8080/api/v1";

export const gateService = {
  // Fetch all gates
  async getGates(): Promise<Gate[]> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/gates`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch gates");
    }

    return response.json();
  },

  // Create a new gate
  async createGate(gateData: Omit<Gate, 'id' | 'created_at'>): Promise<Gate> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/gates`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gateData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create gate");
    }

    return response.json();
  },

  // Delete a gate
  async deleteGate(id: string): Promise<void> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/gates/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete gate");
    }
  }
};