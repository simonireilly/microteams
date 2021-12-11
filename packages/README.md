# Packages

Packages follow a hierarchy of:

- [Packages](#packages)
  - [Bootstrap](#bootstrap)
  - [Base](#base)
  - [Infrastructure](#infrastructure)
  - [Services](#services)

## Bootstrap

Configure SSO and OpenID Connect.

## Base

Create SSO permission sets, developer and support roles, and manage cross account access if required.

## Infrastructure

Create common components; like segregated data silos, observability tools, shared secrets, and VPC networking.

## Services

Create individual services, like and API Gateway with many lambdas and DynamoDB tables. The services may draw down from Infrastructure for common components.


