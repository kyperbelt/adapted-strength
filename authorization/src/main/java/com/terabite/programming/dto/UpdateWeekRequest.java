package com.terabite.programming.dto;

import java.util.List;

/**
 * UpdateWeekRequest
 */
public record UpdateWeekRequest(long id, String weekName, String weekDescription, List<Integer> dayIds) {

}
