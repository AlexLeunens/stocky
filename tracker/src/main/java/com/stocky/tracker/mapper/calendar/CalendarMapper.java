package com.stocky.tracker.mapper.calendar;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.stereotype.Component;

import com.stocky.tracker.entity.calendar.Calendar;
import com.stocky.tracker.entity.calendar.CalendarDividend;
import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.entity.dividend.DividendResult;

@Component
public class CalendarMapper {

        private CalendarDividend createEmptyDividend(int month) {
                return CalendarDividend.builder()
                                .currency("EUR")
                                .cashAmount(0)
                                .payDate(LocalDate.of(LocalDate.now().getYear(), month, 5))
                                .build();
        }

        private CalendarDividend mapCalendarDividends(DividendResult dividend) {
                return CalendarDividend.builder()
                                .currency(dividend.getCurrency())
                                .cashAmount(dividend.getCash_amount())
                                .payDate(dividend.getPay_date())
                                .build();
        }

        public Calendar mapFromDividendInformation(String ticker, DividendInformation dividendInfos) {
                Stream<Integer> months = IntStream.range(1, 13).boxed();
                List<DividendResult> dividends = List.of(dividendInfos.getResults());

                List<CalendarDividend> calendarDividends = months
                                .map(month -> getDividendForMonth(dividends, month))
                                .toList();

                return Calendar.builder()
                                .ticker(ticker)
                                .dividends(calendarDividends)
                                .build();
        }

        private CalendarDividend getDividendForMonth(List<DividendResult> dividends,
                        Integer month) {
                Optional<DividendResult> matchingDividend = dividends.stream()
                                .filter(dividend -> dividend.getPay_date().getMonthValue() == month)
                                .findFirst();

                return matchingDividend.isPresent()
                                ? mapCalendarDividends(matchingDividend.get())
                                : createEmptyDividend(month);
        }

}
