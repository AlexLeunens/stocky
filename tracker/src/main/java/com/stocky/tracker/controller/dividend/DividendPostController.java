package com.stocky.tracker.controller.dividend;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stocky.tracker.repository.stock.dao.StockFile;
import com.stocky.tracker.service.dividend.DividendSaveService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "dividend")
public class DividendPostController {

    private final DividendSaveService dividendSaveService;

    @PostMapping("/list")
    public ResponseEntity<Void> saveStocks(@RequestBody StockFile stockFile) throws IOException {
        dividendSaveService.saveStocks(stockFile);
        return ResponseEntity.ok().build();
    }

}
