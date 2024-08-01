package com.stocky.tracker.service.dividend;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import com.stocky.tracker.entity.stock.Stock;
import com.stocky.tracker.repository.stock.StockFileRepository;
import com.stocky.tracker.service.PolygonApiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DividendGetService {

    private final PolygonApiService polygonApiService;
    private final StockFileRepository stockFileRepository;

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
            Stock stockInfos = polygonApiService.getDividendInformation(ticker, startDate);

            SseEventBuilder event = SseEmitter.event()
                    .id(ticker)
                    .data(stockInfos)
                    .name("sse event - mvc"); // TODO: rename event (make sure the front ends matches the name)

            sseEmitter.send(event);
            sleep(12500, sseEmitter); // API limit of 5 requests per minute, so delay of 12500
        } catch (IOException e) {
            e.printStackTrace();
            sseEmitter.completeWithError(e);
        }
    }

    public List<Stock> getStocks() throws IOException {
        return stockFileRepository.getStocksFromFile();
    }

}
