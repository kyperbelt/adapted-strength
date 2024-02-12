package com.terabite.user;

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


}
