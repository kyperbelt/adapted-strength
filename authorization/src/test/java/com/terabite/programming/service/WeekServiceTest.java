package com.terabite.programming.service;

import com.terabite.programming.model.Week;
import com.terabite.programming.repository.WeekRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WeekServiceTest {

    @Mock
    private WeekRepository weekRepository;

    private WeekService weekService;

    @BeforeEach
    public void setUp() {
        weekService = new WeekService(weekRepository);
    }

    @Test
    public void testGetWeekNotFound() {
        Week week = new Week();
        week.setWeekId(1);

        when(weekRepository.findById(week.getWeekId())).thenReturn(Optional.empty());

        ResponseEntity<?> response = weekService.getWeek(week);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(week, response.getBody());
    }

    @Test
    public void testGetWeekFound() {
        Week week = new Week();
        week.setWeekId(1);

        Week foundWeek = new Week();
        foundWeek.setWeekId(1);

        when(weekRepository.findById(week.getWeekId())).thenReturn(Optional.of(foundWeek));
        when(weekRepository.findOneByWeekId(week.getWeekId())).thenReturn(foundWeek);

        ResponseEntity<?> response = weekService.getWeek(week);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(foundWeek, response.getBody());
    }
}
