package com.example.demo.service;

import com.example.demo.model.DocumentFile;
import com.example.demo.model.MultiCriteriaSearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.erhlc.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class SearchService extends  AbstractService {

     private final ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    public SearchService(RestHighLevelClient elasticsearchClient) {
        this.elasticsearchRestTemplate = new ElasticsearchRestTemplate(elasticsearchClient);
    }




// ... Ajoutez des surcharges pour d'autres types de champs si nécessaire ...

    public SearchHits<DocumentFile> searchDocuments(MultiCriteriaSearchRequest searchRequest) {
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        addMatchQuery(boolQuery, "title", searchRequest.getTitle());
        addMatchQuery(boolQuery, "referenceGed", searchRequest.getReferenceGed());
        addMatchQuery(boolQuery, "reference", searchRequest.getReference());
        addMatchQuery(boolQuery, "uploadDate", searchRequest.getUploadDate());
        addMatchQuery(boolQuery, "dateLastUpdate", searchRequest.getDateLastUpdate());
        addMatchQuery(boolQuery, "folder", searchRequest.getFolder());
        addMatchQuery(boolQuery, "size", searchRequest.getSize());
        addMatchQuery(boolQuery, "content", searchRequest.getContent());
        addMatchQuery(boolQuery, "format", searchRequest.getFormat());
        addMatchQuery(boolQuery, "description", searchRequest.getDescription());
        addMatchQuery(boolQuery, "author", searchRequest.getAuthor());

        return elasticsearchRestTemplate.search(new NativeSearchQueryBuilder()
                .withQuery(boolQuery)
                .build(), DocumentFile.class);
    }
}