---
to: <%= name %>/package.json
---
{
  "name": "<%= name %>",
  "version": "0.1.0",
  "bin": {
    "new": "bin/<%= name %>.js"
  },
  "dependencies": {
    "aws-cdk-lib": "2.3.0",
    "constructs": "10.0.0",
    "source-map-support": "0.5.16"
  },
  "devDependencies": {
    "@types/jest": "26.0.10",
    "@types/node": "10.17.27",
    "aws-cdk": "2.3.0",
    "jest": "26.4.2",
    "ts-jest": "26.2.0",
    "ts-node": "9.0.0",
    "typescript": "3.9.7"
  },
  "scripts": {
    "build": "tsc",
    "cdk": "cdk",
    "test": "jest",
    "watch": "tsc -w"
  }
}
