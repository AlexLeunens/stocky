package com.stocky.tracker.entity.stock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    String ticker;
    Integer amount;
    String currency;
    double[] dividends;
}
