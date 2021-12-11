# Micro Teams

**Bootstrapping your organisation for delivery on AWS**

>Find the git book version here: https://app.gitbook.com/s/PTLidBS6Vrblh1f6EYpk/

Micro-teams is a repo that highlights the organizational structure benefits of using the aws-cdk to ship components or services, on top of shared infrastructure such as event streams. It also provides account level formatting functionality through the AWS CDK, to keep a single typescript tool chain and encourage cross team communication.

- [Micro Teams](#micro-teams)
  - [Using Micro teams](#using-micro-teams)
  - [Fundamentals](#fundamentals)
  - [Turtles all the way down](#turtles-all-the-way-down)
    - [Composition](#composition)
  - [Strong conventions](#strong-conventions)


## Using Micro teams

To get started developing your own world class AWS estate use the provided CLI.

The CLI will create a project structure with example CI pipelines for GitHub and CircleCI.

## Fundamentals

- Single monorepo management
- Base layer infrastructure for Roles, and Teams with the SSO and AWS CDK
- Shared layer infrastructure for common components like event streams
- Service layer infrastructure for decoupled services such as user management and web applications.

## Turtles all the way down

The focus on full-stack infrastructure as code for managing teams tends to develop toward:

- A platform team, that owns the AWS landing zone using terraform
- A collection of smaller service teams that are:
  - Given an new AWS account
  - Have actions restricted by permission boundaries and SSO roles

Micro teams provides all this as an example in infrastructure as code.

It is good to set out with the correct components in place, and at a low cost, so that the configuration is open and extensible.

### Composition

- Base (Privileges High)
  - A low-level cdk stack(s) for users, permission boundaries, creating CI credentials, formatting SSO permission sets and in general administrating your AWS estate.
  - Management by platform teams, SecOps.
- Shared (Privileges Medium)
  - A mid-level cdk stack(s) for creating shared components such as cross account event buses, central data warehouses and DNS management.
  - Management by architects, teams and engineering managers.
- Services
  - A high-level cdk stack(s) for creating feature components.
  - Management delegated to empowered teams.

## Strong conventions

In general following strong conventions is a great way to start out, and continue.

This isn't about being prescriptive, or limiting experimentation, its about:

- Following some known standard practices that correlate well to success.
- Choosing well established tools and frameworks that do the undifferentiated heavy lifting.

This really means you might bootstrap a project like:

```bash
npm init --force

yarn add --dev lerna typescript ts-jest @tsconfig/node14 syncpack

touch README.md tsconfig.json

yarn ts-jest config:init

yarn lerna init --npm-client=yarn

yarn syncpack format
yarn syncpack fix-mismatches
```

Why? Convention, convention is others bringing well tested tools, with good documentation.
