package com.stocky.tracker.service.dividend;

import java.io.IOException;
import java.net.URI;
import java.time.LocalTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;
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

    private void sleep(int millis, SseEmitter sseEmitter) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
            sseEmitter.completeWithError(e);
        }
    }

    public SseEmitter fetchAndReturnDividends(String[] tickers, String startDate) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.execute(() -> {
            for (int i = 0; i < tickers.length; i++) {
                try {
                    DividendInformation dividendInfos = getDividendInfos(tickers[i], startDate);

                    SseEventBuilder event = SseEmitter.event()
                            .id(String.valueOf(i))
                            .data(dividendInfos)
                            .name("sse event - mvc"); // TODO: rename event (make sure the front ends matches the name)

                    sseEmitter.send(event);
                    sleep(1000, sseEmitter); // API limit of 5 requests per minute, so delay of 12500
                } catch (IOException e) {
                    e.printStackTrace();
                    sseEmitter.completeWithError(e);
                }
            }
            sseEmitter.complete();
        });

        return sseEmitter;
    }

}
