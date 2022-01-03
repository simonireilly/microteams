module.exports = [
  {
    type: 'select',
    name: 'command',
    message: 'Which build tool would you like',
    initial: 0,
    choices: [
      {
        name: 'cdk',
        message: 'aws-cdk v2',
        value: 'npx aws-cdk@2.x init app --language typescript',
      },
      {
        name: 'sst',
        message: 'serverless stack',
        value:
          'npx create-serverless-stack@latest <%= name %> --use-yarn --language typescript',
      },
    ],
  },
];
