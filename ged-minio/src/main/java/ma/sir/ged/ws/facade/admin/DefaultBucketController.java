package ma.sir.ged.ws.facade.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import ma.sir.ged.dto.FichierDTO;
import ma.sir.ged.model.Fichier;
import ma.sir.ged.service.facade.admin.MinIOService;
import ma.sir.ged.service.impl.admin.FichierService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${minio.default.bucket}")
public class DefaultBucketController {

    @Value("${minio.default.bucket}")
    private String BUCKET ;

    @Autowired
    private MinIOService minIOService;

    @Autowired
    private FichierService fichierService;

    @Operation(summary = "Check if bucket exists or not")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Check if bucket exits or not.",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class)) })})
    @GetMapping("/exists")
    public Boolean bucketExists() {
        return minIOService.bucketExists(BUCKET);
    }

    @GetMapping("/file/{id}")
    @Operation(summary = "Find the file by its id ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Find a file by its id",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class)) })})
    public FichierDTO findFichierById(@PathVariable("id") Long id) {
        return fichierService.toDTO(fichierService.findFichierById(id).orElseThrow(()-> new RuntimeException("No fichier found with the id "+id)));
    }


    @GetMapping("/file/download/{id}")
    @Operation(summary = "Download the file by its id ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Find a file by its id",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Byte.class)) })})
    public  ResponseEntity<byte[]> downloadFichierById(@PathVariable("id") Long id, @RequestParam(value = "versionId", required = false) String versionId) {
        Fichier fichier = fichierService.findFichierById(id).orElseThrow(() -> new RuntimeException("No fichier found with the id " + id));
        byte[] data = minIOService.downloadFileById(id, versionId);
        if (data != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", fichierService.extractFileName(fichier.getFullPath()));
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @Operation(summary = "Upload a file to the default bucket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Upload a file to the default bucket",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = FichierDTO.class)) })})
    @PostMapping("/upload")
    public FichierDTO upload(@RequestParam("file") MultipartFile file) {
        return minIOService.upload(file, BUCKET);
    }

    @Operation(summary = "Upload a file to the default bucket with specific path")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Upload a file to the default bucket with a defined path",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = FichierDTO.class)) })})
    @PostMapping("/upload-file-with-path")
    public FichierDTO upload(@RequestParam("file") MultipartFile file, @RequestParam("path") String path) {
        return minIOService.upload(file, BUCKET, path);
    }

    @Operation(summary = "Upload a file to the default bucket with the hierarchy structure")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Upload a file to the default bucket with the hierarchy structure superior/entity/year/month/day/",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = FichierDTO.class)) })})
    @PostMapping("/upload-structured-file")
    public FichierDTO upload(@RequestParam("file") MultipartFile file, @RequestParam("superior") String superior, @RequestParam("entity") String entity) {
        return minIOService.upload(file, BUCKET, superior, entity);
    }


    @Operation(summary = "List all files of a bucket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List all the files of a bucket",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = FichierDTO.class)) })})
    @GetMapping("/content")
    public List<FichierDTO> findAllDocuments(@PathVariable(required = false) String path) {
        return minIOService.findAllDocumentsDTO(BUCKET, path);
    }


    @Operation(summary = "Download all files of the default bucket as a zip file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Donwload all files of the default bucket as a single zip file",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Byte.class)) })})
    @GetMapping(value = "/downloadAll", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> downloadAllDocumentsAsZip(@RequestParam(name ="path", required = false) String path) {
        byte[] zipData = (StringUtils.isNoneBlank(path)) ?
                minIOService.downloadAllDocumentsAsZip(BUCKET, path) :
                minIOService.downloadAllDocumentsAsZip(BUCKET);
        if (zipData != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", "all_documents.zip");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return new ResponseEntity<>(zipData, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/create-directory")
    @Operation(summary = "Create a new directory inside a bucket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "create a new directory inside a bucket",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Integer.class)) })})
    public String saveBucket(@RequestParam("directoryPath") String path) {
        return minIOService.createDirectory(BUCKET, path);
    }

    @PostMapping("/generate-share-link")
    @Operation(summary = "Generate a share link for a file ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "create a new directory inside a bucket",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)) })})
    public String generateShareLink(@RequestParam("id") Long id,
                                    @RequestParam("days") Integer days,
                                    @RequestParam("hours") Integer hours,
                                    @RequestParam("minutes") Integer minutes,
                                    @RequestParam("seconds") Integer seconds ) {
        return minIOService.generateShareLink(id, days, hours, minutes, seconds);
    }

    @PostMapping("/restore")
    @Operation(summary = "Generate a share link for a file ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "create a new directory inside a bucket",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = FichierDTO.class)) })})
    public FichierDTO generateShareLink(@RequestParam("id") Long id,
                                    @RequestParam("versionId") String  versionId) {
        return minIOService.restoreToSpecificVersion(id, versionId);
    }
}
