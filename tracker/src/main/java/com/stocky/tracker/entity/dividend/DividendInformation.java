package com.stocky.tracker.entity.dividend;

import lombok.Getter;

@Getter
public class DividendInformation {
    private DividendInformationResults[] results;
    private String status;
    private String requestID;
    private String nextURL;
}
