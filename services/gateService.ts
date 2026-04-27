// // services/gateService.ts
// export interface Gate {
//   id?: string;  // Make id optional
//   gate_name: string;
//   location: string;
//   description?: string;
//   created_at?: string;
// }

// const API_BASE_URL = "http://localhost:8080/api/v1";

// export const gateService = {
//   // Fetch all gates
//   async getGates(): Promise<Gate[]> {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.warn("No auth token found, returning mock data");
//       return getMockGates();
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/gates`, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.ok) {
//         console.warn(`API returned ${response.status}, using mock data`);
//         return getMockGates();
//       }

//       const data = await response.json();
//       console.log("API Response:", data);
      
//       // Handle different response formats
//       let gatesArray: any[] = [];
      
//       if (Array.isArray(data)) {
//         gatesArray = data;
//       } else if (data && typeof data === 'object') {
//         if (Array.isArray(data.data)) {
//           gatesArray = data.data;
//         } else if (Array.isArray(data.gates)) {
//           gatesArray = data.gates;
//         } else if (Array.isArray(data.results)) {
//           gatesArray = data.results;
//         } else {
//           return getMockGates();
//         }
//       }
      
//       // Map the gates without assuming id exists
//       const validGates = gatesArray
//         .filter(gate => gate && (gate.gate_name || gate.name))
//         .map(gate => ({
//           // Don't create fake IDs, just use what's available
//           id: gate.id || gate.gate_id,
//           gate_name: gate.gate_name || gate.name,
//           location: gate.location || "",
//           description: gate.description || ""
//         }));
      
//       return validGates.length > 0 ? validGates : getMockGates();
      
//     } catch (error) {
//       console.error("Error fetching gates:", error);
//       return getMockGates();
//     }
//   },

//   // Create a new gate
//   async createGate(gateData: Omit<Gate, 'id'>): Promise<Gate> {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       throw new Error("Authentication required. Please log in again.");
//     }

//     console.log("Creating gate with data:", gateData);

//     try {
//       const response = await fetch(`${API_BASE_URL}/gates`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           gate_name: gateData.gate_name,
//           location: gateData.location,
//           description: gateData.description || ""
//         })
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error response:", errorData);
//         throw new Error(errorData.message || errorData.error || `Failed to create gate (Status: ${response.status})`);
//       }

//       const result = await response.json();
//       console.log("Gate created successfully:", result);
      
//       // Return the created gate
//       return {
//         id: result.id || result.gate_id,
//         gate_name: result.gate_name || result.name || gateData.gate_name,
//         location: result.location || gateData.location,
//         description: result.description || gateData.description || ""
//       };
      
//     } catch (error: any) {
//       console.error("Create gate error:", error);
//       throw error;
//     }
//   },

//   // Delete a gate
//   async deleteGate(id: string): Promise<void> {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       throw new Error("Authentication required");
//     }

//     const response = await fetch(`${API_BASE_URL}/gates/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Failed to delete gate");
//     }
//   }
// };

// // Mock data function - no IDs needed for mock data
// function getMockGates(): Gate[] {
//   return [
//     { gate_name: "North Gate", location: "North Entrance", description: "Main north entrance" },
//     { gate_name: "South Gate", location: "South Entrance", description: "Main south entrance" },
//     { gate_name: "East Gate", location: "East Entrance", description: "East side entrance" },
//     { gate_name: "West Gate", location: "West Entrance", description: "West side entrance" },
//   ];
// }