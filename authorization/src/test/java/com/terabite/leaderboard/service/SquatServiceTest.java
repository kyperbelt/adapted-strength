package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class SquatServiceTest {

    private SquatService squatService;
    private SquatRepository squatRepository;

    @BeforeEach
    void setUp() {
        squatRepository = mock(SquatRepository.class);
        squatService = new SquatServiceImpl(squatRepository);
    }

    @Test
    void testAddSquatEntry() {
        // Create a squat entry for testing
        Squat squatEntry = new Squat();
        squatEntry.setName("Test Athlete");
        squatEntry.setWeightClass("90");
        squatEntry.setGender('M');
        squatEntry.setWeight(200.0f);

        // Mock the repository's save method to return the saved entry
        when(squatRepository.save(any(Squat.class))).thenReturn(squatEntry);

        // Call the service method to add the entry
        Squat savedSquat = squatService.addSquatEntry(squatEntry);

        // Verify that the saved squat entry matches the expected entry
        assertEquals(squatEntry.getName(), savedSquat.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeleteSquatEntry() {
        // Mock the repository's deleteById method
        Long squatId = 1L;
        squatService.deleteSquatEntry(squatId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(squatRepository).deleteById(squatId);
    }

    @Test
    void testGetTop10MaleAthletes() {
        // Create a list of Squat objects for testing
        List<Squat> maleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Squat squat = new Squat();
            squat.setName("Male Athlete " + i);
            squat.setGender('M');
            squat.setWeight(200.0f - i); // Decreasing weight for top 10
            maleAthletes.add(squat);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(squatRepository.findTop10ByGenderOrderByWeightDesc('M')).thenReturn(maleAthletes);

        // Call the service method to get top 10 male athletes
        List<Squat> topMaleAthletes = squatService.getTop10MaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topMaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10FemaleAthletes() {
        // Create a list of Squat objects for testing
        List<Squat> femaleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Squat squat = new Squat();
            squat.setName("Female Athlete " + i);
            squat.setGender('W');
            squat.setWeight(100.0f - i); // Decreasing weight for top 10
            femaleAthletes.add(squat);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(squatRepository.findTop10ByGenderOrderByWeightDesc('W')).thenReturn(femaleAthletes);

        // Call the service method to get top 10 male athletes
        List<Squat> topFemaleAthletes = squatService.getTop10FemaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topFemaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10MaleAthletesByAllWeightClasses() {
        List<Float> weightClasses = Arrays.asList(52f, 56f, 60f, 67.5f, 75f, 82.5f, 90f, 100f, 110f, 125f, 140f, 141f);
        for (Float weightClass : weightClasses) {
            // Create a list of Squat objects for testing
            List<Squat> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Squat squat = new Squat();
                squat.setName("Male Athlete " + i);
                squat.setGender('M');
                squat.setWeightClass(String.valueOf(weightClass));
                squat.setWeight(200 - i); // Increasing weight for top 10
                maleAthletes.add(squat);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(squatRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Squat> topMaleAthletes = squatService.getTop10MaleAthletesByWeightClass(String.valueOf(weightClass));

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
        List<Float> weightClasses = Arrays.asList(44f, 48f, 52f, 56f, 60f, 67.5f, 75f, 82.5f, 90f, 100f, 101f);
        for (Float weightClass : weightClasses) {
            // Create a list of Squat objects for testing
            List<Squat> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Squat squat = new Squat();
                squat.setName("Female Athlete " + i);
                squat.setGender('W');
                squat.setWeightClass(String.valueOf(weightClass));
                squat.setWeight(100 - i); // Increasing weight for top 10
                femaleAthletes.add(squat);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(squatRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 female athletes by weight class
            List<Squat> topFemaleAthletes = squatService.getTop10FemaleAthletesByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }
}
