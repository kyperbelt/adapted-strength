package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class DeadliftServiceTest {

    private DeadliftService deadliftService;
    private DeadliftRepository deadliftRepository;

    @BeforeEach
    void setUp() {
        deadliftRepository = mock(DeadliftRepository.class);
        deadliftService = new DeadliftServiceImpl(deadliftRepository);
    }

    @Test
    void testAddDeadliftEntry() {
        // Create a deadlift entry for testing
        Deadlift deadliftEntry = new Deadlift();
        deadliftEntry.setName("Test Athlete");
        deadliftEntry.setWeightClass("90");
        deadliftEntry.setGender('M');
        deadliftEntry.setWeight(200.0f);

        // Mock the repository's save method to return the saved entry
        when(deadliftRepository.save(any(Deadlift.class))).thenReturn(deadliftEntry);

        // Call the service method to add the entry
        Deadlift savedDeadlift = deadliftService.addDeadliftEntry(deadliftEntry);

        // Verify that the saved deadlift entry matches the expected entry
        assertEquals(deadliftEntry.getName(), savedDeadlift.getName());
        assertEquals(deadliftEntry.getWeightClass(), savedDeadlift.getWeightClass());
        assertEquals(deadliftEntry.getGender(), savedDeadlift.getGender());
        assertEquals(deadliftEntry.getWeight(), savedDeadlift.getWeight());
    }

    @Test
    void testDeleteDeadliftEntry() {
        // Mock the repository's deleteById method
        Long deadliftId = 1L;
        deadliftService.deleteDeadliftEntry(deadliftId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(deadliftRepository).deleteById(deadliftId);
    }

    @Test
    void testGetTop10MaleAthletes() {
        // Create a list of CleanJerk objects for testing
        List<Deadlift> maleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Deadlift deadlift = new Deadlift();
            deadlift.setName("Male Athlete " + i);
            deadlift.setGender('M');
            deadlift.setWeight(200.0f - i); // Decreasing weight for top 10
            maleAthletes.add(deadlift);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(deadliftRepository.findTop10ByGenderOrderByWeightDesc('M')).thenReturn(maleAthletes);

        // Call the service method to get top 10 male athletes
        List<Deadlift> topMaleAthletes = deadliftService.getTop10MaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topMaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10FemaleAthletes() {
        // Create a list of CleanJerk objects for testing
        List<Deadlift> femaleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Deadlift deadlift = new Deadlift();
            deadlift.setName("Female Athlete " + i);
            deadlift.setGender('W');
            deadlift.setWeight(100.0f - i); // Decreasing weight for top 10
            femaleAthletes.add(deadlift);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(deadliftRepository.findTop10ByGenderOrderByWeightDesc('W')).thenReturn(femaleAthletes);

        // Call the service method to get top 10 male athletes
        List<Deadlift> topFemaleAthletes = deadliftService.getTop10FemaleAthletes();

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
            // Create a list of CleanJerk objects for testing
            List<Deadlift> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Deadlift deadlift = new Deadlift();
                deadlift.setName("Male Athlete " + i);
                deadlift.setGender('M');
                deadlift.setWeightClass(String.valueOf(weightClass));
                deadlift.setWeight(200 - i); // Increasing weight for top 10
                maleAthletes.add(deadlift);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(deadliftRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Deadlift> topMaleAthletes = deadliftService.getTop10MaleAthletesByWeightClass(String.valueOf(weightClass));

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
            // Create a list of CleanJerk objects for testing
            List<Deadlift> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Deadlift deadlift = new Deadlift();
                deadlift.setName("Female Athlete " + i);
                deadlift.setGender('W');
                deadlift.setWeightClass(String.valueOf(weightClass));
                deadlift.setWeight(100 - i); // Increasing weight for top 10
                femaleAthletes.add(deadlift);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(deadliftRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Deadlift> topFemaleAthletes = deadliftService.getTop10FemaleAthletesByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }


}
