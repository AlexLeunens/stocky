package com.stocky.tracker.entity.ticker;

import lombok.Getter;

@Getter
public class TickerInformation {
    private String request_id;
    TickerResult results;
    private String status;
}