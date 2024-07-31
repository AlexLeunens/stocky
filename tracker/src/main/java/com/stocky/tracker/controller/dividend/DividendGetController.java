package com.stocky.tracker.controller.dividend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.stocky.tracker.service.dividend.DividendGetService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "dividend")
public class DividendGetController {

    private final DividendGetService dividendGetService;

    @GetMapping("/calendar")
    public SseEmitter streamStocksDividends(@RequestParam String[] tickers, @RequestParam String startDate) {
        return dividendGetService.fetchAndReturnDividends(tickers, startDate);
    }

}
