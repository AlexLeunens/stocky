package com.stocky.tracker.adapter.externalApi;

public interface SseManager {
    public Object fetchAndReturnDividends(String[] tickers, String startDate);
}
