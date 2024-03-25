package com.terabite.video.controller;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
import java.util.Optional;
import java.util.List;

// Given that we're using email as the login / username, it should (hopefully) be fine to just use the username form the auth

@RestController
@RequestMapping("/v1/video")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService){
        this.videoService = videoService;
    }

    // Coach endpoints
    @PostMapping("/coach")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> uploadVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video") MultipartFile video, @RequestParam("video_name") String videoName){
        return videoService.uploadCoachVideo(video, videoName);
        // request.getCookies()
        // )).anyMatch(str -> str.equals("ROLE_ADMIN") );
    }

    @GetMapping("/coach/{video}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<S3Resource> getVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video") String videoName, @RequestParam("client") Optional<String> client){
        if(client.isEmpty() ) return videoService.downloadCoachVideo(videoName);
        else return videoService.downloadClientVideo(videoName, client.get() );
    }

    // @GetMapping("")
    // @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")
    // public ResponseEntity<List<String>> getVideoNameList(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video") String videoName, @RequestParam("client") Optional<String> client){
    //     if(client.isEmpty() ) return videoService.downloadCoachVideo(videoName);
    //     if(isAdmin(userDetails) ) return videoService.downloadClientVideo(videoName, client.get() );
    //     return videoService.downloadClientVideo(videoName, userDetails.getUsername() );
    // }


    @DeleteMapping("/coach/{video}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video_name") String videoName, @RequestParam("client") Optional<String> client){
        if(client.isEmpty() ) return videoService.deleteCoachVideo(videoName);
        else return videoService.deleteClientVideo(videoName, client.get() );
    }

    // Client endpoints

    @PostMapping("/client")
    @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")
    public ResponseEntity<?> uploadClientVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video") MultipartFile video, @RequestParam("video_name") String videoName){
        return videoService.uploadClientVideo(video, videoName, userDetails.getUsername() );
        // request.getCookies()
        // )).anyMatch(str -> str.equals("ROLE_ADMIN") );
    }

    @GetMapping("/client/{video}")
    @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")
    public ResponseEntity<S3Resource> getVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video") String videoName) {
        if(client.isEmpty() ) return videoService.downloadCoachVideo(videoName);
        else return videoService.downloadClientVideo(videoName, client.get() );
    }

    @DeleteMapping("/{video}")
    @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")
    public ResponseEntity<?> deleteVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("video_name") String videoName) {
        if(client.isEmpty() ) return videoService.deleteCoachVideo(videoName);
        else return videoService.deleteClientVideo(videoName, client.get() );
    }


    // @DeleteMapping("/all")
    // @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")
    // public ResponseEntity<?> deleteAllClientVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("client") String client, HttpServletRequest request){
    //     return videoService.deleteBucket(client);
    // }

    // private boolean isAdmin(UserDetails details){
    //     return details.getAuthorities().stream().map(GrantedAuthority::getAuthority).anyMatch("ROLE_ADMIN"::equals);
    // }    
    
    // @PreAuthorize("!hasAuthority('ROLE_UNVERIFIED')")

}
