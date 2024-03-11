package com.terabite.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RoleConfiguration {

    /**
     * Must contain all these roles to access the resource
     */
    private final List<Roles> all;
    /**
     * Must contain none of these roles to access the resource
     */
    private final List<Roles> except;
    /**
     * Must contain at least one of these roles to access the resource
     */
    private final List<Roles> any;

    public RoleConfiguration(List<Roles> all, List<Roles> except, List<Roles> any) {
        this.all = all;
        this.except = except;
        this.any = any;
    }

    public RoleConfiguration(List<Roles> all, List<Roles> except) {
        this.all = all;
        this.except = except;
        this.any = new ArrayList<Roles>();
    }

    public RoleConfiguration(List<Roles> all) {
        this.all = all;
        this.except = new ArrayList<Roles>();
        this.any = new ArrayList<Roles>();
    }

    public RoleConfiguration() {
        this.all = new ArrayList<Roles>();
        this.except = new ArrayList<Roles>();
        this.any = new ArrayList<Roles>();
    }

    public List<Roles> getAll() {
        return all;
    }

    public List<Roles> getExcept() {
        return except;
    }

    public List<Roles> getAny() {
        return any;
    }

    @Override
    public String toString() {
        return "\nRoleConfiguration{\n" +
                "\tall=" + all + "\n" +
                "\texcept=" + except + "\n" +
                "\tany=" + any + "\n" +
                "}";
    }

    public boolean validateStringListOfRoles(final List<String> roles) {
        List<Roles> rolesEnum = roles.stream().map(role -> Roles.getRoleByName(role)).filter(role -> role.isPresent())
                .map(role -> role.get()).toList();
        return validateRolesList(rolesEnum);
    }

    /**
     * Validates that the roles in the list are valid for this configuration
     *
     * @param roles
     * @return
     */
    public boolean validateRolesList(final List<Roles> roles) {
        // check that all roles are in the list
        for (Roles role : all) {
            if (!roles.contains(role)) {
                return false;
            }
        }

        // check that no roles are in the list
        for (Roles role : except) {
            if (roles.contains(role)) {
                return false;
            }
        }

        // check that at least one role is in the list
        for (Roles role : any) {
            if (roles.contains(role)) {
                return true;
            }
        }

        return any.isEmpty();
    }

    public List<Roles> getAllMissing(final List<Roles> roles) {
        List<Roles> missing = new ArrayList<Roles>();
        for (Roles role : all) {
            if (!roles.contains(role)) {
                missing.add(role);
            }
        }
        return missing;
    }

    public List<Roles> getExceptPresent(final List<Roles> roles) {
        List<Roles> present = new ArrayList<Roles>();
        for (Roles role : except) {
            if (roles.contains(role)) {
                present.add(role);
            }
        }
        return present;
    }

    public List<Roles> getAnyMissing(final List<Roles> roles) {
        List<Roles> missing = new ArrayList<Roles>();
        for (Roles role : any) {
            if (!roles.contains(role)) {
                missing.add(role);
            }
        }
        return missing;
    }

    public Map<String, List<Roles>> getMissingRoles(final List<String> roles) {
        List<Roles> rolesEnum = roles.stream().map(role -> Roles.getRoleByName(role)).filter(role -> role.isPresent())
                .map(role -> role.get()).toList();
        Map<String, List<Roles>> missing = new HashMap<String, List<Roles>>();
        missing.put("all", getAllMissing(rolesEnum));
        missing.put("except", getExceptPresent(rolesEnum));
        missing.put("any", getAnyMissing(rolesEnum));
        return missing;
    }

    public static RoleConfigurationBuilder builder() {
        return new RoleConfigurationBuilder();
    }

    public static class RoleConfigurationBuilder {
        private List<Roles> all;
        private List<Roles> except;
        private List<Roles> any;

        private boolean allSet = false;
        private boolean exceptSet = false;
        private boolean anySet = false;

        public RoleConfigurationBuilder() {
            this.all = new ArrayList<Roles>();
            this.except = new ArrayList<Roles>();
            this.any = new ArrayList<Roles>();
        }

        public RoleConfigurationBuilder all(Roles... roles) {
            // check that roles in the list are unique and they are not
            if (allSet) {
                throw new IllegalStateException("All roles already set for this confuguration. May only set Once!");
            }

            for (Roles role : roles) {
                all.add(role);
            }

            return this;
        }

        public RoleConfigurationBuilder except(Roles... roles) {
            if (exceptSet) {
                throw new IllegalStateException("Except roles already set for this confuguration. May only set Once!");
            }

            for (Roles role : roles) {
                except.add(role);
            }

            return this;
        }

        public RoleConfigurationBuilder any(Roles... roles) {
            if (anySet) {
                throw new IllegalStateException("Any roles already set for this confuguration. May only set Once!");
            }

            for (Roles role : roles) {
                any.add(role);
            }
            return this;
        }

        public RoleConfiguration build() {
            // check that roles in except are not in all or any
            for (Roles role : except) {
                if (all.contains(role) || any.contains(role)) {
                    throw new IllegalStateException(
                            "Role: " + role + " is in the except list and also in the all or any list");
                }
            }
            return new RoleConfiguration(all, except, any);
        }
    }

}
