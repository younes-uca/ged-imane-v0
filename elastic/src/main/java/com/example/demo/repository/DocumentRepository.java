package com.example.demo.repository;

import com.example.demo.model.DocumentFile;
import com.example.demo.model.MultiCriteriaSearchRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DocumentRepository extends ElasticsearchRepository<DocumentFile, String> {
    List<DocumentFile> findByDescription(String description);
    List<DocumentFile> findByReferenceGed(String reference);
    List<DocumentFile> findByUploadDate(LocalDateTime uploadDate);
    List<DocumentFile> findByContent(String content);
    //List<DocumentFile> findBySize(BigDecimal size);
    List<DocumentFile> findByFolder(Boolean folder);
    List<DocumentFile> findByDateLastUpdate(LocalDateTime uploadDate);
    List<DocumentFile> findByTitleAndReferenceGedAndReferenceAndUploadDateBetweenAndFolderAndSize(
            String title,
            String referenceGed,
            String reference,
            LocalDateTime startUploadDate,
            LocalDateTime endUploadDate,
            Boolean folder,
            BigDecimal size
    );

}