package com.stocky.tracker.entity.calendar;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CalendarDividend {
    private double cashAmount;
    private String currency;
    private LocalDate payDate;
}
