package com.terabite.video.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.video.service.VideoService;
import com.terabite.video.service.VideoService.S3Bucket;

// Given that we're using email as the login / username, it should (hopefully) be fine to just use the username form the auth

@RestController
@RequestMapping("/v1/video")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService){
        this.videoService = videoService;
    }

    @PostMapping("/upload/client")
    @PreAuthorize("hasAuthority('ROLE_USER')" )
    public ResponseEntity<?> uploadClientVideo(@AuthenticationPrincipal UserDetails userDetails, 
        @JsonAlias({"file", "video", "video_file"}) MultipartFile video, 
        @JsonAlias({"name", "video_name"}) String name){
        return videoService.uploadVideo(video, name, S3Bucket.CLIENT, userDetails.getUsername() );
    }

    @PostMapping("/upload/coach")
    @PreAuthorize("hasAuthority('ROLE_COACH')")
    public ResponseEntity<?> uploadCoachVideo(@AuthenticationPrincipal UserDetails userDetails, 
        @JsonAlias({"file", "video", "video_file"}) MultipartFile video, 
        @JsonAlias({"name", "video_name"}) String name){
        return videoService.uploadVideo(video, name, S3Bucket.COACH);
    }
 
    @GetMapping("/download/client")
    @PreAuthorize("hasAuthority('ROLE_USER')" )
    public ResponseEntity<?> downloadClientVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String name) {
        return videoService.downloadVideo(name, S3Bucket.CLIENT, userDetails.getUsername() );
    }

    @GetMapping("/download/coach")
    @PreAuthorize("hasAuthority('ROLE_COACH')")
    public ResponseEntity<?> downloadCoachVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String name) {
        return videoService.downloadVideo(name, S3Bucket.COACH, userDetails.getUsername() ); 
    }

    @DeleteMapping("/delete/client")
    @PreAuthorize("hasAuthority('ROLE_USER')" )
    public ResponseEntity<?> deleteClientVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String name) {
        return videoService.deleteVideo(name, S3Bucket.CLIENT, userDetails.getUsername() );
    }

    @DeleteMapping("/delete/coach")
    @PreAuthorize("hasAuthority('ROLE_COACH')")
    public ResponseEntity<?> deleteCoachVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String name) {
        return videoService.deleteVideo(name, S3Bucket.COACH); 
    }
}
