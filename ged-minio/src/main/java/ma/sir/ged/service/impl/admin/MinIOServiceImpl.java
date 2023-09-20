package ma.sir.ged.service.impl.admin;

import io.minio.*;
import io.minio.http.Method;
import io.minio.messages.*;
import ma.sir.ged.config.MinioConfig;
import ma.sir.ged.dto.FichierDTO;
import ma.sir.ged.exceptions.BucketNotFoundException;
import ma.sir.ged.exceptions.FichierNotFoundException;
import ma.sir.ged.exceptions.MinioException;
import ma.sir.ged.model.Fichier;
import ma.sir.ged.service.facade.admin.MinIOService;
import ma.sir.ged.zynerator.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class MinIOServiceImpl implements MinIOService {

    @Autowired
    private MinioClient minioClient;
    @Autowired
    private FichierService fichierService;


    @Override
    public Boolean bucketExists(String name) {
        try {
            return minioClient.bucketExists(BucketExistsArgs.builder().bucket(name).build());
        } catch (Exception e) {
            throw new MinioException("Error while checking if the bucket "+name+" exists, error : "+e.getMessage());
        }
    }

    @Override
    public int saveBucket(String bucket) {
        if (bucketExists(bucket))
            return 0;
        try {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
            VersioningConfiguration config = new VersioningConfiguration(VersioningConfiguration.Status.ENABLED, false);
            minioClient.setBucketVersioning(SetBucketVersioningArgs.builder().bucket(bucket).config(config).build());
            return 1;
        } catch (Exception e) {
            throw new MinioException("Error while creating the bucket "+bucket+" , error : "+e.getMessage());
        }

    }

    @Override
    public String createDirectory(String bucket, String path) {
        if (Boolean.FALSE.equals(bucketExists(bucket))){
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        }
        try {

            ObjectWriteResponse objectWriteResponse = minioClient.putObject(
                    PutObjectArgs.builder().bucket(bucket).object(path+"/created").stream(
                            new ByteArrayInputStream(new byte[]{}), 0, -1).build()
            );
            return fichierService.extractFilePath(objectWriteResponse.object());
        } catch (Exception e) {
            throw new MinioException("Error while creating a new directory in the bucket : "+bucket+", for the path : "+ path+" , error : "+e.getMessage());
        }
    }


    @Override
    public FichierDTO upload(MultipartFile file) {
        return this.upload(file, MinioConfig.getBucketName(), null);
    }
    @Override
    public FichierDTO upload(MultipartFile file, String bucket){
        return this.uploadToPath(file, bucket, null);
    }
    public FichierDTO upload(MultipartFile file, String bucket, String path){
        return this.uploadToPath(file, bucket, path);
    }
    @Override
    public FichierDTO upload(MultipartFile file, String bucket, String superior, String entity) {
        Calendar now = Calendar.getInstance();
        String path= superior+"/"+entity+"/"+now.get(Calendar.YEAR)+"/"+now.get(Calendar.MONTH)+"/"+now.get(Calendar.DAY_OF_MONTH);
        return this.upload(file, bucket, path);
    }



    @Override
    public List<String> findAllDocuments(String bucket) {
        List<String> documents = new ArrayList<>();
        if (Boolean.FALSE.equals(bucketExists(bucket))){
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        }
        try {
            Iterable<Result<Item>> results = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucket).recursive(true).build());
            for (Result<Item> result : results) {
                Item item = result.get();
                documents.add(item.objectName());
            }
        } catch (Exception e) {
            throw new MinioException("Error while fetching files form the bucket "+bucket+", error : "+e.getMessage());
        }
        return documents;
    }

    @Override
    public List<FichierDTO> findAllDocumentsDTO(String bucket, String path) {
        List<FichierDTO> documents = new ArrayList<>();
        if (Boolean.FALSE.equals( bucketExists(bucket)))
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        try {
            Iterable<Result<Item>> results = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucket).recursive(true).build());
            for (Result<Item> result : results) {
                Item item = result.get();
                documents.add(buildFichierDTOFromItem(bucket, item));
            }
        } catch (Exception e) {
            throw new MinioException("Error while fetching files form the bucket "+bucket+", error : "+e.getMessage());
        }
        return documents;
    }

    @Override
    public List<String> findAllDocuments(String bucket, String path) {
        List<String> documents = new ArrayList<>();
        if (Boolean.FALSE.equals( bucketExists(bucket)))
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        try {
            Iterable<Result<Item>> results = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucket).prefix(path).build());
            for (Result<Item> result : results) {
                Item item = result.get();
                documents.add(item.objectName());
            }
        } catch (Exception e) {
            throw new MinioException("Error while fetching files form the bucket "+bucket+", error : "+e.getMessage());
        }
        return documents;
    }


    @Override
    public byte[] downloadAllDocumentsAsZip(String bucket) {
        if (Boolean.FALSE.equals(bucketExists(bucket))){
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        }
        try {
            List<String> documentNames = findAllDocuments(bucket);
            // Create a byte array output stream to hold the zip data
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream zipOut = new ZipOutputStream(baos);
            // Buffer for reading data
            byte[] buffer = new byte[8192];

            // Loop through each document and add it to the zip
            for (String documentName : documentNames) {
                // Get the document object from MinIO
                GetObjectResponse response = minioClient.getObject(
                        GetObjectArgs.builder()
                                .bucket(bucket)
                                .object(documentName)
                                .build()
                );
                // Get the input stream containing the document data
                InputStream documentStream = response;
                // Create a new entry in the zip for the document
                ZipEntry zipEntry = new ZipEntry(documentName);
                zipOut.putNextEntry(zipEntry);
                // Write the document data to the zip
                int bytesRead;
                while ((bytesRead = documentStream.read(buffer)) != -1) {
                    zipOut.write(buffer, 0, bytesRead);
                }
                // Close the entry for the document
                zipOut.closeEntry();
                // Close the input stream for the current document
                documentStream.close();
            }

            // Close the zip output stream
            zipOut.close();
            // Return the zip data as a byte array
            return baos.toByteArray();
            } catch (Exception e) {
                throw new MinioException("Error while preparing all files in the bucket "+bucket+" to be downloaded, error : "+e.getMessage());
            }

    }
    @Override
    public byte[] downloadAllDocumentsAsZip(String bucket, String path) {
        if (Boolean.FALSE.equals(bucketExists(bucket))){
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        }
        try {
            List<String> documentNames = findAllDocuments(bucket, path);
            // Create a byte array output stream to hold the zip data
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream zipOut = new ZipOutputStream(baos);
            // Buffer for reading data
            byte[] buffer = new byte[8192];

            // Loop through each document and add it to the zip
            for (String documentName : documentNames) {
                // Get the document object from MinIO
                GetObjectResponse response = minioClient.getObject(
                        GetObjectArgs.builder()
                                .bucket(bucket)
                                .object(documentName)
                                .build()
                );
                // Get the input stream containing the document data
                InputStream documentStream = response;
                // Create a new entry in the zip for the document
                ZipEntry zipEntry = new ZipEntry(documentName);
                zipOut.putNextEntry(zipEntry);
                // Write the document data to the zip
                int bytesRead;
                while ((bytesRead = documentStream.read(buffer)) != -1) {
                    zipOut.write(buffer, 0, bytesRead);
                }
                // Close the entry for the document
                zipOut.closeEntry();
                // Close the input stream for the current document
                documentStream.close();
            }

            // Close the zip output stream
            zipOut.close();
            // Return the zip data as a byte array
            return baos.toByteArray();
            } catch (Exception e) {
                throw new MinioException("Error while preparing all files in the bucket "+bucket+" with the path "+path+" to be downloaded, error : "+e.getMessage());
            }

    }



    @Override
    public String generateShareLink(Long fichierId, Integer days, Integer hours, Integer minutes, Integer seconds) {
        Fichier fichier = fichierService.findFichierById(fichierId)
                .orElseThrow(() -> new FichierNotFoundException("No fichier found having the id "+ fichierId));
        int duration = (seconds + minutes*60 + hours*3600 + days*3600*24);
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .bucket(fichier.getBucket())
                            .object(fichier.getFullPath())
                            .expiry(duration, TimeUnit.SECONDS)
                            .versionId(fichier.getLatestVersion().getVersionId())
                            .method(Method.GET)
                            .build());
        }catch (Exception e){
          throw new MinioException("Minio Error: Can not generate a share link to the file ( id = "+fichierId+") , error : "+e.getMessage());
        }
    }

    @Override
    public FichierDTO restoreToSpecificVersion(Long fichierId, String versionId) {
        Fichier fichier = fichierService.findFichierById(fichierId)
                .orElseThrow(() -> new FichierNotFoundException("No fichier found having the id "+ fichierId));
        try{
            // Download the wanted version
            GetObjectResponse objectResponse = minioClient.getObject(GetObjectArgs.builder()
                    .bucket(fichier.getBucket())
                    .object(fichier.getFullPath())
                    .versionId(versionId)
                    .build());
            InputStream inputStream = objectResponse;
            // upload the wanted version
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(fichier.getBucket())
                    .object(fichier.getFullPath())
                    .stream(inputStream, inputStream.available(), -1)
                    .build());
            List<String> allVersionsAbove = fichierService.getAllVersionsAbove(fichier, versionId);
            Fichier finalFichier = fichier;
            allVersionsAbove.forEach(vr -> deleteObjectByVersionId(finalFichier, vr));
            fichier = fichierService.deleteVersionsAbove(fichier, versionId );
            return fichierService.toDTO(fichierService.save(fichier));
        }catch (Exception e){
            throw new MinioException("Minio Error : while restoring the file ( id = "+ fichierId+" ) to the version :  "+ versionId+", error : "+ e.getMessage() ) ;
        }
    }

    public byte[] downloadFileById(Long fichierId, String versionId) {
        Fichier fichier = fichierService.findFichierById(fichierId).orElseThrow(() -> new RuntimeException("No file found with the id " + fichierId));
        try {
            GetObjectResponse response = minioClient.getObject(
                            GetObjectArgs.builder()
                            .bucket(fichier.getBucket())
                            .object(fichier.getFullPath())
                            .versionId(StringUtil.isNotEmpty(versionId) ? versionId : fichier.getLatestVersion().getVersionId())
                            .build());
            InputStream inputStream = response;
            byte[] fileBytes = readAllBytes(inputStream);
            return fileBytes;
        } catch (Exception e) {
            throw new RuntimeException("Error downloading file from MinIO: " + e.getMessage(), e);
        }
    }

    public byte[] readAllBytes(InputStream inputStream) throws IOException {
        try (ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
            int nRead;
            byte[] data = new byte[16384]; // You can adjust the buffer size as needed

            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }

            return buffer.toByteArray();
        }
    }


    public void deleteObjectByVersionId(final Fichier fichier, String versionId){
        RemoveObjectArgs removeObjectArgs = RemoveObjectArgs.builder()
                .bucket(fichier.getBucket())
                .object(fichier.getFullPath())
                .versionId(versionId)
                .build();
        try {
            minioClient.removeObject(removeObjectArgs);
        }catch (Exception e){
            throw new MinioException("Minio Error : whiling the deleting the file ( "+ fichier.getFullPath()+" ), error : "+e.getMessage());
        }
    }




    private FichierDTO uploadToPath(MultipartFile file, String bucket, String path) {
        if(Boolean.FALSE.equals(bucketExists(bucket))){
            throw new BucketNotFoundException("the bucket "+bucket+" does not exist");
        }

        try {
            ObjectWriteResponse response = minioClient.putObject(
                    PutObjectArgs.builder().bucket(bucket)
                            .object(path+"/"+file.getOriginalFilename())
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
            return fichierService.saveFichier(bucket ,response.object(), response.versionId());
        } catch (Exception e) {
            throw new MinioException("Minio Error : while uploading the file to the bucket "+bucket+", into the path : "+path);
        }
    }

    private FichierDTO buildFichierDTOFromItem(String bucket, Item item){
        FichierDTO dto = new FichierDTO();
        dto.setBucket(bucket);
        dto.setName(fichierService.extractFileName(item.objectName()));
        dto.setPath(fichierService.extractFilePath(item.objectName()));
        return dto;
    }
}
