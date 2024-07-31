package com.spring.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.stocky.tracker.adapter.controller.DividendController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "dividend")
public class DividendGetController {

    private final DividendController controller;

    @GetMapping("/calendar")
    public SseEmitter streamStocksDividends(@RequestParam String[] tickers, @RequestParam String startDate) {
        // TODO: interface until i make an abstract substitute
        return (SseEmitter) controller.streamStocksDividends(tickers, startDate);
    }

}
