# Bootstrap

Account administration stack.

The base layer comprises security essentials, and foundational continuous delivery infrastructure.

- [Bootstrap](#bootstrap)
  - [Responsibilities](#responsibilities)
  - [Getting Started](#getting-started)
  - [Bootstrapping](#bootstrapping)
  - [Creating CI/CD](#creating-cicd)

## Responsibilities

- IAM:
  - Format Roles, Policies, Permissions and Users in each organizational unit.

## Getting Started

Create AWS account

## Bootstrapping

Setup SSO guide with control tower.

## Creating CI/CD

In order to ship code continuously we can use GitHub actions.

This stack uses OpenID Connect to issue temporary tokens with a grant of trust.

>You can read this guide to understand why this stack was written the way it was: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect

You need to put the cart before the horse at some point in deploying your AWS estate, you cannot start from a full CI/CD process.



