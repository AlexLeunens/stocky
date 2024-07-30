package com.stocky.tracker.entity.dividend;

import lombok.Getter;

@Getter
public class DividendInformation {
    private DividendInformationResults[] results;
    private String status;
    private String request_id;
    private String next_url;
}
