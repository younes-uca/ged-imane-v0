package com.example.demo.model;

import com.example.demo.config.LocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MultiCriteriaSearchRequest {
    private String title;
    private String referenceGed;
    private String content;
    private String author;
    private String description;

    private String reference;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)

    private LocalDate uploadDate;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDate dateLastUpdate;
    private Boolean folder;
    private Double size;

    private String format;

}




