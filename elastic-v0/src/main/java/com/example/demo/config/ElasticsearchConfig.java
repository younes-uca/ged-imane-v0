package com.example.demo.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;


import java.time.Duration;


@Slf4j
@Configuration
public class ElasticsearchConfig extends ElasticsearchConfiguration {
    @Value("${elasticsearch.hostname}")
    String hostName;
    @Value("${elasticsearch.port}")
    Integer port;

    @Bean
    public RestHighLevelClient elasticsearchClient2(
            @Value("${elasticsearch.hostname}") String hostName,  @Value("${elasticsearch.port}") Integer port) {
        log.info("elastic : host {}, port : {}", hostName, port);
        return new RestHighLevelClient(RestClient.builder(new HttpHost(hostName, port, "http")));
    }

    @Override
    public ClientConfiguration clientConfiguration() {
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(hostName+":"+port)
                .withConnectTimeout(Duration.ofSeconds(5))
                .withSocketTimeout(Duration.ofSeconds(3))
                .build();
        return clientConfiguration;
    }
}
