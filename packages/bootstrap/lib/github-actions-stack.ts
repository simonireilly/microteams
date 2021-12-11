import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  OpenIdConnectPrincipal,
  Policy,
  Role,
  OpenIdConnectProvider,
  ManagedPolicy,
} from 'aws-cdk-lib/aws-iam';
import { BaseAppProps } from '../bin/bootstrap';

export class GithubActionsStack extends Stack {
  constructor(scope: Construct, id: string, props: BaseAppProps) {
    super(scope, id, props);

    const { githubOrganisation, repository } = props;

    /**
     * Create an Identity provider for GitHub inside your AWS Account. This
     * allows GitHub to present itself to AWS IAM and assume a role.
     */
    const provider = new OpenIdConnectProvider(this, 'MyProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });

    /**
     * Create a principal for the OpenID; which can allow it to assume
     * deployment roles.
     */
    const GitHubPrincipal = new OpenIdConnectPrincipal(provider).withConditions(
      {
        StringLike: {
          'token.actions.githubusercontent.com:sub':
            'repo:simonireilly/microteams:*',
        },
      }
    );

    /**
     * Create a deployment role that has short lived credentials. The only
     * principal that can assume this role is the GitHub Open ID provider.
     */
    new Role(this, 'GitHubActionsRole', {
      assumedBy: GitHubPrincipal,
      description: 'Role assumed by GitHubPrincipal for deploying from CI',
      roleName: 'github-ci-role',
      maxSessionDuration: Duration.hours(1),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
      ],
    });
  }
}
