package com.stocky.tracker.mapper.stock;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.stocky.tracker.entity.dividend.DividendInformation;
import com.stocky.tracker.entity.dividend.DividendResult;
import com.stocky.tracker.entity.stock.Stock;

@Service
public class StockMapper {
    public Stock mapFromDividendInformation(String ticker, DividendInformation dividendInfos) {
        List<DividendResult> apiDividends = List.of(dividendInfos.getResults());
        double[] dividends = new double[12];
        for (int i = 0; i < 12; i++) {
            dividends[i] = getDividendForMonth(apiDividends, i + 1);
        }

        return Stock.builder()
                .ticker(ticker)
                .amount(1)
                .currency(dividendInfos.getResults()[0].getCurrency())
                .dividends(dividends)
                .build();
    }

    private double getDividendForMonth(List<DividendResult> dividends, Integer month) {
        Optional<DividendResult> matchingDividend = dividends.stream()
                .filter(dividend -> dividend.getPay_date().getMonthValue() == month)
                .findFirst();

        return matchingDividend.isPresent()
                ? matchingDividend.get().getCash_amount()
                : 0;
    }

}
