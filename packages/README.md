# Conventions

Enforced conventions.

- Sync'd dependency chains with `npx syncpack format fix-mismatches`
- Keep an architecture diagram with `npx cdk-dia`

- [Conventions](#conventions)
  - [Packages](#packages)
    - [Bootstrap](#bootstrap)
    - [Base](#base)
    - [Infrastructure](#infrastructure)
    - [Services](#services)

## Packages

Packages follow a hierarchy based on the level of permissions required.

### Bootstrap

Configure SSO and OpenID Connect.

### Base

Create SSO permission sets, developer and support roles, and manage cross account access if required.

### Infrastructure

Create common components; like segregated data silos, observability tools, shared secrets, and VPC networking.

### Services

Create individual services, like and API Gateway with many lambdas and DynamoDB tables. The services may draw down from Infrastructure for common components.


