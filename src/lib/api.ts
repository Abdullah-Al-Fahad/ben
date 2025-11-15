export async function fetchApi(endpoint: string, options?: RequestInit) {
  try {
    const url = `/api/${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}