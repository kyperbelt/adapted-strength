package com.terabite.leaderboard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

public class BenchServiceTest {

    private BenchService benchService;
    private BenchRepository benchRepository;

    @BeforeEach
    void setUp() {
        benchRepository = mock(BenchRepository.class);
        benchService = new BenchServiceImpl(benchRepository);
    }

    @Test
    void testAddBenchEntry() {
        // Create a bench entry for testing
        Bench benchEntry = new Bench();
        benchEntry.setName("Test Athlete");
        benchEntry.setWeightClass("90");
        benchEntry.setGender('M');
        benchEntry.setWeight(200.0f);

        // Mock the repository's save method to return the saved entry
        when(benchRepository.save(any(Bench.class))).thenReturn(benchEntry);

        // Call the service method to add the entry
        Bench savedBench = benchService.addBenchEntry(benchEntry);

        // Verify that the saved bench entry matches the expected entry
        assertEquals(benchEntry.getName(), savedBench.getName());
        // Add similar assertions for other fields
    }

    @Test
    void testDeleteBenchEntry() {
        // Mock the repository's deleteById method
        Long benchId = 1L;
        benchService.deleteBenchEntry(benchId);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(benchRepository).deleteById(benchId);
    }

    @Test
    void testGetTop10MaleAthletes() {
        // Create a list of Bench objects for testing
        List<Bench> maleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Bench bench = new Bench();
            bench.setName("Male Athlete " + i);
            bench.setGender('M');
            bench.setWeight(200.0f - i); // Decreasing weight for top 10
            maleAthletes.add(bench);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(benchRepository.findTop10ByGenderOrderByWeightDesc('M')).thenReturn(maleAthletes);

        // Call the service method to get top 10 male athletes
        List<Bench> topMaleAthletes = benchService.getTop10MaleAthletes();

        // Verify that the returned list contains 10 athletes and is sorted by weight
        assertEquals(10, topMaleAthletes.size());
        for (int i = 0; i < 9; i++) {
            assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
        }
    }

    @Test
    void testGetTop10FemaleAthletes() {
        // Create a list of Bench objects for testing
        List<Bench> femaleAthletes = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Bench bench = new Bench();
            bench.setName("Female Athlete " + i);
            bench.setGender('W');
            bench.setWeight(100.0f - i); // Decreasing weight for top 10
            femaleAthletes.add(bench);
        }

        // Mock the repository's findTop10ByGenderOrderByWeightDesc method to return the list
        when(benchRepository.findTop10ByGenderOrderByWeightDesc('W')).thenReturn(femaleAthletes);

        // Call the service method to get top 10 male athletes
        List<Bench> topFemaleAthletes = benchService.getTop10FemaleAthletes();

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
            // Create a list of Bench objects for testing
            List<Bench> maleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Bench bench = new Bench();
                bench.setName("Male Athlete " + i);
                bench.setGender('M');
                bench.setWeightClass(String.valueOf(weightClass));
                bench.setWeight(200 - i); // Increasing weight for top 10
                maleAthletes.add(bench);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(benchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'M')).thenReturn(maleAthletes);

            // Call the service method to get top 10 male athletes by weight class
            List<Bench> topMaleAthletes = benchService.getTop10MaleAthletesByWeightClass(String.valueOf(weightClass));

            // Print the list of top male athletes
            System.out.println("Top 10 Male Athletes:");
            for (Bench athlete : topMaleAthletes) {
                System.out.println(athlete.getName() + " - Weight: " + athlete.getWeight());
            }

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topMaleAthletes.size());
            System.out.println("");
            for (int i = 0; i < 9; i++) {
                System.out.println("Inside assertTrue Loop: Male Athlete " + i + " - Weight: " + topMaleAthletes.get(i).getWeight());
                assertTrue(topMaleAthletes.get(i).getWeight() >= topMaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topMaleAthletes.get(i).getWeightClass());
            }
        }
    }

    @Test
    void testGetTop10FemaleAthletesByAllWeightClasses() {
        List<Float> weightClasses = Arrays.asList(44f, 48f, 52f, 56f, 60f, 67.5f, 75f, 82.5f, 90f, 100f, 101f);
        for (Float weightClass : weightClasses) {
            // Create a list of Bench objects for testing
            List<Bench> femaleAthletes = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Bench bench = new Bench();
                bench.setName("Female Athlete " + i);
                bench.setGender('W');
                bench.setWeightClass(String.valueOf(weightClass));
                bench.setWeight(100 - i); // Increasing weight for top 10
                femaleAthletes.add(bench);
            }

            // Mock the repository's findTop10ByWeightClassAndGenderOrderByWeightDesc method to return the list
            when(benchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(String.valueOf(weightClass), 'W')).thenReturn(femaleAthletes);

            // Call the service method to get top 10 female athletes by weight class
            List<Bench> topFemaleAthletes = benchService.getTop10FemaleAthletesByWeightClass(String.valueOf(weightClass));

            // Print the list of top female athletes
            System.out.println("Top 10 Female Athletes:");
            for (Bench athlete : topFemaleAthletes) {
                System.out.println(athlete.getName() + " - Weight: " + athlete.getWeight());
            }

            // Verify that the returned list contains 10 athletes, is sorted by weight, and belongs to the specified weight class
            assertEquals(10, topFemaleAthletes.size());
            System.out.println("");
            for (int i = 0; i < 9; i++) {
                System.out.println("Inside assertTrue Loop: Female Athlete " + i + " - Weight: " + topFemaleAthletes.get(i).getWeight());
                assertTrue(topFemaleAthletes.get(i).getWeight() >= topFemaleAthletes.get(i + 1).getWeight());
                assertEquals(String.valueOf(weightClass), topFemaleAthletes.get(i).getWeightClass());
            }
        }
    }
}
