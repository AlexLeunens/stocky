package com.stocky.tracker.service.dividend;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import com.stocky.tracker.entity.calendar.Calendar;
import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.mapper.calendar.CalendarMapper;
import com.stocky.tracker.service.PolygonApiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DividendGetService {

    private final PolygonApiService polygonApiService;
    private final CalendarMapper calendarMapper;

    public DividendInformation getDividendInformation(String ticker, String startDate) {
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
            for (String ticker : tickers) {
                runDividendFetchEvent(ticker, startDate, sseEmitter);
            }
            sseEmitter.complete();
        });
        return sseEmitter;
    }

    private void runDividendFetchEvent(String ticker, String startDate, SseEmitter sseEmitter) {
        try {
            DividendInformation dividendInfos = getDividendInformation(ticker, startDate);
            Calendar calendar = calendarMapper.mapFromDividendInformation(ticker, dividendInfos);

            SseEventBuilder event = SseEmitter.event()
                    .id(ticker)
                    .data(calendar)
                    .name("sse event - mvc"); // TODO: rename event (make sure the front ends matches the name)

            sseEmitter.send(event);
            sleep(12500, sseEmitter); // API limit of 5 requests per minute, so delay of 12500
        } catch (IOException e) {
            e.printStackTrace();
            sseEmitter.completeWithError(e);
        }
    }

}
