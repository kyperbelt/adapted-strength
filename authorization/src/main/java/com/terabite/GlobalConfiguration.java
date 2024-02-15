package com.terabite;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.user.UserApi;

@Configuration
public class GlobalConfiguration {

	public static final String BEAN_NAME_AUTH_COOKIE_NAME = "authCookieName";
	public static final String BEAN_NAME_DOMAIN_URL = "domainUrl";
	public static final String CALENDLY_CLIENT_ID = "cldnlyClientID";
	public static final String CALENDLY_CLIENT_SECRET = "cldnlyClientSecret";
	public static final String CALENDLY_WEBHOOK = "cldnlyWebHook"

	@Value("${AUTH_COOKIE_NAME:adapted-strength_auth-token}")
	private String authCookieName;


	@Value("${ADAPTED_STRENGTH_WEB_URL:localhost}")
	private String domainUrl;

	@Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_ID}")
	private String cldnlyClientID;
	
	@Value("${ADAPTED_STRENGTH_CALENDLY_CLIENT_SECRET}")
	private String cldnlyClientSecret;

	@Value("${ADAPTED_STRENGTH_CALENDLY_WEBHOOK}")
	private String cldnlyWebHook;

	@Bean(name = CALENDLY_CLIENT_ID)
	public String getCldnlyClientID() {
		return cldnlyClientID;
	}

	@Bean(name = CALENDLY_CLIENT_SECRET)
	public String getCldnlyClientSECRET() {
		return cldnlyClientSecret;
	}

	@Bean(name = CALENDLY_WEBHOOK)
	public String getCldnlyWebHook() {
		return cldnlyWebHook;
	}

	@Bean
	public AuthorizationApi authorizationApi() {
		// For now we will just return a new instance of the AuthorizationApi class.
		// later we might want to set this up some better way. I am still new to 
		// spring boot and I am not sure if this is the best approach. 
		return new AuthorizationApi();
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
