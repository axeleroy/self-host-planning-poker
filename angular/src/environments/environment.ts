// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfig } from '../app/model/environment-config';

export const environment: EnvironmentConfig = {
  production: false,
  backendRootOverride: 'http://localhost:5000/'
};
