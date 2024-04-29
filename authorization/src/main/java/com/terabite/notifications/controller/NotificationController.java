package com.terabite.notifications.controller;

<<<<<<< HEAD
import com.terabite.common.dto.Payload;
import com.terabite.common.dto.PayloadType;
=======
import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
>>>>>>> main
import com.terabite.notifications.model.NotificationRequest;
import com.terabite.notifications.model.NotificationResponse;
import com.terabite.notifications.model.TokenInformation;
import com.terabite.notifications.repository.NotificationRepository;
import com.terabite.notifications.service.NotfService;
<<<<<<< HEAD

=======
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;

import jakarta.servlet.http.Cookie;
>>>>>>> main
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Qualifier;
>>>>>>> main
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
<<<<<<< HEAD
    public ResponseEntity<Payload> createTokenInformation(
=======
    public ResponseEntity<String> createTokenInformation(
>>>>>>> main
            @RequestBody final TokenInformation tokenInformation,
            HttpServletRequest request) {
        System.out.println(tokenInformation.getToken());

        final Optional<TokenInformation> tokenInformationOption = notificationRepository
                .findByToken(tokenInformation.getToken());
<<<<<<< HEAD
System.out.println(tokenInformationOption);
        if (tokenInformationOption.isPresent()) {
            log.error("Token already exists for this user");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Payload.of(PayloadType.MESSAGE, "Unable to add token, already exists."));
=======

        if (tokenInformationOption.isPresent()) {
            log.error("Token already exists for this user");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to add token, already exists.");
>>>>>>> main
        }

        notificationRepository.save(tokenInformation);

<<<<<<< HEAD
        return ResponseEntity.ok(Payload.of(PayloadType.MESSAGE, "Token added successfully"));
    }

    @GetMapping("/get_tokens")
    public ResponseEntity<TokenInformation> getTokens(HttpServletRequest request) {
=======
        return ResponseEntity.ok("Token added successfully");
    }

    @GetMapping("/get_tokens")
    public ResponseEntity<UserInformation> getTokens(HttpServletRequest request) {
>>>>>>> main
        return new ResponseEntity(notificationRepository.findAll(), HttpStatus.ACCEPTED);
    }
}
