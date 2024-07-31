package com.stocky.tracker.adapter.externalApi;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stocky.tracker.adapter.externalApi.dto.dividend.DividendInformation;
import com.stocky.tracker.adapter.externalApi.mapper.dividend.CalendarMapper;
import com.stocky.tracker.entity.calendar.Calendar;
import com.stocky.tracker.usecase.port.DividendApi;

public class PolygonDividendApi implements DividendApi {

    private String apiKey;
    private CalendarMapper calendarMapper;

    public PolygonDividendApi(String apiKey, CalendarMapper calendarMapper) {
        this.apiKey = apiKey;
        this.calendarMapper = calendarMapper;
    }

    private DividendInformation callApi(HttpRequest request) throws IOException, InterruptedException {
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();

        ObjectMapper objectMapper = JsonMapper.builder()
                .addModule(new JavaTimeModule())
                .build();
        return objectMapper.readValue(responseBody, new TypeReference<DividendInformation>() {
        });
    }

    public Calendar getDividendInformation(String ticker, String startDate) {
        // TODO: better way to build URI?
        String uriString = new StringBuilder()
                .append("https://api.polygon.io/v3/reference/dividends")
                .append("?ticker=")
                .append(ticker)
                .append("&limit=")
                .append(12)
                .append("&apiKey=")
                .append(apiKey)
                .toString();
        URI uri = URI.create(uriString);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .header("X-RapidAPI-Host", "jokes-by-api-ninjas.p.rapidapi.com")
                .header("X-RapidAPI-Key", "your-rapidapi-key")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        try {
            DividendInformation result = callApi(request);
            return calendarMapper.mapFromDividendInformation(ticker, result);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return null;
    }

}
