package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import java.util.*;

public class PowerliftingServiceTest {

    private PowerliftingService powerliftingService;
    private PowerliftingRepository powerliftingRepository;

    @BeforeEach
    void setUp() {
        powerliftingRepository = mock(PowerliftingRepository.class);
        powerliftingService = new PowerliftingServiceImpl(powerliftingRepository);
    }

    @Test
    void testAddPowerliftingEntry() {
        // Create a Powerlifting entry for testing
        Powerlifting powerliftingEntry = new Powerlifting();
        powerliftingEntry.setName("Test Athlete");
        powerliftingEntry.setWeightClass("90");
        powerliftingEntry.setGender('M');
        powerliftingEntry.setSquat(200.0);
        powerliftingEntry.setBench(150.0);
        powerliftingEntry.setDeadlift(250.0);
        powerliftingEntry.setTotal(); // Automatically calculated based on squat, bench, and deadlift

        // Mock the repository's 'save' method to return the saved entry
        when(powerliftingRepository.save(any(Powerlifting.class))).thenReturn(powerliftingEntry);

        // Call the service method to add the entry
        Powerlifting savedPowerlifting = powerliftingService.addPowerliftingEntry(powerliftingEntry);

        // Verify that the saved Powerlifting entry matches the expected entry
        assertEquals(powerliftingEntry.getName(), savedPowerlifting.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeletePowerliftingEntry() {
        // Mock the repository's deleteById method
        Long powerliftingId = 1L;
        powerliftingService.deletePowerliftingEntry(powerliftingId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(powerliftingRepository).deleteById(powerliftingId);
    }

    @Test
    void testGetTop10MaleAthletesByAllWeightClasses() {
        List<Float> weightClasses = Arrays.asList(52f, 56f, 60f, 67.5f, 75f, 82.5f, 90f, 100f, 110f, 125f, 140f, 141f);
        for (Float weightClass : weightClasses) {
            List<Powerlifting> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Powerlifting powerlifting = new Powerlifting();
                powerlifting.setName("Male Athlete " + i);
                powerlifting.setGender('M');
                powerlifting.setWeightClass(String.valueOf(weightClass));
                powerlifting.setSquat(200 - i);
                powerlifting.setBench(200-i);
                powerlifting.setDeadlift(200-i);
                maleAthletes.add(powerlifting);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByTotalDesc method to return the list
            when(powerliftingRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Powerlifting> topMaleAthletes = powerliftingService.getTop10MalePowerliftersByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topMaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topMaleAthletes.get(i).getTotal() >= topMaleAthletes.get(i + 1).getTotal());
                assertEquals(String.valueOf(weightClass), topMaleAthletes.get(i).getWeightClass());
            }
        }
    }

    @Test
    void testGetTop10FemaleAthletesByAllWeightClasses() {
        List<Float> weightClasses = Arrays.asList(44f, 48f, 52f, 56f, 60f, 67.5f, 75f, 82.5f, 90f, 100f, 101f);
        for (Float weightClass : weightClasses) {
            List<Powerlifting> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Powerlifting powerlifting = new Powerlifting();
                powerlifting.setName("Female Athlete " + i);
                powerlifting.setGender('W');
                powerlifting.setWeightClass(String.valueOf(weightClass));
                powerlifting.setSquat(100 - i); // Increasing weight for top 10
                powerlifting.setBench(100-i);
                powerlifting.setDeadlift(100-i);
                femaleAthletes.add(powerlifting);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByTotalDesc method to return the list
            when(powerliftingRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Powerlifting> topFemaleAthletes = powerliftingService.getTop10FemalePowerliftersByWeightClass(String.valueOf(weightClass));

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            for (int i = 0; i < 9; i++) {
                assertTrue(topFemaleAthletes.get(i).getTotal() >= topFemaleAthletes.get(i + 1).getTotal());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }

}