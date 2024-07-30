
// const getDividendInformation = (ticker: string, startDate?: string): Promise<DividendInformation> => {
//     const url = "http://localhost:8080/dividend/information";
//     let uri = `${url}?ticker=${ticker}`

//     if (startDate) {
//         uri += `&startDate=${startDate}`
//     }

//     const requestData = {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//         }
//     }

//     return ApiService.callApi(uri, requestData)
//         .then(json => json)
//         .catch(error => console.log(error));
// };


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



export const DividendGetService = {
    getDividendCalendars,
}