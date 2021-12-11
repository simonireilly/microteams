# Micro Teams

**Bootstrapping your organisation for delivery on AWS**

>Find the git book version here: https://app.gitbook.com/s/PTLidBS6Vrblh1f6EYpk/

Micro-teams is a repo that highlights the organizational structure benefits of using the aws-cdk with GitHub OpenID Connect.

It is designed around a tiered approach to AWS privileges, but with full transparency to the organisation, via the mono-repo.

It also provides account level formatting functionality through the AWS CDK, to keep a single typescript tool chain and encourage cross team communication.

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

| Layer              | Privileges   | Users (If you are an Org of one, then you are all these users!) | Deployment                                                 | Description                                                                                                                              |
| ------------------ | ------------ | --------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1 -Bootstrap       | Far too high | Root Account Admin                                              | You must provide credentials to a manual trigger in GitHub | This stack can create and update the OpenID Connect link with GitHub that ships all code, and creates all users.                         |
| 2 -Base            | High         | Platform Teams, SecOps                                          | GitHub actions via OIDC assumed Role                       | A low-level cdk stack(s) for users, permission boundaries, formatting SSO permission sets and in general administrating your AWS estate. |
| 3 - Infrastructure | Medium       | Architects, Engineering Managers and                            | GitHub actions via OIDC assumed Role                       | A mid-level cdk stack(s) for creating shared components such as cross account event buses, central data warehouses and DNS management.   |
| 4 - Services       | Low          | Engineering                                                     | GitHub actions via OIDC assumed Role                       | A high-level stack(s) for creating products on top of the configured AWS estate                                                          |

## Strong conventions

In general following strong conventions is a great way to start out, and continue.

This isn't about being prescriptive, or limiting experimentation, its about:

- Following some known standard practices that correlate well to success.
- Choosing well established tools and frameworks that do the undifferentiated heavy lifting.

This really means you might bootstrap a project like:

```bash
npm init --force

yarn add --dev lerna syncpack

yarn lerna init --npm-client=yarn

yarn syncpack format fix-mismatches
```

Why? Convention, convention is others bringing well tested tools, with good documentation.
