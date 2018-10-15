// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  department_url :"http://localhost:3005/department",
  //employee_url :"http://localhost:5000/api/employee",
  employee_url :"http://localhost:5309/api",
  posturl : 'http://localhost:3005/enroll',
 // employee_url: 'https://jsonplaceholder.typicode.com/users'
  
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
