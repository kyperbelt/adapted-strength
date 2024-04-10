package com.terabite.notifications.controller;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
import com.terabite.notifications.model.NotificationRequest;
import com.terabite.notifications.model.NotificationResponse;
import com.terabite.notifications.model.TokenInformation;
import com.terabite.notifications.repository.NotificationRepository;
import com.terabite.notifications.service.NotfService;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/v1/notifications/")
public class NotificationController {
    private static final Logger log = LoggerFactory.getLogger(NotificationController.class);
    private NotificationRepository notificationRepository;
    
    @Autowired
    private NotfService notfService;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    @PostMapping("/send")
    public ResponseEntity sendNotification(@RequestBody NotificationRequest request)
            throws ExecutionException, InterruptedException {
        notfService.sendMessageToToken(request);
        return new ResponseEntity<>(new NotificationResponse(HttpStatus.OK.value(), "Notification has been sent."),
                HttpStatus.OK);
    }

    @PostMapping("/add_token")
    public ResponseEntity<String> createTokenInformation(
            @RequestBody final TokenInformation tokenInformation,
            HttpServletRequest request) {
        System.out.println(tokenInformation.getToken());

        final Optional<TokenInformation> tokenInformationOption = notificationRepository
                .findByToken(tokenInformation.getToken());

        if (tokenInformationOption.isPresent()) {
            log.error("Token already exists for this user");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to add token, already exists.");
        }

        notificationRepository.save(tokenInformation);

        return ResponseEntity.ok("Token added successfully");
    }

    @GetMapping("/get_tokens")
    public ResponseEntity<UserInformation> getTokens(HttpServletRequest request) {
        return new ResponseEntity(notificationRepository.findAll(), HttpStatus.ACCEPTED);
    }
}
