---
to: <%= name %>/bin/<%= name %>.ts
---
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BootstrapStack } from '../lib/bootstrap-stack';

const app = new cdk.App();

new BootstrapStack(app, 'BootstrapStack', {
  githubOrganisation: '',
  repository: ''
});
