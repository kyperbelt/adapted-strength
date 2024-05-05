package com.terabite.webadmin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.webadmin.service.WebContentService;

/**
 * WebAdminController
 *
 * CAN ONLY USE GET HERE:WARNING:
 *
 * see {@link WebAdminController} for content management
 */
@RestController
@RequestMapping("/v1/content")
public class ContentController{

        private final WebContentService webContentService;

        public ContentController(final WebContentService webContentService) {
                this.webContentService = webContentService;
        }

        @GetMapping("/terms-of-service")
        public ResponseEntity<?> getCurrentTermsOfService() {
                return webContentService.getCurrentTermsOfService();
        }

}
