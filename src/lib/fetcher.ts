interface Fetcher {
  GET: (url: string) => Promise<any>
  POST: (url: string, body: any) => Promise<any>
  PUT: (url: string, body: any) => Promise<any>
  DELETE: (url: string) => Promise<any>
}

const BASE_URL = 'http://localhost:3000/api';


const handleErrors = async (response: Response) => {
  if (!response.ok) {
    // Extract the error message from the response body if available
    const errorBody = await response.text();
    let errorMessage = `Error ${response.status}: ${response.statusText}`;

    // Try parsing the error body as JSON for a more specific message
    try {
      const errorJson = JSON.parse(errorBody);
      errorMessage = errorJson.message || errorMessage;
    } catch (e) {
      // In case the response body is not JSON, we leave the default message
    }

    throw new Error(errorMessage);
  }

  // Attempt to parse the response as JSON
  try {
    return await response.json();
  } catch (e) {
    throw new Error('Failed to parse response as JSON');
  }
};

const customFetch = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, options);
    return await handleErrors(response);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch data');
  }
}

const fetcher: Fetcher = {
  GET: async (url: string) => {
    const response = await customFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response
  },
  POST: async (url: string, body: any) => {
    const response = await customFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return response;
  },
  PUT: async (url: string, body: any) => {
    const response = await customFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return response;
  },
  DELETE: async (url: string) => {
    const response = await customFetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }
}

export default fetcher;
