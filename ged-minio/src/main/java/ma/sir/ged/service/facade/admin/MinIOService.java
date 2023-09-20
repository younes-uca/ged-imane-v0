package ma.sir.ged.service.facade.admin;

import ma.sir.ged.dto.FichierDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MinIOService {

    Boolean bucketExists(String bucket);
    int saveBucket(String bucket);


    String createDirectory(String bucket, String path);

    FichierDTO upload(MultipartFile file);
    FichierDTO upload(MultipartFile file, String bucket);
    FichierDTO upload(MultipartFile file, String bucket, String path);
    FichierDTO upload(MultipartFile file, String bucket, String superior, String entity);

    List<String> findAllDocuments(String bucket);
    List<String> findAllDocuments(String bucket, String path);
    List<FichierDTO> findAllDocumentsDTO(String bucket, String path);


    byte[] downloadFileById(Long fichierId, String versionId);
    byte[] downloadAllDocumentsAsZip(String bucket);
    byte[] downloadAllDocumentsAsZip(String bucket, String path);


    String generateShareLink(Long fichierId, Integer days, Integer hours, Integer minutes, Integer seconds);
    FichierDTO restoreToSpecificVersion(Long fichierId, String versionId);
}
