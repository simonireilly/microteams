#! /usr/bin/env node

const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');
const defaultTemplates = path.join(__dirname, '_templates');

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  createPrompter: () => require('enquirer'),
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {};
    return require('execa').shell(action, opts);
  },
  debug: !!process.env.DEBUG,
});
