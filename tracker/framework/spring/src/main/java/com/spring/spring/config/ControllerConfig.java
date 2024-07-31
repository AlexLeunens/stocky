package com.spring.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.stocky.tracker.adapter.controller.DividendController;
import com.stocky.tracker.adapter.externalApi.SseManager;
import com.stocky.tracker.usecase.GetDividends;

@Configuration
public class ControllerConfig {

    // we instantiate beans from the adapter layer for Spring's CDI
    // TODO: find a better way to register beans?

    @Bean
    public DividendController dividendController(SseManager sseManager) {
        GetDividends getDividends = new GetDividends(sseManager);
        return new DividendController(getDividends);
    }

}
