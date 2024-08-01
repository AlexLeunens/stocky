package com.stocky.tracker.service;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.configuration.ApiConfiguration;
import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.entity.stock.Stock;
import com.stocky.tracker.mapper.stock.StockMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PolygonApiService {

    private final ApiConfiguration apiConfiguration;
    private final StockMapper stockMapper;

    public UriComponentsBuilder buildBaseUri() {
        return UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.polygon.io/v3/reference")
                .queryParam("apiKey", apiConfiguration.getApiKey());
    }

    public Stock getDividendInformation(String ticker, String startDate) {
        UriComponentsBuilder builder = buildBaseUri()
                .path("/dividends")
                .queryParam("ticker", ticker)
                .queryParam("limit", 12);

        if (!startDate.isBlank()) {
            builder.queryParam("pay_date.gte", startDate);
        }

        URI uri = builder.build().toUri();

        RestClient restClient = RestClient.create();
        DividendInformation result = restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(DividendInformation.class);

        return stockMapper.mapFromDividendInformation(ticker, result);
    }

}
