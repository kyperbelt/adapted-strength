package com.terabite.programming.dto;

import java.util.List;

/**
 * UpdateDayRequest
 */
public record UpdateDayRequest(long id, String dayName, String dayDescription, List<Integer> repCycleIds) {
}
