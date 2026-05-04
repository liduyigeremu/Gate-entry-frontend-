/*
fetch-errors.ts - assertResponseOk - checks for server error
*/

export async function assertResponseOk(
    response: Response
): Promise<void> {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    
    try {
      const errorBody = await response.text();
      if (errorBody) errorMessage = errorBody;
    } catch {
    }
    
    throw new Error(errorMessage);
  }
}