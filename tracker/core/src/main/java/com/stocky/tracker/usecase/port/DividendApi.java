package com.stocky.tracker.usecase.port;

import com.stocky.tracker.entity.calendar.Calendar;

public interface DividendApi {
    public Calendar getDividendInformation(String ticker, String startDate);
}
