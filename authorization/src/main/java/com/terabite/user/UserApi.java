package com.terabite.user;

import com.terabite.user.repository.UserRepository;

/**
 * <h1>UserApi</h1>
 * <p>
 * This class will handle all user related operations such as 
 * updating user information, deleting user information and getting user information.
 *
 * <p>
 * Go through the UserApi class if you need to access user information from another service 
 * instead of directly accessing the user database or user related utilities. 
 *
 * <p>
 *
 * The reasoning behind this is that if we decide to split this application into microservices,
 * we can easily change the UserApi class to make requests to the user service instead of the user database, or 
 * user related utilities.
 */
public class UserApi {

	private final UserRepository userRepository;
	
	public UserApi(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/**
	* This method will create the user information entry for the given username. 
	*
	* This is to prevent an error from occuring when a user tries to get the profile information, 
	* but they have not created their profile yet.
	*
	* @param username The username of the user to create the information for.
	*/
	public void createUserInformationForEmail(String username) {
		
	} 

}
