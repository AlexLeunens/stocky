package com.stocky.tracker.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class PersistenceConfiguration {
    @Value("${persistenceFileLocation}")
    public String persistenceFileLocation;
}
