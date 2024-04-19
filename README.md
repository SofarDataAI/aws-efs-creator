# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.
This project is designed to create and manage AWS EFS resources using AWS CDK. It automates the setup of a VPC, security groups, and an EFS file system tailored for various applications.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Project Setup

### Prerequisites

1. **Node.js**: You need to have Node.js installed on your machine. If it's not installed, download and install it from [nodejs.org](https://nodejs.org/).

2. **AWS CDK**: Install the AWS CDK Toolkit globally using npm:

   ```bash
   npm install -g aws-cdk
   ```

### Installation

After cloning the repository, run the following commands to install the necessary dependencies:

```bash
cd path/to/project
npm install
```

## Deploying to AWS

To deploy this stack to your default AWS account/region, use the following CDK command:

```bash
npx cdk deploy
```

Ensure that your AWS credentials are configured correctly by setting up the AWS CLI or exporting your credentials in your terminal session.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
