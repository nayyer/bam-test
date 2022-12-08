// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  languageKey       : 'lang',
  themeKey          : 'theme',
  defaultLang:      'fa',
  accessTokenKey    : 'access',
  refreshTokenKey   : 'refresh',
  firebaseConfig :{
    apiKey: "AIzaSyCByFTdDwxgEvT1QzeWPmOQ1N4wJxjJtk0",
    authDomain: "bam-test-98ac0.firebaseapp.com",
    projectId: "bam-test-98ac0",
    storageBucket: "bam-test-98ac0.appspot.com",
    messagingSenderId: "905460066882",
    appId: "1:905460066882:web:758ac69f99d792cf50dbdb",
    measurementId: "G-MGLK0VX8E9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
