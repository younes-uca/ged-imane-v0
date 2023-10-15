package com.example.demo.service;

import com.example.demo.criteria.DocumentCriteria;
import com.example.demo.model.DocumentFile;
import com.example.demo.repository.DocumentRepository;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.erhlc.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
public class DocumentService extends AbstractService {

    private DocumentRepository documentRepository;
    private final ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    public DocumentService(RestHighLevelClient elasticsearchClient, DocumentRepository documentRepository) {
        this.elasticsearchRestTemplate = new ElasticsearchRestTemplate(elasticsearchClient);
        this.documentRepository = documentRepository;
    }


    public SearchHits<DocumentFile> searchDocuments(DocumentCriteria criteria) {
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();


        addPredicate(boolQuery, "reference", criteria.getReference(), criteria.getReferenceLike());
        addPredicate(boolQuery, "referenceGed", criteria.getReferenceGed(), criteria.getReferenceGedLike());
        addPredicate(boolQuery, "uploadDate", criteria.getUploadDate(), criteria.getUploadDateFrom(), criteria.getUploadDateTo());
        addPredicateLong(boolQuery, "annee", criteria.getAnnee(), criteria.getAnneeMin(), criteria.getAnneeMax());
        addPredicateLong(boolQuery, "semstre", criteria.getSemstre(), criteria.getSemstreMin(), criteria.getSemstreMax());
        addPredicateLong(boolQuery, "mois", criteria.getMois(), criteria.getMoisMin(), criteria.getMoisMax());
        addPredicateLong(boolQuery, "jour", criteria.getJour(), criteria.getJourMin(), criteria.getJourMax());
        addPredicateBool(boolQuery, "ocr", criteria.getOcr());
        addPredicateLong(boolQuery, "size", criteria.getSize(), criteria.getSizeMin(), criteria.getSizeMax());
        addPredicateBool(boolQuery, "archive", criteria.getArchive());
        addPredicateBool(boolQuery, "versionne", criteria.getVersionne());

        addPredicateFk(boolQuery, "documentType", criteria.getDocumentType());
        addPredicateFk(boolQuery, "documentState", criteria.getDocumentState());
        addPredicateFk(boolQuery, "documentCategorie", criteria.getDocumentCategorie());
        addPredicateFk(boolQuery, "utilisateur", criteria.getUtilisateur());
        addPredicateFk(boolQuery, "entiteAdministrative", criteria.getEntiteAdministrative());
        addPredicateFk(boolQuery, "documentCategorieModel", criteria.getDocumentCategorieModel());


        return elasticsearchRestTemplate.search(new NativeSearchQueryBuilder()
                .withQuery(boolQuery)
                .build(), DocumentFile.class);
    }


    public String extractTextFromDocument(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            BodyContentHandler handler = new BodyContentHandler();
            Metadata metadata = new Metadata();
            Parser parser = new AutoDetectParser();
            ParseContext parseContext = new ParseContext();
            parser.parse(inputStream, handler, metadata, parseContext);
            return handler.toString();
        } catch (Exception e) {
            // Handle extraction errors
            e.printStackTrace();
            return null;
        }
    }

    public void indexDocument(DocumentFile document) throws IOException {
        //  String content = extractTextFromDocument(file);
        if (document != null) {
            // document.setContent(content);
            documentRepository.save(document);
        }
    }
}
