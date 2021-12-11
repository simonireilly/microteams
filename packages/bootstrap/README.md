# Bootstrap

Account administration stack.

The bootstrap layer comprises security essentials, and foundational continuous delivery infrastructure.

- [Bootstrap](#bootstrap)
  - [Responsibilities](#responsibilities)
  - [Pre requisites](#pre-requisites)
  - [Creating CI/CD](#creating-cicd)

## Responsibilities

- Provide a secure way for github actions to assume a short lived role.
- Create SSO permission sets to assign to the users within your AWS Organisation.

## Pre requisites

- Create AWS account.
  - You will need access keys to deploy the bootstrap
  - I recommend that you follow aws control tower guided setup to create:
    - A root account with a SSO and Control Tower management login.

## Creating CI/CD

In order to ship code continuously we can use GitHub actions.

This stack uses OpenID Connect to issue temporary tokens with a grant of trust.

>You can read this guide to understand why this stack was written the way it was: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect

You need to put the cart before the horse at some point in deploying your AWS estate, you cannot start from a full CI/CD process.

In this instance, we want ot use GitHub to deploy a lot of AWS CDK Applications.

We first need to create a link between GitHub and the AWS Account using OpenID Connect.

We till want to control this, so a GitHub action which is manually dispatched.


