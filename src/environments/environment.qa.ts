export const environment = {
  production: true,
  gtmPruebas: true,
  envName: 'qa',
  clientId: 'AvI7MZug3dyIZk1JGFNDm+JOX28ruCgtA9I6d71C4Wg=',
  domain: 'apps.appcanvas.net',
  APIEndpoint_nwuser: 'https://ui-mrktplace-qa-co-sla-datacash.apps.appcanvas.net/nwuser-ws',
  APIEndpoint_lstng: 'https://ui-mrktplace-qa-co-sla-datacash.apps.appcanvas.net/listing-ws',
  APIEndpoint_bank: 'https://ui-mrktplace-qa-co-sla-datacash.apps.appcanvas.net/bank-ws',
  APIEndpoint_authn: 'https://ui-mrktplace-qa-co-sla-datacash.apps.appcanvas.net/authn-ws',
  urlLogin: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/login?product=bc',  
  urlRegister: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/registro?product=bc',
  urlSeguridad: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/seguridad?product=bc',
  urlOTP: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/seguridad/otp?product=bc',

  updateProfile: '/new-user-ws/api/v1/user/updateProfile',
  offersListHome: '/ecs/datacash/bank/v1/homeOffers',
  offers: '/ecs/datacash/bank/v1/offers',
  
  EvidenteEP: {
    validateQues: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/validation/api/v1/evidente/validateQuestionsCustomer',
    validateCusto: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/validation/api/v1/evidente/validateCustomer',
    validateOTPCusto: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/validation/api/v1/evidente/validateOTPCustomer',
    generateOTP: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/validation/api/v1/evidente/generateOTP',
    verifyOTP: 'https://okta-ui-qa-co-sla-datacash.apps.appcanvas.net/validation/api/v1/evidente/verifyOTP'
  },
  country: 'CO'
};
