export const environment = {
  production: true,
  gtmPruebas: false,
  envName: 'demo',
  clientId: 'AvI7MZug3dyIZk1JGFNDm+JOX28ruCgtA9I6d71C4Wg=',
  domain: 'a-internal.appcanvas.net',
  APIEndpoint_nwuser: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/nwuser-ws',
  APIEndpoint_lstng: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/listing-ws',
  APIEndpoint_bank: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/bank-ws',
  APIEndpoint_authn: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/authn-ws/',
  urlLogin: 'https://sso-ui-okta-demo-sla-datacash.a-internal.appcanvas.net/login?product=bc',
  urlRegister: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/registro?product=bc',
  urlSeguridad: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/seguridad?product=bc',
  urlOTP: 'https://demo-ac-mrktplace-ui.a.apps.experian.com/seguridad/otp?product=bc',

  updateProfile: '/new-user-ws/api/v1/user/updateProfile',
  offersListHome: '/ecs/datacash/bank/v1/homeOffers',
  offers: '/ecs/datacash/bank/v1/offers',

  EvidenteEP: {
    validateQues: 'https://demo-sso-ui-okta.a.apps.experian.com/validation/api/v1/evidente/validateQuestionsCustomer',
    validateCusto: 'https://demo-sso-ui-okta.a.apps.experian.com/validation/api/v1/evidente/validateCustomer',
    validateOTPCusto: 'https://demo-sso-ui-okta.a.apps.experian.com/validation/api/v1/evidente/validateOTPCustomer',
    generateOTP: 'https://demo-sso-ui-okta.a.apps.experian.com/validation/api/v1/evidente/generateOTP',
    verifyOTP: 'https://demo-sso-ui-okta.a.apps.experian.com/validation/api/v1/evidente/verifyOTP'
  },
  country:'CO'
};
