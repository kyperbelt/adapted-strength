package com.terabite.video.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Value;
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
    // private static final String CLIENT_BUCKET = "client-video";
    // private static final String COACH_BUCKET = "coach-video";

    public static enum S3Bucket{
        CLIENT {
            @Override
            public String toString(){
                return "client-video";
            }
        },
        COACH {
            @Override
            public String toString(){
                return "coach-video";
            }
        };
    }


    public VideoService(S3Template s3Template){
        this.s3Template = s3Template;
        ensureBucketExists(S3Bucket.CLIENT.toString() );
        ensureBucketExists(S3Bucket.COACH.toString() );
    }

    // public List<String> getClientVideoList(){
    //     s3Template.listObjects(COACH_BUCKET, CLIENT_BUCKET);
    // }

    // public List<String> getCoachVideoList(){
    //     s3Template.
    // }

    public Optional<ResponseEntity<?>> checkUploadPreconditions(MultipartFile file, String name, S3Bucket bucket){
        
        if(!checkFileType(file.getResource(), file.getContentType() ) ) return Optional.of(new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE)) ;
        if(checkIfFileExists(bucket.toString(),  name) ) return Optional.of(new ResponseEntity<>(HttpStatus.CONFLICT) );
        
        return Optional.empty();
    }

    public ResponseEntity<?> uploadVideo(MultipartFile video, String name, S3Bucket bucket, String client){
        return uploadVideo(video, client + "." + name, bucket);
        // String name = client + "." + payload.name();
        // Optional<ResponseEntity<?>> rv = checkUploadPreconditions(payload.video(), name, bucket );
        // rv.orElseGet(() -> {
        //     try(InputStream stream = payload.video().getResource().getInputStream() ){
        //         s3Template.upload(bucket.toString(), name, stream);
        //     }
        //     catch(IOException e) {
        //         return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        //     }
        //     return new ResponseEntity<>(HttpStatus.OK);
        // });
        // return rv.get();
    }
    
    public ResponseEntity<?> uploadVideo(MultipartFile video, String name, S3Bucket bucket){
        Optional<ResponseEntity<?>> rv = checkUploadPreconditions(video, name, bucket );
        return rv.orElseGet(() -> {
            try(InputStream stream = video.getResource().getInputStream() ){
                s3Template.upload(bucket.toString(), name, stream);
            }
            catch(IOException e) {
                return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        });
    }


    public ResponseEntity<S3Resource> downloadVideo(String name, S3Bucket bucket) {
        if(!checkIfFileExists(bucket.toString(), name) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        S3Resource resource = s3Template.download(bucket.toString(), name);
        return new ResponseEntity<S3Resource>(resource, HttpStatus.OK);
    }

    public ResponseEntity<?> downloadVideo(String name, S3Bucket bucket, String client) {
        return downloadVideo(client + "." + name, bucket);
        // String nameActual = client + "." + name;
        // if(!checkIfFileExists(bucket.toString(), nameActual) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // S3Resource resource = s3Template.download(bucket.toString(), nameActual);
        // return new ResponseEntity<S3Resource>(resource, HttpStatus.OK);
    }

    public ResponseEntity<?> deleteVideo(String name, S3Bucket bucket){
        if(!checkIfFileExists(bucket.toString(), name) ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        s3Template.deleteObject(bucket.toString(), name);
        if(!checkIfFileExists(bucket.toString(), name) ) return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }

    public ResponseEntity<?> deleteVideo(String name, S3Bucket bucket, String client) {
        return deleteVideo(client + "." + name, bucket);
    }   
    
    // ***********************************************************
    // private ResponseEntity<?> uploadVideo(MultipartFile file, String bucket, String videoName){
    //     // return uploadVideo(file, videoName, "");
    //     if(!checkFileType(file.getResource(), file.getContentType() ) ) return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    //     if(checkIfFileExists(bucket, videoName) ) return new ResponseEntity<>(HttpStatus.CONFLICT);
    //     try(InputStream stream = file.getInputStream() ){
    //         if(uploadFile(bucket, videoName, stream) ) return new ResponseEntity<>(HttpStatus.ACCEPTED);
    //     }
    //     catch(IOException e){
    //         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    //     }
    //     return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    // }
    
    // private ResponseEntity<?> uploadVideo(MultipartFile file, String bucket, String videoName, String prefix){
    //     return uploadVideo(file, bucket, prefix + videoName);
    //     // if(!checkFileType(file.getResource(), file.getContentType() ) ) return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    //     // // ensureClientBucketExists(clientBucket);
    //     // try(InputStream stream = file.getInputStream() ) {
    //     //     uploadFile(clientBucket, videoName, stream);            
    //     //     return new ResponseEntity<>(HttpStatus.ACCEPTED); 
    //     // }
    //     // catch(IOException e){
    //     //     return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    //     // }
    // }

    // private Optional<S3Resource> downloadVideo(String bucket, String videoName){
    //     if(!checkIfFileExists(bucket, videoName) ) return Optional.empty();
    //     return Optional.of(downloadFile(bucket, videoName) );
    // }

    // private Optional<S3Resource> downloadVideo(String bucket, String videoName, String prefix){
    //     return downloadVideo(bucket, prefix + videoName);
    // }

    // private boolean deleteVideo(String videoName, String clientBucket) {
    //     deleteFile(clientBucket, videoName);
    //     return checkIfFileExists(clientBucket, clientBucket);

    // }   
    // private boolean deleteVideo(String videoName, String clientBucket, String prefix) {
    //     return deleteVideo(videoName, prefix + clientBucket);
    // }

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

}
