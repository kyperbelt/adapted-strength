package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class SnatchServiceTest {

    private SnatchService snatchService;
    private SnatchRepository snatchRepository;

    @BeforeEach
    void setUp() {
        snatchRepository = mock(SnatchRepository.class);
        snatchService = new SnatchServiceImpl(snatchRepository);
    }

    @Test
    void testAddSnatchEntry() {
        // Create a snatch entry for testing
        Snatch snatchEntry = new Snatch();
        snatchEntry.setName("Test Athlete");
        snatchEntry.setWeightClass("90");
        snatchEntry.setGender('M');
        snatchEntry.setWeight(200.0f);

        // Mock the repository's save method to return the saved entry
        when(snatchRepository.save(any(Snatch.class))).thenReturn(snatchEntry);

        // Call the service method to add the entry
        Snatch savedSnatch = snatchService.addSnatchEntry(snatchEntry);

        // Verify that the saved snatch entry matches the expected entry
        assertEquals(snatchEntry.getName(), savedSnatch.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeleteSnatchEntry() {
        // Mock the repository's deleteById method
        Long snatchId = 1L;
        snatchService.deleteSnatchEntry(snatchId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(snatchRepository).deleteById(snatchId);
    }

    @Test
    void testGetTop10MaleAthletes() {
        // Create a list of Snatch objects for testing
        List<Snatch> maleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Snatch snatch = new Snatch();
            snatch.setName("Male Athlete " + i);
            snatch.setGender('M');
            snatch.setWeight(200.0f - i); // Decreasing weight for top 10
            maleAthletes.add(snatch);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(snatchRepository.findTop10ByGenderOrderByWeightDesc('M')).thenReturn(maleAthletes);

        // Call the service method to get top 10 male athletes
        List<Snatch> topMaleAthletes = snatchService.getTop10MaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topMaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10FemaleAthletes() {
        // Create a list of Snatch objects for testing
        List<Snatch> femaleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Snatch snatch = new Snatch();
            snatch.setName("Female Athlete " + i);
            snatch.setGender('W');
            snatch.setWeight(100.0f - i); // Decreasing weight for top 10
            femaleAthletes.add(snatch);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(snatchRepository.findTop10ByGenderOrderByWeightDesc('W')).thenReturn(femaleAthletes);

        // Call the service method to get top 10 male athletes
        List<Snatch> topFemaleAthletes = snatchService.getTop10FemaleAthletes();

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
            // Create a list of Snatch objects for testing
            List<Snatch> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Snatch snatch = new Snatch();
                snatch.setName("Male Athlete " + i);
                snatch.setGender('M');
                snatch.setWeightClass(String.valueOf(weightClass));
                snatch.setWeight(200 - i); // Increasing weight for top 10
                maleAthletes.add(snatch);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(snatchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Snatch> topMaleAthletes = snatchService.getTop10MaleAthletesByWeightClass(String.valueOf(weightClass));

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
            // Create a list of Snatch objects for testing
            List<Snatch> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Snatch snatch = new Snatch();
                snatch.setName("Female Athlete " + i);
                snatch.setGender('W');
                snatch.setWeightClass(String.valueOf(weightClass));
                snatch.setWeight(100 - i); // Increasing weight for top 10
                femaleAthletes.add(snatch);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(snatchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 female athletes by weight class
            List<Snatch> topFemaleAthletes = snatchService.getTop10FemaleAthletesByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }
}
