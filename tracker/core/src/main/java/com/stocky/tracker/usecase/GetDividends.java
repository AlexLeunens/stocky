package com.stocky.tracker.usecase;

import com.stocky.tracker.adapter.externalApi.SseManager;

public class GetDividends {

    private final SseManager sseManager;

    public GetDividends(SseManager sseManager) {
        this.sseManager = sseManager;
    }

    // TODO: temp object instead of abstract sseemitter
    public Object fetchAndReturnDividends(String[] tickers, String startDate) {
        return sseManager.fetchAndReturnDividends(tickers, startDate);
    }

}
