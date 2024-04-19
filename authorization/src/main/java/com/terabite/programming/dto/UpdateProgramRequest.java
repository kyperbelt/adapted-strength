package com.terabite.programming.dto;

import java.util.List;

/**
 * UpdateProgramRequest
 */
public record UpdateProgramRequest(long id, String programName, String programDescription, List<Integer> weekIds) {
}
