package com.terabite.video.service;

import java.io.IOError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import jakarta.validation.constraints.NotNull;
import software.amazon.awssdk.core.Response;
import software.amazon.awssdk.services.s3.S3Client;

import org.springframework.core.io.Resource;

/**
 * A service that processes video files.
 * Coupled with the AWS S3 service for persistent storage of video files
 * As such, each video is stored in an client-specific bucket, and each video has an video name unique to said bucket
 * Ensure that the env vars AWS_SECRET_ACCESS_KEY && AWS_ACCESS_KEY_ID are set
 */
@Configuration
@SuppressWarnings("null")
public class VideoService {
    private S3Template s3Template;

    public VideoService(S3Template s3Template){
        this.s3Template = s3Template;
    }
    
    public ResponseEntity<?> uploadVideo(MultipartFile file, String videoName, String clientBucket){
        if(!checkFileType(file.getResource(), file.getContentType() ) ) return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        ensureClientBucketExists(clientBucket);
        try(InputStream stream = file.getInputStream() ) {
            uploadFile(clientBucket, videoName, stream);            
            return new ResponseEntity<>(HttpStatus.ACCEPTED); 
        }
        catch(IOException e){
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    public ResponseEntity<S3Resource> downloadVideo(String videoName, String clientBucket){
        if(!checkIfClientBucketExist(clientBucket) ) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(!checkIfFileExists(clientBucket, videoName) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(downloadFile(clientBucket, videoName), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteVideo(String videoName, String clientBucket) {
        if(!checkIfClientBucketExist(clientBucket) ) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(!checkIfFileExists(clientBucket, videoName) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        deleteFile(clientBucket, videoName);
        return new ResponseEntity<>(HttpStatus.OK);

    }   

    public ResponseEntity<?> deleteBucket(String clientBucket){
        if(checkIfClientBucketExist(clientBucket)) {
            s3Template.deleteBucket(clientBucket);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // ***********************************************************
    
    /**
     * Checks if the given file is in an acceptable video format
     * @param resource the resource to check
     * @param fileType the MIME type, if known
     * @return true if acceptable, false otherwise
     */
    private boolean checkFileType(Resource resource, Optional<String> fileType){
        String content = fileType.orElseGet(() -> "unknown");
        return content.contains("video");

        // TODO check resource for file type by interrogating file contents, as opposed to just using the MIME
        // This is for security reasons, as the MIME type is self-reported, and as such, can be faked
    }

    /**
     * Overloaded Method
     * @param resource
     * @param fileType
     * @return
     */
    private boolean checkFileType(Resource resource, String fileType){
        return checkFileType(resource, Optional.ofNullable(fileType) );
    }

    private boolean checkIfClientBucketExist(String bucket){
        return s3Template.bucketExists(bucket);
    }

    private void ensureClientBucketExists(String bucket){
        if(checkIfClientBucketExist(bucket) ) return;
        else s3Template.createBucket(bucket);
    }

    private boolean checkIfFileExists(String bucket, String fileName){
        return s3Template.objectExists(bucket, fileName);
    }

    private void uploadFile(String bucket, String fileName, InputStream file){
        s3Template.upload(bucket, fileName, file);
    }

    private S3Resource downloadFile(String bucket, String fileName) {
        return s3Template.download(bucket, fileName);
    }

    private void deleteFile(String bucket, String file){
        s3Template.deleteObject(bucket, file);
    }
}
