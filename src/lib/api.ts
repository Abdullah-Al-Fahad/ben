const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchApi(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}/`);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}