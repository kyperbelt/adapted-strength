package com.terabite.authorization.config;

import java.util.ArrayList;
import java.util.List;

public class RoleCongifuration {

    /**
     * Must contain all these roles to access the resource
     */
    private final List<String> all;
    /**
     * Must contain none of these roles to access the resource
     */
    private final List<String> except;
    /**
     * Must contain at least one of these roles to access the resource
     */
    private final List<String> any;

    public RoleCongifuration(List<String> all, List<String> except, List<String> any) {
        this.all = all;
        this.except = except;
        this.any = any;
    }

    public RoleCongifuration(List<String> all, List<String> except) {
        this.all = all;
        this.except = except;
        this.any = new ArrayList<String>(); 
    }

    public RoleCongifuration(List<String> all) {
        this.all = all;
        this.except = new ArrayList<String>();
        this.any = new ArrayList<String>();
    }

    public RoleCongifuration() {
        this.all = new ArrayList<String>();
        this.except = new ArrayList<String>();
        this.any = new ArrayList<String>();
    }

    public List<String> getAll() {
        return all;
    }

    public List<String> getExcept() {
        return except;
    }

    public List<String> getAny() {
        return any;
    }
    
    /**
     * Validates that the roles in the list are valid for this configuration
     *
     * @param roles
     * @return
     */
    public boolean validate(final List<String> roles) {
        // check that all roles are in the list
        for (String role : all) {
            if (!roles.contains(role)) {
                return false;
            }
        }

        // check that no roles are in the list
        for (String role : except) {
            if (roles.contains(role)) {
                return false;
            }
        }

        // check that at least one role is in the list
        for (String role : any) {
            if (roles.contains(role)) {
                return true;
            }
        }

        return any.isEmpty();
    }

    public static RoleConfigurationBuilder builder() {
        return new RoleConfigurationBuilder();
    }

    

    public static class RoleConfigurationBuilder{
        private List<String> all;
        private List<String> except;
        private List<String> any;

        private boolean allSet = false;
        private boolean exceptSet = false;
        private boolean anySet = false;

        public RoleConfigurationBuilder() {
            this.all = new ArrayList<String>();
            this.except = new ArrayList<String>();
            this.any = new ArrayList<String>();
        }

        public RoleConfigurationBuilder all(String... roles) {
            // check that roles in the list are unique and they are not 
            if (allSet) {
                throw new IllegalStateException("All roles already set for this confuguration. May only set Once!");
            }

            for (String role : roles) {
                all.add(role);
            }

            return this;
        }

        public RoleConfigurationBuilder except(String... roles) {
            if (exceptSet) {
                throw new IllegalStateException("Except roles already set for this confuguration. May only set Once!");
            }

            for (String role : roles) {
                except.add(role);
            }

            return this;
        }

        public RoleConfigurationBuilder any(String... roles) {
            if (anySet) {
                throw new IllegalStateException("Any roles already set for this confuguration. May only set Once!");
            }

            for (String role : roles) {
                any.add(role);
            }
            return this;
        }

        public RoleCongifuration build() {
            // check that roles in except are not in all or any
            for (String role : except) {
                if (all.contains(role) || any.contains(role)) {
                    throw new IllegalStateException("Role: " + role + " is in the except list and also in the all or any list");
                }
            }
            return new RoleCongifuration(all, except, any);
        }
    }

}
