package com.stocky.tracker.service.dividend;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.service.PolygonApiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DividendGetService {

    private final PolygonApiService polygonApiService;

    public DividendInformation getDividendInfos(String ticker) {
        URI uri = polygonApiService.buildBaseUri()
                .path("/dividends")
                .queryParam("ticker", ticker)
                .queryParam("limit", 1)
                .build()
                .toUri();

        RestClient restClient = RestClient.create();
        return restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(DividendInformation.class);
    }

}
