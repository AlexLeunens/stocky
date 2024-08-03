package com.stocky.tracker.repository.stock;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Scanner;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.stocky.tracker.configuration.PersistenceConfiguration;
import com.stocky.tracker.entity.stock.Stock;
import com.stocky.tracker.repository.stock.dao.StockFile;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StockFileRepository {

    private final PersistenceConfiguration persistenceConfiguration;

    public static String getFileContent(InputStream fis, String encoding) throws IOException {
        try (Scanner s = new Scanner(fis).useDelimiter("\\A")) {
            return s.hasNext() ? s.next() : "";
        }
    }

    public List<Stock> getStocksFromFile() throws IOException {
        String fileLocation = persistenceConfiguration.getPersistenceFileLocation();
        File file = new File(fileLocation);
        InputStream inputStream = new FileInputStream(file);

        // InputStream inputStream = new ClassPathResource(fileLocation).getInputStream();
        String data = getFileContent(inputStream, StandardCharsets.UTF_8.name());

        ObjectMapper objectMapper = new ObjectMapper();
        StockFile parsedFile = objectMapper.readValue(data, StockFile.class);
        return parsedFile.getStocks();
    }

    public void saveStocks(StockFile stockFile) throws IOException {
        String fileLocation = persistenceConfiguration.getPersistenceFileLocation();
        ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = objectWriter.writeValueAsString(stockFile);

        // File file = new ClassPathResource(fileLocation).getFile();
        File file = new File(fileLocation);
        BufferedWriter writer = new BufferedWriter(new FileWriter(file));
        writer.write(json);
        writer.close();
    }

}
