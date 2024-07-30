const callApi = async (url: string, requestData: RequestInit) => {
    const response = await fetch(url, requestData);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

export const ApiService = {
    callApi,
}