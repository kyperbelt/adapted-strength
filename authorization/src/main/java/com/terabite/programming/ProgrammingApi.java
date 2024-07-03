package com.terabite.programming;

import com.terabite.programming.model.Day;
import com.terabite.programming.model.Program;
import com.terabite.programming.model.RepCycle;
import com.terabite.programming.model.Week;
import com.terabite.programming.repository.DayRepository;
import com.terabite.programming.repository.ProgramRepository;
import com.terabite.programming.repository.RepCycleRepository;
import com.terabite.programming.repository.WeekRepository;
import java.util.List;
import java.util.Optional;

/**
 * ProgrammingApi
 */
public class ProgrammingApi {

    ProgramRepository programRepository;
    WeekRepository weekRepository;
    DayRepository dayRepository;
    RepCycleRepository repCycleRepository;

    public ProgrammingApi(ProgramRepository programRepository,
                          WeekRepository weekRepository,
                          DayRepository dayRepository,
                          RepCycleRepository repCycleRepository) {
        this.programRepository = programRepository;
        this.weekRepository = weekRepository;
        this.dayRepository = dayRepository;
        this.repCycleRepository = repCycleRepository;
    }

    public List<Program> getAllPrograms() {
		return programRepository.findAll();
	}

    public Optional<Program> getProgramById(long id) {
        return programRepository.findById(id);
    }

    public Optional<Week> getWeekById(long id) {
        return weekRepository.findById(id);
    }

    public Optional<Day> getDayById(long id) {
        return dayRepository.findById(id);
    }

    public Optional<RepCycle> getRepCycleById(long id) {
        return repCycleRepository.findById(id);
    }
}
