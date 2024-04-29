package com.terabite.webadmin.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.webadmin.model.TermsOfService;
import com.terabite.webadmin.model.WebContent;
import com.terabite.webadmin.repository.TermsOfServiceRepository;
import com.terabite.webadmin.repository.WebContentRepository;

import jakarta.transaction.Transactional;

/**
 * WebContentService
 */
@Service
@Transactional
public class WebContentService {
        private static final String TERMS_OF_SERVICE_NOT_FOUND = "Terms of service not found";
        private static final String TERMS_OF_SERVICE_ALREADY_EXISTS = "Terms of service already exists";
        private static final Payload TERMS_OF_SERVICE_NOT_FOUND_PAYLOAD = Payload.of(TERMS_OF_SERVICE_NOT_FOUND);

        private final WebContentRepository webContentRepository;
        private final TermsOfServiceRepository termsOfServiceRepository;

        public WebContentService(final WebContentRepository webContentRepository,
                        final TermsOfServiceRepository termsOfServiceRepository) {
                this.webContentRepository = webContentRepository;
                this.termsOfServiceRepository = termsOfServiceRepository;
        }

        public ResponseEntity<?> getCurrentContent() {
                WebContent webContent = getCurrentWebContent();
                return ResponseEntity.ok(webContent);
        }

        public ResponseEntity<?> getCurrentTermsOfService() {
                WebContent webContent = getCurrentWebContent();
                TermsOfService termsOfService = webContent.getTermsOfService();

                return ResponseEntity.ok(termsOfService);
        }

        public ResponseEntity<?> getTermsOfService(final long id) {
                final Optional<TermsOfService> termsOfService = termsOfServiceRepository.findById(id);
                if (termsOfService.isEmpty()) {
                        return ResponseEntity.badRequest().body(TERMS_OF_SERVICE_NOT_FOUND_PAYLOAD);
                }
                return ResponseEntity.ok(termsOfService.get());
        }

        public ResponseEntity<?> createTermsOfService(final TermsOfService termsOfService) {

                WebContent webContent = getCurrentWebContent();

                if (termsOfServiceRepository.findById(termsOfService.getId()).isPresent()) {
                        return ResponseEntity.badRequest().body(Payload.of(TERMS_OF_SERVICE_ALREADY_EXISTS));
                }

                webContent.setTermsOfService(termsOfService);
                webContentRepository.save(webContent);

                return ResponseEntity.ok(termsOfService);

        }

        public ResponseEntity<?> deleteTermsOfService(final long id) {
                if (termsOfServiceRepository.findById(id).isEmpty()) {
                        return ResponseEntity.badRequest().body(TERMS_OF_SERVICE_NOT_FOUND_PAYLOAD);
                }
                return ResponseEntity.ok(Payload.of("Terms of service deleted"));
        }

        private WebContent getCurrentWebContent() {
                Optional<WebContent> webContent = webContentRepository.findFirstByOrderByIdAsc();
                if (webContent.isEmpty()) {
                        // create and save default web content
                        WebContent defaultWebContent = createDefaultWebContent();
                        webContentRepository.save(defaultWebContent);

                        webContent = Optional.of(defaultWebContent);
                }

                return webContent.get();
        }


        private static WebContent createDefaultWebContent() {

                WebContent webContent = new WebContent();

                TermsOfService termsOfService = new TermsOfService();
                termsOfService.setContent("Default terms of service");
                termsOfService.setDateCreated(LocalDateTime.now());

                webContent.setTermsOfService(termsOfService);

                return webContent;
        }
}
