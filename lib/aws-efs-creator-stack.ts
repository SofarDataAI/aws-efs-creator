import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as efs from 'aws-cdk-lib/aws-efs';
import * as iam from 'aws-cdk-lib/aws-iam';
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
    efsSG.applyRemovalPolicy(removalPolicy);

    // create an EFS File System
    const efsFileSystem = new efs.FileSystem(this, `${props.resourcePrefix}-efsFileSystem`, {
      fileSystemName: `${props.resourcePrefix}-efsFileSystem`,
      vpc,
      removalPolicy,
      securityGroup: efsSG, // Ensure this security group allows NFS traffic from the ECS tasks
      encrypted: true, // Enable encryption at rest
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE, // For AI application, HCP application, Analytics application, and media processing workflows
      allowAnonymousAccess: false, // Disable anonymous access
      throughputMode: efs.ThroughputMode.ELASTIC,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_30_DAYS, // After 2 weeks, if a file is not accessed for given days, it will move to EFS Infrequent Access.
    });

    // add EFS access policy
    efsFileSystem.addToResourcePolicy(
        new iam.PolicyStatement({
            actions: ['elasticfilesystem:ClientMount'],
            principals: [new iam.AnyPrincipal()],
            conditions: {
                Bool: {
                    'elasticfilesystem:AccessedViaMountTarget': 'true'
                }
            },
        }),
    );

    // export efsSG id
    new cdk.CfnOutput(this, 'efsSG', {
      value: efsSG.securityGroupId,
      exportName: `${props.resourcePrefix}-efsSG`,
      description: 'The security group id for the EFS file system.',
    });

    // export efsFileSystem id
    new cdk.CfnOutput(this, 'efsFileSystemId', {
      value: efsFileSystem.fileSystemId,
      exportName: `${props.resourcePrefix}-efsFileSystemId`,
      description: 'The file system id for the EFS file system.',
    });
  }
}
