package com.stocky.tracker.adapter.externalApi.dto.dividend;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class DividendResult {
    private double cash_amount;
    private LocalDate declaration_date;
    private String dividend_type;
    private LocalDate ex_dividend_date;
    private long frequency;
    private LocalDate pay_date;
    private LocalDate record_date;
    private String currency;
    private String ticker;
}
