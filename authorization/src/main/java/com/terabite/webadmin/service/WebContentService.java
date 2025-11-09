package com.terabite.webadmin.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.webadmin.model.TermsOfService;
import com.terabite.webadmin.model.WebContent;
import com.terabite.webadmin.model.AboutUsContent;
import com.terabite.webadmin.model.HomePageContent;
import com.terabite.webadmin.model.HomePageSection;
import com.terabite.webadmin.repository.TermsOfServiceRepository;
import com.terabite.webadmin.repository.WebContentRepository;
import com.terabite.webadmin.repository.AboutUsContentRepository;
import com.terabite.webadmin.repository.HomePageContentRepository;

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
        private final AboutUsContentRepository aboutUsContentRepository;
        private final HomePageContentRepository homePageContentRepository;

        public WebContentService(final WebContentRepository webContentRepository,
                        final TermsOfServiceRepository termsOfServiceRepository,
                        final AboutUsContentRepository aboutUsContentRepository,
                        final HomePageContentRepository homePageContentRepository) {
                this.webContentRepository = webContentRepository;
                this.termsOfServiceRepository = termsOfServiceRepository;
                this.aboutUsContentRepository = aboutUsContentRepository;
                this.homePageContentRepository = homePageContentRepository;
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

        // About Us Content Methods
        public ResponseEntity<?> getAboutUsContent() {
                Optional<AboutUsContent> content = aboutUsContentRepository.findAll().stream().findFirst();
                if (content.isEmpty()) {
                        AboutUsContent defaultContent = createDefaultAboutUsContent();
                        aboutUsContentRepository.save(defaultContent);
                        return ResponseEntity.ok(defaultContent);
                }
                AboutUsContent aboutUs = content.get();
                // Set defaults if fields are null/empty
                if (aboutUs.getFounderImageUrl() == null || aboutUs.getFounderImageUrl().isEmpty()) {
                        aboutUs.setFounderImageUrl("https://i.ibb.co/PCHpGF8/coach-alex-min.jpg");
                }
                if (aboutUs.getMissionImageUrl() == null || aboutUs.getMissionImageUrl().isEmpty()) {
                        aboutUs.setMissionImageUrl("https://i.ibb.co/LJ5gDL6/mission-min.jpg");
                }
                if (aboutUs.getExtraImageUrl() == null || aboutUs.getExtraImageUrl().isEmpty()) {
                        aboutUs.setExtraImageUrl("https://i.ibb.co/gmf0m8y/extra-min.jpg");
                }
                return ResponseEntity.ok(aboutUs);
        }

        public ResponseEntity<?> saveAboutUsContent(final AboutUsContent content) {
                Optional<AboutUsContent> existing = aboutUsContentRepository.findAll().stream().findFirst();
                if (existing.isPresent()) {
                        content.setId(existing.get().getId());
                }
                AboutUsContent saved = aboutUsContentRepository.save(content);
                return ResponseEntity.ok(saved);
        }

        private AboutUsContent createDefaultAboutUsContent() {
                AboutUsContent content = new AboutUsContent();
                content.setFounderName("Coach Alex");
                content.setFounderTitle("Founder of Adapted Strength");
                content.setFounderBio("Hello and Welcome! I'm Alex-Andre B. Palting, a fitness coach with a decade worth of experience that is located out in Northern California.");
                content.setFounderImageUrl("https://i.ibb.co/PCHpGF8/coach-alex-min.jpg");
                content.setMissionStatement("• Creating a sustainable and practical fitness lifestyle based on optimal gym knowledge.\n• Focus on long-term improvement and organic learning.\n• Support for beginners and athletes to maximize gym time and enjoy training.\n• Your fitness secretary for a healthier life.");
                content.setMissionImageUrl("https://i.ibb.co/LJ5gDL6/mission-min.jpg");
                content.setExtraImageUrl("https://i.ibb.co/gmf0m8y/extra-min.jpg");
                content.setQualifications("• M.S. Kinesiology: Exercise Physiology from San Francisco State University (2021)\n• B.S. Biochemistry + B.A. Chemistry from San Francisco State University (2019)\n• Certified Personal Trainer (NSCA-CPT)\n• Certified Olympic Weightlifting Level 2 Coach (USAW-L2)\n• Certified Powerlifting Club Coach (USAPL-CC)\n• Certified Gymnastics Instructor (USAG-I)");
                content.setContactEmail("contact@adaptedstrength.com");
                content.setContactPhone("(555) 555-5555");
                content.setLocationAddress("186 Bella Vista Rd d, Vacaville, CA 95687");
                return content;
        }

        // Home Page Content Methods
        public ResponseEntity<?> getHomePageContent() {
                Optional<HomePageContent> content = homePageContentRepository.findAll().stream().findFirst();
                if (content.isEmpty()) {
                        HomePageContent defaultContent = createDefaultHomePageContent();
                        homePageContentRepository.save(defaultContent);
                        return ResponseEntity.ok(defaultContent);
                }
                return ResponseEntity.ok(content.get());
        }

        public ResponseEntity<?> saveHomePageContent(final HomePageContent content) {
                Optional<HomePageContent> existing = homePageContentRepository.findAll().stream().findFirst();
                if (existing.isPresent()) {
                        content.setId(existing.get().getId());
                }
                
                // Ensure sections have proper reference to parent
                if (content.getSections() != null) {
                        content.getSections().forEach(section -> {
                                section.setHomePageContent(content);
                        });
                }
                
                HomePageContent saved = homePageContentRepository.save(content);
                return ResponseEntity.ok(saved);
        }

        private HomePageContent createDefaultHomePageContent() {
                HomePageContent content = new HomePageContent();
                content.setHeroTitle("Adapted Strength");
                content.setHeroSubtitle("In Vacaville, CA, Adapted Strength is an upcoming gym that offers numerous opportunities in strength training disciplines.");
                content.setHeroImageUrl("");
                content.setCtaButtonText("Get Started!");
                content.setCtaButtonLink("/memberships");
                
                // Testimonials section
                HomePageSection testimonials = new HomePageSection();
                testimonials.setSectionKey("testimonials");
                testimonials.setSectionType("testimonials");
                testimonials.setTitle("What our clients say about Adapted Strength?");
                testimonials.setContent("");
                testimonials.setData("[{\"quote\":\"I was recommended to try a cycle with the program and loved it!\",\"author\":\"Recommend\"},{\"quote\":\"I've been training with Alex for a few months now and I've seen great results!\",\"author\":\"Great Results\"},{\"quote\":\"The programming is top notch and the coaching is even better!\",\"author\":\"Top Notch\"}]");
                testimonials.setDisplayOrder(0);
                testimonials.setVisible(true);
                testimonials.setHomePageContent(content);
                
                // New to fitness section
                HomePageSection newToFitness = new HomePageSection();
                newToFitness.setSectionKey("new-to-fitness");
                newToFitness.setSectionType("simple");
                newToFitness.setTitle("New to fitness?");
                newToFitness.setContent("We offer a variety of programs to help you get started on your fitness journey.");
                newToFitness.setDisplayOrder(1);
                newToFitness.setVisible(true);
                newToFitness.setHomePageContent(content);
                
                // Competitive Sports section
                HomePageSection competitiveSports = new HomePageSection();
                competitiveSports.setSectionKey("competitive-sports");
                competitiveSports.setSectionType("sports");
                competitiveSports.setTitle("Competitive Sports");
                competitiveSports.setContent("");
                competitiveSports.setData("[{\"title\":\"Powerlifting\",\"description\":\"Build strength in the squat, bench press, and deadlift.\",\"image\":\"https://i.ibb.co/sQP7Jgm/adapteds-powerlifting-min.jpg\"},{\"title\":\"Olympic Weightlifting\",\"description\":\"Master the snatch and clean & jerk.\",\"image\":\"https://i.ibb.co/VSDXFzd/adapteds-olylifting-min.jpg\"},{\"title\":\"Bodybuilding\",\"description\":\"Build muscle and sculpt your physique.\",\"image\":\"https://i.ibb.co/5sxKS98/adapteds-bodybuilding-min.jpg\"}]");
                competitiveSports.setDisplayOrder(2);
                competitiveSports.setVisible(true);
                competitiveSports.setHomePageContent(content);
                
                content.getSections().add(testimonials);
                content.getSections().add(newToFitness);
                content.getSections().add(competitiveSports);
                
                return content;
        }
}
