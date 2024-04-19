import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AwsEfsCreatorStackProps } from './AwsEfsCreatorStackProps';

export class AwsEfsCreatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsEfsCreatorStackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, `${props.resourcePrefix}-VPC`, {
      vpcId: props.vpcId,
    });
    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    // define a security group for EFS
    const efsSG = new ec2.SecurityGroup(this, `${props.resourcePrefix}-efsSG`, {
      securityGroupName: `${props.resourcePrefix}-efsSG`,
      vpc: vpc,
      allowAllOutbound: true,
    });
  }
}
