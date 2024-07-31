package com.stocky.tracker.adapter.controller;

import com.stocky.tracker.usecase.GetDividends;

public class DividendController {

    private final GetDividends getDividends;

    public DividendController(GetDividends getDividends) {
        this.getDividends = getDividends;
    }

    // TODO: temp Object instead of SSEEmitter abstraction
    public Object streamStocksDividends(String[] tickers, String startDate) {
        return getDividends.fetchAndReturnDividends(tickers, startDate);
    };

}
