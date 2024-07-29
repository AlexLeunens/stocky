package com.stocky.tracker.entity;

import lombok.Getter;

@Getter
public class TickerInformationResults {
    private String ticker;
    private String name;
    private String market;
    private String locale;
    private String primary_exchange;
    private String type;
    private boolean active;
    private String currency_name;
    private String cik;
    private String composite_figi;
    private String share_class_figi;
    private float market_cap;
    private String phone_number;
    TickerInformationAddress address;
    private String description;
    private String sic_code;
    private String sic_description;
    private String ticker_root;
    private String homepage_url;
    private float total_employees;
    private String list_date;
    TickerInformationBranding branding;
    private float share_class_shares_outstanding;
    private float weighted_shares_outstanding;
    private float round_lot;
}
