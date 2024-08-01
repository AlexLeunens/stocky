package com.stocky.tracker.repository.stock.dao;

import java.util.List;

import com.stocky.tracker.entity.stock.Stock;

import lombok.Getter;

@Getter
public class StockFile {
    List<Stock> stocks;
}
