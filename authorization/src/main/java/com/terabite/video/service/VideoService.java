package com.terabite.video.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;

import org.springframework.core.io.Resource;
import java.util.List;

/**
 * A service that processes video files.
 * Coupled with the AWS S3 service for persistent storage of video files
 * As such, each video is stored in an client-specific bucket, and each video has an video name unique to said bucket
 * Ensure that the env vars AWS_SECRET_ACCESS_KEY && AWS_ACCESS_KEY_ID are set
 */
@Configuration
public class VideoService {
    private S3Template s3Template;
    private static final String CLIENT_BUCKET = "client-video";
    private static final String COACH_BUCKET = "coach-video";

    public VideoService(S3Template s3Template){
        this.s3Template = s3Template;
        ensureBucketExists(CLIENT_BUCKET);
        ensureBucketExists(COACH_BUCKET);
    }

    // public List<String> getClientVideoList(){
    //     s3Template.listObjects(COACH_BUCKET, CLIENT_BUCKET);
    // }

    // public List<String> getCoachVideoList(){
    //     s3Template.
    // }
    
    public ResponseEntity<?> uploadClientVideo(MultipartFile file, String videoName, String client){
        return uploadVideo(file, CLIENT_BUCKET, videoName, client);
    }

    public ResponseEntity<?> uploadCoachVideo(MultipartFile file, String videoName){
        return uploadVideo(file, COACH_BUCKET, videoName);
    }

    public ResponseEntity<S3Resource> downloadClientVideo(String videoName, String client){
        Optional<S3Resource> video = downloadVideo(CLIENT_BUCKET, videoName, client);
        if(video.isEmpty() ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(video.get(), HttpStatus.OK);
    }

    public ResponseEntity<S3Resource> downloadCoachVideo(String videoName){
        Optional<S3Resource> video = downloadVideo(COACH_BUCKET, videoName);
        if(video.isEmpty() ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(video.get(), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteClientVideo(String videoName, String client) {
        if(!checkIfFileExists(CLIENT_BUCKET, videoName, client) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(deleteVideo(CLIENT_BUCKET, videoName, client) ) return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }   

    public ResponseEntity<?> deleteCoachVideo(String videoName) {
        if(!checkIfFileExists(COACH_BUCKET, videoName) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(deleteVideo(COACH_BUCKET, videoName) ) return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }   
    
    // ***********************************************************
    private ResponseEntity<?> uploadVideo(MultipartFile file, String bucket, String videoName){
        // return uploadVideo(file, videoName, "");
        if(!checkFileType(file.getResource(), file.getContentType() ) ) return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        if(checkIfFileExists(bucket, videoName) ) return new ResponseEntity<>(HttpStatus.CONFLICT);
        try(InputStream stream = file.getInputStream() ){
            if(uploadFile(bucket, videoName, stream) ) return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        catch(IOException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }
    
    private ResponseEntity<?> uploadVideo(MultipartFile file, String bucket, String videoName, String prefix){
        return uploadVideo(file, bucket, prefix + videoName);
        // if(!checkFileType(file.getResource(), file.getContentType() ) ) return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        // // ensureClientBucketExists(clientBucket);
        // try(InputStream stream = file.getInputStream() ) {
        //     uploadFile(clientBucket, videoName, stream);            
        //     return new ResponseEntity<>(HttpStatus.ACCEPTED); 
        // }
        // catch(IOException e){
        //     return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        // }
    }

    private Optional<S3Resource> downloadVideo(String bucket, String videoName){
        if(!checkIfFileExists(bucket, videoName) ) return Optional.empty();
        return Optional.of(downloadFile(bucket, videoName) );
    }

    private Optional<S3Resource> downloadVideo(String bucket, String videoName, String prefix){
        return downloadVideo(bucket, prefix + videoName);
    }

    private boolean deleteVideo(String videoName, String clientBucket) {
        deleteFile(clientBucket, videoName);
        return checkIfFileExists(clientBucket, clientBucket);

    }   
    private boolean deleteVideo(String videoName, String clientBucket, String prefix) {
        return deleteVideo(videoName, prefix + clientBucket);
    }

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

    private void ensureBucketExists(String bucket){
        if(s3Template.bucketExists(bucket) ) return;
        else s3Template.createBucket(bucket);
    }

    private boolean checkIfFileExists(String bucket, String fileName){
        return s3Template.objectExists(bucket, fileName);
    }

    private boolean checkIfFileExists(String bucket, String fileName, String prefix){
        return checkIfFileExists(bucket, prefix + fileName);
    }

    private boolean uploadFile(String bucket, String fileName, InputStream file){
        s3Template.upload(bucket, fileName, file);
        return checkIfFileExists(bucket, fileName);
    }

    private S3Resource downloadFile(String bucket, String fileName) {
        return s3Template.download(bucket, fileName);
    }

    private void deleteFile(String bucket, String file){
        s3Template.deleteObject(bucket, file);
    }
}
