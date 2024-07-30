import { DividendInformation } from "../interfaces/DividendInformationInterface";
import { ApiService } from "./ApiService";

const getDividendInformation = (ticker: string, startDate?: string): Promise<DividendInformation> => {
    const url = "http://localhost:8080/dividend/information";
    let uri = `${url}?ticker=${ticker}`

    if (startDate) {
        uri += `&startDate=${startDate}`
    }

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


export const DividendGetInformationService = {
    getDividendInformation,
}