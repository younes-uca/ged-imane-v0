package com.example.demo.ws;

import com.example.demo.model.DocumentFile;
import com.example.demo.model.MultiCriteriaSearchRequest;
import com.example.demo.service.DocumentGenerator;
import com.example.demo.service.DocumentService;
import com.example.demo.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.demo.service.DocumentGenerator.initializeFormatContentMap;

@RestController
@RequestMapping("/api/elastic")
public class DocumentController {
    @Autowired
    private DocumentService documentService;
    @Autowired
    private SearchService searchService;
    @Autowired
    private DocumentGenerator documentGenerator;

    @PostMapping(value = "/indexer")
    public ResponseEntity<String> indexDocument(@RequestBody DocumentFile document) {
        if (document == null) {
            return new ResponseEntity<>("Please select a file.", HttpStatus.BAD_REQUEST);
        }

        try {
            documentService.indexDocument(document);
            return new ResponseEntity<>("Document indexed successfully.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred during document indexing.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/generate")
    public ResponseEntity<String> generateDocs() {
        try {
            initializeFormatContentMap();
            documentGenerator.generateDocuments(1000);
            return new ResponseEntity<>("Document generated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred during document generation.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/search")
    public ResponseEntity<SearchHits<DocumentFile>> searchDocuments(@RequestBody MultiCriteriaSearchRequest searchRequest) {
        org.springframework.data.elasticsearch.core.SearchHits<DocumentFile> searchHits = searchService.searchDocuments(searchRequest);
        return ResponseEntity.ok(searchHits);
    }


}






