package com.terabite.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.user.model.UserInformation;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Signup Form Data Processing Tests")
class SignupFormDataTest {

    @Test
    @DisplayName("Should properly deserialize UserInformation with sex and shirt_size from JSON")
    void shouldDeserializeUserInformationWithSexAndShirtSize() throws Exception {
        // Given - JSON payload similar to what frontend sends during signup
        String jsonPayload = """
            {
                "first_name": "John",
                "last_name": "Doe",
                "date_of_birth": "1990-01-01",
                "email": "john.doe@example.com",
                "sex": "M",
                "shirt_size": "L",
                "cell_phone": "555-123-4567",
                "home_phone": "555-123-4567",
                "address": {
                    "address": "123 Test St",
                    "city": "Test City",
                    "state": "CA",
                    "zipcode": "12345"
                },
                "emergency_contact": {
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "phone_number": "555-987-6543"
                },
                "how_did_you_hear": "Friend"
            }
            """;

        // When
        ObjectMapper objectMapper = new ObjectMapper();
        UserInformation userInfo = objectMapper.readValue(jsonPayload, UserInformation.class);

        // Then
        assertNotNull(userInfo);
        assertEquals("John", userInfo.getFirstName());
        assertEquals("Doe", userInfo.getLastName());
        assertEquals("M", userInfo.getSex());
        assertEquals("L", userInfo.getShirtSize());
        assertEquals("john.doe@example.com", userInfo.getEmail());
        assertEquals("555-123-4567", userInfo.getCellPhone());
        assertEquals("Friend", userInfo.getHowDidYouHear());
        
        // Verify address is properly nested
        assertNotNull(userInfo.getAddress());
        assertEquals("123 Test St", userInfo.getAddress().getAddress());
        assertEquals("Test City", userInfo.getAddress().getCity());
        assertEquals("CA", userInfo.getAddress().getState());
        assertEquals("12345", userInfo.getAddress().getZipcode());
        
        // Verify emergency contact is properly nested
        assertNotNull(userInfo.getEmergencyContact());
        assertEquals("Jane", userInfo.getEmergencyContact().getFirstName());
        assertEquals("Doe", userInfo.getEmergencyContact().getLastName());
        assertEquals("555-987-6543", userInfo.getEmergencyContact().getPhoneNumber());
    }

    @Test
    @DisplayName("Should handle null sex and shirt_size values during signup")
    void shouldHandleNullSexAndShirtSizeInSignup() throws Exception {
        // Given - JSON with null sex and shirt_size
        String jsonPayload = """
            {
                "first_name": "John",
                "last_name": "Doe",
                "date_of_birth": "1990-01-01",
                "email": "john.doe@example.com",
                "sex": null,
                "shirt_size": null,
                "cell_phone": "555-123-4567",
                "home_phone": "555-123-4567",
                "how_did_you_hear": "Friend"
            }
            """;

        // When
        ObjectMapper objectMapper = new ObjectMapper();
        UserInformation userInfo = objectMapper.readValue(jsonPayload, UserInformation.class);

        // Then
        assertNotNull(userInfo);
        assertEquals("John", userInfo.getFirstName());
        assertEquals("Doe", userInfo.getLastName());
        assertNull(userInfo.getSex());
        assertNull(userInfo.getShirtSize());
    }

    @Test
    @DisplayName("Should validate shirt size field pattern during signup")
    void shouldValidateShirtSizeFieldPattern() throws Exception {
        // Given - JSON with valid shirt size values that match frontend options
        String[] validShirtSizes = {"xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"};
        
        for (String shirtSize : validShirtSizes) {
            String jsonPayload = String.format("""
                {
                    "first_name": "John",
                    "last_name": "Doe",
                    "date_of_birth": "1990-01-01",
                    "email": "john.doe@example.com",
                    "sex": "M",
                    "shirt_size": "%s",
                    "cell_phone": "555-123-4567",
                    "how_did_you_hear": "Friend"
                }
                """, shirtSize);

            // When
            ObjectMapper objectMapper = new ObjectMapper();
            UserInformation userInfo = objectMapper.readValue(jsonPayload, UserInformation.class);

            // Then
            assertNotNull(userInfo);
            assertEquals(shirtSize, userInfo.getShirtSize());
            
            // Verify validation passes
            Set<ConstraintViolation<UserInformation>> violations =
                Validation.buildDefaultValidatorFactory().getValidator().validate(userInfo);
            assertTrue(violations.isEmpty(), 
                String.format("Validation failed for shirt size '%s': %s", 
                    shirtSize, violations.toString()));
        }
    }
}
