package com.stocky.tracker.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.configuration.ApiConfiguration;
import com.stocky.tracker.entity.TickerInformation;

@Service
public class TickerGetService {

    public TickerInformation getTickerInfos(String ticker) {
        URI uri = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.polygon.io/v3/reference")
                .path("/tickers/{ticker}")
                .queryParam("apiKey", "{apiKey}")
                .buildAndExpand(ticker, ApiConfiguration.API_KEY)
                .toUri();

        RestClient restClient = RestClient.create();
        return restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(TickerInformation.class);
    }

}
