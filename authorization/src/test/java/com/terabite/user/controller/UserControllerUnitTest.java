package com.terabite.user.controller;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.service.JwtService;
import com.terabite.common.model.LoginDetails;
import com.terabite.payment.service.CustomerService;
import com.terabite.user.UserApi;
import com.terabite.user.dto.UpdateInformationRequestBody;
import com.terabite.user.model.Address;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.HealthQuestionareService;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;
import com.terabite.user.service.UserProgrammingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserController Unit Tests")
class UserControllerUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserApi userApi;

    @Mock
    private SubscriptionService subscriptionService;

    @Mock
    private UnsubscribeService unsubscribeService;

    @Mock
    private HealthQuestionareService healthQuestionareService;

    @Mock
    private AuthorizationApi authorizationApi;

    @Mock
    private UserProgrammingService userProgrammingService;

    @Mock
    private CustomerService customerService;

    @Mock
    private JwtService jwtService;

    @Mock
    private LoginDetails mockLoginDetails;

    private UserController userController;
    private UserInformation testUser;
    private Address testAddress;

    @BeforeEach
    void setUp() {
        userController = new UserController(
            userApi,
            userProgrammingService,
            subscriptionService,
            healthQuestionareService,
            userRepository,
            unsubscribeService,
            authorizationApi,
            customerService,
            "authCookie",
            jwtService
        );

        // Create test address
        testAddress = new Address();
        testAddress.setAddress("123 Test St");
        testAddress.setCity("Test City");
        testAddress.setState("CA");
        testAddress.setZipcode("12345");

        // Create test user
        testUser = new UserInformation();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        testUser.setSex("M");
        testUser.setShirtSize("L");
        testUser.setCellPhone("555-123-4567");
        testUser.setAddress(testAddress);

        when(mockLoginDetails.getUsername()).thenReturn("test@example.com");
    }

    @Test
    @DisplayName("Should successfully update user profile with sex and shirt size")
    void shouldUpdateUserProfileWithSexAndShirtSize() {
        // Given
        UpdateInformationRequestBody updateRequest = new UpdateInformationRequestBody();
        updateRequest.setFirstName("Jane");
        updateRequest.setLastName("Smith");
        updateRequest.setSex("F");
        updateRequest.setShirtSize("XL");
        updateRequest.setCellPhone("555-987-6543");
        updateRequest.setAddress("456 New St");
        updateRequest.setCity("New City");
        updateRequest.setState("NY");
        updateRequest.setZipcode("54321");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(UserInformation.class))).thenReturn(testUser);

        // When
        ResponseEntity<?> response = userController.updateAccountInformation(mockLoginDetails, updateRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        
        // Verify that save was called with updated user
        verify(userRepository).save(argThat(user -> {
            assertEquals("Jane", user.getFirstName());
            assertEquals("Smith", user.getLastName());
            assertEquals("F", user.getSex());
            assertEquals("XL", user.getShirtSize());
            assertEquals("555-987-6543", user.getCellPhone());
            assertEquals("456 New St", user.getAddress().getAddress());
            assertEquals("New City", user.getAddress().getCity());
            assertEquals("NY", user.getAddress().getState());
            assertEquals("54321", user.getAddress().getZipcode());
            return true;
        }));
    }

    @Test
    @DisplayName("Should return 404 when user not found for update")
    void shouldReturn404WhenUserNotFoundForUpdate() {
        // Given
        UpdateInformationRequestBody updateRequest = new UpdateInformationRequestBody();
        updateRequest.setFirstName("Jane");
        updateRequest.setLastName("Smith");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = userController.updateAccountInformation(mockLoginDetails, updateRequest);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should successfully retrieve user profile")
    void shouldRetrieveUserProfile() {
        // Given
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // When
        ResponseEntity<?> response = userController.getProfile(mockLoginDetails);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Optional);
        
        @SuppressWarnings("unchecked")
        Optional<UserInformation> userOptional = (Optional<UserInformation>) response.getBody();
        assertTrue(userOptional.isPresent());
        
        UserInformation returnedUser = userOptional.get();
        assertEquals("John", returnedUser.getFirstName());
        assertEquals("Doe", returnedUser.getLastName());
        assertEquals("M", returnedUser.getSex());
        assertEquals("L", returnedUser.getShirtSize());
        assertEquals("test@example.com", returnedUser.getEmail());
    }

    @Test
    @DisplayName("Should handle null sex and shirt size in update")
    void shouldHandleNullSexAndShirtSizeInUpdate() {
        // Given
        UpdateInformationRequestBody updateRequest = new UpdateInformationRequestBody();
        updateRequest.setFirstName("Jane");
        updateRequest.setLastName("Smith");
        updateRequest.setSex(null);
        updateRequest.setShirtSize(null);
        updateRequest.setCellPhone("555-987-6543");
        updateRequest.setAddress("456 New St");
        updateRequest.setCity("New City");
        updateRequest.setState("NY");
        updateRequest.setZipcode("54321");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(UserInformation.class))).thenReturn(testUser);

        // When
        ResponseEntity<?> response = userController.updateAccountInformation(mockLoginDetails, updateRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        
        verify(userRepository).save(argThat(user -> {
            assertNull(user.getSex());
            assertNull(user.getShirtSize());
            return true;
        }));
    }
}
