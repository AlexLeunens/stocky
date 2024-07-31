package com.stocky.tracker.adapter.controller;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.stocky.tracker.usecase.GetDividends;

public class DividendController {

    private final GetDividends getDividends;

    public DividendController(GetDividends getDividends) {
        this.getDividends = getDividends;
    }

    public SseEmitter streamStocksDividends(String[] tickers, String startDate) {
        return getDividends.fetchAndReturnDividends(tickers, startDate);
    };

}
