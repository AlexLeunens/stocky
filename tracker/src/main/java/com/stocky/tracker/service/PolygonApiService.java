package com.stocky.tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.configuration.ApiConfiguration;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PolygonApiService {

    private final ApiConfiguration apiConfiguration;

    public UriComponentsBuilder buildBaseUri() {
        return UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.polygon.io/v3/reference")
                .queryParam("apiKey", apiConfiguration.getApiKey());
    }

}
