package com.spring.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.stocky.tracker.adapter.controller.DividendController;
import com.stocky.tracker.usecase.GetDividends;
import com.stocky.tracker.usecase.port.DividendApi;

@Configuration
public class ControllerConfig {

    // we instantiate beans from the adapter layer for Spring's CDI
    // TODO: find a better way to register beans?

    @Bean
    public DividendController dividendController(DividendApi dividendApi) {
        GetDividends getDividends = new GetDividends(dividendApi);
        return new DividendController(getDividends);
    }

}
