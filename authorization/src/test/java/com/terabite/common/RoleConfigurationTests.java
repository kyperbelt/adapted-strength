package com.terabite.common;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
public class RoleConfigurationTests {

	@Test 
	void testRoleConfiguration(){
		RoleConfiguration roleConfiguration = new RoleConfiguration();
		assertNotNull(roleConfiguration);
	}

	@Test
	void testRoleConfiguration_NoneMissing(){
		RoleConfiguration roleConfiguration = RoleConfiguration.builder() 
			.all(Roles.ROLE_ADMIN, Roles.ROLE_USER)
			.build();

		List<Roles> roles = List.of(Roles.ROLE_ADMIN, Roles.ROLE_USER);

		assertTrue(roleConfiguration.validateRolesList(roles));
	}

	@Test 
	void testRoleConfiguration_Except_Present(){
		RoleConfiguration roleConfiguration = RoleConfiguration.builder() 
			.all(Roles.ROLE_ADMIN, Roles.ROLE_USER)
			.except(Roles.ROLE_BANNED)
			.build();

		List<Roles> roles = List.of(Roles.ROLE_ADMIN, Roles.ROLE_USER);

		assertTrue(roleConfiguration.validateRolesList(roles)); 

		List<Roles> roles2 = List.of(Roles.ROLE_ADMIN, Roles.ROLE_USER, Roles.ROLE_BANNED);

		assertTrue(!roleConfiguration.validateRolesList(roles2));
	}

	@Test 
	void testRoleConfiguration_Any_Present(){
		RoleConfiguration roleConfiguration = RoleConfiguration.builder() 
			.all(Roles.ROLE_TERMS_ACCEPTED, Roles.ROLE_EMAIL_VERIFIED)
			.any(Roles.ROLE_ADMIN, Roles.ROLE_COACH)
			.build();

		List<Roles> roles = List.of(Roles.ROLE_TERMS_ACCEPTED, Roles.ROLE_EMAIL_VERIFIED, Roles.ROLE_ADMIN);

		assertTrue(roleConfiguration.validateRolesList(roles));

		List<Roles> roles2 = List.of(Roles.ROLE_TERMS_ACCEPTED, Roles.ROLE_EMAIL_VERIFIED, Roles.ROLE_COACH);

		assertTrue(roleConfiguration.validateRolesList(roles2));

		List<Roles> roles3 = List.of(Roles.ROLE_TERMS_ACCEPTED, Roles.ROLE_EMAIL_VERIFIED, Roles.ROLE_USER);

		assertTrue(!roleConfiguration.validateRolesList(roles3));
	}



}
