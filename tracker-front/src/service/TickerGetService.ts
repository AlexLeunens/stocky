import { TickerInformation } from "../interfaces/TickerInformation";
import { ApiService } from "./ApiService";

const getTickerInformation = (ticker: string): Promise<TickerInformation> => {
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

    return ApiService.callApi(uri, requestData)
        .then(json => json)
        .catch(error => console.log(error));
};


export const TickerGetService = {
    getTickerInformation,
}