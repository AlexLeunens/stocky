package com.stocky.tracker.service.dividend;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.stocky.tracker.entity.stock.Stock;
import com.stocky.tracker.repository.stock.StockFileRepository;
import com.stocky.tracker.repository.stock.dao.StockFile;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DividendSaveService {

    private final StockFileRepository stockFileRepository;

    public void saveStocks(StockFile stockFile) throws IOException {
        stockFileRepository.saveStocks(stockFile);
    }

    public void addStocks(StockFile stockFile) throws IOException {
        List<Stock> currentStocks = stockFileRepository.getStocksFromFile();
        List<Stock> newStocks = stockFile.getStocks();

        for (Stock stock : newStocks) {
            boolean stockExists = currentStocks.stream()
                    .anyMatch(currentStock -> Objects.equals(currentStock.getTicker(), stock.getTicker()));

            if (!stockExists) {
                currentStocks.add(stock);
            }
        }

        StockFile newFile = StockFile.builder().stocks(currentStocks).build();
        stockFileRepository.saveStocks(newFile);
    }

}
