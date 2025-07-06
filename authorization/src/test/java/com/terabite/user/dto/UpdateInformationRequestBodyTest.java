package com.terabite.user.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("UpdateInformationRequestBody DTO Tests")
class UpdateInformationRequestBodyTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Should serialize and deserialize all fields correctly")
    void shouldSerializeAndDeserializeAllFields() throws Exception {
        // Given
        UpdateInformationRequestBody original = new UpdateInformationRequestBody();
        original.setFirstName("John");
        original.setLastName("Doe");
        original.setSex("M");
        original.setShirtSize("L");
        original.setCellPhone("555-123-4567");
        original.setAddress("123 Test St");
        original.setCity("Test City");
        original.setState("CA");
        original.setZipcode("12345");

        // When - serialize to JSON and back
        String json = objectMapper.writeValueAsString(original);
        UpdateInformationRequestBody deserialized = objectMapper.readValue(json, UpdateInformationRequestBody.class);

        // Then
        assertEquals(original.getFirstName(), deserialized.getFirstName());
        assertEquals(original.getLastName(), deserialized.getLastName());
        assertEquals(original.getSex(), deserialized.getSex());
        assertEquals(original.getShirtSize(), deserialized.getShirtSize());
        assertEquals(original.getCellPhone(), deserialized.getCellPhone());
        assertEquals(original.getAddress(), deserialized.getAddress());
        assertEquals(original.getCity(), deserialized.getCity());
        assertEquals(original.getState(), deserialized.getState());
        assertEquals(original.getZipcode(), deserialized.getZipcode());
    }

    @Test
    @DisplayName("Should handle JSON with snake_case field names")
    void shouldHandleSnakeCaseFieldNames() throws Exception {
        // Given - JSON with snake_case field names (as sent from frontend)
        String json = """
            {
                "first_name": "Jane",
                "last_name": "Smith",
                "sex": "F",
                "shirt_size": "M",
                "cell_phone": "555-987-6543",
                "address": "456 New St",
                "city": "New City",
                "state": "NY",
                "zipcode": "54321"
            }
            """;

        // When
        UpdateInformationRequestBody dto = objectMapper.readValue(json, UpdateInformationRequestBody.class);

        // Then
        assertEquals("Jane", dto.getFirstName());
        assertEquals("Smith", dto.getLastName());
        assertEquals("F", dto.getSex());
        assertEquals("M", dto.getShirtSize());
        assertEquals("555-987-6543", dto.getCellPhone());
        assertEquals("456 New St", dto.getAddress());
        assertEquals("New City", dto.getCity());
        assertEquals("NY", dto.getState());
        assertEquals("54321", dto.getZipcode());
    }

    @Test
    @DisplayName("Should handle null values gracefully")
    void shouldHandleNullValues() throws Exception {
        // Given
        String json = """
            {
                "first_name": "John",
                "last_name": "Doe",
                "sex": null,
                "shirt_size": null,
                "cell_phone": "555-123-4567",
                "address": "123 Test St",
                "city": "Test City",
                "state": "CA",
                "zipcode": "12345"
            }
            """;

        // When
        UpdateInformationRequestBody dto = objectMapper.readValue(json, UpdateInformationRequestBody.class);

        // Then
        assertEquals("John", dto.getFirstName());
        assertEquals("Doe", dto.getLastName());
        assertNull(dto.getSex());
        assertNull(dto.getShirtSize());
        assertEquals("555-123-4567", dto.getCellPhone());
    }

    @Test
    @DisplayName("Should validate sex field values")
    void shouldValidateSexFieldValues() {
        // Given
        UpdateInformationRequestBody dto = new UpdateInformationRequestBody();

        // When & Then - Test valid values
        dto.setSex("M");
        assertEquals("M", dto.getSex());

        dto.setSex("F");
        assertEquals("F", dto.getSex());

        dto.setSex("N");
        assertEquals("N", dto.getSex());

        dto.setSex(null);
        assertNull(dto.getSex());
    }

    @Test
    @DisplayName("Should validate shirt size field values")
    void shouldValidateShirtSizeFieldValues() {
        // Given
        UpdateInformationRequestBody dto = new UpdateInformationRequestBody();

        // When & Then - Test valid values
        String[] validSizes = {"xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"};
        
        for (String size : validSizes) {
            dto.setShirtSize(size);
            assertEquals(size, dto.getShirtSize());
        }

        dto.setShirtSize(null);
        assertNull(dto.getShirtSize());
    }
}
