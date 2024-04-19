import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsEfsCreatorStackProps } from './AwsEfsCreatorStackProps';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEfsCreatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsEfsCreatorStackProps) {
    super(scope, id, props);

    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;
  }
}
