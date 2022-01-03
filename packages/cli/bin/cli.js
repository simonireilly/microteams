#! /usr/bin/env node
// See: https://github.com/jondot/hygen#build-your-own for how we might get started
//
// We want to create the new project, inside a current cdk project
//
//

const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');
const defaultTemplates = path.join(__dirname, '_templates');
const { execSync } = require('child_process');

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  createPrompter: () => require('enquirer'),
  exec: (action, body) => {
    console.info('Invoking exec');
    const opts = body && body.length > 0 ? { input: body } : {};
    console.info('Parsed opts', {
      action,
      opts,
      executor,
    });
    try {
      return execSync(action, opts);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  },
  debug: !!process.env.DEBUG,
});
