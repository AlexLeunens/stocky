package com.stocky.tracker.entity.dividend;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class DividendInformationResults {
    private double cash_amount;
    private String currency;
    private String dividend_type;
    private LocalDate ex_dividend_date;
    private long frequency;
    private LocalDate pay_date;
    private LocalDate record_date;
    private String ticker;
}
