import { ApiService } from "./ApiService";

const getDividendCalendars = (tickers: string[], startDate: string, onEvent: (eventMessage: string) => void) => {
    const url = "http://localhost:8080/dividend/calendar";
    let uri = `${url}?tickers=${tickers.join(',')}&startDate=${startDate}`
    const eventSource = new EventSource(uri);

    eventSource.onopen = (event) => {
        console.log("connection opened");
    }

    eventSource.addEventListener("sse event - mvc", (event) => {
        const messageData = event.data;
        onEvent(messageData)
    });

    eventSource.onerror = (e) => {
        console.log(e)
        eventSource?.close();
    }
}

const getSavedStocks = (callback: (result: any) => void) => {
    const url = "http://localhost:8080/dividend/list";
    const requestData = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    return ApiService.callApi(url, requestData)
        .then(json => callback(json))
        .catch(error => console.log(error));
}



export const DividendGetService = {
    getDividendCalendars,
    getSavedStocks
}