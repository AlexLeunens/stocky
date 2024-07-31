package com.spring.spring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.spring.spring.externalApi.SpringSseManager;
import com.stocky.tracker.adapter.externalApi.PolygonDividendApi;
import com.stocky.tracker.adapter.externalApi.SseManager;
import com.stocky.tracker.adapter.externalApi.mapper.dividend.CalendarMapper;
import com.stocky.tracker.usecase.port.DividendApi;

@Configuration
public class ApiConfig {

    @Value("${apiKey}")
    public String apiKey;

    @Bean
    public DividendApi dividendApi() {
        return new PolygonDividendApi(apiKey, new CalendarMapper());
    }

    @Bean
    public SseManager sseManager(DividendApi dividendApi) {
        return new SpringSseManager(dividendApi);
    }

}
