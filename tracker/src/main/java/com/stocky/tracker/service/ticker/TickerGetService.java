package com.stocky.tracker.service.ticker;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.stocky.tracker.entity.ticker.TickerInformation;
import com.stocky.tracker.service.PolygonApiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TickerGetService {

    private final PolygonApiService polygonApiService;

    public TickerInformation getTickerInfos(String ticker) {
        URI uri = polygonApiService.buildBaseUri()
                .path("/tickers/{ticker}")
                .buildAndExpand(ticker)
                .toUri();

        RestClient restClient = RestClient.create();
        return restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(TickerInformation.class);
    }

}
