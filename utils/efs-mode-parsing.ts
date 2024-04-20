import * as efs from 'aws-cdk-lib/aws-efs';

/**
 * Parse the performance mode string into an EFS PerformanceMode.
 * @param performanceMode The performance mode string to parse.
 * @returns The EFS PerformanceMode.
 */
export function parsePerformanceMode(performanceMode: string): efs.PerformanceMode {
  switch (performanceMode) {
    case 'GENERAL_PURPOSE':
      return efs.PerformanceMode.GENERAL_PURPOSE;
    case 'MAX_IO':
      return efs.PerformanceMode.MAX_IO;
    default:
      throw new Error(`Invalid performance mode: ${performanceMode}`);
  }
}

/**
 * Parse the throughput mode string into an EFS ThroughputMode.
 * @param throughputMode The throughput mode string to parse.
 * @returns The EFS ThroughputMode.
 */
export function parseThroughputMode(throughputMode: string): efs.ThroughputMode {
  switch (throughputMode) {
    case 'BURSTING':
      return efs.ThroughputMode.BURSTING;
    case 'PROVISIONED':
      return efs.ThroughputMode.PROVISIONED;
    case 'ELASTIC':
      return efs.ThroughputMode.ELASTIC;
    default:
      throw new Error(`Invalid throughput mode: ${throughputMode}`);
  }
}
