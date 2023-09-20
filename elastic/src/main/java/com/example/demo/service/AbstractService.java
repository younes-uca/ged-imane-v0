package com.example.demo.service;

import co.elastic.clients.elasticsearch.core.MsearchRequest;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.time.LocalDate;

public class AbstractService  {
    protected void addMatchQuery(BoolQueryBuilder boolQuery, String fieldName, LocalDate value) {
        if (value != null) {
            boolQuery.must(QueryBuilders.matchQuery(fieldName, value));
        }
    }
    protected void addMatchQuery(BoolQueryBuilder boolQuery, String fieldName, String value) {
        if (value != null) {
            boolQuery.must(QueryBuilders.matchQuery(fieldName, value));
        }
    }
    protected void addMatchQuery(BoolQueryBuilder boolQuery, String fieldName, Double value) {
        if (value != null) {
            boolQuery.must(QueryBuilders.matchQuery(fieldName, value));
        }
    }
    protected void addMatchQuery(BoolQueryBuilder boolQuery, String fieldName, Boolean value) {
        if (value != null) {
            boolQuery.must(QueryBuilders.matchQuery(fieldName, value));
        }
    }
}
