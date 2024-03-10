package com.terabite.video.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.terabite.video.service.VideoService;

import io.awspring.cloud.s3.S3Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;

@RestController
@RequestMapping("/v1/video")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService){
        this.videoService = videoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(@RequestParam("video") MultipartFile video, @RequestParam("video_name") String videoName, @RequestParam("client") String client, HttpServletRequest request){
        return videoService.uploadVideo(video, videoName, client);
    }

    @GetMapping("/download")
    public ResponseEntity<S3Resource> getVideo(@RequestParam("video_name") String videoName, @RequestParam("client") String client, HttpServletRequest request){
        return videoService.downloadVideo(videoName, client);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteVideo(@RequestParam("video_name") String videoName, @RequestParam("client") String client, HttpServletRequest request){
        return videoService.deleteVideo(videoName, client);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteAllClientVideo(@RequestParam("client") String client, HttpServletRequest request){
        return videoService.deleteBucket(client);
    }
}
