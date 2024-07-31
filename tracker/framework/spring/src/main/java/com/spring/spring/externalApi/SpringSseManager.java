package com.spring.spring.externalApi;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import com.stocky.tracker.adapter.externalApi.SseManager;
import com.stocky.tracker.entity.calendar.Calendar;
import com.stocky.tracker.usecase.port.DividendApi;

public class SpringSseManager implements SseManager {

    private final DividendApi dividendApi;

    public SpringSseManager(DividendApi dividendApi) {
        this.dividendApi = dividendApi;
    }

    private void sleep(int millis, SseEmitter sseEmitter) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
            sseEmitter.completeWithError(e);
        }
    }

    @Override
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
            Calendar calendar = dividendApi.getDividendInformation(ticker, startDate);

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
