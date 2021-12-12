import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import {
  Effect,
  ManagedPolicy,
  PolicyStatement,
  User,
} from 'aws-cdk-lib/aws-iam';
import { CfnAssignment, CfnPermissionSet } from 'aws-cdk-lib/aws-sso';
import { Construct } from 'constructs';

export class BoundariesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ssoArn = 'arn:aws:sso:::instance/ssoins-68041a26411fce11';

    const developer = new CfnPermissionSet(this, 'DeveloperPermissionsSet', {
      instanceArn: ssoArn,
      name: 'Developer',
      description: 'Power user role granted to users in preview environments',
      managedPolicies: ['arn:aws:iam::aws:policy/PowerUserAccess'],
    });

    const support = new CfnPermissionSet(this, 'SupportPermissionsSet', {
      instanceArn: ssoArn,
      name: 'Support',
      description:
        'Support user role granted to users in production environment',
      managedPolicies: ['arn:aws:iam::aws:policy/job-function/SupportUser'],
    });

    const IAMBoundary = new ManagedPolicy(this, 'IAMBoundary', {
      statements: [
        new PolicyStatement({
          effect: Effect.DENY,
          actions: ['iam:*'],
          resources: ['*'],
        }),
      ],
    });

    const user = new User(this, 'ExampleUser', {
      userName: 'jamesduffy1',
      permissionsBoundary: IAMBoundary,
      passwordResetRequired: true,
      password: SecretValue.plainText('Password!1'),
    });

    new CfnAssignment(this, 'GrantUserSSODeveloper', {
      instanceArn: ssoArn,
      permissionSetArn: developer.attrPermissionSetArn,
      principalId: user.userArn,
      principalType: 'USER',
      targetType: 'AWS_ACCOUNT',
      targetId: this.account,
    });

    new CfnAssignment(this, 'GrantUserSSOSupport', {
      instanceArn: ssoArn,
      permissionSetArn: support.attrPermissionSetArn,
      principalId: user.userArn,
      principalType: 'USER',
      targetType: 'AWS_ACCOUNT',
      targetId: this.account,
    });
  }
}
