## 2024-04-20

### Added
- Added `PERFORMANCE_MODE` and `THROUGHPUT_MODE` environment variables.
- Added `parsePerformanceMode` and `parseThroughputMode` functions.
- Retrieved `performanceMode` and `throughputMode` from environment variables.
- Added `performanceMode` and `throughputMode` to stack props.
- Used `parsePerformanceMode` and `parseThroughputMode` to set `performanceMode` and `throughputMode` for EFS file system.
- Added `PERFORMANCE_MODE` and `THROUGHPUT_MODE` examples to `.env.example`.

### Changed
- Updated version to 0.1.3.

## 2024-04-19

### Added
- Added security check using `AwsSolutionsChecks` in `bin/aws-efs-creator.ts`.

### Changed
- Updated version from `0.1.1` to `0.1.2` in `package-lock.json` and `package.json`.
- Updated version of `aws-cdk-lib` from `2.137.0` to `2.138.0` in `package-lock.json` and `package.json`.
- Updated version of `cdk-nag` from `^2.28.91` to `^2.28.93` in `package-lock.json` and `package.json`.

## 2024-04-19

### Added
- Added `AwsEfsCreatorStack` class responsible for creating and configuring AWS EFS resources.
- Added project setup and deployment instructions to the `README.md` file.

### Changed
- Updated `package-lock.json` and `package.json` versions to 0.1.1.