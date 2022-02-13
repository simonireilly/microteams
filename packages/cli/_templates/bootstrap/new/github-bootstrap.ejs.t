---
to: .github/workflows/aws-cdk-bootstrap.yml
---
name: Bootstrap
on:
  workflow_dispatch:
    inputs:
      AWS_ACCESS_KEY_ID:
        description: "Access Key ID with Permissions to deploy IAM, and OIDC"
        required: true
      AWS_SECRET_ACCESS_KEY:
        description: "Secret Access Key with Permissions to deploy IAM, and OIDC"
        required: true
      AWS_REGION:
        description: "Region to deploy to."
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Git clone the repository
        uses: actions/checkout@v1

      - name: configure aws credentials
        uses: aws-actions/configure-aws-credentials@master
        with:
          aws-access-key-id: ${{ github.event.inputs.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ github.event.inputs.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ github.event.inputs.AWS_REGION }}

      - uses: actions/setup-node@v2
        with:
          node-version: "14"

      - run: yarn install

      - name: Synth stack
        run: yarn --cwd <%= directory %> cdk synth

      - name: Deploy stack
        run: yarn --cwd <%= directory %> cdk deploy --require-approval never
