package com.terabite;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.service.JwtService;
import com.terabite.programming.ProgrammingApi;
import com.terabite.programming.repository.DayRepository;
import com.terabite.programming.repository.ProgramRepository;
import com.terabite.programming.repository.RepCycleRepository;
import com.terabite.programming.repository.WeekRepository;
import com.terabite.user.UserApi;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;
import com.terabite.user.service.UserProgrammingService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalConfiguration {

    public static final String BEAN_NAME_AUTH_COOKIE_NAME = "authCookieName";
    public static final String BEAN_NAME_DOMAIN_URL = "domainUrl";
    public static final String BEAN_NAME_DOMAIN_PORT = "domainPort";
    public static final String BEAN_CALENDLY_CLIENT_ID = "cldnlyClientID";
    public static final String BEAN_CALENDLY_CLIENT_SECRET = "cldnlyClientSecret";
    public static final String BEAN_CALENDLY_WEBHOOK = "cldnlyWebHook";
    public static final String BEAN_JWT_SECRET = "jwtSecret";
    public static final String BEAN_NAME_DOMAIN_PROTOCOL = "domainProtocol";

    @Value("${AUTH_COOKIE_NAME:adapted-strength_auth-token}") private String authCookieName;

    @Value("${ADAPTED_STRENGTH_WEB_URL:localhost}") private String domainUrl;

    @Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_ID:test}") private String cldnlyClientID;

    @Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_SECRET:test}") private String cldnlyClientSecret;

    @Value("${ADAPTED_STRENGTH_CALENDLY_WEBHOOK:test}") private String cldnlyWebHook;

    @Value(
        "${ADAPTEDS_JWT_SECRET:superSecretSaucePleaseDoNotTellAnyoneOrWeWillBeInBigTroubleButSeriouslyDoNotTellAnyone}")
    private String jwtSecret;

    @Value("${ADAPTED_STRENGTH_WEB_PORT:}") private String domainPort;

    @Value("${ADAPTED_STRENGTH_WEB_PROTOCOL:}") private String domainProtocol;

    @Value("${API_GATEWAY_URL:localhost}") private String apiGatewayUrl;

    @Bean(name = BEAN_NAME_DOMAIN_PROTOCOL)
    public String getDomainProtocol() {
        return domainProtocol;
    }

    @Bean(name = BEAN_NAME_DOMAIN_PORT)
    public String getDomainPort() {
        return domainPort;
    }

    @Bean(name = BEAN_JWT_SECRET)
    public String getJwtSecret() {
        return jwtSecret;
    }

    @Bean(name = BEAN_CALENDLY_CLIENT_ID)
    public String getCldnlyClientID() {
        return cldnlyClientID;
    }

    @Bean(name = BEAN_CALENDLY_CLIENT_SECRET)
    public String getCldnlyClientSECRET() {
        return cldnlyClientSecret;
    }

    @Bean(name = BEAN_CALENDLY_WEBHOOK)
    public String getCldnlyWebHook() {
        return cldnlyWebHook;
    }

    @Bean
    public AuthorizationApi authorizationApi(final JwtService jwtService, final LoginRepository loginRepository) {
        // For now we will just return a new instance of the AuthorizationApi class.
        // later we might want to set this up some better way. I am still new to
        // spring boot and I am not sure if this is the best approach.
        return new AuthorizationApi(jwtService, loginRepository);
    }

    @Bean
    ProgrammingApi programmingApi(final ProgramRepository programRepository,
                                  final WeekRepository weekRepository,
                                  final DayRepository dayRepository,
                                  final RepCycleRepository repCycleRepository) {
        return new ProgrammingApi(programRepository, weekRepository, dayRepository, repCycleRepository);
    }


    @Bean
    public UserApi userApi(final UserRepository userRepository,
                           final UserProgrammingRepository userProgrammingRepository,
                           final SubscriptionService subscriptionService,
                           final UnsubscribeService unsubscribeService,
                           final UserProgrammingService userProgrammingService) {
        // SAME AS AUTHAPI above
        return new UserApi(
            userRepository, userProgrammingRepository, unsubscribeService, subscriptionService, userProgrammingService);
    }

    @Bean(name = BEAN_NAME_AUTH_COOKIE_NAME)
    public String getSessionCookieName() {
        return authCookieName;
    }

    @Bean(name = BEAN_NAME_DOMAIN_URL)
    public String getDomainUrl() {
        return domainUrl;
    }

    @Bean
    public JwtService jwtService(@Qualifier(BEAN_JWT_SECRET) final String jwtSecret) {
        return new JwtService(jwtSecret, 1000 * 60 * 60 * 24);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOriginPatterns("*").allowedMethods(
                    "HEAD", "GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
