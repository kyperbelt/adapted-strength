
package com.terabite.common;

import java.util.HashMap;
import java.util.Optional;

// ADD MORE ROLES HERE
public enum Roles {
	ROLE_EMAIL_VERIFIED,
	ROLE_TERMS_ACCEPTED,
	ROLE_ACCOUNT_SETUP,
	ROLE_COACH,
	ROLE_USER,
	ROLE_ACTIVE,
	ROLE_INACTIVE,
	ROLE_SUBSCRIBED,
	ROLE_ADMIN,
	ROLE_BANNED;

	private static HashMap<String, Roles> roles = new HashMap<String, Roles>();
	static {
		for (Roles role : Roles.values()) {
			roles.put(role.name(), role);
		}
	}

	public static Optional<Roles> getRoleByName(String role) {
		return Optional.ofNullable(roles.get(role));
	}
}
