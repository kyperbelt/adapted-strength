package com.terabite.authorization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(scanBasePackages = "com.terabite")
public class AuthorizationApplication {

	public static void main(String[] args) {		
		SpringApplication.run(AuthorizationApplication.class, args);
	}

}
