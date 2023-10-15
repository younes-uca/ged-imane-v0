package com.example.demo.service;

import com.example.demo.model.DocumentFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Random;
import java.util.HashMap;

@Service
public class DocumentGenerator {
    @Autowired
    private DocumentService documentService;

    private static final String[] FORMATS = {"png", "jpeg", "pdf", "word", "excel", "powerpoint"};
    private static final String[] AUTHORS = {"Author A", "Author B", "Author C", "Author D"};

    private static final HashMap<String, String> FORMAT_CONTENT_MAP = new HashMap<>();

    private static Random random = new Random();

    public static void initializeFormatContentMap() {
        FORMAT_CONTENT_MAP.put("png", "PNG image content");
        FORMAT_CONTENT_MAP.put("jpeg", "JPEG image content");
        FORMAT_CONTENT_MAP.put("pdf", "PDF content");
        FORMAT_CONTENT_MAP.put("word", "Word document content");
        FORMAT_CONTENT_MAP.put("excel", "Excel document content");
        FORMAT_CONTENT_MAP.put("powerpoint", "PowerPoint presentation content");
    }

    public void generateDocuments(int count) throws IOException {

        for (int i = 0; i < count; i++) {
            DocumentFile document = new DocumentFile();
            document.setFormat(getRandomFormat());
            document.setContent(getRandomContent(document.getFormat()));
            document.setAuthor(getRandomAuthor());
            documentService.indexDocument(document);
        }

    }

    private static String getRandomFormat() {
        int index = random.nextInt(FORMATS.length);
        return FORMATS[index];
    }

    private static String getRandomContent(String format) {
        return FORMAT_CONTENT_MAP.getOrDefault(format, "Unknown format content");
    }

    private static String getRandomAuthor() {
        int index = random.nextInt(AUTHORS.length);
        return AUTHORS[index];
    }
}

