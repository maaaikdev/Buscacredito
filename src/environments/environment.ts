// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'AvI7MZug3dyIZk1JGFNDm+JOX28ruCgtA9I6d71C4Wg=',
  domain: 'localhost',
  gtmPruebas: true,
  APIEndpoint_nwuser: 'https://ui-mrktplace-dev-co-sla-datacash.apps.internal.appcanvas.net/nwuser-ws',
  APIEndpoint_lstng: 'https://ui-mrktplace-dev-co-sla-datacash.apps.internal.appcanvas.net/listing-ws',
  APIEndpoint_bank: 'https://ui-mrktplace-dev-co-sla-datacash.apps.internal.appcanvas.net/bank-ws',  
  // APIEndpoint_authn: 'https://ui-mrktplace-dev-co-sla-datacash.apps.internal.appcanvas.net/authn-ws',
  APIEndpoint_authn: 'https://crtestapi.azurewebsites.net/authn-ws',
  APIEndpoint_local: 'https://crtestapi.azurewebsites.net/',
  urlLogin: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/login?product=bc',
  urlRegister: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/registro?product=bc',
  urlSeguridad: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/seguridad?product=bc',
  urlOTP: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/seguridad/otp?product=bc',
  // urlSetIncome : 'https://crtestapi.azurewebsites.net/new-user-ws/api/v1/user/updateProfile',
  // urlGetIncome : 'https://crtestapi.azurewebsites.net/ldnfosession/sessioninfo/ecs',
  EvidenteEP: {
    validateQues: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/validation/api/v1/evidente/validateQuestionsCustomer',
    validateCusto: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/validation/api/v1/evidente/validateCustomer',
    validateOTPCusto: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/validation/api/v1/evidente/validateOTPCustomer',
    generateOTP: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/validation/api/v1/evidente/generateOTP',
    verifyOTP: 'https://okta-ui-dev-co-sla-datacash.apps.internal.appcanvas.net/validation/api/v1/evidente/verifyOTP'
  },  
  country: 'CO'
};