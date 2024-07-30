package com.stocky.tracker.entity.dividend;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class DividendInformationResults {
    private double cashAmount;
    private String currency;
    private String dividendType;
    private LocalDate exDividendDate;
    private long frequency;
    private LocalDate payDate;
    private LocalDate recordDate;
    private String ticker;
}
