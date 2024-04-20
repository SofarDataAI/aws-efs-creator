import { StackProps } from "aws-cdk-lib";

export interface AwsEfsCreatorStackProps extends StackProps {
    /**
     * A prefix used for naming resources to ensure uniqueness across deployments.
     */
    readonly resourcePrefix: string;
    /**
     * The AWS region where resources will be deployed. Can be undefined for default region.
     */
    readonly deployRegion: string | undefined;
    /**
     * The deployment environment (e.g., dev, prod) for resource tagging and logical separation.
     */
    readonly deployEnvironment: string;
    /**
     * The name of the application, used for resource naming and tagging.
     */
    readonly appName: string;
    /**
     * The vpcId for the deployment.
     */
    readonly vpcId: string;
    /**
     * The performance mode for the EFS file system.
     */
    readonly performanceMode: string;
    /**
     * The throughput mode for the EFS file system.
     */
    readonly throughputMode: string;
}
