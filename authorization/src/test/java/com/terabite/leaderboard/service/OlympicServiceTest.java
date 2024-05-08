package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
//import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class OlympicServiceTest {

    private OlympicService olympicService;
    private OlympicRepository olympicRepository;

    @BeforeEach
    void setUp() {
        olympicRepository = mock(OlympicRepository.class);
        olympicService = new OlympicServiceImpl(olympicRepository);
    }

    @Test
    void testAddOlympicEntry() {
        // Create an Olympic entry for testing
        Olympic olympicEntry = new Olympic();
        olympicEntry.setName("Test Athlete");
        olympicEntry.setWeightClass("90");
        olympicEntry.setGender('M');
        olympicEntry.setSnatch(100.0);
        olympicEntry.setCleanJerk(150.0);
        olympicEntry.setTotal(); // Automatically calculated based on snatch and clean & jerk

        // Mock the repository's 'save' method to return the saved entry
        when(olympicRepository.save(any(Olympic.class))).thenReturn(olympicEntry);

        // Call the service method to add the entry
        Olympic savedOlympic = olympicService.addOlympicEntry(olympicEntry);

        // Verify that the saved Olympic entry matches the expected entry
        assertEquals(olympicEntry.getName(), savedOlympic.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeleteOlympicEntry() {
        // Mock the repository's deleteById method
        Long olympicId = 1L;
        olympicService.deleteOlympicEntry(olympicId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(olympicRepository).deleteById(olympicId);
    }


    @Test
    void testGetTop10MaleAthletesByAllWeightClasses() {
        List<String> weightClasses = Arrays.asList("55", "61", "67", "73", "81", "89", "96", "102", "109", "110");
        for (String weightClass : weightClasses) {
            // Create a list of Olympic objects for testing
            List<Olympic> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Olympic olympic = new Olympic();
                olympic.setName("Male Athlete " + i);
                olympic.setGender('M');
                olympic.setWeightClass(weightClass);
                olympic.setTotal(); // Decreasing total for top 10
                maleAthletes.add(olympic);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByTotalDesc method to return the list
            when(olympicRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Olympic> topMaleAthletes = olympicService.getTop10MaleAthletesByWeightClass(weightClass);

            // Verify that the returned list contains 10 athletes, is sorted by total, and belongs to the specified weight class
            assertEquals(10, topMaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topMaleAthletes.get(i).getTotal() >= topMaleAthletes.get(i + 1).getTotal());
                assertEquals(weightClass, topMaleAthletes.get(i).getWeightClass());
            }
        }
    }

    @Test
    void testGetTop10FemaleAthletesByAllWeightClasses() {
        List<String> weightClasses = Arrays.asList("45", "49", "55", "59", "64", "71", "76", "81", "87", "88");
        for (String weightClass : weightClasses) {
            // Create a list of Olympic objects for testing
            List<Olympic> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Olympic olympic = new Olympic();
                olympic.setName("Female Athlete " + i);
                olympic.setGender('W');
                olympic.setWeightClass(weightClass);
                olympic.setTotal(); // Decreasing total for top 10
                femaleAthletes.add(olympic);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByTotalDesc method to return the list
            when(olympicRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 female athletes by weight class
            List<Olympic> topFemaleAthletes = olympicService.getTop10FemaleAthletesByWeightClass(weightClass);

            // Verify that the returned list contains 10 athletes, is sorted by total, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getTotal() >= topFemaleAthletes.get(i + 1).getTotal());
                assertEquals(weightClass, topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }
}
