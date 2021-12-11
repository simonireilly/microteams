#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BaseStack } from '../lib/base-stack';
import { GithubActionsStack } from '../lib/github-actions-stack';

const app = new cdk.App();
new BaseStack(app, 'BaseStack', {});

new GithubActionsStack(app, 'GitHubActionsStack', {});
