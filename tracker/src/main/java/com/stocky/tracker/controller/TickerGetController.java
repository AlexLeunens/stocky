package com.stocky.tracker.controller;

import org.springframework.web.bind.annotation.RestController;

import com.stocky.tracker.entity.TickerInformation;
import com.stocky.tracker.service.TickerGetService;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@AllArgsConstructor
@RequestMapping(path = "ticker")
public class TickerGetController {

    private final TickerGetService tickerGetService;

    @GetMapping("/information")
    public ResponseEntity<TickerInformation> getTickerInfos(@RequestParam String ticker) {
        TickerInformation result = tickerGetService.getTickerInfos(ticker);
        return ResponseEntity.ok(result);
    }

}
