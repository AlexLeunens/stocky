package com.stocky.tracker.service.dividend;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.service.PolygonApiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DividendGetService {

    private final PolygonApiService polygonApiService;

    public DividendInformation getDividendInfos(String ticker, String startDate) {
        UriComponentsBuilder builder = polygonApiService.buildBaseUri()
                .path("/dividends")
                .queryParam("ticker", ticker)
                .queryParam("limit", 12);

        if (!startDate.isBlank()) {
            builder.queryParam("pay_date.gte", startDate);
        }

        URI uri = builder.build().toUri();

        RestClient restClient = RestClient.create();
        return restClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(DividendInformation.class);
    }

}
