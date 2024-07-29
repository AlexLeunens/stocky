package com.stocky.tracker.service;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.configuration.ApiConfiguration;
import com.stocky.tracker.entity.TickerInformation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TickerGetService {

    private final ApiConfiguration apiConfiguration;

    public TickerInformation getTickerInfos(String ticker) {
        URI uri = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.polygon.io/v3/reference")
                .path("/tickers/{ticker}")
                .queryParam("apiKey", "{apiKey}")
                .buildAndExpand(ticker, apiConfiguration.getApiKey())
                .toUri();

        RestClient restClient = RestClient.create();
        return restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(TickerInformation.class);
    }

}
