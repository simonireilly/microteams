import { CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  OpenIdConnectPrincipal,
  Role,
  OpenIdConnectProvider,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Effect,
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
          'token.actions.githubusercontent.com:sub': `repo:${githubOrganisation}/${repository}:*`,
        },
      }
    );

    /**
     * Create a deployment role that has short lived credentials. The only
     * principal that can assume this role is the GitHub Open ID provider.
     */
    new Role(this, 'GitHubActionsRole', {
      assumedBy: GitHubPrincipal,
      description:
        'Role assumed by GitHubPrincipal for deploying from CI using aws cdk',
      roleName: 'github-ci-role',
      maxSessionDuration: Duration.hours(1),
      inlinePolicies: {
        CdkDeploymentPolicy: new PolicyDocument({
          assignSids: true,
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['sts:AssumeRole'],
              resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            }),
          ],
        }),
      },
    });
  }
}
