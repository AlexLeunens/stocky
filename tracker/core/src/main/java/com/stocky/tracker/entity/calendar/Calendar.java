package com.stocky.tracker.entity.calendar;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Calendar {
    private String ticker;
    private List<CalendarDividend> dividends;
}
