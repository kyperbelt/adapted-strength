---
Title: Adapted Strength Coding Standards
Version: 1.0.0
---

## Document Disclaimer and Purpose
This document contains the coding that for the Adapted Straength website.
Ideally, this is a living document that improves as the team decides coding standards, and serves as a single source of truth on how the project should be structured.

## Document Standards

### Document Version
This docuemnt SHALL be versioned as follows: Major. Minor. Patch. These are defined as follows.
- A change in the major version SHALL signify major changes to this docuement, such as adding or removing large sections of this document. 
- A change in the minor version SHALL signfiy minor changes to this document, such as reworking a section that does not effect the wider document.
- A change in the patch version SHALL signify changes that do not effect the understanding of this doucment, such as rewording sections for clarity, or fixing spelling or grammar

### Document Standards
This document SHALL follow RFC standards [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) and [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).
These standards establish the following:
 - MUST, REQUIRED, and SHALL are to be used to establish hard requirements that MUST be met to meet acceptence criteria.
 - MUST NOT, SHALL NOT are to be used to establish hard requirements that MUST be avoided in order to meet acceptence criteria.
 - SHOULD, RECOMMENDED are to be used to establish soft requirements that SHOULD be meet, but deviations are acceptable provided there is a good reason.
 - SHOULD NOT, NOT RECOMMENDED to be used to establish soft requirements that SHOULD be avoided, but deviations are acceptable provided there is a good reason.
 - MAY, OPTIONAL are to be used to establish OPTIONAL criteria whose implentation, or lack there of, is left to the developer. This MUST NOT effect core functionality.
 - The above interpretations SHALL only hold when the given word is fully capitalized

## Git and Version control standards
- Developers MUST NOT push directly to main. Instead, developers MUST develop feature branches, which are to be merged into main after review.
    - There SHALL be one exception: Developers can force push to main, for extreme circumstances. Usage of this exception SHOULD be avoided, and developers SHALL notify the team upon usage
- Developers SHOULD remove feature branches that are merged to main.
- Developers SHALL be subject to a code review before feature branches are to be merged to main.
    - Specfically, there MUST be at least one approval before a branch can be merged to main.
    - There SHALL be one exception: Developers can force push to main without review, for extreme circumstances. Usage of this exception SHOULD be avoided, and developers SHALL notify the team upon usage
- Developers SHALL format their commit messages using [yaml](https://learnxinyminutes.com/docs/yaml/) syntax.
- Developers SHALL prefix their PR name with the Jira Ticket
    - Example title: `[Adapted-##] Title of the PR`

## Microservice Standards

### Repository Standards
- Each microservice SHALL have it's own top level directory.
    - This directory SHALL be considered the root directory for the microservice.
- Each microservice SHOULD have it's own readme, for service specific information, rest endpoint documentation / usage, etc.

### Package Structure
The following package struture SHOULD be used:
- Each microservice SHALL have a package structure
- All application code and packages SHOULD live in `/src/main/**`
    - Java source code SHOULD live in `/src/main/java/**`
    - Web Controllers SHOULD live in `/src/main/java/**/web/`
    - Service specific code SHOULD live in `/src/main/java/**/core` or `/src/main/java/**/service`
    - Persistence related code, including repositories, models, and DTOs, should live in the `/src/main/java/**/data/**`
- All test code and packages SHOULD live in `/src/test/**`
    - The structure of unit testing code SHOULD mirror the application code exactly, starting from `/src/test/unit/**`
    - The structure of functional testing SHOULD be packaged based on the what function they target, starting from `/src/test/functional/**`
    - The structure of integration testing SHOULD be packaged based on their target, and SHOULD be ran against documentation standards and intended target, starting from `/src/test/integration/**`

### REST standards
- REST endpoints SHALL be versioned
    - Example:  `v1/endpoint/{resource}`
- REST endpoints SHALL be documented
    - Documentation SHOULD consist of the following:
        - HTTP Method and Endpoint
        - Accepted Parameters of both header and payload
        - Possible 2xx Response codes
        - Possible 4xx Response codes
        - Possible 5xx Reponse codes
        - Example payload and response

## Jira standards
    - Developers SHALL be responsible for updating their own tickets in JIRA
