declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        /**
         * The regions where the CDK application will be deployed.
         */
        CDK_DEPLOY_REGION: string;
        /**
         * A comma-separated list of environments for the application, e.g., "dev,prod".
         */
        ENVIRONMENT: string;
        /**
         * The owner of the application.
         */
        OWNER: string;
        VPC_ID: string | undefined;
        PERFORMANCE_MODE: string | undefined;
        THROUGHPUT_MODE: string | undefined;
    }
}
