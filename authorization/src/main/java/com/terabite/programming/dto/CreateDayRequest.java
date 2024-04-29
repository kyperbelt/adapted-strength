package com.terabite.programming.dto;
import java.io.Serializable;
/**
 * CreateDayRequest
 */
public record CreateDayRequest(String dayName, String dayDescription) implements Serializable{
}
