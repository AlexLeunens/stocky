package com.stocky.tracker.entity;

import lombok.Getter;

@Getter
public class TickerInformation {
    private String request_id;
    TickerInformationResults results;
    private String status;
}