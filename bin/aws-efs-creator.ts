#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { Aspects } from 'aws-cdk-lib';
import { ApplyTags } from '../utils/apply-tag';
import { AwsSolutionsChecks } from 'cdk-nag';
import { checkEnvVariables } from '../utils/check-environment-variable';
import { AwsEfsCreatorStackProps } from '../lib/AwsEfsCreatorStackProps';
import { AwsEfsCreatorStack } from '../lib/aws-efs-creator-stack';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();
const appAspects = Aspects.of(app);

// check environment variables
checkEnvVariables('APP_NAME',
'OWNER',
'VPC_ID',
'CDK_DEPLOY_REGION',
'ENVIRONMENT',
'PERFORMANCE_MODE',
'THROUGHPUT_MODE',
);

const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;

const cdkRegion = process.env.CDK_DEPLOY_REGION!;
const deployEnvironment = process.env.ENVIRONMENT!;

const appName = process.env.APP_NAME!;
const owner = process.env.OWNER!;
const vpcId = process.env.VPC_ID!;
const performanceMode = process.env.PERFORMANCE_MODE!;
const throughputMode = process.env.THROUGHPUT_MODE!;

// apply tags to all resources
appAspects.add(new ApplyTags({
  environment: deployEnvironment as 'development' | 'staging' | 'production' | 'demonstration',
  project: appName,
  owner: owner,
}));

// security check
appAspects.add(new AwsSolutionsChecks());

const stackProps: AwsEfsCreatorStackProps = {
  resourcePrefix: `${appName}-${deployEnvironment}`,
  env: {
    region: cdkRegion,
    account,
  },
  deployRegion: cdkRegion,
  deployEnvironment,
  appName,
  vpcId,
  performanceMode,
  throughputMode,
};
new AwsEfsCreatorStack(app, `AwsEfsCreatorStack`, {
  ...stackProps,
  stackName: `${appName}-${deployEnvironment}-${cdkRegion}-AwsEfsCreatorStack`,
  description: `AwsEfsCreatorStack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
});

app.synth();
