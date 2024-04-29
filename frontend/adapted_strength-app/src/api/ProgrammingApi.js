import { HttpStatus, ApiUtils, AUTH_TOKEN_NAME } from "./ApiUtils";

/**
 * Programming API.
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This is only to call api calls, no need to create instance
export class ProgrammingApi {
  /**
   * Retrieves all programs.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  static getAllPrograms() {
    return ApiUtils.apiGet("programming/all_programs")
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting all programs: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting all programs:", error);
        throw error;
      });
  }

  static getProgram(programId) {
    return ApiUtils.apiGet(`programming/program/${programId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting program: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting program:", error);
        throw error;
      });
  }

  /**
   * Creates a new program.
   * @param {Object} programData - The data for the new program.
   * @param {string} programData.name - The name of the program.
   * @param {string} programData.description - The description of the program.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  static createProgram({ name, description }) {
    const program = {
      programName: name,
      programDescription: description,
    };

    return ApiUtils.apiPost("programming/program", program)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error creating program: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error creating program:", error);
        throw error;
      });
  }

  /**
   * Updates a program.
   * @param {Object} programData - The data for the program.
   * @param {string} programData.programId - The id of the program.
   * @param {string} programData.name - The name of the program.
   * @param {string} programData.description - The description of the program.
   * @param {Array} programData.weekIds - The ids of the weeks in the program.
   * @returns {Promise} A promise that resolves to the response from the API.
   * @throws {Error} If the API request fails.
   * @throws {Error} If the API request is not successful.
   *
   * @example
   * Example usage:
   * ProgrammingApi.editProgram({
   *  programId: '1',
   *  name: 'Program Name',
   *  description: 'Program Description',
   *  weekIds: ['1', '2']
   *  }).then((response) => {
   *  console.log('Program updated:', response);
   *  }
   */
  static updateProgram({ programId, name, description, weekIds = [] }) {
    const updateProgramRequest = {
      programId: programId,
      programName: name,
      programDescription: description,
      weekIds: weekIds,
    };

    return ApiUtils.apiPut("programming/program", updateProgramRequest)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error updating program: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error updating program:", error);
        throw error;
      });
  }

  static deleteProgram(programId) {
    return ApiUtils.apiDelete(`programming/program/${programId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error deleting program: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error deleting program:", error);
        throw error;
      });
  }

  static createWeek({ weekName, description }) {
    const week = {
      weekName: weekName,
      weekDescription: description,
    };

    return ApiUtils.apiPost("programming/week", week)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error creating week: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error creating week:", error);
        throw error;
      });
  }

  static updateWeek({ weekId, weekName, description, dayIds = [] }) {
    const updateWeekRequest = {
      id: weekId,
      weekName: weekName,
      weekDescription: description,
      dayIds: dayIds,
    };

    return ApiUtils.apiPut("programming/week", updateWeekRequest)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error updating week: ${weekId} status:${r.status}`);
      })
      .catch((error) => {
        console.error("Error updating week:", error);
        throw error;
      });
  }

  static getWeek(weekId) {
    return ApiUtils.apiGet(`programming/week/${weekId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting week: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting week:", error);
        throw error;
      });
  }

  static deleteWeek(weekId) {
    return ApiUtils.apiDelete(`programming/week/${weekId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error deleting week: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error deleting week:", error);
        throw error;
      });
  }

  static getAllWeeks() {
    return ApiUtils.apiGet("programming/all_weeks")
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting all weeks: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting all weeks:", error);
        throw error;
      });
  }

  static createDay({ dayName, description }) {
    const day = {
      dayName: dayName,
      dayDescription: description,
    };

    return ApiUtils.apiPost("programming/day", day)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error creating day: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error creating day:", error);
        throw error;
      });
  }

  static updateDay({ dayId, dayName, description, cycles = [] }) {
    const updateDayRequest = {
      id: dayId,
      dayName: dayName,
      dayDescription: description,
      repCycleIds: cycles,
    };

    return ApiUtils.apiPut("programming/day", updateDayRequest)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error updating day: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error updating day:", error);
        throw error;
      });
  }

  static getDay(dayId) {
    return ApiUtils.apiGet(`programming/day/${dayId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting day: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting day:", error);
        throw error;
      });
  }

  static deleteDay(dayId) {
    return ApiUtils.apiDelete(`programming/day/${dayId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error deleting day: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error deleting day:", error);
        throw error;
      });
  }

  static getAllDays() {
    return ApiUtils.apiGet("programming/all_days")
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting all days: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting all days:", error);
        throw error;
      });
  }

  static createCycle({
    cycleName,
    equipment,
    numSets,
    numReps,
    weight,
    restTime,
    coachNotes,
    workoutOrder,
    movementId,
  }) {
    const cycle = {
      repCycleName: cycleName,
      equipment: equipment,
      numSets: numSets,
      numReps: numReps,
      weight: weight,
      restTime: restTime,
      coachNotes: coachNotes,
      workoutOrder: workoutOrder,
      movementId: movementId,
    };

    return ApiUtils.apiPost("programming/rep_cycle", cycle)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error creating cycle: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error creating cycle:", error);
        throw error;
      });
  }

  static updateCycle({
    repCycleId,
    cycleName,
    equipment,
    numSets,
    numReps,
    weight,
    restTime,
    coachNotes,
    workoutOrder,
    movementId,
  }) {
    const updateCycleRequest = {
      id: repCycleId,
      repCycleName: cycleName,
      equipment: equipment,
      numSets: numSets,
      numReps: numReps,
      weight: weight,
      restTime: restTime,
      coachNotes: coachNotes,
      workoutOrder: workoutOrder,
      movementId: movementId,
    };

    return ApiUtils.apiPut("programming/rep_cycle", updateCycleRequest)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error updating cycle: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error updating cycle:", error);
        throw error;
      });
  }

  static getCycle(cycleId) {
    return ApiUtils.apiGet(`programming/rep_cycle/${cycleId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting cycle: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting cycle:", error);
        throw error;
      });
  }

  static deleteCycle(cycleId) {
    return ApiUtils.apiDelete(`programming/rep_cycle/${cycleId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r;
        }
        throw new Error(`Error deleting cycle: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error deleting cycle:", error);
        throw error;
      });
  }

  static getAllCycles() {
    return ApiUtils.apiGet("programming/all_rep_cycles")
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error getting all cycles: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error getting all cycles:", error);
        throw error;
      });
  }

  static duplicateProgram(program) {
    return ApiUtils.apiPost(`programming/program/duplicate/${program.id}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error duplicating program: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error duplicating program:", error);
        throw error;
      });
  }

  static duplicateWeek(week) {
    return ApiUtils.apiPost(`programming/week/duplicate/${week.weekId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error duplicating week: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error duplicating week:", error);
        throw error;
      });
  }

  static duplicateDay(day) {
    return ApiUtils.apiPost(`programming/day/duplicate/${day.dayId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error duplicating day: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error duplicating day:", error);
        throw error;
      });
  }

  static duplicateCycle(cycle) {
    return ApiUtils.apiPost(
      `programming/rep_cycle/duplicate/${cycle.repCycleId}`
    )
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(`Error duplicating cycle: ${r.status}`);
      })
      .catch((error) => {
        console.error("Error duplicating cycle:", error);
        throw error;
      });
  }

  static getAllUserProgrammingForProgram(programId) {
    return ApiUtils.apiGet(`programming/user_programs/${programId}`)
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          return r.data;
        }
        throw new Error(
          `Error getting all user programming for program: ${r.status}`
        );
      })
      .catch((error) => {
        console.error("Error getting all user programming for program:", error);
        throw error;
      });
  }

  static getCurrentWeek(startDate, startWeek) {
    return (
      Math.floor(
        (new Date() - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000)
      ) + startWeek
    );
  }
}
