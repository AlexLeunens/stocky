package com.stocky.tracker.configuration;

import org.springframework.beans.factory.annotation.Value;

public class ApiConfiguration {
    
    @Value("${apiKey}")
    public static String API_KEY;

}
