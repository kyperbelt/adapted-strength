package com.terabite;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.service.JwtService;
import com.terabite.user.UserApi;

@Configuration
public class GlobalConfiguration {

	public static final String BEAN_NAME_AUTH_COOKIE_NAME = "authCookieName";
	public static final String BEAN_NAME_DOMAIN_URL = "domainUrl";
	public static final String BEAN_CALENDLY_CLIENT_ID = "cldnlyClientID";
	public static final String BEAN_CALENDLY_CLIENT_SECRET = "cldnlyClientSecret";
	public static final String BEAN_CALENDLY_WEBHOOK = "cldnlyWebHook";
	public static final String BEAN_JWT_SECRET = "jwtSecret";

	@Value("${AUTH_COOKIE_NAME:adapted-strength_auth-token}")
	private String authCookieName;

	@Value("${ADAPTED_STRENGTH_WEB_URL:localhost}")
	private String domainUrl;

	@Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_ID:test}")
	private String cldnlyClientID;
	
	@Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_SECRET:test}")
	private String cldnlyClientSecret;

	@Value("${ADAPTED_STRENGTH_CALENDLY_WEBHOOK:test}")
	private String cldnlyWebHook;

	@Value("${ADAPTEDS_JWT_SECRET:superSecretSaucePleaseDoNotTellAnyoneOrWeWillBeInBigTroubleButSeriouslyDoNotTellAnyone}")
	private String jwtSecret;

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
	public AuthorizationApi authorizationApi(final JwtService jwtService) {
		// For now we will just return a new instance of the AuthorizationApi class.
		// later we might want to set this up some better way. I am still new to 
		// spring boot and I am not sure if this is the best approach. 
		return new AuthorizationApi(jwtService);
	}

	@Bean 
	public UserApi userApi() {
		// FOr now we will just return a new instance of the UserApi class.
		// later we might want to set this up some better way. I am still new to 
		// spring boot and I am not sure if this is the best approach. 
		return new UserApi();
	}

	@Bean(name = BEAN_NAME_AUTH_COOKIE_NAME)
	public String getSessionCookieName() {
		return authCookieName;
	}

	@Bean(name = BEAN_NAME_DOMAIN_URL)
	public String getDomainUrl() {
		return domainUrl;
	}


}
