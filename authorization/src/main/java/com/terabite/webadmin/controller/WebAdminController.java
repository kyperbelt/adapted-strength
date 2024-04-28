package com.terabite.webadmin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.webadmin.model.TermsOfService;
import com.terabite.webadmin.service.WebContentService;

/**
 * WebAdminController
 */
@RestController
@RequestMapping("/v1/webadmin")
public class WebAdminController {

        private final WebContentService webContentService;

        public WebAdminController(final WebContentService webContentService) {
                this.webContentService = webContentService;
        }


        @GetMapping("/content")
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        public ResponseEntity<?> getCurrentTermsOfService() {
                return webContentService.getCurrentContent();
        }

        @GetMapping("/terms-of-service/{id}")
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        public ResponseEntity<?> getTermsOfService(@PathVariable long id) {
                return webContentService.getTermsOfService(id);
        }

        @PostMapping("/terms-of-service")
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        public ResponseEntity<?> createTermsOfService(@RequestBody TermsOfService termsOfService) {
                return webContentService.createTermsOfService(termsOfService);
        }


}
