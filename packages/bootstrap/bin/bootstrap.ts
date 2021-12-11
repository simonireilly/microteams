#!/usr/bin/env node
import 'source-map-support/register';
import { GithubActionsStack } from '../lib/github-actions-stack';
import { App, StackProps } from 'aws-cdk-lib';

export interface BaseAppProps extends StackProps {
  githubOrganisation: string;
  repository: string;
}

const app = new App();

new GithubActionsStack(app, 'GitHubActionsStack', {
  githubOrganisation: 'simonireilly',
  repository: 'microteams',
});
