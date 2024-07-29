import { StockInformationInterface } from "../interfaces/StockInformationInterface";

const callApi = async (url: string, requestData: RequestInit) => {
    const response = await fetch(url, requestData);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

const getTickerInformation = (ticker: string) : Promise<StockInformationInterface> => {
    const url = "http://localhost:8080/ticker/information";
    const uri = `${url}?ticker=${ticker}`
    const requestData = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    return callApi(uri, requestData)
        .then(json => json)
        .catch(error => console.log(error));
};


export const TickerGetInformationService = {
    getTickerInformation,
}