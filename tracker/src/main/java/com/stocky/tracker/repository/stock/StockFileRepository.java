package com.stocky.tracker.repository.stock;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Scanner;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocky.tracker.entity.stock.Stock;
import com.stocky.tracker.repository.stock.dao.StockFile;

@Repository
public class StockFileRepository {

    public static String getFileContent(InputStream fis, String encoding) throws IOException {
        try (Scanner s = new Scanner(fis).useDelimiter("\\A")) {
            return s.hasNext() ? s.next() : "";
        }
    }

    public List<Stock> getStocksFromFile() throws IOException {
        InputStream inputStream = new ClassPathResource("json/stocks.json").getInputStream();
        String data = getFileContent(inputStream, StandardCharsets.UTF_8.name());

        ObjectMapper objectMapper = new ObjectMapper();
        StockFile parsedFile = objectMapper.readValue(data, StockFile.class);
        return parsedFile.getStocks();
    }

}
