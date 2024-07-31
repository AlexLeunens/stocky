package com.stocky.tracker.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class ApiConfiguration {
    
    @Value("${apiKey}")
    public String apiKey;

}
