package com.terabite.authorization.gateway;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;

public class Utility
{
    private final HashMap<String, ArrayList<String>> validEndpoints;

    public Utility()
    {
        validEndpoints = new HashMap<>();
        ArrayList<String> endpoints = new ArrayList<>();
        endpoints.add("signup");
        endpoints.add("login");
        endpoints.add("logout");
        validEndpoints.put("POST", endpoints);
    }

    public HashMap<String, ArrayList<String>> getValidEndpoints()
    {
        return validEndpoints;
    }
}
