package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class CleanJerkServiceTest {

    private CleanJerkService cleanJerkService;
    private CleanJerkRepository cleanJerkRepository;

    @BeforeEach
    void setUp() {
        cleanJerkRepository = mock(CleanJerkRepository.class);
        cleanJerkService = new CleanJerkServiceImpl(cleanJerkRepository);
    }

    @Test
    void testAddCleanJerkEntry() {
        // Create a clean & jerk entry for testing
        CleanJerk cleanJerkEntry = new CleanJerk();
        cleanJerkEntry.setName("Test Athlete");
        cleanJerkEntry.setWeightClass("90");
        cleanJerkEntry.setGender('M');
        cleanJerkEntry.setWeight(200.0f);

        // Mock the repository's save method to return the saved entry
        when(cleanJerkRepository.save(any(CleanJerk.class))).thenReturn(cleanJerkEntry);

        // Call the service method to add the entry
        CleanJerk savedCleanJerk = cleanJerkService.addCleanJerkEntry(cleanJerkEntry);

        // Verify that the saved clean & jerk entry matches the expected entry
        assertEquals(cleanJerkEntry.getName(), savedCleanJerk.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeleteCleanJerkEntry() {
        // Mock the repository's deleteById method
        Long cleanJerkId = 1L;
        cleanJerkService.deleteCleanJerkEntry(cleanJerkId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(cleanJerkRepository).deleteById(cleanJerkId);
    }

    @Test
    void testGetTop10MaleAthletes() {
        // Create a list of CleanJerk objects for testing
        List<CleanJerk> maleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            CleanJerk cleanJerk = new CleanJerk();
            cleanJerk.setName("Male Athlete " + i);
            cleanJerk.setGender('M');
            cleanJerk.setWeight(200.0f - i); // Decreasing weight for top 10
            maleAthletes.add(cleanJerk);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(cleanJerkRepository.findTop10ByGenderOrderByWeightDesc('M')).thenReturn(maleAthletes);

        // Call the service method to get top 10 male athletes
        List<CleanJerk> topMaleAthletes = cleanJerkService.getTop10MaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topMaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10FemaleAthletes() {
        // Create a list of CleanJerk objects for testing
        List<CleanJerk> femaleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            CleanJerk cleanJerk = new CleanJerk();
            cleanJerk.setName("Female Athlete " + i);
            cleanJerk.setGender('W');
            cleanJerk.setWeight(100.0f - i); // Decreasing weight for top 10
            femaleAthletes.add(cleanJerk);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(cleanJerkRepository.findTop10ByGenderOrderByWeightDesc('W')).thenReturn(femaleAthletes);

        // Call the service method to get top 10 male athletes
        List<CleanJerk> topFemaleAthletes = cleanJerkService.getTop10FemaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topFemaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10MaleAthletesByAllWeightClasses() {
        List<String> weightClasses = Arrays.asList("55", "61", "67", "73", "81", "89", "96", "102", "109", "110");
        for (String weightClass : weightClasses) {
            // Create a list of CleanJerk objects for testing
            List<CleanJerk> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                CleanJerk cleanJerk = new CleanJerk();
                cleanJerk.setName("Male Athlete " + i);
                cleanJerk.setGender('M');
                cleanJerk.setWeightClass(String.valueOf(weightClass));
                cleanJerk.setWeight(200 - i); // Increasing weight for top 10
                maleAthletes.add(cleanJerk);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(cleanJerkRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<CleanJerk> topMaleAthletes = cleanJerkService.getTop10MaleAthletesByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topMaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topMaleAthletes.get(i).getWeightClass());
            }
        }
    }

    @Test
    void testGetTop10FemaleAthletesByAllWeightClasses() {
        List<String> weightClasses = Arrays.asList("45", "49", "55", "59", "64", "71", "76", "81", "87", "88");
        for (String weightClass : weightClasses) {
            // Create a list of CleanJerk objects for testing
            List<CleanJerk> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                CleanJerk cleanJerk = new CleanJerk();
                cleanJerk.setName("Female Athlete " + i);
                cleanJerk.setGender('W');
                cleanJerk.setWeightClass(String.valueOf(weightClass));
                cleanJerk.setWeight(100 - i); // Increasing weight for top 10
                femaleAthletes.add(cleanJerk);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(cleanJerkRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 female athletes by weight class
            List<CleanJerk> topFemaleAthletes = cleanJerkService.getTop10FemaleAthletesByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }
}
