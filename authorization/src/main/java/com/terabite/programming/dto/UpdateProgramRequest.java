package com.terabite.programming.dto;

import java.util.List;

/**
 * UpdateProgramRequest
 */
<<<<<<< HEAD
public record UpdateProgramRequest(long programId, String programName, String programDescription, List<Integer> weekIds) {
=======
public record UpdateProgramRequest(long id, String programName, String programDescription, List<Integer> weekIds) {
>>>>>>> program_management_redo
}
