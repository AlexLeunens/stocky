package com.stocky.tracker.repository.stock.dao;

import java.util.List;

import com.stocky.tracker.entity.stock.Stock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockFile {
    List<Stock> stocks;
}
