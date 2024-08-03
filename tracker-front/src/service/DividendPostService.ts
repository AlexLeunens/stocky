import { Stock } from "../interfaces/Stock";
import { ApiService } from "./ApiService";

const saveStocks = async (newStocks: Stock[], callback: (result: any) => void) => {
    const url = "http://localhost:8080/dividend/list";
    const requestData = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            stocks: newStocks
        }),        
    }

    try {
        const json = await ApiService.callApi(url, requestData);
        return callback(json);
    } catch (error) {
        return console.log(error);
    }
}

export const DividendPostService = {
    saveStocks,
}