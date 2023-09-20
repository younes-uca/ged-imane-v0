package com.example.demo.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.erhlc.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.client.erhlc.RestClients;


@Configuration
public class ElasticsearchConfig {

    @Bean
    public RestHighLevelClient elasticsearchClient() {
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200") // Update with your Elasticsearch host and port
                .build();

        return RestClients.create(clientConfiguration).rest();
    }
    @Bean
    public RestHighLevelClient elasticsearchClient2() {
        return new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
    }
}
